const express = require('express');
const mysql = require('mysql2');

const app = express();

// para pegar dados do formulário
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// conexão com MySQL (XAMPP)
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '', // padrão do XAMPP
  database: 'meubanco'
});

// conectar
db.connect((err) => {
  if (err) {
    console.error('Erro ao conectar:', err);
  } else {
    console.log('Conectado ao banco!');
  }
});

// rota do formulário
app.post('/cadastrar', (req, res) => {
  const { nome, email } = req.body;

  const sql = 'INSERT INTO usuarios (nome, email) VALUES (?, ?)';

  db.query(sql, [nome, email], (err) => {
    if (err) {
      console.error(err);
      res.send('Erro ao salvar');
    } else {
      res.send('Salvo com sucesso!');
    }
  });
});

app.listen(3000, () => {
  console.log('Rodando em http://localhost:3000');
});