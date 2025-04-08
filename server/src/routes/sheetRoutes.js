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
const sheetController = require('../controllers/sheetController');
const { verifyToken } = require('../middlewares/authMiddleware');
require('dotenv').config();

router.get(`/api/v1/${process.env.secretKey}/planilha-despesas`, verifyToken, sheetController.getPlanilhaDespesas);
router.get(`/api/v1/${process.env.secretKey}/planilha-itens`, verifyToken, sheetController.getPlanilhaItens);
router.get(`/api/v1/${process.env.secretKey}/metas`, sheetController.getMetas);
router.get(`/api/v1/${process.env.secretKey}/planejamentos`, verifyToken, sheetController.getPlanejamentos);

router.post(`/api/v1/${process.env.secretKey}/planilha-despesas/add`, verifyToken, sheetController.addDespesa);
router.post(`/api/v1/${process.env.secretKey}/planilha-despesas/edit`, verifyToken, sheetController.editDespesa);
router.post(`/api/v1/${process.env.secretKey}/planilha-despesas/delete`, verifyToken, sheetController.deleteDespesa);
router.post(`/api/v1/${process.env.secretKey}/planilha-itens/add`, verifyToken, sheetController.addItemPlanilha);
router.post(`/api/v1/${process.env.secretKey}/planilha-itens/edit`, verifyToken, sheetController.editItemPlanilha);
router.post(`/api/v1/${process.env.secretKey}/planilha-itens/delete`, verifyToken, sheetController.deleteItemPlanilha);
router.post(`/api/v1/${process.env.secretKey}/planejamentos/add`, verifyToken, sheetController.addPlanejamento);
router.post(`/api/v1/${process.env.secretKey}/planejamentos/update`, verifyToken, sheetController.updatePlanejamento);
router.post(`/api/v1/${process.env.secretKey}/planejamentos/delete`, verifyToken, sheetController.deletePlanejamento);

module.exports = router;