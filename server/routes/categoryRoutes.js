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
const categoryController = require('../controllers/categoryController');
const { verifyToken } = require('../middlewares/authMiddleware');
require('dotenv').config();

router.get(`/api/v1/${process.env.secretKey}/categories`, categoryController.getAllCategories);
router.get(`/api/v1/${process.env.secretKey}/categoriesData`, categoryController.getCategoriesData);
router.get(`/api/v1/${process.env.secretKey}/menuItems`, categoryController.getMenuItems);
router.post(`/api/v1/${process.env.secretKey}/categories/add`, verifyToken, categoryController.addCategory);
router.post(`/api/v1/${process.env.secretKey}/categories/edit`, verifyToken, categoryController.editCategory);

module.exports = router;