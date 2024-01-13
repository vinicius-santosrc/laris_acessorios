require('dotenv').config();
const express = require('express');
const mysql = require('mysql2');

const app = express();
const cors = require('cors');
const port = 3001;


const host = process.env.DB_HOST;
const user = process.env.DB_USER;
const pass = process.env.DB_PASSWORD;


const connection = mysql.createConnection({
    host: host,
    user: user,
    password: pass,
    database: 'laris_acessorios',
    ssl: {
        rejectUnauthorized: false,
    },
})

app.use(express.json()); // Add this line for JSON body parsing
app.use(cors());

/*
app.get('/api/createproduto', (req, res) => {
    connection.query(`
        insert into produtos values
        (default, 'Anel Trançado', '35', '0', False, '["15"]', '0', 'PRATA', 'anel-trançado', 'Cypratas', 'Aneis', False, '["https://cloud.appwrite.io/v1/storage/buckets/651df9c4741bb296da03/files/652413808ffa3f53b313/view?project=651c17501139519bc5a2", "https://cloud.appwrite.io/v1/storage/buckets/651df9c4741bb296da03/files/65241380ce935cbec1e9/view?project=651c17501139519bc5a2", "https://cloud.appwrite.io/v1/storage/buckets/651df9c4741bb296da03/files/65241382209bedcb8b10/view?project=651c17501139519bc5a2"]', False)
    `, (err, res) => {
        if (err) {
            console.log(err)
        }
        else {
            console.log("SUCESSO")
        }
    })
})
*/

app.get(`/api/admins`, (req, res) => {
    connection.query('SELECT * FROM administradores', (err, result) => {
        if (err) {
            res.status(500).json({ error: 'Erro ao obter dados' });
        } else {
            res.json(result);
        }
    })
});

//REQUISIÇÃO PLANILHA DESPESA

app.get(`/api/planilha-despesas`, (req, res) => {
    console.log(req)
    connection.query('SELECT * FROM `planilha-despesas`', (err, result) => {
        if (err) {
            res.status(500).json({ error: 'Erro ao obter dados' });
        } else {
            res.json(result);
        }
    })
});

//POSTS NA PLANILHA DESPESA

app.post(`/api/planilha-despesas/add`, (req, res) => {
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

app.post(`/api/planilha-despesas/edit`, (req, res) => {
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

app.post(`/api/planilha-despesas/delete`, (req, res) => {
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

//SERVIDOR METAS

app.get(`/api/metas`, (req, res) => {
    connection.query('SELECT * FROM `metas`', (err, result) => {
        if (err) {
            res.status(500).json({ error: 'Erro ao obter dados' });
        } else {
            res.json(result);
        }
    })
});

//REQUISIÇÃO DE PRODUTOS

app.get(`/api/products`, (req, res) => {
    connection.query('SELECT * FROM produtos', (err, result) => {
        if (err) {
            res.status(500).json({ error: 'Erro ao obter dados' });
        } else {
            res.json(result);
        }
    })
});

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});