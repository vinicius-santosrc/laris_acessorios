/**
 * Creation Date: 08/04/2025
 * Author: Vinícius da Silva Santos
 * Coordinator: Larissa Alves de Andrade Moreira
 * Developed by: Lari's Acessórios Team
 * Copyright 2023, LARI'S ACESSÓRIOS
 * All rights are reserved. Reproduction in whole or part is prohibited without the written consent of the copyright owner.
*/

const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const { verifyToken, authMiddleware } = require('../middlewares/authMiddleware');
require('dotenv').config();

router.get(`/api/v1/${process.env.secretKey}/orders`, orderController.getAllOrders);
router.post(`/api/v1/${process.env.secretKey}/getOrderById`, orderController.getOrderById);
router.post(`/api/v1/${process.env.secretKey}/orders/add`, authMiddleware, orderController.addOrder);
router.post(`/api/v1/${process.env.secretKey}/orders/edit`, authMiddleware, orderController.editOrder);
router.post(`/api/v1/${process.env.secretKey}/orders/delete`, authMiddleware, orderController.deleteOrder);

module.exports = router;