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
const facilityController = require('../controllers/facilityController');
const { verifyToken } = require('../middlewares/authMiddleware');
require('dotenv').config();

router.get(`/api/v1/${process.env.secretKey}/facilitys`, facilityController.getFacilities);
router.post(`/api/v1/${process.env.secretKey}/facilitys/edit`, verifyToken, facilityController.editFacility);

module.exports = router;