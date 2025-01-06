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
const mysql = require('mysql2');
const { resolve } = require("path");

const app = express();
const cors = require('cors');
const port = 3001;

const host = process.env.DB_HOST;
const user = process.env.DB_USER;
const pass = process.env.DB_PASSWORD;
const secretKey = process.env.secretKey;

const maxRetries = 5;
let attempts = 0;

const Stripe = require('stripe');
const stripe = Stripe('sk_test_51QRNKlGVqOlbWdKNOt6ee3r4mPRAYIqGGPykMoiBnZTWUkSZ2wPs7MnyD3st6y2mXb6EJjXQk22f4pVtZ388YdoS00lrrHHmEG');

const connection = mysql.createConnection({
    host: host,
    user: user,
    password: pass,
    database: 'u637683078_laris_acc',
    ssl: {
        rejectUnauthorized: false,
    },
    connectionLimit: 50,
    waitForConnections: true
});

connection.connect((err) => {
    if (err) {
        if (attempts < maxRetries) {
            console.log(`Connection failed, retrying... (${attempts + 1})`);
            attempts++;
            setTimeout(connectToDatabase, 3000);  // Retry after 3 seconds
        } else {
            console.error('Max retries reached, could not connect to the database');
        }
    } else {
        console.log('Connected to the database');
    }
});

app.use(express.json());
app.use(cors());

//*?//
//Stripe Pagamentos

app.get("/", (req, res) => {
    const path = resolve("./index.html");
    res.sendFile(path);
});

app.get("/config", (req, res) => {
    res.send({
        publishableKey: process.env.STRIPE_PUBLISHABLE_KEY,
    });
});

app.post("/create-payment-intent", async (req, res) => {
    try {
        const paymentIntent = await stripe.paymentIntents.create({
            currency: "EUR",
            amount: 1999,
            automatic_payment_methods: { enabled: true },
        });

        res.send({
            clientSecret: paymentIntent.client_secret,
        });
    } catch (e) {
        return res.status(400).send({
            error: {
                message: e.message,
            },
        });
    }
});

app.get(`/api/v1/${secretKey}/admins`, (req, res) => {
    connection.query('SELECT * FROM administradores', (err, result) => {
        if (err) {
            res.status(500).json({ error: 'Erro ao obter dados' });
        } else {
            res.json(result);
        }
    })
});

//REQUISIÇÃO PLANILHAS

app.get(`/api/v1/${secretKey}/planilha-despesas`, (req, res) => {
    connection.query('SELECT * FROM `planilha-despesas`', (err, result) => {
        if (err) {
            res.status(500).json({ error: 'Erro ao obter dados' });
        } else {
            res.json(result);
        }
    })
});

app.get(`/api/v1/${secretKey}/planilha-itens`, (req, res) => {
    connection.query('SELECT * FROM `planilha-itens`', (err, result) => {
        if (err) {
            res.status(500).json({ error: 'Erro ao obter dados' });
        } else {
            res.json(result);
        }
    })
});


//POSTS NA PLANILHA DESPESA

app.post(`/api/v1/${secretKey}/planilha-despesas/add`, (req, res) => {
    const item = req.body
    connection.query('INSERT INTO `planilha-despesas` (descricao, valor, tipo) VALUES (?, ?, ?)', [item.descricao, item.valor, item.tipo], (err, result) => {
        if (err) {
            console.error(err);  // Log the error for debugging
            res.status(500).json({ error: 'Erro ao obter dados' });
        } else {
            res.status(200).json({ message: 'Item adicionado com sucesso' });
        }
    });
});

app.post(`/api/v1/${secretKey}/planilha-despesas/edit`, (req, res) => {
    const item = req.body
    connection.query('update `planilha-despesas` set descricao = ?, valor = ?, tipo = ? where id = ?', [item.descricao, item.valor, item.tipo, item.id], (err, result) => {
        if (err) {
            console.error(err);  // Log the error for debugging
            res.status(500).json({ error: 'Erro ao obter dados' });
        } else {
            res.status(200).json({ message: 'Item editado com sucesso' });
        }
    });
});

