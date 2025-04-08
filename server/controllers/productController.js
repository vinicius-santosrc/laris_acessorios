/**
 * Creation Date: 08/04/2025
 * Author: Vinícius da Silva Santos
 * Coordinator: Larissa Alves de Andrade Moreira
 * Developed by: Lari's Acessórios Team
 * Copyright 2023, LARI'S ACESSÓRIOS
 * All rights are reserved. Reproduction in whole or part is prohibited without the written consent of the copyright owner.
*/

const { pool } = require('../config/database');

const productController = {
    getAllProducts: (req, res) => {
        pool.query('SELECT id, name_product, price, desconto, disponibilidade, tamanhos, quantidade_disponivel, categoria, url, tipo, photoURL, extensor, type_full_label, categoryList, description, type FROM produtos', (err, result) => {
            if (err) {
                res.status(500).json({ error: 'Erro ao obter dados' });
            } else {
                res.json(result);
            }
        });
    },

    searchByUrl: (req, res) => {
        const item = req.body;
        const url = item.url;

        pool.query('SELECT * FROM produtos WHERE url = ?', [url], (err, result) => {
            if (err) {
                res.status(500).json({ error: 'Erro ao obter dados' });
            } else if (result.length > 0) {
                res.json(result[0]);
            } else {
                res.status(404).json({ message: 'Produto não encontrado' });
            }
        });
    },

    addProduct: (req, res) => {
        const item = req.body;
        pool.query('INSERT INTO produtos VALUES (default, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, DEFAULT)', [
            item.name_product,
            item.price,
            item.desconto,
            item.disponibilidade,
            item.tamanhos,
            item.quantidade_disponivel,
            item.categoria,
            item.url,
            item.fornecedor,
            item.tipo,
            item.personalizavel,
            item.photoURL,
            item.extensor,
            item.type_full_label,
            item.categoryList,
            item.description,
            item.type
        ], (err) => {
            if (err) {
                console.error(err);
                res.status(500).json({ error: 'Erro ao salvar o produto' });
            } else {
                res.status(200).json({ message: 'Produto cadastrado com sucesso' });
            }
        });
    },

    editProduct: (req, res) => {
        const item = req.body;
        pool.query('UPDATE `produtos` SET name_product = ?, price = ?, desconto = ?, disponibilidade = ?, tamanhos = ?, quantidade_disponivel = ?, categoria = ?, url = ?, fornecedor = ?, tipo = ?, personalizavel = ?, photoURL = ?, extensor = ?, type_full_label = ?, categoryList = ?, description = ?, type = ? WHERE id = ?', [
            item.name_product,
            item.price,
            item.desconto,
            item.disponibilidade,
            item.tamanhos,
            item.quantidade_disponivel,
            item.categoria,
            item.url,
            item.fornecedor,
            item.tipo,
            item.personalizavel,
            item.photoURL,
            item.extensor,
            item.type_full_label,
            item.categoryList,
            item.description,
            item.type,
            item.id
        ], (err) => {
            if (err) {
                console.error(err);
                res.status(500).json({ error: 'Erro ao editar produto' });
            } else {
                console.log("Product successfully edited: ", item.id);
                res.status(200).json({ message: 'Produto editado com sucesso' });
            }
        });
    },

    deleteProduct: (req, res) => {
        const item = req.body;
        pool.query('DELETE FROM `produtos` WHERE id = ?', [item.id], (err) => {
            if (err) {
                console.error(err);
                res.status(500).json({ error: 'Erro ao deletar produto' });
            } else {
                res.status(200).json({ message: 'Produto deletado com sucesso' });
            }
        });
    },

    changeVisibility: (req, res) => {
        const item = req.body;
        pool.query('UPDATE `produtos` SET disponibilidade = ? WHERE id = ?',
            [item.disponibilidade, item.id],
            (err) => {
                if (err) {
                    console.error(err);
                    res.status(500).json({ error: 'Erro ao alterar visibilidade' });
                } else {
                    res.status(200).json({ message: 'Produto mudado de visibilidade com sucesso' });
                }
            }
        );
    }
};

module.exports = productController;