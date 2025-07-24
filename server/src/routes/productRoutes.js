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
const productController = require('../controllers/productController');
const { authMiddleware } = require('../middlewares/authMiddleware');
require('dotenv').config();

router.get(`/api/v1/${process.env.secretKey}/products`, productController.getAllProducts);
router.post(`/api/v1/${process.env.secretKey}/products/searchbyurl`, productController.searchByUrl);
router.post(`/api/v1/${process.env.secretKey}/products/add`, authMiddleware, productController.addProduct);
router.post(`/api/v1/${process.env.secretKey}/products/edit`, authMiddleware, productController.editProduct);
router.post(`/api/v1/${process.env.secretKey}/products/delete`, authMiddleware, productController.deleteProduct);
router.post(`/api/v1/${process.env.secretKey}/products/changevisibility`, authMiddleware, productController.changeVisibility);

module.exports = router;