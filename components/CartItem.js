import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Button, Dimensions } from 'react-native';


export default function CartItem({ item, updateQuantity, deleteItem, type, switchItem }) {

  const increaseQuantity = () => updateQuantity(item.key, item.quantity + 1, type);
  const decreaseQuantity = () => updateQuantity(item.key, Math.max(item.quantity - 1, 1), type);

  return (
    <View style={styles.itemContainer}>
        <View style={styles.handler} onStartShouldSetResponder={() => true}><Text>⋮</Text></View>
        <Image style={styles.image} source={require('../assets/image-not-found.png')} />

        <View style={styles.title}>
            <Text style={styles.titleText}>{item.text}</Text>
        </View>
        
        <View style={styles.counterContainer}>
            <TouchableOpacity onPress={decreaseQuantity} style={styles.counterButton}>
                <Text style={styles.buttonText}>-</Text>
            </TouchableOpacity>
            
            <Text style={styles.counter}>{item.quantity}</Text>
            
            <TouchableOpacity onPress={increaseQuantity} style={styles.counterButton}>
                <Text style={styles.buttonText}>+</Text>
            </TouchableOpacity>
        </View>

        <Text style={styles.price}>{item.price * item.quantity} ₽</Text>
        
        <View style={styles.deleteButton}>
            <Button title="Удалить" onPress={() => deleteItem(item.key, type)} />
        </View>

        <View style={styles.absoluteLaterContainer}>
            <TouchableOpacity 
                style={styles.absoluteLaterButton}
                onPress={() => switchItem(item.key, type)}>
                <Text style={styles.absoluteLaterButtonText}>{ type === "data" ? "ОТЛОЖИТЬ" : "В КОРЗИНУ"}</Text>
            </TouchableOpacity>
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
  itemContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: 'space-between',
    alignItems: "center",
    borderBottomWidth: 3,
    backgroundColor: "white",
    borderColor: "#b0b0b0",
    paddingVertical: 20,
  },
  image: {
    width: 150,
    height: 150,
  },
  title: {
    flex: 2,
    marginLeft: 20,
  },
  titleText: {
    fontSize: 18,
  },
  counterContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 20,
  },
  counterButton: {
    width: 30,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  counter: {
    fontSize: 18,
    marginHorizontal: 10,
  },
  price: {
    flex: 1,
    textAlign: "center",
    marginLeft: 20,
    fontSize: "1.5em",
  },
  deleteButton: {
    marginRight: 20,
  },
  absoluteLaterContainer: {
    position: "absolute",
    right: 20,
    top: 10,
  },
  absoluteLaterButton: {
    backgroundColor: "white",
    padding: 5,
    borderRadius: 5,
  },
  absoluteLaterButtonText: {
      color: "#505050",
      textDecorationLine: "underline",
      fontSize: 16,
      textAlign: "center",
  },
  handler: {
    cursor: "move",
    fontSize: "2em",
    color: "#505050",
    paddingHorizontal: 5,
  }
});
