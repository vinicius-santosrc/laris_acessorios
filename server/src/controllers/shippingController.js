/**
 * Creation Date: 08/04/2025
 * Author: Vinícius da Silva Santos
 * Coordinator: Larissa Alves de Andrade Moreira
 * Developed by: Lari's Acessórios Team
 * Copyright 2023, LARI'S ACESSÓRIOS
 * All rights are reserved. Reproduction in whole or part is prohibited without the written consent of the copyright owner.
*/

require('dotenv').config();

const shippingController = {
    calculateShipping: async (req, res) => {
        const body = req.body;
        const fromCep = "37558-610";
        const toCep = body.to.postal_code;

        try {
            const response = await fetch(`https://www.melhorenvio.com.br/api/v2/me/shipment/calculate?`, {
                headers: {
                    "Authorization": `Bearer ${process.env.bearerTokenMelhorEnvio}`,
                    "User-Agent": "Aplicação larisacessorios.loja@gmail.com"
                },
                method: "POST",
                body: JSON.stringify({
                    "from": { "postal_code": fromCep },
                    "to": { "postal_code": toCep },
                    "package": {
                        "height": 2,
                        "width": 12,
                        "length": 17,
                        "weight": 0.25
                    }
                })
            });
            const data = await response.json();
            res.json(data);
        } catch (error) {
            console.error("Erro ao calcular frete:", error);
            res.status(500).json({ error: "Erro ao calcular frete." });
        }
    }
};

module.exports = shippingController;