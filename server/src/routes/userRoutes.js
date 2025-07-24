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
const userController = require('../controllers/userController');
const { authMiddleware } = require('../middlewares/authMiddleware');
require('dotenv').config();

router.post(`/api/v1/${process.env.secretKey}/user`, userController.getUser);
router.post(`/api/v1/${process.env.secretKey}/userByUid`, userController.getUserByUid);
router.get(`/api/v1/${process.env.secretKey}/users`, userController.getAllUsers);
router.post(`/api/v1/${process.env.secretKey}/users/add`, authMiddleware, userController.addUser);

module.exports = router;