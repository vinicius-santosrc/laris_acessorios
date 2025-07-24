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
const helmet = require('helmet');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
morgan.token('remote-addr', (req) => req.ip);

// Importando rotas
const authRoutes = require('./src/routes/authRoutes');
const categoryRoutes = require('./src/routes/categoryRoutes');
const couponRoutes = require('./src/routes/couponRoutes');
const facilityRoutes = require('./src/routes/facilityRoutes');
const orderRoutes = require('./src/routes/orderRoutes');
const sheetRoutes = require('./src/routes/sheetRoutes');
const productRoutes = require('./src/routes/productRoutes');
const shippingRoutes = require('./src/routes/shippingRoutes');
const stripeRoutes = require('./src/routes/stripeRoutes');
const userRoutes = require('./src/routes/userRoutes');

// Importando configurações do banco
const { connectToDatabase } = require('./src/config/database');
const { runSystemChecks } = require('./src/system/index');

const app = express();
const port = process.env.PORT || 3001;

const allowedOrigins = [
    'http://localhost:3000',
    'https://www.larisacessorios.com.br',
    'http://larisacessorios.com.br',
    'https://staging-laris-acessorios-3-0.vercel.app',
    'https://api.larisacessorios.com.br',
    'http://localhost:3001',
];

app.use(cors({
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, origin);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

// Libera pré-flights (OPTIONS)
app.options('*', cors({
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, origin);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true
}));

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(helmet({
    contentSecurityPolicy: false,
}));
app.use(cookieParser());

app.use(morgan('REQUEST :method (:url) with status :status - Respponse time :response-time ms :remote-addr'));

// Conectar ao banco de dados
connectToDatabase();

//Verificações de códigos / Migrações 
runSystemChecks();

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
    res.sendFile(path.join(__dirname, 'src', 'index.html'));
});

// Servir arquivos estáticos
app.use(express.static(path.join(__dirname, 'src')));

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