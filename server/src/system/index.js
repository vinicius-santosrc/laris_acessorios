/**
 * Creation Date: 23/07/2025
 * Author: Vinícius da Silva Santos
 * Coordinator: Larissa Alves de Andrade Moreira
 * Developed by: Lari's Acessórios Team
 * Copyright 2023, LARI'S ACESSÓRIOS
 * All rights are reserved. Reproduction in whole or part is prohibited without the written consent of the copyright owner.
*/


const { verifyExpiresItems } = require('./verifications');
const { runMigrations } = require('./migrations');

function runSystemChecks() {
    runMigrations();

    verifyExpiresItems();

    setInterval(() => {
        verifyExpiresItems();
    }, 60000);
}

module.exports = {
    runSystemChecks
};