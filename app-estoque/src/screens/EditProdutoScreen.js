import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function EditProdutoScreen({ route }) {
  const { id } = route.params || {};
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Tela de Editar Produto {id}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  text: { fontSize: 18 },
});
