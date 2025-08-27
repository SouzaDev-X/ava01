// src/services/api.js
import axios from 'axios';

// ⚠️ substitua pelo IP da sua máquina (ex: 192.168.0.5)
const API = axios.create({
  baseURL: 'http://192.168.0.5:3000',
});

export default API;
