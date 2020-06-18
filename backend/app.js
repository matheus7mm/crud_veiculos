const password = ''; // Senha do usuário do banco

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const veiculosRoutes = require('./routes/veiculos');

const app = express();

mongoose.connect(`mongodb+srv://matheus:${password}@cluster0-s8u4a.mongodb.net/node-angular?retryWrites=true&w=majority`)
  .then(() => {
    console.log('Conectado ao banco de dados!');
  })
  .catch(() => {
    console.log('Falha na conexão!');
  });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Para correção da política CORS
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Request-With, Content-Type, Accept'
  );
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PATCH, PUT, DELETE, OPTIONS'
  );
  next();
});

app.use("/api/veiculos", veiculosRoutes);

module.exports = app;
