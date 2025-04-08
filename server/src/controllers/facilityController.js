/**
 * Creation Date: 08/04/2025
 * Author: Vinícius da Silva Santos
 * Coordinator: Larissa Alves de Andrade Moreira
 * Developed by: Lari's Acessórios Team
 * Copyright 2023, LARI'S ACESSÓRIOS
 * All rights are reserved. Reproduction in whole or part is prohibited without the written consent of the copyright owner.
*/

const { pool } = require('../config/database');

const facilityController = {
    getFacilities: (req, res) => {
        pool.query('SELECT * FROM facilitys', (err, result) => {
            if (err) {
                res.status(500).json({ error: "Erro ao obter facilitys" });
            } else {
                res.json(result);
            }
        });
    },

    editFacility: (req, res) => {
        const item = req.body;
        pool.query(
            'UPDATE facilitys SET data = ?, dataMobile = ? WHERE id = ?',
            [item.data, item.dataMobile, item.id],
            (err) => {
                if (err) {
                    console.error(err);
                    res.status(500).json({ error: 'Erro ao editar facility' });
                } else {
                    res.status(200).json({ message: 'Facility editado com sucesso' });
                }
            }
        );
    }
};

module.exports = facilityController;