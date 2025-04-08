/**
 * Creation Date: 27/12/2023
 * Author: Vinícius da Silva Santos
 * Coordinator: Larissa Alves de Andrade Moreira
 * Developed by: Lari's Acessórios Team
 * Copyright 2023, LARI'S ACESSÓRIOS
 * All rights are reserved. Reproduction in whole or part is prohibited without the written consent of the copyright owner.
*/

require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

// Importando rotas
const authRoutes = require('./routes/authRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const couponRoutes = require('./routes/couponRoutes');
const facilityRoutes = require('./routes/facilityRoutes');
const orderRoutes = require('./routes/orderRoutes');
const sheetRoutes = require('./routes/sheetRoutes');
const productRoutes = require('./routes/productRoutes');
const shippingRoutes = require('./routes/shippingRoutes');
const stripeRoutes = require('./routes/stripeRoutes');
const userRoutes = require('./routes/userRoutes');

// Importando configurações do banco
const { connectToDatabase } = require('./config/database');

const app = express();
const port = process.env.PORT || 3001;

// Configurações de CORS e body parser
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

// Conectar ao banco de dados
connectToDatabase();

// Configuração de rotas
app.use('/', authRoutes);
app.use('/', categoryRoutes);
app.use('/', couponRoutes);
app.use('/', facilityRoutes);
app.use('/', orderRoutes);
app.use('/', sheetRoutes);
app.use('/', productRoutes);
app.use('/', shippingRoutes);
app.use('/', stripeRoutes);
app.use('/', userRoutes);

// Rota inicial
app.get("/", (req, res) => {
    res.sendFile(path.resolve("./index.html"));
});

// Rota para arquivos estáticos (se necessário)
app.use(express.static(path.join(__dirname, 'public')));

// Middleware para tratamento de erros 404
app.use((req, res, next) => {
    res.status(404).json({ message: 'Rota não encontrada' });
});

// Middleware para tratamento de erros globais
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Erro interno do servidor' });
});

// Iniciar servidor
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
    console.log('----------------------------------------------------');
    console.log('LARIS ACESSÓRIOS - PRINCIPAL API');
    console.log(`-> Documentation: http://localhost:${port}`);
    console.log('----------------------------------------------------');
    console.log('Server is running and waiting for requests...');
});