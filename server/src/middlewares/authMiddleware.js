/**
 * Creation Date: 08/04/2025
 * Author: Vinícius da Silva Santos
 * Coordinator: Larissa Alves de Andrade Moreira
 * Developed by: Lari's Acessórios Team
 * Copyright 2023, LARI'S ACESSÓRIOS
 * All rights are reserved. Reproduction in whole or part is prohibited without the written consent of the copyright owner.
*/

require('dotenv').config();

const authService = require('../services/authService');

const authMiddleware = async (req, res, next) => {
    const token = req.cookies.access_token;
    if (!token) {
        return res.status(401).json({ message: "Token de acesso ausente.", success: false, status: "TOKEN_ABSENT", code: 401 });
    }

    try {
        const decoded = authService.verifyAccessToken(token);

        const sessionActive = await authService.verify_sessions(decoded.uid);
        if (!sessionActive) {
            return res.status(403).json({ message: 'Sessão expirada ou revogada.', success: false, status: "SESSION_EXPIRED", code: 403 });
        }

        const sql = 'SELECT id, uid, nome_completo, cpf, email, photoURL, label FROM users WHERE uid = ?';
        const { pool } = require('../config/database');

        pool.query(sql, [decoded.uid], (err, results) => {
            if (err) return res.status(500).json({ message: 'Erro ao buscar usuário.', success: false, status: "ERROR_SEARCHING_USER", code: 500 });

            if (results.length === 0) return res.status(404).json({ message: 'Usuário não encontrado.', success: false, status: "USER_NOT_FOUND", code: 404 });

            req.user = results[0];
            next();
        });
    } catch (err) {
        console.debug(err);
        return res.status(401).json({ message: 'Token inválido ou expirado.', success: false, status: "TOKEN_INVALID", code: 401 });
    }
};

module.exports = { authMiddleware };