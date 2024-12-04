const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const PORT = 3000;
//Configuração do banco de dados
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root', // Usuário padrão do XAMPP
    password: '', // Senha padrão
    database: 'restaurante',
});
//Conexão com o banco de dados
db.connect((err) => {
    if (err) {
    console.error('Erro ao conectar ao banco de dados:', err);
    return;
    }
    console.log('Conectado ao banco de dados MySQL');
});

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Rotas
// Obter todas as reservas
app.get('/reservas', (req, res) => {
    db.query('SELECT * FROM reservas', (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).send('Erro ao buscar reservas');
        } else {
        res.json(results);
        }
    });
});

// Criar uma nova reserva
app.post('/reservas', (req, res) => {
    const { nomeCliente, data, horario, numeroPessoas} = req.body;
    const sql = 'INSERT INTO reservas (nomeCliente, data, horario, numeroPessoas) VALUES (?, ?, ?, ?)';
    db.query(sql, [nomeCliente, data, horario, numeroPessoas], (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).send('Erro ao criar reserva');
        } else {
            res.status(201).send('Reserva criada com sucesso');
        }
 });
});

// Deletar uma reserva
app.delete('/reservas/:id', (req, res) => {
    const id = req.params.id;
    const sql = 'DELETE FROM reservas WHERE id =?';
    db.query(sql, [id], (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).send('Erro ao deletar reserva');
        } else {
            res.send('Reserva deletada com sucesso');
        }
    });
});

//Iniciar Servidor 
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});