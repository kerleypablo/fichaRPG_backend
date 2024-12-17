const { Client } = require('pg');
require('dotenv').config();

const client = new Client({
  connectionString: process.env.DATABASE_URL,
});

client.connect()
  .then(() => {
    console.log("Conectado ao banco de dados com sucesso!");
    client.end();
  })
  .catch(err => {
    console.error("Erro na conexão:", err.message);
  });
