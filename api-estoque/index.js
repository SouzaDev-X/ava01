// index.js
const express = require('express');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Banco em memória (demo)
let produtos = [
  { id: Date.now() - 3000, nome: 'Teclado Mecânico', quantidade: 25, preco: 350.50 },
  { id: Date.now() - 2000, nome: 'Mouse Gamer', quantidade: 40, preco: 120.00 },
  { id: Date.now() - 1000, nome: 'Cabo USB-C', quantidade: 100, preco: 15.75 },
];

// Validação simples
function validarProdutoDados(obj) {
  if (!obj || typeof obj !== 'object') return { ok: false, message: 'Corpo inválido.' };
  const { nome, quantidade, preco } = obj;
  if (!nome || typeof nome !== 'string' || !nome.trim()) {
    return { ok: false, message: 'Campo "nome" é obrigatório e deve ser texto.' };
  }
  if (quantidade === undefined || isNaN(Number(quantidade)) || Number(quantidade) < 0) {
    return { ok: false, message: 'Campo "quantidade" é obrigatório e deve ser número >= 0.' };
  }
  if (preco === undefined || isNaN(Number(preco)) || Number(preco) < 0) {
    return { ok: false, message: 'Campo "preco" é obrigatório e deve ser número >= 0.' };
  }
  return { ok: true };
}

// ROTAS
app.get('/produtos', (req, res) => {
  res.status(200).json(produtos);
});

app.get('/produtos/:id', (req, res) => {
  const { id } = req.params;
  const produto = produtos.find(p => p.id == id);
  if (!produto) return res.status(404).json({ message: 'Produto não encontrado.' });
  res.json(produto);
});

app.post('/produtos', (req, res) => {
  const valid = validarProdutoDados(req.body);
  if (!valid.ok) return res.status(400).json({ message: valid.message });

  const { nome, quantidade, preco } = req.body;
  const novo = {
    id: Date.now(),
    nome: String(nome).trim(),
    quantidade: Number(quantidade),
    preco: Number(preco),
  };
  produtos.push(novo);
  res.status(201).json(novo);
});

app.put('/produtos/:id', (req, res) => {
  const { id } = req.params;
  const idx = produtos.findIndex(p => p.id == id);
  if (idx === -1) return res.status(404).json({ message: 'Produto não encontrado.' });

  const { nome, quantidade, preco } = req.body;
  if (nome !== undefined && (typeof nome !== 'string' || !nome.trim())) {
    return res.status(400).json({ message: 'Campo "nome", se fornecido, deve ser texto não vazio.' });
  }
  if (quantidade !== undefined && (isNaN(Number(quantidade)) || Number(quantidade) < 0)) {
    return res.status(400).json({ message: 'Campo "quantidade", se fornecido, deve ser número >= 0.' });
  }
  if (preco !== undefined && (isNaN(Number(preco)) || Number(preco) < 0)) {
    return res.status(400).json({ message: 'Campo "preco", se fornecido, deve ser número >= 0.' });
  }

  const atual = produtos[idx];
  produtos[idx] = {
    ...atual,
    nome: nome !== undefined ? String(nome).trim() : atual.nome,
    quantidade: quantidade !== undefined ? Number(quantidade) : atual.quantidade,
    preco: preco !== undefined ? Number(preco) : atual.preco,
  };
  res.status(200).json(produtos[idx]);
});

app.delete('/produtos/:id', (req, res) => {
  const { id } = req.params;
  const idx = produtos.findIndex(p => p.id == id);
  if (idx === -1) return res.status(404).json({ message: 'Produto não encontrado.' });
  produtos.splice(idx, 1);
  res.status(204).send();
});

app.listen(port, () => {
  console.log('Servidor da API... rodando...');
});
