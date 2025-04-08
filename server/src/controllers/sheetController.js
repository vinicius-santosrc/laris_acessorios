/**
 * Creation Date: 08/04/2025
 * Author: Vinícius da Silva Santos
 * Coordinator: Larissa Alves de Andrade Moreira
 * Developed by: Lari's Acessórios Team
 * Copyright 2023, LARI'S ACESSÓRIOS
 * All rights are reserved. Reproduction in whole or part is prohibited without the written consent of the copyright owner.
*/

const { pool } = require('../config/database');

const sheetController = {
    getPlanilhaDespesas: (req, res) => {
        pool.query('SELECT * FROM `planilha-despesas`', (err, result) => {
            if (err) {
                res.status(500).json({ error: 'Erro ao obter dados' });
            } else {
                res.json(result);
            }
        });
    },

    getPlanilhaItens: (req, res) => {
        pool.query('SELECT * FROM `planilha-itens`', (err, result) => {
            if (err) {
                res.status(500).json({ error: 'Erro ao obter dados' });
            } else {
                res.json(result);
            }
        });
    },

    addDespesa: (req, res) => {
        const item = req.body;
        pool.query('INSERT INTO `planilha-despesas` (descricao, valor, tipo) VALUES (?, ?, ?)',
            [item.descricao, item.valor, item.tipo],
            (err) => {
                if (err) {
                    console.error(err);
                    res.status(500).json({ error: 'Erro ao adicionar despesa' });
                } else {
                    res.status(200).json({ message: 'Item adicionado com sucesso' });
                }
            }
        );
    },

    editDespesa: (req, res) => {
        const item = req.body;
        pool.query('UPDATE `planilha-despesas` SET descricao = ?, valor = ?, tipo = ? WHERE id = ?',
            [item.descricao, item.valor, item.tipo, item.id],
            (err) => {
                if (err) {
                    console.error(err);
                    res.status(500).json({ error: 'Erro ao editar despesa' });
                } else {
                    res.status(200).json({ message: 'Item editado com sucesso' });
                }
            }
        );
    },

    deleteDespesa: (req, res) => {
        const item = req.body;
        pool.query('DELETE FROM `planilha-despesas` WHERE id = ?', [item.id], (err) => {
            if (err) {
                console.error(err);
                res.status(500).json({ error: 'Erro ao deletar despesa' });
            } else {
                res.status(200).json({ message: 'Item deletado com sucesso' });
            }
        });
    },

    addItemPlanilha: (req, res) => {
        const item = req.body;
        pool.query('INSERT INTO `planilha-itens` (id, custos, detalhe, codigo, nameofitem, preco_compra, precorevenda, quantcompra, lucroporitem) VALUES (default, ?, ?, ?, ?, ?, ?, ?, ?)',
            [item.custos, item.detalhe, item.codigo, item.nameofitem, item.preco_compra, item.precorevenda, item.quantcompra, item.lucroporitem],
            (err) => {
                if (err) {
                    console.error(err);
                    res.status(500).json({ error: 'Erro ao adicionar item' });
                } else {
                    res.status(200).json({ message: 'Item adicionado com sucesso' });
                }
            }
        );
    },

    editItemPlanilha: (req, res) => {
        const item = req.body;
        pool.query('UPDATE `planilha-itens` SET custos = ?, detalhe = ?, codigo = ?, nameofitem = ?, preco_compra = ?, precorevenda = ?, quantcompra = ?, lucroporitem = ? WHERE id = ?',
            [item.custos, item.detalhe, item.codigo, item.nameofitem, item.preco_compra, item.precorevenda, item.quantcompra, item.lucroporitem, item.id],
            (err) => {
                if (err) {
                    console.error(err);
                    res.status(500).json({ error: 'Erro ao editar item' });
                } else {
                    res.status(200).json({ message: 'Item editado com sucesso' });
                }
            }
        );
    },

    deleteItemPlanilha: (req, res) => {
        const item = req.body;
        pool.query('DELETE FROM `planilha-itens` WHERE id = ?', [item.id], (err) => {
            if (err) {
                console.error(err);
                res.status(500).json({ error: 'Erro ao deletar item' });
            } else {
                res.status(200).json({ message: 'Item deletado com sucesso' });
            }
        });
    },

    getMetas: (req, res) => {
        pool.query('SELECT * FROM `metas`', (err, result) => {
            if (err) {
                res.status(500).json({ error: 'Erro ao obter dados' });
            } else {
                res.json(result);
            }
        });
    },

    getPlanejamentos: (req, res) => {
        pool.query('SELECT * FROM `planejamentos`', (err, result) => {
            if (err) {
                res.status(500).json({ error: 'Erro ao obter dados' });
            } else {
                res.json(result);
            }
        });
    },

    addPlanejamento: (req, res) => {
        const item = req.body;
        pool.query('INSERT INTO planejamentos VALUES (default, "[]", ?)',
            [item.name_card],
            (err) => {
                if (err) {
                    console.error(err);
                    res.status(500).json({ error: 'Erro ao adicionar planejamento' });
                } else {
                    res.status(200).json({ message: 'Produto cadastrado com sucesso' });
                }
            }
        );
    },

    updatePlanejamento: (req, res) => {
        const item = req.body;
        const contentCardValue = JSON.stringify(item.list);

        pool.query("UPDATE planejamentos SET content_card = ? WHERE id = ?",
            [contentCardValue, item.id],
            (err) => {
                if (err) {
                    console.error(err);
                    res.status(500).json({ error: 'Erro ao atualizar planejamento' });
                } else {
                    res.status(200).json({ message: 'Update no Planejamento' });
                }
            }
        );
    },

    deletePlanejamento: (req, res) => {
        const item = req.body;
        pool.query('DELETE FROM planejamentos WHERE id = ?', [item.id], (err) => {
            if (err) {
                console.error(err);
                res.status(500).json({ error: 'Erro ao deletar planejamento' });
            } else {
                res.status(200).json({ message: 'Item planejamentos deletado com sucesso' });
            }
        });
    }
};

module.exports = sheetController;