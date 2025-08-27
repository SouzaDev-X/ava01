// src/services/api.js
import axios from 'axios';
import Constants from 'expo-constants';

// Pega o IP automaticamente do Metro Bundler (ex: 192.168.0.5:19000)
let baseURL = 'http://localhost:3000';
if (Constants.expoGoConfig?.debuggerHost) {
  const host = Constants.expoGoConfig.debuggerHost.split(':').shift();
  baseURL = `http://${host}:3000`;
}

const API = axios.create({ baseURL });

export default API;
