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
const { authMiddleware } = require('../middlewares/authMiddleware');
require('dotenv').config();

router.get(`/api/v1/${process.env.secretKey}/planilha-despesas`, authMiddleware, sheetController.getPlanilhaDespesas);
router.get(`/api/v1/${process.env.secretKey}/planilha-itens`, authMiddleware, sheetController.getPlanilhaItens);
router.get(`/api/v1/${process.env.secretKey}/metas`, sheetController.getMetas);
router.get(`/api/v1/${process.env.secretKey}/planejamentos`, authMiddleware, sheetController.getPlanejamentos);

router.post(`/api/v1/${process.env.secretKey}/planilha-despesas/add`, authMiddleware, sheetController.addDespesa);
router.post(`/api/v1/${process.env.secretKey}/planilha-despesas/edit`, authMiddleware, sheetController.editDespesa);
router.post(`/api/v1/${process.env.secretKey}/planilha-despesas/delete`, authMiddleware, sheetController.deleteDespesa);
router.post(`/api/v1/${process.env.secretKey}/planilha-itens/add`, authMiddleware, sheetController.addItemPlanilha);
router.post(`/api/v1/${process.env.secretKey}/planilha-itens/edit`, authMiddleware, sheetController.editItemPlanilha);
router.post(`/api/v1/${process.env.secretKey}/planilha-itens/delete`, authMiddleware, sheetController.deleteItemPlanilha);
router.post(`/api/v1/${process.env.secretKey}/planejamentos/add`, authMiddleware, sheetController.addPlanejamento);
router.post(`/api/v1/${process.env.secretKey}/planejamentos/update`, authMiddleware, sheetController.updatePlanejamento);
router.post(`/api/v1/${process.env.secretKey}/planejamentos/delete`, authMiddleware, sheetController.deletePlanejamento);

module.exports = router;