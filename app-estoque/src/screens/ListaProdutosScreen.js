import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

export default function ListaProdutosScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Tela de Lista de Produtos</Text>
      <Button 
        title="Adicionar Produto" 
        onPress={() => navigation.navigate('AddProduto')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  text: { fontSize: 18, marginBottom: 20 },
});