app.post(`/api/v1/${secretKey}/planilha-despesas/delete`, (req, res) => {
    const item = req.body
    connection.query('delete from `planilha-despesas` where id = ?', [item.id], (err, result) => {
        if (err) {
            console.error(err);  // Log the error for debugging
            res.status(500).json({ error: 'Erro ao obter dados' });
        } else {
            res.status(200).json({ message: 'Item deletado com sucesso' });
        }
    });
});

//POSTS NA PLANILHA ITEMS

app.post(`/api/v1/${secretKey}/planilha-itens/add`, (req, res) => {
    const item = req.body
    connection.query('INSERT INTO `planilha-itens` (id, custos, detalhe, codigo, nameofitem, preco_compra, precorevenda, quantcompra, lucroporitem) VALUES (default, ?, ?, ?, ?, ?, ?, ?, ?)', [item.custos, item.detalhe, item.codigo, item.nameofitem, item.preco_compra, item.precorevenda, item.quantcompra, item.lucroporitem], (err, result) => {
        if (err) {
            console.error(err);  // Log the error for debugging
            res.status(500).json({ error: 'Erro ao obter dados' });
        } else {
            res.status(200).json({ message: 'Item adicionado com sucesso' });
        }
    });
});

app.post(`/api/v1/${secretKey}/planilha-itens/edit`, (req, res) => {
    const item = req.body
    connection.query('update `planilha-itens` set custos = ?, detalhe = ?, codigo = ?, nameofitem = ?, preco_compra = ?, precorevenda = ?, quantcompra = ?, lucroporitem = ? where id = ?', [item.custos, item.detalhe, item.codigo, item.nameofitem, item.preco_compra, item.precorevenda, item.quantcompra, item.lucroporitem, item.id], (err, result) => {
        if (err) {
            console.error(err);  // Log the error for debugging
            res.status(500).json({ error: 'Erro ao obter dados' });
        } else {
            res.status(200).json({ message: 'Item editado com sucesso' });
        }
    });
});

app.post(`/api/v1/${secretKey}/planilha-itens/delete`, (req, res) => {
    const item = req.body
    connection.query('delete from `planilha-itens` where id = ?', [item.id], (err, result) => {
        if (err) {
            console.error(err);  // Log the error for debugging
            res.status(500).json({ error: 'Erro ao obter dados' });
        } else {
            res.status(200).json({ message: 'Item deletado com sucesso' });
        }
    });
});


//SERVIDOR METAS

app.get(`/api/v1/${secretKey}/metas`, (req, res) => {
    connection.query('SELECT * FROM `metas`', (err, result) => {
        if (err) {
            res.status(500).json({ error: 'Erro ao obter dados' });
        } else {
            res.json(result);
        }
    })
});

//REQUISIÇÃO DE PLANEJAMENTOS

app.get(`/api/v1/${secretKey}/planejamentos`, (req, res) => {
    connection.query('SELECT * FROM `planejamentos`', (err, result) => {
        if (err) {
            res.status(500).json({ error: 'Erro ao obter dados' });
        } else {
            res.json(result);
        }
    })
});

//POSTS PLANEJAMENTOS

app.post(`/api/v1/${secretKey}/planejamentos/add`, (req, res) => {
    const item = req.body
    connection.query('insert into planejamentos values (default, "[]", ?)', [item.name_card], (err, result) => {
        if (err) {
            console.error(err);  // Log the error for debugging
            res.status(500).json({ error: 'Erro ao obter dados' });
        } else {
            res.status(200).json({ message: 'Produto cadastrado com sucesso' });
        }
    });
});

