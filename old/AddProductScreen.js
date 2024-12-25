import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

const AddProductScreen = ({ addProduct }) => {
  const [productName, setProductName] = useState('');
  const [productPrice, setProductPrice] = useState('');

  const handleAddProduct = () => {
    const newProduct = {
      key: `${Date.now()}`, // Генерация уникального key с использованием текущего времени
      text: productName,
      price: parseFloat(productPrice),
      quantity: 1
    };
    addProduct(newProduct);
    setProductName('');
    setProductPrice('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Добавить товар</Text>
      <TextInput
        style={styles.input}
        placeholder="Название товара"
        value={productName}
        onChangeText={setProductName}
      />
      <TextInput
        style={styles.input}
        placeholder="Цена товара"
        keyboardType="numeric"
        value={productPrice}
        onChangeText={setProductPrice}
      />
      <Button title="Добавить товар" onPress={handleAddProduct} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  header: {
    fontSize: 20,
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 8,
  },
});

export default AddProductScreen;
