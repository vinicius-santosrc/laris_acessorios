/**
 * Creation Date: 08/04/2025
 * Author: Vinícius da Silva Santos
 * Coordinator: Larissa Alves de Andrade Moreira
 * Developed by: Lari's Acessórios Team
 * Copyright 2023, LARI'S ACESSÓRIOS
 * All rights are reserved. Reproduction in whole or part is prohibited without the written consent of the copyright owner.
*/

const { pool } = require('../config/database');

const userController = {
    getUser: (req, res) => {
        const item = req.body;
        pool.query('SELECT * FROM users WHERE email = ?', [item.email], (err, result) => {
            if (err) {
                res.status(500).json({ error: 'Erro ao obter dados' });
            } else {
                res.json(result);
            }
        });
    },

    getUserByUid: (req, res) => {
        const item = req.body;
        pool.query('SELECT * FROM users WHERE uid = ?', [item.uid], (err, result) => {
            if (err) {
                res.status(500).json({ error: 'Erro ao obter dados' });
            } else {
                res.json(result);
            }
        });
    },

    getAllUsers: (req, res) => {
        pool.query('SELECT * FROM users', (err, result) => {
            if (err) {
                res.status(500).json({ error: 'Erro ao obter dados' });
            } else {
                res.json(result);
            }
        });
    },

    addUser: (req, res) => {
        const item = req.body;
        pool.query(
            'INSERT INTO users VALUES (default, "client", ?, ?, ?, ?, "https://laris-acessorios.vercel.app/static/media/user-null.webp", "[]", "[]")',
            [item.uid, item.nome_completo, item.cpf, item.email],
            (err) => {
                if (err) {
                    console.error(err);
                    res.status(500).json({ error: 'Erro ao criar usuário' });
                } else {
                    res.status(200).json({ message: 'Usuário criado com sucesso' });
                }
            }
        );
    }
};

module.exports = userController;