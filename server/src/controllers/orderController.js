/**
 * Creation Date: 08/04/2025
 * Author: Vinícius da Silva Santos
 * Coordinator: Larissa Alves de Andrade Moreira
 * Developed by: Lari's Acessórios Team
 * Copyright 2023, LARI'S ACESSÓRIOS
 * All rights are reserved. Reproduction in whole or part is prohibited without the written consent of the copyright owner.
*/

const { pool } = require('../config/database');

const orderController = {
    getAllOrders: (req, res) => {
        pool.query('SELECT * FROM orders', (err, result) => {
            if (err) {
                res.status(500).json({ error: 'Erro ao obter dados' });
            } else {
                res.json(result);
            }
        });
    },

    getOrderById: (req, res) => {
        const item = req.body;
        pool.query('SELECT * FROM orders WHERE id = ?', [item.id], (err, result) => {
            if (err) {
                res.status(500).json({ error: 'Erro ao obter dados' });
            } else {
                res.json(result);
            }
        });
    },

    addOrder: (req, res) => {
        const item = req.body;
        pool.query(
            'INSERT INTO orders VALUES (default, ?, ?, ?, ?, ?, default, ?, default, ?, ?, ?, ?, ?, ?)',
            [item.uid, item.address, item.items, item.user, item.totalprice, item.paymentOption, item.situation, item.desconto, item.subtotal, item.cupom_desconto, item.cupons, item.codigoRastreio],
            (err) => {
                if (err) {
                    console.error(err);
                    res.status(500).json({ error: 'Erro ao criar pedido' });
                } else {
                    console.log("Novo pedido cadastrado com sucesso.");
                    res.status(200).json({ message: 'Pedido cadastrado com sucesso' });
                }
            }
        );
    },

    editOrder: (req, res) => {
        const item = req.body;
        pool.query(
            'UPDATE `orders` SET state = ?, situation = ?, codigoRastreio = ? WHERE id = ?',
            [item.state, item.situation, item.codigoRastreio, item.id],
            (err) => {
                if (err) {
                    console.error(err);
                    res.status(500).json({ error: 'Erro ao editar pedido' });
                } else {
                    console.log("Order " + item.id + " editada com sucesso para estado: " + item.state);
                    res.status(200).json({ message: 'Order editada com sucesso' });
                }
            }
        );
    },

    deleteOrder: (req, res) => {
        const item = req.body;
        pool.query('delete from orders where id = ?;', [item.id], (err) => {
            if (err) {
                console.error(err);
                res.status(500).json({ error: 'Erro ao deletar pedido' });
            } else {
                res.status(200).json({ message: 'Pedido deletado com sucesso' });
            }
        });
    }
};

module.exports = orderController;