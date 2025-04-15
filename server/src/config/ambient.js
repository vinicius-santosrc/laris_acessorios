/**
 * Creation Date: 08/04/2025
 * Author: Vinícius da Silva Santos
 * Coordinator: Larissa Alves de Andrade Moreira
 * Developed by: Lari's Acessórios Team
 * Copyright 2023, LARI'S ACESSÓRIOS
 * All rights are reserved. Reproduction in whole or part is prohibited without the written consent of the copyright owner.
*/

const getDatabaseyAmbient = () => {
    switch (process.env.NODE_ENV) {
        case "production":
            return {
                db_host: process.env.DB_HOST,
                db_user: process.env.DB_USER,
                database: process.env.database
            };
        case "local":
            return {
                db_host: process.env.DB_HOST_LOCAL,
                db_user: process.env.DB_HOST_LOCAL,
                database: process.env.database_LOCAL
            };
        default:
            return "";
    }
}

module.exports = { getDatabaseyAmbient }