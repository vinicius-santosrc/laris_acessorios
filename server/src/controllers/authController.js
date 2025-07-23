/**
 * Creation Date: 08/04/2025
 * Author: Vinícius da Silva Santos
 * Coordinator: Larissa Alves de Andrade Moreira
 * Developed by: Lari's Acessórios Team
 * Copyright 2023, LARI'S ACESSÓRIOS
 * All rights are reserved. Reproduction in whole or part is prohibited without the written consent of the copyright owner.
*/

const userService = require("../services/userService");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { pool } = require('../config/database');

const createError = require('../utils/createError');
const ERROR_CODES = require('../utils/errorCodes');
const authService = require("../services/authService");

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = '30d';

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

            if (!data.cpf || !data.nome_completo || !data.email || !data.password) {
                return res.status(400).json({ message: 'Campos obrigatórios não informados.' });
            }

            const newUser = await authService.register({ data, password });

            return res.status(201).json({ message: 'Usuário registrado com sucesso.', user: newUser });
        } catch (err) {
            console.error(err);
            return res.status(500).json({ message: 'Erro ao registrar usuário.', error: err.message });
        }
    },

    /**
     * Rota de login
     */
    login: async (req, res) => {
        try {
            const { email, password } = req.body;

            if (!email || !password)
                return res.status(400).json({ message: 'E-mail e senha obrigatórios.' });

            const result = await authService.login({ email, password });

            const cookieOptions = {
                httpOnly: true,
                secure: false,
                sameSite: "Lax",
                // secure: process.env.NODE_ENV === "production",
                // sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
                path: "/"
            };

            // SETA COOKIES
            res.cookie("access_token", result.tokens.accessToken, {
                ...cookieOptions,
                maxAge: 1000 * 60 * 15 // 15 minutos
            });

            res.cookie("refresh_token", result.tokens.refreshToken, {
                ...cookieOptions,
                maxAge: 1000 * 60 * 60 * 24 * 30 // 30 dias
            });

            return res.status(200).json({ user: result.user });
        } catch (err) {
            return res.status(401).json({ message: 'Falha na autenticação.', error: err.message });
        }
    },

    logout: (req, res) => {
        const cookieOptions = {
            httpOnly: true,
            secure: false,
            sameSite: "Lax",
            // secure: process.env.NODE_ENV === "production",
            // sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
            path: "/"
        };

        res.clearCookie("access_token", cookieOptions);
        res.clearCookie("refresh_token", cookieOptions);

        return res.status(200).json({ message: "Logout feito com sucesso." });
    },


    /**
     * Verifica a integridade do token
     */

    verifyToken: (token) => {
        try {
            return jwt.verify(token, JWT_SECRET);
        } catch (err) {
            throw createError('Token inválido ou expirado.', ERROR_CODES.INVALID_TOKEN);
        }
    },

    refreshToken: (req, res) => {
        const token = req.cookies.refresh_token;
        if (!token) return res.status(401).json({ message: 'Refresh token ausente.' });

        try {
            const decoded = jwt.verify(token, JWT_SECRET);

            const newAccessToken = jwt.sign({ id: decoded.id, email: decoded.email }, JWT_SECRET, { expiresIn: '15m' });

            res.cookie("access_token", newAccessToken, {
                httpOnly: true,
                secure: false,
                sameSite: "Lax",
                // secure: process.env.NODE_ENV === "production",
                // sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
                path: "/",
                maxAge: 1000 * 60 * 15
            });

            return res.status(200).json({ message: 'Token renovado' });
        } catch (err) {
            return res.status(403).json({ message: 'Refresh token inválido.' });
        }
    },

    /**
 * Retorna os dados do usuário autenticado
 */
    me: async (req, res) => {
        try {
            const token = req.cookies.access_token;
            if (!token) {
                return res.status(401).json({ message: "Token de acesso ausente." });
            }

            const decoded = jwt.verify(token, JWT_SECRET);

            // Buscar dados atualizados do usuário no banco (garante consistência)
            const sql = 'SELECT id, uid, nome_completo, email, photoURL, label FROM users WHERE id = ?';
            pool.query(sql, [decoded.id], (err, results) => {
                if (err) return res.status(500).json({ message: 'Erro ao buscar usuário.' });
                if (results.length === 0) return res.status(404).json({ message: 'Usuário não encontrado.' });

                return res.status(200).json({ user: results[0] });
            });
        } catch (err) {
            return res.status(401).json({ message: 'Token inválido ou expirado.', error: err.message });
        }
    },

};

module.exports = authController;
