/**
 * Creation Date: 08/04/2025
 * Author: Vinícius da Silva Santos
 * Coordinator: Larissa Alves de Andrade Moreira
 * Developed by: Lari's Acessórios Team
 * Copyright 2023, LARI'S ACESSÓRIOS
 * All rights are reserved. Reproduction in whole or part is prohibited without the written consent of the copyright owner.
*/

const { pool } = require('../config/database');

const couponController = {
    getAllCoupons: (req, res) => {
        pool.query('SELECT * FROM cupons', (err, result) => {
            if (err) {
                res.status(500).json({ error: 'Erro ao obter dados' });
            } else {
                res.json(result);
            }
        });
    },

    addCoupon: (req, res) => {
        const item = req.body;
        pool.query(`INSERT INTO cupons VALUES (DEFAULT, ?, ?, DEFAULT, ?, 'cupom-image-wrapper.webp', DEFAULT, NULL, 0, ?)`,
            [item.uniqueKey, item.name, item.desconto, item.private],
            (err) => {
                if (err) {
                    console.error(err);
                    res.status(500).json({ error: 'Erro ao adicionar cupom' });
                } else {
                    res.status(200).json({ message: 'Cupom adicionado com sucesso' });
                }
            }
        );
    },

    removeCoupon: (req, res) => {
        const item = req.body;
        pool.query(`DELETE FROM cupons WHERE ID = ?`, [item.id], (err) => {
            if (err) {
                console.error(err);
                res.status(500).json({ error: 'Erro ao remover cupom' });
            } else {
                res.status(200).json({ message: 'Cupom removido com sucesso' });
            }
        });
    },

    addUserCoupon: (req, res) => {
        const item = req.body;
        pool.query('UPDATE `users` SET cupons = ?, cupons_usados = ? WHERE uid = ?',
            [item.cupons, item.cupom_usado, item.user_uid],
            (err) => {
                if (err) {
                    console.error(err);
                    res.status(500).json({ error: 'Erro ao adicionar cupom' });
                } else {
                    res.status(200).json({ message: 'Cupom adicionado na conta com sucesso' });
                }
            }
        );
    }
};

module.exports = couponController;