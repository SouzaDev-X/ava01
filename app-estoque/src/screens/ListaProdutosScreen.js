// src/screens/ListaProdutosScreen.js
import React, { useEffect, useState } from 'react';
import { 
  View, Text, FlatList, Button, StyleSheet, Alert, TouchableOpacity 
} from 'react-native';
import API from '../services/api';

export default function ListaProdutosScreen({ navigation }) {
  const [produtos, setProdutos] = useState([]);

  // Carregar lista ao abrir a tela
  useEffect(() => {
    buscarProdutos();
  }, []);

  // Também recarregar sempre que voltar para esta tela
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      buscarProdutos();
    });
    return unsubscribe;
  }, [navigation]);

  const buscarProdutos = async () => {
    try {
      const response = await API.get('/produtos');
      setProdutos(response.data);
    } catch (error) {
      console.error('Erro ao buscar produtos:', error);
      Alert.alert('Erro', 'Não foi possível carregar os produtos.');
    }
  };

  const excluirProduto = async (id) => {
    Alert.alert(
      'Confirmar Exclusão',
      'Deseja realmente excluir este produto?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Excluir',
          style: 'destructive',
          onPress: async () => {
            try {
              await API.delete(`/produtos/${id}`);
              buscarProdutos(); // Atualiza lista
            } catch (error) {
              console.error('Erro ao excluir:', error);
              Alert.alert('Erro', 'Não foi possível excluir o produto.');
            }
          },
        },
      ]
    );
  };

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text style={styles.nome}>{item.nome}</Text>
      <Text>Qtd: {item.quantidade}</Text>
      <Text>Preço: R$ {item.preco.toFixed(2)}</Text>

      <View style={styles.botoes}>
        <Button
          title="Editar"
          onPress={() => navigation.navigate('EditProduto', { id: item.id })}
        />
        <Button
          title="Excluir"
          color="red"
          onPress={() => excluirProduto(item.id)}
        />
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={produtos}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        ListEmptyComponent={<Text>Nenhum produto cadastrado.</Text>}
      />

      <TouchableOpacity
        style={styles.botaoAdicionar}
        onPress={() => navigation.navigate('AddProduto')}
      >
        <Text style={styles.textoBotao}>+ Adicionar Produto</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  item: {
    padding: 12,
    marginBottom: 12,
    backgroundColor: '#f5f5f5',
    borderRadius: 6,
  },
  nome: { fontSize: 16, fontWeight: 'bold' },
  botoes: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 8 },
  botaoAdicionar: {
    backgroundColor: '#007bff',
    padding: 14,
    borderRadius: 6,
    alignItems: 'center',
    marginTop: 16,
  },
  textoBotao: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
});
