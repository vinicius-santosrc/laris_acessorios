/**
 * Creation Date: 08/04/2025
 * Author: Vinícius da Silva Santos
 * Coordinator: Larissa Alves de Andrade Moreira
 * Developed by: Lari's Acessórios Team
 * Copyright 2023, LARI'S ACESSÓRIOS
 * All rights are reserved. Reproduction in whole or part is prohibited without the written consent of the copyright owner.
*/

const { pool } = require('../config/database');

const authController = {
    verifyAdmin: (req, res) => {
        pool.query('SELECT * FROM administradores', (err, result) => {
            if (err) {
                res.status(500).json({ error: 'Erro ao obter dados' });
            } else {
                res.json(result);
            }
        });
    }
};

module.exports = authController;