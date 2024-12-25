import { StatusBar } from 'expo-status-bar';
import { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, TextInput, Button, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function Footer({ clearCart, totalSum = 1000 }) {
  const navigation = useNavigation();

  const [discount, setDiscount] = useState(1);
  const promoCodeRef = useRef(null);


  const handleApplyPromo = () => {
    const promoCode = promoCodeRef.current?.value;

    if (promoCode === 'baza') {
      setDiscount(0.85);
    }

  };

  return (
    <View style={styles.container}>
      <View style={styles.priceContainer}>
        <View style={styles.promo}>
          <TextInput
            style={styles.promoInp}
            placeholder="Введите промокод"
            ref={promoCodeRef}
          />
          <Button title="Применить" onPress={handleApplyPromo}></Button>
        </View>
        {discount !== 1 && <Text style={styles.prevPrice}>{totalSum} ₽</Text>}
        <Text style={styles.totalSum}>Итого: {totalSum * discount} ₽</Text>
      </View>
      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={styles.clearButton} onPress={clearCart}>
          <Text style={styles.clearButtonText}>Очистить</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.submitButton} onPress={() => navigation.navigate('MakeOrderScreen')}>
          <Text style={styles.submitButtonText}>Оформить</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 30,
    borderTopWidth: 2,
  },
  priceContainer: {
    flexDirection: "row",
    justifyContent: 'space-between',
    alignItems: "center",
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: 'space-between',
    alignItems: "center",
    marginTop: 40
  },
  promo: {
    flexDirection: "row",
    justifyContent: "left",
  },
  promoInp: {
    fontSize: "1.3em",
    borderWidth: 1,
  },
  totalSum: {
    fontSize: "1.5em",
  },
  prevPrice: {
    position: "absolute",
    top: 10,
    right: 50,
    fontSize: "1.2em",
    color: "#505050",
    textDecorationLine: "line-through",
  },
  clearButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: "#d1080b",
    borderWidth: 1,
    borderColor: "gray",
  },
  clearButtonText: {
    color: "white",
    fontSize: 20
  },
  submitButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: "gray",
    backgroundColor: "green",
  },
  submitButtonText: {
    color: "white",
    fontSize: 20
  },
});
