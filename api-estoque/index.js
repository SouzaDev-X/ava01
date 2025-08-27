// index.js
const express = require('express');
const cors = require('cors');
const db = require('./database');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// GET todos
app.get('/produtos', (req, res) => {
  db.all('SELECT * FROM produtos', [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// GET por id
app.get('/produtos/:id', (req, res) => {
  const { id } = req.params;
  db.get('SELECT * FROM produtos WHERE id = ?', [id], (err, row) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!row) return res.status(404).json({ message: 'Produto não encontrado' });
    res.json(row);
  });
});

// POST novo
app.post('/produtos', (req, res) => {
  const { nome, quantidade, preco } = req.body;
  db.run(
    'INSERT INTO produtos (nome, quantidade, preco) VALUES (?, ?, ?)',
    [nome, quantidade, preco],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      res.status(201).json({ id: this.lastID, nome, quantidade, preco });
    }
  );
});

// PUT atualizar
app.put('/produtos/:id', (req, res) => {
  const { id } = req.params;
  const { nome, quantidade, preco } = req.body;
  db.run(
    'UPDATE produtos SET nome = ?, quantidade = ?, preco = ? WHERE id = ?',
    [nome, quantidade, preco, id],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      if (this.changes === 0) return res.status(404).json({ message: 'Produto não encontrado' });
      res.json({ id, nome, quantidade, preco });
    }
  );
});

// DELETE excluir
app.delete('/produtos/:id', (req, res) => {
  const { id } = req.params;
  db.run('DELETE FROM produtos WHERE id = ?', [id], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    if (this.changes === 0) return res.status(404).json({ message: 'Produto não encontrado' });
    res.status(204).send();
  });
});

// Inicia servidor
app.listen(port, () => {
  console.log(`Servidor da API rodando em http://localhost:${port}`);
});
