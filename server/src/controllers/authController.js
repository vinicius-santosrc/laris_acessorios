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

            if (!email || !password) {
                return res.status(400).json({ message: 'E-mail e senha são obrigatórios.' });
            }

            const result = await authService.login({ email, password });

            return res.status(200).json(result);
        } catch (err) {
            console.error(err);
            return res.status(401).json({ message: 'Falha na autenticação.', error: err.message });
        }
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
    }
};

module.exports = authController;
