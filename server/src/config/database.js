/**
 * Creation Date: 08/04/2025
 * Author: Vinícius da Silva Santos
 * Coordinator: Larissa Alves de Andrade Moreira
 * Developed by: Lari's Acessórios Team
 * Copyright 2023, LARI'S ACESSÓRIOS
 * All rights are reserved. Reproduction in whole or part is prohibited without the written consent of the copyright owner.
*/

const mysql = require('mysql2');
const { getDatabaseyAmbient } = require('./ambient');
require('dotenv').config();

const dataDatabase = getDatabaseyAmbient();

const pool = mysql.createPool({
    host: dataDatabase.db_host,
    user: dataDatabase.db_user,
    password: process.env.DB_PASSWORD,
    database: dataDatabase.database,
    // ssl: {
    //     rejectUnauthorized: false,
    // },
    connectionLimit: 50,
    waitForConnections: true
});

const connectToDatabase = () => {
    let attempts = 0;
    const maxRetries = 5;

    pool.query((err) => {
        if (err) {
            if (attempts < maxRetries) {
                console.log(`Connection failed, retrying... (${attempts + 1})`);
                attempts++;
                setTimeout(connectToDatabase, 3000);
            } else {
                console.error('Max retries reached, could not connect to the database');
            }
        } else {
            console.log('Connected to the database');
        }
    });
};

module.exports = { pool, connectToDatabase };