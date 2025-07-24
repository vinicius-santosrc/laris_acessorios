/**
 * Creation Date: 24/07/2025
 * Author: Vinícius da Silva Santos
 * Developed By: Orçaí Team
 * Copyright 2025, Orçaí Inc.
 * All rights are reserved. Reproduction in whole or part is prohibited without the written consent of the copyright owner.
*/

const { pool } = require('../config/database');
const userService = require('./userService');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');
const { logout } = require('../controllers/authController');

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_SECRET_ACESS = process.env.JWT_SECRET_ACESS;

const authService = {
    /**
     * Cria um novo usuário com senha criptografada
     */
    register: async ({ data, password }) => {
        const hashedPassword = await bcrypt.hash(password, 10);
        return userService.createUser(data, hashedPassword);
    },

    /**
     * Autentica o usuário, verifica senha e gera token
     */
    login: async ({ email, password }) => {
        return new Promise((resolve, reject) => {
            const sql = 'SELECT * FROM users WHERE email = ?';
            pool.query(sql, [email], async (err, results) => {
                if (err) return reject({ status: 500, code: 'DB_QUERY_ERROR', message: 'Erro interno ao buscar usuário.' });

                if (results.length === 0) return reject({ status: 404, code: 'USER_NOT_FOUND', message: 'Usuário não encontrado.' });

                const user = results[0];
                const passwordMatch = await bcrypt.compare(password, user.password);
                if (!passwordMatch) return reject({ status: 401, code: 'INVALID_PASSWORD', message: 'E-mail ou senha incorreta.' });

                const tokens = authService.generateTokens(user);
                const decodedRefresh = jwt.decode(tokens.refreshToken);

                await authService.saveRefreshToken({
                    user_uid: user.uid,
                    refreshToken: tokens.refreshToken,
                    jti: decodedRefresh.jti,
                    expiresIn: 30 * 24 * 60 * 60 // 30 dias
                });

                resolve({
                    tokens,
                    user: {
                        id: user.id,
                        uid: user.uid,
                        full_name: user.nome_completo,
                        email: user.email,
                        photoURL: user.photoURL,
                        role: user.role
                    }
                });
            });
        });
    },

    verify_sessions: (user_uid) => {
        return new Promise((resolve, reject) => {
            const checkSessionSql = 'SELECT * FROM sessions WHERE user_uid = ?';
            pool.query(checkSessionSql, [user_uid], (err, sessions) => {
                if (err) return reject({ status: 500, message: 'Erro ao verificar sessões.' });

                if (sessions.length === 0) {
                    return resolve(false);
                }

                const now = new Date();
                const activeSession = sessions.find(session => new Date(session.expires_at) > now);

                if (!activeSession) {
                    logout();
                    return resolve(false);
                }

                return resolve(true);
            });
        });
    },

    verifyAccessToken: (token) => {
        try {
            return jwt.verify(token, JWT_SECRET_ACESS);
        } catch (err) {
            console.debug(err);
            throw new Error({
                status: 401, code: 'INVALID_ACCESS_TOKEN', message: 'Access token inválido ou expirado.'
            });
        }
    },

    verifyRefreshToken: (token) => {
        try {
            return jwt.verify(token, JWT_SECRET);
        } catch (err) {
            console.debug(err);
            throw new Error({
                status: 401, code: 'INVALID_REFRESH_TOKEN', message: 'Refresh token inválido ou expirado.'
            });
        }
    },

    saveRefreshToken: async ({ user_uid, refreshToken, jti, expiresIn }) => {
        const tokenHash = await bcrypt.hash(refreshToken, 10);
        const expiresAt = new Date(Date.now() + expiresIn * 1000);

        await new Promise((resolve, reject) => {
            const sql = 'SELECT id, jti FROM sessions WHERE user_uid = ? ORDER BY expires_at ASC';
            pool.query(sql, [user_uid], async (err, sessions) => {
                if (err) return reject(err);

                const MAX_SESSIONS = 3;
                if (sessions.length >= MAX_SESSIONS) {
                    const sessionsToRemove = sessions.slice(0, sessions.length - MAX_SESSIONS + 1);
                    const idsToRemove = sessionsToRemove.map(s => s.jti);
                    if (idsToRemove.length > 0) {
                        const deleteSql = 'DELETE FROM sessions WHERE jti IN (?)';
                        pool.query(deleteSql, [idsToRemove]);
                    }
                }

                resolve();
            });
        });

        const sql = 'INSERT INTO sessions (user_uid, token_hash, jti, expires_at) VALUES (?, ?, ?, ?)';
        return new Promise((resolve, reject) => {
            pool.query(sql, [user_uid, tokenHash, jti, expiresAt], (err, results) => {
                if (err) return reject(err);
                resolve(results);
            });
        });
    },

    generateTokens: (user) => {
        const payload = { uid: user.uid, email: user.email };

        const accessToken = jwt.sign(payload, JWT_SECRET_ACESS, { expiresIn: '15m' });

        const refreshPayload = {
            uid: user.uid,
            email: user.email,
            jti: uuidv4()
        };

        const refreshToken = jwt.sign(refreshPayload, JWT_SECRET, { expiresIn: '30d' });

        return { accessToken, refreshToken };
    }

};

module.exports = authService;
