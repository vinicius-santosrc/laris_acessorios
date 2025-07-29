/**
 * Creation Date: 06/06/2025
 * Author: Vinícius da Silva Santos
 * Developed By: Orçaí Team
 * Copyright 2025, Orçaí Inc.
 * All rights are reserved. Reproduction in whole or part is prohibited without the written consent of the copyright owner.
*/

const authService = require('../services/authService');
const jwt = require('jsonwebtoken');
const { pool } = require('../config/database');
const JWT_SECRET = process.env.JWT_SECRET;

const authController = {
    verifyAdmin: (req, res) => {
        pool.query('SELECT * FROM administradores', (err, result) => {
            if (err) {
                res.status(500).json({ error: 'Erro ao obter dados' });
            } else {
                res.json(result);
            }
        });
    },

    /**
     * Rota de registro de novo usuário
     */
    register: async (req, res) => {
        try {
            const data = req.body;
            const password = data.password;

            if (!data.full_name || !data.email || !data.password) {
                return res.status(400).json({
                    message: 'Campos obrigatórios não informados.', success: false, status: "MANDATORY_FIELDS_NOT_PROVIDED", code: 400
                });
            }

            const newUser = await authService.register({ data, password });

            return res.status(201).json({ message: 'Usuário registrado com sucesso.', success: true, status: "USER_CREATED", code: 201, data: { user: newUser } });
        } catch (err) {
            console.error(err);
            return res.status(500).json({ message: err.message, success: false, status: "ERROR_CREATING_USER", code: 500 });
        }
    },

    /**
     * Rota de login
     */
    login: async (req, res) => {
        try {
            const { email, password } = req.body;

            if (!email || !password) {
                return res.status(400).json({ message: 'E-mail e senha são obrigatórios.', success: false, code: "MANDATORY_FIELDS_NOT_PROVIDED", status: 400 });
            }

            const result = await authService.login({ email, password });

            const cookieOptions = {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
                path: "/"
            };

            // REMOVE cookies existentes, se houver
            res.clearCookie("access_token", { path: "/" });
            res.clearCookie("refresh_token", { path: "/" });

            // SETA COOKIES
            res.cookie("access_token", result.tokens.accessToken, {
                ...cookieOptions,
                maxAge: 1000 * 60 * 15 // 15 minutos
            });

            res.cookie("refresh_token", result.tokens.refreshToken, {
                ...cookieOptions,
                maxAge: 1000 * 60 * 60 * 24 * 30 // 30 dias
            });

            return res.status(200).json({
                message: "Login efetuado com sucesso.",
                success: true,
                code: "LOGIN_SUCCESSFUL",
                status: 200
            });
        } catch (err) {
            console.error(err);
            return res.status(401).json({ message: err.message, success: false, code: err.code, status: 401 });
        }
    },

    /**
     * Rota para logout
     */
    logout: (req, res) => {
        const cookieOptions = {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
            path: "/"
        };

        res.clearCookie("access_token", cookieOptions);
        res.clearCookie("refresh_token", cookieOptions);

        const sql = 'DELETE FROM sessions WHERE user_uid = ?';
        pool.query(sql, [req.user.uid], (err) => {
            if (err) {
                return res.status(500).json({ message: "Erro ao revogar tokens.", success: false, code: "ERROR_REVOKE_TOKENS", status: 500 });
            }

            return res.status(200).json({ message: "Logout feito com sucesso.", success: true, code: "SUCCESS_LOGOUT", status: 200 });
        });
    },

    /**
     * Verifica a integridade do token
     */

    verifyToken: async (req, res) => {
        try {
            const { token } = req.body;
            if (!token) {
                return res.status(400).json({ message: 'Token é obrigatório', success: false, code: "TOKEN_REQUIRED", status: 400 });
            }
            const result = await authService.verifyToken(token);
            return res.status(200).json({ message: "Token verificado com sucesso", success: true, code: "TOKEN_VERIFIED", status: 200, data: result });
        }
        catch (error) {
            console.error(error);
            return res.status(401).json({ message: error.message, success: false, code: "TOKEN_INVALID", status: 401 });
        }
    },

    /**
     * Função para refresh token
    */
    refreshToken: (req, res) => {
        const token = req.cookies?.refresh_token;
        if (!token) return res.status(401).json({ message: 'Refresh token ausente.' });

        try {
            const decoded = authService.verifyRefreshToken(token);

            const sql = 'SELECT * FROM sessions WHERE jti = ?';
            pool.query(sql, [decoded.jti], async (err, results) => {
                if (err) return res.status(500).json({ message: 'Erro ao buscar refresh token.' });

                if (results.length === 0) {
                    return res.status(403).json({ message: 'Refresh token não encontrado ou já revogado.' });
                }

                const tokenHash = results[0].token_hash;
                const valid = await require('bcryptjs').compare(token, tokenHash);
                if (!valid) return res.status(403).json({ message: 'Refresh token inválido.' });

                const deleteSql = 'DELETE FROM sessions WHERE jti = ?';
                pool.query(deleteSql, [decoded.jti]);

                const tokens = authService.generateTokens({ uid: decoded.uid, email: decoded.email });
                const newDecodedRefresh = jwt.decode(tokens.refreshToken);
                await authService.saveRefreshToken({
                    user_uid: decoded.uid,
                    refreshToken: tokens.refreshToken,
                    jti: newDecodedRefresh.jti,
                    expiresIn: 30 * 24 * 60 * 60
                });

                const cookieOptions = {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === "production",
                    sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
                    path: "/"
                };

                res.cookie("access_token", tokens.accessToken, {
                    ...cookieOptions,
                    maxAge: 1000 * 60 * 15
                });

                res.cookie("refresh_token", tokens.refreshToken, {
                    ...cookieOptions,
                    maxAge: 1000 * 60 * 60 * 24 * 30
                });

                return res.status(200).json({ message: 'Token renovado', success: true, status: "TOKEN_RENEWED", code: 200 });
            });

        } catch (err) {
            console.debug(err);
            return res.status(403).json({ message: 'Refresh token inválido.', success: false, status: "REFRESH_TOKEN_INVALID", code: 403 });
        }
    },

    /**
 * Retorna os dados do usuário autenticado
 */
    me: async (req, res) => {
        return res.status(200).json({ message: "Usuário retornado com sucesso", success: true, status: "USER_GET", code: 200, data: { user: req.user } });
    },
};

module.exports = authController;
