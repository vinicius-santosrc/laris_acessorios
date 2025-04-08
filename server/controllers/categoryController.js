/**
 * Creation Date: 08/04/2025
 * Author: Vinícius da Silva Santos
 * Coordinator: Larissa Alves de Andrade Moreira
 * Developed by: Lari's Acessórios Team
 * Copyright 2023, LARI'S ACESSÓRIOS
 * All rights are reserved. Reproduction in whole or part is prohibited without the written consent of the copyright owner.
*/

const { pool } = require('../config/database');

const categoryController = {
    getAllCategories: (req, res) => {
        pool.query('SELECT * FROM categorys', (err, result) => {
            if (err) {
                res.status(500).json({ error: 'Erro ao obter dados' });
            } else {
                res.json(result);
            }
        });
    },

    getCategoriesData: (req, res) => {
        pool.query('SELECT * FROM categories', (err, result) => {
            if (err) {
                res.status(500).json({ error: 'Erro ao obter dados' });
            } else {
                res.json(result);
            }
        });
    },

    addCategory: (req, res) => {
        const item = req.body;

        pool.query(`INSERT INTO categorys (category) VALUES (?)`, [item.urlLink], (err) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ error: 'Erro ao salvar a categoria' });
            }

            pool.query(`INSERT INTO categories (highlightText, highlightDescription, highlightImage, urlLink, products) VALUES (?, ?, ?, ?, '[]')`, [
                item.highlightText, item.highlightDescription, item.highlightImage, item.urlLink
            ], (err) => {
                if (err) {
                    console.error(err);
                    return res.status(500).json({ error: 'Erro ao salvar os dados da categoria' });
                }

                pool.query(`INSERT INTO menu_items (title, is_link, href, sub_items) VALUES (?, TRUE, "/collections/" ?, NULL)`, [
                    item.highlightText, item.urlLink
                ], (err) => {
                    if (err) {
                        console.error(err);
                        return res.status(500).json({ error: 'Erro ao salvar no menu' });
                    }
                    return res.status(200).json({ message: 'Categoria cadastrada com sucesso' });
                });
            });
        });
    },

    editCategory: (req, res) => {
        const item = req.body;
        pool.query(
            'UPDATE categories SET highlightText = ?, highlightDescription = ?, highlightImage = ?, urlLink = ? WHERE ID = ?',
            [item.highlightText, item.highlightDescription, item.highlightImage, item.urlLink, item.id],
            (err) => {
                if (err) {
                    console.error(err);
                    res.status(500).json({ error: 'Erro ao editar dados' });
                } else {
                    res.status(200).json({ message: 'Categoria editada com sucesso' });
                }
            }
        );
    },

    getMenuItems: (req, res) => {
        pool.query('SELECT * FROM menu_items', (err, result) => {
            if (err) {
                res.status(500).json({ error: 'Erro ao obter dados' });
            } else {
                res.json(result);
            }
        });
    }
};

module.exports = categoryController;