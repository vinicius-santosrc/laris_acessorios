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
const couponController = require('../controllers/couponController');
const { verifyToken } = require('../middlewares/authMiddleware');
require('dotenv').config();

router.get(`/api/v1/${process.env.secretKey}/cupons`, couponController.getAllCoupons);
router.post(`/api/v1/${process.env.secretKey}/cupons/add`, verifyToken, couponController.addCoupon);
router.post(`/api/v1/${process.env.secretKey}/cupons/remove`, verifyToken, couponController.removeCoupon);
router.post(`/api/v1/${process.env.secretKey}/cupons/myaccount/add`, verifyToken, couponController.addUserCoupon);

module.exports = router;