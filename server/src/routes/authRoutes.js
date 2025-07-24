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
const authController = require('../controllers/authController');
const { authMiddleware } = require('../middlewares/authMiddleware');
require('dotenv').config();

// Rota protegida: apenas para admins (remover se não for mais usada)
// router.get(`/api/v1/${process.env.secretKey}/admins`, authController.verifyAdmin);

router.post(`/api/v1/${process.env.secretKey}/login`, authController.login);
router.post(`/api/v1/${process.env.secretKey}/register`, authController.register);
router.post(`/api/v1/${process.env.secretKey}/refreshToken`, authController.refreshToken);

// Rotas protegidas
router.get(`/api/v1/${process.env.secretKey}/admins`, authController.verifyAdmin);
router.get(`/api/v1/${process.env.secretKey}/me`, authMiddleware, authController.me);
router.post(`/api/v1/${process.env.secretKey}/logout`, authMiddleware, authController.logout);

module.exports = router;