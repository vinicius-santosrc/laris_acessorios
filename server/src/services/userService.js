/**
 * Creation Date: 19/05/2025
 * Author: Vinícius da Silva Santos
 * Developed by: Dump Team
 * Copyright 2025, Dump Inc.
 * All rights are reserved. Reproduction in whole or part is prohibited without the written consent of the copyright owner.
*/


const { pool } = require('../config/database');
const createError = require('../utils/createError');
const ERROR_CODES = require('../utils/errorCodes');
const { generateUID } = require('../utils/utils');

/**
 * Recupera um usuário pelo ID.
 * @param {number} id 
 * @returns {Promise<Object>}
 */
const getUserById = (id) => {
    return new Promise((resolve, reject) => {
        pool.query('SELECT * FROM users WHERE id = ?', [id], (err, results) => {
            if (err) return reject(err);
            resolve(results[0] || null);
        });
    });
};

/**
 * Cria um novo usuário no banco de dados.
 * @param {Object} data - Dados do usuário (userModel)
 * @param {string} password - Senha do usuário
 * @returns {Promise<Object>} Dados básicos do usuário criado
 */
const createUser = (data, password) => {
    return new Promise((resolve, reject) => {
        const {
            cpf,
            nome_completo,
            email
        } = data;

        pool.query('SELECT id FROM users WHERE email = ?', [email], (err, results) => {
            if (err) return reject(err);

            if (results.length > 0) {
                return reject(createError('E-mail já cadastrado em nossa plataforma.', ERROR_CODES.ALREADY_EMAIL));
            }

            const values = [generateUID(), cpf, nome_completo, email, password];

            pool.query(
                'INSERT INTO users (uid, cpf, nome_completo, email, password) VALUES (?, ?, ?, ?, ?)',
                values,
                (err, results) => {
                    if (err) return reject(createError(err, ERROR_CODES.ERROR_CREATE_ACCOUNT));

                    resolve({
                        user_id: results.insertId,
                        nome_completo,
                        email
                    });
                }
            );
        });
    });
};


module.exports = {
    getUserById,
    createUser
};
