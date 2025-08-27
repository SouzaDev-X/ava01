# 📘 Instruções de Execução - Avaliação Prática 01

Olá, professor 👋
Este documento explica como configurar e rodar minha atividade **CRUD Fullstack - Gerenciador de Estoque**.
(Ensinando o padre a rezar missa neh, kkkkkkk)
Mas o objetivo é somente deixar mais didático!!!
---

## 🛠️ Tecnologias Utilizadas

* **Backend:** Node.js + Express + SQLite
* **Frontend:** React Native (Expo)
* **Banco de Dados:** Arquivo `estoque.db`
* **Comunicação:** API REST

---

## 🚀 Passo 2 - Configuração do Backend (API)

1. Acesse a pasta `api-estoque`:
   cd api-estoque

2. Instale as dependências:
   npm install

3. Inicie o servidor:
   npm run dev

📍 A API estará rodando em:
`http://localhost:3000/produtos`

* Os dados são armazenados no arquivo **`estoque.db`** dentro de `api-estoque/`.
* Mesmo reiniciando o servidor, os dados permanecem.

---

## 📱 Passo 3 - Configuração do Frontend (Aplicativo)

1. Em outro terminal, acesse a pasta `app-estoque`:
   cd app-estoque

2. Instale as dependências:
   npm install

3. Inicie o Expo:
   npx expo start

4. Abra o aplicativo **Expo Go** no celular e escaneie o QR Code exibido.

📍 O aplicativo detecta automaticamente o **IP local** da máquina — não precisa configurar manualmente.

---

## ✅ Funcionalidades Implementadas

* **Listagem de Produtos (Read):** Tela inicial lista todos os produtos.
* **Adição de Produto (Create):** Formulário para cadastrar novo produto.
* **Edição de Produto (Update):** Formulário pré-preenchido para editar produto.
* **Exclusão de Produto (Delete):** Botão na lista com confirmação de exclusão.
* **Persistência em SQLite:** Todos os dados são salvos em `estoque.db`.

---

## 🗂 Estrutura do Repositório

```
ava01/
 ├── api-estoque/    # Backend Node.js + Express + SQLite
 ├── app-estoque/    # Frontend React Native + Expo
 └── 📘_INSTRUCOES_PROFESSOR.md
```

---

## 👨‍💻 Autor

* **Nome:** Wenderson Souza
* **GitHub:** [SouzaDev-X](https://github.com/SouzaDev-X)

---

✨ Muito obrigado pela avaliação! Espero que consiga rodar facilmente em seu ambiente 🙏