app.post(`/api/v1/${secretKey}/planejamentos/update`, (req, res) => {
    const item = req.body;
    const contentCardValue = JSON.stringify(item.list);  // Convert array to JSON string

    connection.query("UPDATE planejamentos SET content_card = ? WHERE id = ?", [contentCardValue, item.id], (err, result) => {
        if (err) {
            console.error(err);  // Log the error for debugging
            res.status(500).json({ error: 'Erro ao obter dados' });
        } else {
            res.status(200).json({ message: 'Update no Planejamento' });
        }
    });
});


app.post(`/api/v1/${secretKey}/planejamentos/delete`, (req, res) => {
    const item = req.body
    connection.query('delete from planejamentos where id = ?', [item.id], (err, result) => {
        if (err) {
            console.error(err);  // Log the error for debugging
            res.status(500).json({ error: 'Erro ao obter dados' });
        } else {
            res.status(200).json({ message: 'Item planejamentos deletado com sucesso' });
        }
    });
});

//REQUISIÇÃO DE USUARIOS

app.get(`/api/v1/${secretKey}/users`, (req, res) => {
    connection.query('SELECT * FROM users', (err, result) => {
        if (err) {
            res.status(500).json({ error: 'Erro ao obter dados' });
        } else {
            res.json(result);
        }
    })
});

//POSTS DE USUARIOS

app.post(`/api/v1/${secretKey}/users/add`, (req, res) => {
    const item = req.body
    connection.query(
        'INSERT INTO users VALUES (default, "client", ?, ?, ?, ?, "https://laris-acessorios.vercel.app/static/media/user-null.webp", "[]", "[]")',
        [item.uid, item.nome_completo, item.cpf, item.email], (err, result) => {
            if (err) {
                console.error(err);  // Log the error for debugging
                res.status(500).json({ error: 'Erro ao obter dados' });
            } else {
                res.status(200).json({ message: 'Usuário criado com sucesso' });
            }
        });
});


//REQUISIÇÃO DE PRODUTOS

app.get(`/api/v1/${secretKey}/products`, (req, res) => {
    connection.query('SELECT * FROM produtos', (err, result) => {
        if (err) {
            res.status(500).json({ error: 'Erro ao obter dados' });
        } else {
            res.json(result);
        }
    })
});

//POSTS DE PRODUTOS

app.post(`/api/v1/${secretKey}/products/add`, (req, res) => {
    const item = req.body
    connection.query('insert into produtos values (default, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [item.name_product, item.price, item.desconto, item.disponibilidade, item.tamanhos, item.quantidade_disponivel, item.categoria, item.url, item.fornecedor, item.tipo, item.personalizavel, item.photoURL, item.extensor], (err, result) => {
        if (err) {
            console.error(err);  // Log the error for debugging
            res.status(500).json({ error: 'Erro ao obter dados' });
        } else {
            res.status(200).json({ message: 'Produto cadastrado com sucesso' });
        }
    });
});

app.post(`/api/v1/${secretKey}/products/searchbyurl`, (req, res) => {
    const item = req.body;
    const url = item.url;

    // Realiza a consulta no banco de dados para encontrar o produto com a URL fornecida
    connection.query('SELECT * FROM produtos WHERE url = ?', [url], (err, result) => {
        if (err) {
            res.status(500).json({ error: 'Erro ao obter dados' });
        } else if (result.length > 0) {
            res.json(result[0]);  // Retorna o primeiro produto encontrado
        } else {
            res.status(404).json({ message: 'Produto não encontrado' });
        }
    });
});


//REQUISIÇÃO DE ORDERS

app.get(`/api/v1/${secretKey}/orders`, (req, res) => {
    connection.query('SELECT * FROM orders', (err, result) => {
        if (err) {
            res.status(500).json({ error: 'Erro ao obter dados' });
        } else {
            res.json(result);
        }
    })
});

//POSTS DE ORDERS

