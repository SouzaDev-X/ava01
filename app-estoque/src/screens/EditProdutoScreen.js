// src/screens/EditProdutoScreen.js
import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import API from '../services/api';

export default function EditProdutoScreen({ route, navigation }) {
  const { id } = route.params;
  const [nome, setNome] = useState('');
  const [quantidade, setQuantidade] = useState('');
  const [preco, setPreco] = useState('');

  useEffect(() => {
    carregarProduto();
  }, []);

  const carregarProduto = async () => {
    try {
      const response = await API.get(`/produtos/${id}`);
      setNome(response.data.nome);
      setQuantidade(String(response.data.quantidade));
      setPreco(String(response.data.preco));
    } catch (error) {
      console.error(error);
      Alert.alert('Erro', 'Não foi possível carregar o produto.');
    }
  };

  const atualizarProduto = async () => {
    if (!nome || !quantidade || !preco) {
      Alert.alert('Erro', 'Preencha todos os campos.');
      return;
    }
    try {
      await API.put(`/produtos/${id}`, {
        nome,
        quantidade: Number(quantidade),
        preco: Number(preco),
      });
      Alert.alert('Sucesso', 'Produto atualizado!');
      navigation.goBack();
    } catch (error) {
      console.error(error);
      Alert.alert('Erro', 'Não foi possível atualizar o produto.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Nome</Text>
      <TextInput
        style={styles.input}
        value={nome}
        onChangeText={setNome}
        placeholder="Digite o nome"
      />

      <Text style={styles.label}>Quantidade</Text>
      <TextInput
        style={styles.input}
        value={quantidade}
        onChangeText={setQuantidade}
        keyboardType="numeric"
        placeholder="Digite a quantidade"
      />

      <Text style={styles.label}>Preço</Text>
      <TextInput
        style={styles.input}
        value={preco}
        onChangeText={setPreco}
        keyboardType="numeric"
        placeholder="Digite o preço"
      />

      <Button title="Atualizar" onPress={atualizarProduto} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  label: { marginTop: 8, fontWeight: 'bold' },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    borderRadius: 6,
    marginBottom: 12,
  },
});
