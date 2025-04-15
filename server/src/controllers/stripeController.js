/**
 * Creation Date: 08/04/2025
 * Author: Vinícius da Silva Santos
 * Coordinator: Larissa Alves de Andrade Moreira
 * Developed by: Lari's Acessórios Team
 * Copyright 2023, LARI'S ACESSÓRIOS
 * All rights are reserved. Reproduction in whole or part is prohibited without the written consent of the copyright owner.
*/

const stripe = require('../config/stripe');

const stripeController = {
    getConfig: (req, res) => {
        res.send({
            publishableKey: process.env.NODE_ENV === 'production'
                ? process.env.STRIPE_PUBLISHABLE_KEY_PRODUCTION
                : process.env.STRIPE_PUBLISHABLE_KEY
        });
    },

    createPaymentIntent: async (req, res) => {
        try {
            const { item, paymentMethodType } = req.body;
            const amount = item;

            const paymentIntentParams = {
                amount: amount,
                currency: 'brl',
                payment_method_types: ['card'],
            };

            if (paymentMethodType === 'card') {
                paymentIntentParams.payment_method_types = ['card'];
                paymentIntentParams.payment_intent_options = {
                    installments: {
                        enabled: true,
                        maximum_installments: 4,
                    },
                };
            }

            const paymentIntent = await stripe.paymentIntents.create(paymentIntentParams);

            res.send({
                clientSecret: paymentIntent.client_secret,
            });
        } catch (e) {
            return res.status(400).send({
                error: {
                    message: e.message,
                },
            });
        }
    }
};

module.exports = stripeController;