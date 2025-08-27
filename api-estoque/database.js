// api-estoque/database.js
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./estoque.db');

// Cria tabela se não existir
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS produtos (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nome TEXT NOT NULL,
      quantidade INTEGER NOT NULL,
      preco REAL NOT NULL
    )
  `);
});

module.exports = db;
