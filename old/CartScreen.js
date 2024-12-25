import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList, ScrollView } from 'react-native';
import CartItem from '../components/CartItem';
import Footer from '../components/Footer';



export default function CartScreen({data, updateQuantity, deleteItem, switchItem}) {

  
  return (
    <FlatList
      data={data}
      renderItem={({item}) => (
        <CartItem 
          item={item} 
          updateQuantity={updateQuantity}
          deleteItem={deleteItem}
          type="data"
          switchItem={switchItem}
        ></CartItem>
      )}
      keyExtractor={item => item.key}
      style={styles.items}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    // maxWidth: 1000,
    // width: '100%',
    // backgroundColor: 'white',
    // padding: 20,
    // paddingHorizontal: 60,
  },
  items: {
    // marginVertical: 40,
    // borderTopWidth: 3,
    // borderBottomWidth: 3, 
    // maxHeight: 5000,
  }
});