app.post(`/api/v1/${secretKey}/orders/add`, (req, res) => {
    const item = req.body
    connection.query('insert into orders values (default, ?, ?, ?, ?, default, ?, default, ?, ?, ?, ?, ?)', [item.address, item.items, item.user, item.totalprice, item.paymentOption, item.situation, item.desconto, item.subtotal, item.cupom_desconto, item.cupons], (err, result) => {
        if (err) {
            console.error(err);  // Log the error for debugging
            res.status(500).json({ error: 'Erro ao obter dados' });
        } else {
            res.status(200).json({ message: 'Pedido cadastrado com sucesso' });
        }
    });
});

//DELETE DE ORDERS

app.post(`/api/v1/${secretKey}/orders/delete`, (req, res) => {
    const item = req.body
    connection.query('delete from orders where id = ?;', [item.id], (err, result) => {
        if (err) {
            console.error(err);  // Log the error for debugging
            res.status(500).json({ error: 'Erro ao obter dados' });
        } else {
            res.status(200).json({ message: 'Pedido cadastrado com sucesso' });
        }
    });
});

//REQUISIÇÃO DE CUPONS

app.get(`/api/v1/${secretKey}/cupons`, (req, res) => {
    connection.query('SELECT * FROM cupons', (err, result) => {
        if (err) {
            res.status(500).json({ error: 'Erro ao obter dados' });
        } else {
            res.json(result);
        }
    })
});

app.post(`/api/v1/${secretKey}/cupons/add`, (req, res) => {
    const item = req.body
    connection.query(`INSERT INTO cupons VALUES ( DEFAULT, ?, ?, DEFAULT, ?, 'cupom-image-wrapper.webp', DEFAULT, NULL, 0, ? )`, [item.uniqueKey, item.name, item.desconto, item.private], (err, result) => {
        if (err) {
            console.error(err);  // Log the error for debugging
            res.status(500).json({ error: 'Erro ao obter dados' });
        } else {
            res.status(200).json({ message: 'Cupom adicionado com sucesso' });
        }
    });
});

app.post(`/api/v1/${secretKey}/cupons/remove`, (req, res) => {
    const item = req.body
    connection.query(`DELETE FROM cupons WHERE ID = ?`, [item.id], (err, result) => {
        if (err) {
            console.error(err);  // Log the error for debugging
            res.status(500).json({ error: 'Erro ao obter dados' });
        } else {
            res.status(200).json({ message: 'Cupom adicionado com sucesso' });
        }
    });
});

app.post(`/api/v1/${secretKey}/cupons/myaccount/add`, (req, res) => {
    const item = req.body
    connection.query('UPDATE `users` SET cupons = ?, cupons_usados = ? WHERE uid = ? ', [item.cupons, item.cupom_usado, item.user_uid], (err, result) => {
        if (err) {
            console.error(err);  // Log the error for debugging
            res.status(500).json({ error: 'Erro ao obter dados' });
        } else {
            res.status(200).json({ message: 'Cupom adicionado na conta com sucesso' });
        }
    });
});


app.post(`/api/v1/${secretKey}/products/edit`, (req, res) => {
    const item = req.body
    connection.query('update `produtos` set name_product = ?, price = ?, desconto = ?, disponibilidade = ?, categoria = ?, url = ?, quantidade_disponivel = ?, extensor = ? where id = ?', [item.name_product, item.price, item.desconto, item.disponibilidade, item.categoria, item.url, item.quantidade_disponivel, item.extensor, item.id], (err, result) => {
        if (err) {
            console.error(err);  // Log the error for debugging
            res.status(500).json({ error: 'Erro ao obter dados' });
        } else {
            res.status(200).json({ message: 'Produto editado com sucesso' });
        }
    });
});

app.post(`/api/v1/${secretKey}/products/delete`, (req, res) => {
    const item = req.body
    connection.query('delete from `produtos` where id = ?', [item.id], (err, result) => {
        if (err) {
            console.error(err);  // Log the error for debugging
            res.status(500).json({ error: 'Erro ao obter dados' });
        } else {
            res.status(200).json({ message: 'Produto deletado com sucesso' });
        }
    });
});


app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});