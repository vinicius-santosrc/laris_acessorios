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
const bodyParser = require('body-parser');

const app = express();
const cors = require('cors');
const port = 3001;

const host = process.env.DB_HOST;
const user = process.env.DB_USER;
const pass = process.env.DB_PASSWORD;
const secretKey = process.env.secretKey;
const databaseKey = process.env.database;
const bearerTokenMelhorEnvio = process.env.bearerTokenMelhorEnvio;

const maxRetries = 5;
let attempts = 0;

const Stripe = require('stripe');
const stripe = Stripe(process.env.STRIPE_SECRET_KEY_PRODUCTION); //use STRIPE_SECRET_KEY_PRODUCTION para producao

const pool = mysql.createPool({
    host: host,
    user: user,
    password: pass,
    database: databaseKey,
    ssl: {
        rejectUnauthorized: false,
    },
    connectionLimit: 50,
    waitForConnections: true
});

const verifyToken = (req, res, next) => {
    const token = req.headers['authorization'];

    if (!token) {
        return res.status(403).json({ message: 'Token não fornecido' });
    }

    if (token != process.env.bearerTokenForLaris) {
        return res.status(401).json({ message: 'Token inválido' });
    }
    next();

};

const connectToDatabase = () => {
    pool.query((err) => {
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
};

connectToDatabase();  // Call the connection function on start


app.use(express.json({ limit: '50mb' })); // Aumenta o limite para 50MB
app.use(express.urlencoded({ limit: '50mb', extended: true })); // Para dados de formulário
app.use(cors());

app.use(bodyParser.json({ limit: '50mb' })); // Aumenta o limite para 50MB
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

//*?//
//Stripe Pagamentos

app.get("/", (req, res) => {
    const path = resolve("./index.html");
    res.sendFile(path);
});

app.get("/config", (req, res) => {
    res.send({
        publishableKey: process.env.STRIPE_PUBLISHABLE_KEY_PRODUCTION, // use STRIPE_PUBLISHABLE_KEY_PRODUCTION para produção
    });
});

// Endpoint para criar o PaymentIntent
app.post("/create-payment-intent", async (req, res) => {
    try {
        const { item, paymentMethodType } = req.body; // Receber o valor e tipo de pagamento

        const amount = item; // O valor que será cobrado, em centavos

        // Configuração inicial do PaymentIntent
        const paymentIntentParams = {
            amount: amount,
            currency: 'brl',
            payment_method_types: ['card'], // Permitir métodos de pagamento automáticos (cartão, pix, etc)
        };

        // Se o tipo de pagamento for "card", habilitar parcelamento
        if (paymentMethodType === 'card') {
            paymentIntentParams.payment_method_types = ['card'];
            paymentIntentParams.payment_intent_options = {
                installments: {
                    enabled: true,
                    maximum_installments: 4, // Permitir até 4 vezes de parcelamento
                },
            };
        }

        // Criar o PaymentIntent
        const paymentIntent = await stripe.paymentIntents.create(paymentIntentParams);

        // Retornar o client_secret para o front-end
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
    pool.query('SELECT * FROM administradores', (err, result) => {
        if (err) {
            res.status(500).json({ error: 'Erro ao obter dados' });
        } else {
            res.json(result);
        }
    })
});

//REQUISIÇÃO PLANILHAS

app.get(`/api/v1/${secretKey}/planilha-despesas`, verifyToken, (req, res) => {
    pool.query('SELECT * FROM `planilha-despesas`', (err, result) => {
        if (err) {
            res.status(500).json({ error: 'Erro ao obter dados' });
        } else {
            res.json(result);
        }
    })
});

app.get(`/api/v1/${secretKey}/planilha-itens`, verifyToken, (req, res) => {
    pool.query('SELECT * FROM `planilha-itens`', (err, result) => {
        if (err) {
            res.status(500).json({ error: 'Erro ao obter dados' });
        } else {
            res.json(result);
        }
    })
});


//POSTS NA PLANILHA DESPESA

app.post(`/api/v1/${secretKey}/planilha-despesas/add`, verifyToken, (req, res) => {
    const item = req.body
    pool.query('INSERT INTO `planilha-despesas` (descricao, valor, tipo) VALUES (?, ?, ?)', [item.descricao, item.valor, item.tipo], (err, result) => {
        if (err) {
            console.error(err);  // Log the error for debugging
            res.status(500).json({ error: 'Erro ao obter dados' });
        } else {
            res.status(200).json({ message: 'Item adicionado com sucesso' });
        }
    });
});

app.post(`/api/v1/${secretKey}/planilha-despesas/edit`, verifyToken, (req, res) => {
    const item = req.body
    pool.query('update `planilha-despesas` set descricao = ?, valor = ?, tipo = ? where id = ?', [item.descricao, item.valor, item.tipo, item.id], (err, result) => {
        if (err) {
            console.error(err);  // Log the error for debugging
            res.status(500).json({ error: 'Erro ao obter dados' });
        } else {
            res.status(200).json({ message: 'Item editado com sucesso' });
        }
    });
});

app.post(`/api/v1/${secretKey}/planilha-despesas/delete`, verifyToken, (req, res) => {
    const item = req.body
    pool.query('delete from `planilha-despesas` where id = ?', [item.id], (err, result) => {
        if (err) {
            console.error(err);  // Log the error for debugging
            res.status(500).json({ error: 'Erro ao obter dados' });
        } else {
            res.status(200).json({ message: 'Item deletado com sucesso' });
        }
    });
});

//POSTS NA PLANILHA ITEMS

app.post(`/api/v1/${secretKey}/planilha-itens/add`, verifyToken, (req, res) => {
    const item = req.body
    pool.query('INSERT INTO `planilha-itens` (id, custos, detalhe, codigo, nameofitem, preco_compra, precorevenda, quantcompra, lucroporitem) VALUES (default, ?, ?, ?, ?, ?, ?, ?, ?)', [item.custos, item.detalhe, item.codigo, item.nameofitem, item.preco_compra, item.precorevenda, item.quantcompra, item.lucroporitem], (err, result) => {
        if (err) {
            console.error(err);  // Log the error for debugging
            res.status(500).json({ error: 'Erro ao obter dados' });
        } else {
            res.status(200).json({ message: 'Item adicionado com sucesso' });
        }
    });
});

app.post(`/api/v1/${secretKey}/planilha-itens/edit`, verifyToken, (req, res) => {
    const item = req.body
    pool.query('update `planilha-itens` set custos = ?, detalhe = ?, codigo = ?, nameofitem = ?, preco_compra = ?, precorevenda = ?, quantcompra = ?, lucroporitem = ? where id = ?', [item.custos, item.detalhe, item.codigo, item.nameofitem, item.preco_compra, item.precorevenda, item.quantcompra, item.lucroporitem, item.id], (err, result) => {
        if (err) {
            console.error(err);  // Log the error for debugging
            res.status(500).json({ error: 'Erro ao obter dados' });
        } else {
            res.status(200).json({ message: 'Item editado com sucesso' });
        }
    });
});

app.post(`/api/v1/${secretKey}/planilha-itens/delete`, verifyToken, (req, res) => {
    const item = req.body
    pool.query('delete from `planilha-itens` where id = ?', [item.id], (err, result) => {
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
    pool.query('SELECT * FROM `metas`', (err, result) => {
        if (err) {
            res.status(500).json({ error: 'Erro ao obter dados' });
        } else {
            res.json(result);
        }
    })
});

//REQUISIÇÃO DE PLANEJAMENTOS

app.get(`/api/v1/${secretKey}/planejamentos`, verifyToken, (req, res) => {
    pool.query('SELECT * FROM `planejamentos`', (err, result) => {
        if (err) {
            res.status(500).json({ error: 'Erro ao obter dados' });
        } else {
            res.json(result);
        }
    })
});

//POSTS PLANEJAMENTOS

app.post(`/api/v1/${secretKey}/planejamentos/add`, verifyToken, (req, res) => {
    const item = req.body
    pool.query('insert into planejamentos values (default, "[]", ?)', [item.name_card], (err, result) => {
        if (err) {
            console.error(err);  // Log the error for debugging
            res.status(500).json({ error: 'Erro ao obter dados' });
        } else {
            res.status(200).json({ message: 'Produto cadastrado com sucesso' });
        }
    });
});

app.post(`/api/v1/${secretKey}/planejamentos/update`, verifyToken, (req, res) => {
    const item = req.body;
    const contentCardValue = JSON.stringify(item.list);  // Convert array to JSON string

    pool.query("UPDATE planejamentos SET content_card = ? WHERE id = ?", [contentCardValue, item.id], (err, result) => {
        if (err) {
            console.error(err);  // Log the error for debugging
            res.status(500).json({ error: 'Erro ao obter dados' });
        } else {
            res.status(200).json({ message: 'Update no Planejamento' });
        }
    });
});


app.post(`/api/v1/${secretKey}/planejamentos/delete`, verifyToken, (req, res) => {
    const item = req.body
    pool.query('delete from planejamentos where id = ?', [item.id], (err, result) => {
        if (err) {
            console.error(err);  // Log the error for debugging
            res.status(500).json({ error: 'Erro ao obter dados' });
        } else {
            res.status(200).json({ message: 'Item planejamentos deletado com sucesso' });
        }
    });
});

//REQUISIÇÃO DE USUARIOS

app.post(`/api/v1/${secretKey}/user`, (req, res) => {
    const item = req.body
    pool.query('SELECT * FROM users WHERE email = ?', [item.email], (err, result) => {
        if (err) {
            res.status(500).json({ error: 'Erro ao obter dados' });
        } else {
            res.json(result);
        }
    })
});

//REQUISIÇÃO DE USUARIOS

app.get(`/api/v1/${secretKey}/users`, (req, res) => {
    pool.query('SELECT * FROM users', (err, result) => {
        if (err) {
            res.status(500).json({ error: 'Erro ao obter dados' });
        } else {
            res.json(result);
        }
    })
});

//POSTS DE USUARIOS

app.post(`/api/v1/${secretKey}/users/add`, verifyToken, (req, res) => {
    const item = req.body
    pool.query(
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
    pool.query('SELECT id, name_product, price, desconto, disponibilidade, tamanhos, quantidade_disponivel, categoria, url, tipo, photoURL, extensor, type_full_label, categoryList, description, type FROM produtos', (err, result) => {
        if (err) {
            res.status(500).json({ error: 'Erro ao obter dados' });
        } else {
            res.json(result);
        }
    })
});

//REQUISIÇÃO DE CATEGORIAS

app.get(`/api/v1/${secretKey}/categories`, (req, res) => {
    pool.query('SELECT * FROM categorys', (err, result) => {
        if (err) {
            res.status(500).json({ error: 'Erro ao obter dados' });
        } else {
            res.json(result);
        }
    })
});

app.get(`/api/v1/${secretKey}/categoriesData`, (req, res) => {
    pool.query('SELECT * FROM categories', (err, result) => {
        if (err) {
            res.status(500).json({ error: 'Erro ao obter dados' });
        } else {
            res.json(result);
        }
    })
});

app.get(`/api/v1/${secretKey}/menuItems`, (req, res) => {
    pool.query('SELECT * FROM menu_items', (err, result) => {
        if (err) {
            res.status(500).json({ error: 'Erro ao obter dados' });
        } else {
            res.json(result);
        }
    })
});

app.get(`/api/v1/${secretKey}/facilitys`, (req, res) => {
    pool.query(`SELECT * FROM facilitys`, (err, result) => {
        if (err) {
            res.status(500).json({ error: "Erro ao obter facilitys" });
        }
        else {
            res.json(result);
        }
    })
})

app.post(`/api/v1/${secretKey}/facilitys/edit`, verifyToken, (req, res) => {
    const item = req.body
    pool.query(
        'UPDATE facilitys SET data = ?, dataMobile = ? WHERE id = ?', [item.data, item.dataMobile, item.id], (err, result) => {
            if (err) {
                console.error(err);  // Log the error for debugging
                res.status(500).json({ error: 'Erro ao obter dados' });
            } else {
                res.status(200).json({ message: 'Facility editado com sucesso' });
            }
        });
});

app.post(`/api/v1/${secretKey}/categories/edit`, verifyToken, (req, res) => {
    const item = req.body
    pool.query(
        'UPDATE categories SET highlightText = ?, highlightDescription = ?, highlightImage = ?, urlLink = ? WHERE ID = ?', [item.highlightText, item.highlightDescription, item.highlightImage, item.urlLink, item.id], (err, result) => {
            if (err) {
                console.error(err);  // Log the error for debugging
                res.status(500).json({ error: 'Erro ao obter dados' });
            } else {
                res.status(200).json({ message: 'Categoria editada com sucesso' });
            }
        });
});

app.post(`/api/v1/${secretKey}/categories/add`, verifyToken, (req, res) => {
    const item = req.body;

    // Primeiro INSERT para a tabela de categorias
    pool.query(`INSERT INTO categorys (category) VALUES (?)`, [item.urlLink], (err, result) => {
        if (err) {
            console.error(err);
            console.log("Erro ao adicionar uma nova categoria: ", err);
            return res.status(500).json({ error: 'Erro ao salvar a categoria' });
        } else {
            console.log("Categoria adicionada com sucesso.");
        }
    });

    // Segundo INSERT para a tabela de categorias com os dados adicionais
    pool.query(`INSERT INTO categories (highlightText, highlightDescription, highlightImage, urlLink, products) VALUES (?, ?, ?, ?, '[]')`, [
        item.highlightText, item.highlightDescription, item.highlightImage, item.urlLink
    ], (err, result) => {
        if (err) {
            console.error(err);
            console.log("Erro ao adicionar dados adicionais da categoria: ", err);
            return res.status(500).json({ error: 'Erro ao salvar os dados da categoria' });
        } else {
            return res.status(200).json({ message: 'Página da Categoria cadastrada com sucesso' });
        }
    });

    //Terceiro INSERT para a tabela de categorias no Header
    pool.query(`INSERT INTO menu_items (title, is_link, href, sub_items) VALUES 
        (?, TRUE, "/collections/" ?, NULL);`, [
        item.highlightText, item.urlLink
    ], (err, result) => {
        if (err) {
            console.error(err);
            console.log("Erro ao adicionar dados adicionais da categoria: ", err);
            return res.status(500).json({ error: 'Erro ao salvar os dados da categoria' });
        } else {
            return res.status(200).json({ message: 'Header da categoria cadastrada com sucesso' });
        }
    });

});
//POSTS DE PRODUTOS

// Endpoint para adicionar um produto
app.post(`/api/v1/${secretKey}/products/add`, verifyToken, (req, res) => {
    const item = req.body;

    // Inserindo a foto como base64 diretamente no banco
    pool.query('insert into produtos values (default, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, DEFAULT)', [
        item.name_product,
        item.price,
        item.desconto,
        item.disponibilidade,
        item.tamanhos,
        item.quantidade_disponivel,
        item.categoria,
        item.url,
        item.fornecedor,
        item.tipo,
        item.personalizavel,
        item.photoURL,  // Armazenando base64 aqui
        item.extensor,
        item.type_full_label,
        item.categoryList,
        item.description,
        item.type
    ], (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Erro ao salvar o produto' });
        } else {
            res.status(200).json({ message: 'Produto cadastrado com sucesso' });
        }
    });
});


app.post(`/api/v1/${secretKey}/products/searchbyurl`, (req, res) => {
    const item = req.body;
    const url = item.url;

    // Realiza a consulta no banco de dados para encontrar o produto com a URL fornecida
    pool.query('SELECT * FROM produtos WHERE url = ?', [url], (err, result) => {
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
    pool.query('SELECT * FROM orders', (err, result) => {
        if (err) {
            res.status(500).json({ error: 'Erro ao obter dados' });
        } else {
            console.log("Consultando pedidos ")
            res.json(result);
        }
    })
});

app.post(`/api/v1/${secretKey}/getOrderById`, (req, res) => {
    const item = req.body;
    pool.query('SELECT * FROM orders WHERE id = ?', [item.id], (err, result) => {
        if (err) {
            res.status(500).json({ error: 'Erro ao obter dados' });
        } else {
            console.log("Consultando pedidos do id", item.id)
            res.json(result);
        }
    })
});

//POSTS DE ORDERS

app.post(`/api/v1/${secretKey}/orders/add`, verifyToken, (req, res) => {
    const item = req.body;

    pool.query(
        'INSERT INTO orders VALUES (default, ?, ?, ?, ?, ?, default, ?, default, ?, ?, ?, ?, ?)',
        [item.uid, item.address, item.items, item.user, item.totalprice, item.paymentOption, item.situation, item.desconto, item.subtotal, item.cupom_desconto, item.cupons],
        (err, result) => {
            if (err) {
                console.error(err);
                res.status(500).json({ error: 'Erro ao criar pedido:', err });
            } else {
                console.log("Novo pedido cadastrado com sucesso.");
                res.status(200).json({ message: 'Pedido cadastrado com sucesso' });
            }
        }
    );

});

//UPDATE DE ORDERS

app.post(`/api/v1/${secretKey}/orders/edit`, verifyToken, (req, res) => {
    const item = req.body;

    pool.query(
        'UPDATE `orders` SET ' +
        'state = ?, ' +
        'situation = ?, ' +
        'codigoRastreio = ? ' +
        'WHERE id = ?',
        [item.state, item.situation, item.codigoRastreio, item.id],
        (err, result) => {
            if (err) {
                console.error(err);
                res.status(500).json({ error: 'Erro ao criar pedido:', err });
            } else {
                console.log("Order " + item.id + " editada com sucesso para estado: " + item.state);
                res.status(200).json({ message: 'Order  com sucesso' });
            }
        }
    );

});

//DELETE DE ORDERS

app.post(`/api/v1/${secretKey}/orders/delete`, verifyToken, (req, res) => {
    const item = req.body
    pool.query('delete from orders where id = ?;', [item.id], (err, result) => {
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
    pool.query('SELECT * FROM cupons', (err, result) => {
        if (err) {
            res.status(500).json({ error: 'Erro ao obter dados' });
        } else {
            res.json(result);
        }
    })
});

app.post(`/api/v1/${secretKey}/cupons/add`, verifyToken, (req, res) => {
    const item = req.body
    pool.query(`INSERT INTO cupons VALUES ( DEFAULT, ?, ?, DEFAULT, ?, 'cupom-image-wrapper.webp', DEFAULT, NULL, 0, ? )`, [item.uniqueKey, item.name, item.desconto, item.private], (err, result) => {
        if (err) {
            console.error(err);  // Log the error for debugging
            res.status(500).json({ error: 'Erro ao obter dados' });
        } else {
            res.status(200).json({ message: 'Cupom adicionado com sucesso' });
        }
    });
});

app.post(`/api/v1/${secretKey}/cupons/remove`, verifyToken, (req, res) => {
    const item = req.body
    pool.query(`DELETE FROM cupons WHERE ID = ?`, [item.id], (err, result) => {
        if (err) {
            console.error(err);  // Log the error for debugging
            res.status(500).json({ error: 'Erro ao obter dados' });
        } else {
            res.status(200).json({ message: 'Cupom adicionado com sucesso' });
        }
    });
});

app.post(`/api/v1/${secretKey}/cupons/myaccount/add`, verifyToken, (req, res) => {
    const item = req.body
    pool.query('UPDATE `users` SET cupons = ?, cupons_usados = ? WHERE uid = ? ', [item.cupons, item.cupom_usado, item.user_uid], (err, result) => {
        if (err) {
            console.error(err);  // Log the error for debugging
            res.status(500).json({ error: 'Erro ao obter dados' });
        } else {
            res.status(200).json({ message: 'Cupom adicionado na conta com sucesso' });
        }
    });
});


app.post(`/api/v1/${secretKey}/products/edit`, verifyToken, (req, res) => {
    const item = req.body
    pool.query('UPDATE `produtos` SET ' +
        'name_product = ?, ' +
        'price = ?, ' +
        'desconto = ?, ' +
        'disponibilidade = ?, ' +
        'tamanhos = ?, ' +
        'quantidade_disponivel = ?, ' +
        'categoria = ?, ' +
        'url = ?, ' +
        'fornecedor = ?, ' +
        'tipo = ?, ' +
        'personalizavel = ?, ' +
        'photoURL = ?, ' +
        'extensor = ?, ' +
        'type_full_label = ?, ' +
        'categoryList = ?, ' +
        'description = ?, ' +
        'type = ? ' +
        'WHERE id = ?',
        [
            item.name_product,
            item.price,
            item.desconto,
            item.disponibilidade,
            item.tamanhos,
            item.quantidade_disponivel,
            item.categoria,
            item.url,
            item.fornecedor,
            item.tipo,
            item.personalizavel,
            item.photoURL,
            item.extensor,
            item.type_full_label,
            item.categoryList,
            item.description,
            item.type,
            item.id
        ], (err, result) => {
            if (err) {
                console.error(err);  // Log the error for debugging
                res.status(500).json({ error: 'Erro ao obter dados' });
            } else {
                console.log("Product successfuly edited: ", item.id)
                res.status(200).json({ message: 'Produto editado com sucesso' });
            }
        });
});

app.post(`/api/v1/${secretKey}/products/delete`, verifyToken, (req, res) => {
    const item = req.body
    pool.query('delete from `produtos` where id = ?', [item.id], (err, result) => {
        if (err) {
            console.error(err);  // Log the error for debugging
            res.status(500).json({ error: 'Erro ao obter dados' });
        } else {
            res.status(200).json({ message: 'Produto deletado com sucesso' });
        }
    });
});

app.post(`/api/v1/${secretKey}/products/changevisibility`, verifyToken, (req, res) => {
    const item = req.body
    pool.query('update `produtos` set disponibilidade = ? where id = ?', [item.disponibilidade, item.id], (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Erro ao obter dados' });
        } else {
            res.status(200).json({ message: 'Produto mudado de visibilidade com sucesso' });
        }
    });
})

//SHIPPING 

app.post("/shipping/calculate", async (req, res) => {
    const body = req.body;
    const fromCep = "37558-610";
    const toCep = body.to.postal_code;

    try {
        const response = await fetch(`https://www.melhorenvio.com.br/api/v2/me/shipment/calculate?`, {
            headers: {
                "Authorization": `Bearer ${bearerTokenMelhorEnvio}`,
                "User-Agent": "Aplicação larisacessorios.loja@gmail.com"
            },
            method: "POST",
            body: JSON.stringify({
                "from": { "postal_code": fromCep },
                "to": { "postal_code": toCep },
                "package": {
                    "height": 2,
                    "width": 12,
                    "length": 17,
                    "weight": 0.25
                }
            })
        });
        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.error("Erro ao calcular frete:", error);
        res.status(500).json({ error: "Erro ao calcular frete." });
    }
});

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
    console.log('----------------------------------------------------');
    console.log('LARIS ACESSÓRIOS - PRINCIPAL API')
    console.log(`-> Documentation: http://localhost:${port}`)
    console.log('----------------------------------------------------');
    console.log('Server is running and waiting for requests...');
});