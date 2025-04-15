/**
 * Creation Date: 08/04/2025
 * Author: Vinícius da Silva Santos
 * Coordinator: Larissa Alves de Andrade Moreira
 * Developed by: Lari's Acessórios Team
 * Copyright 2023, LARI'S ACESSÓRIOS
 * All rights are reserved. Reproduction in whole or part is prohibited without the written consent of the copyright owner.
*/

const Stripe = require('stripe');
require('dotenv').config();

const stripe = Stripe(process.env.NODE_ENV === "production" ?
    process.env.STRIPE_SECRET_KEY_PRODUCTION :
    process.env.STRIPE_SECRET_KEY
);

module.exports = stripe;