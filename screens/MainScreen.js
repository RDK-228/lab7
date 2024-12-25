import React from 'react';
import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Button, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Footer from '../components/Footer';
import CartTab from "../tabs/CartTab";
import AddProductTab from "../tabs/AddProductTab";
import DeferredTab from "../tabs/DeferredTab";
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { ScrollView } from 'react-native-web';


const Tab = createMaterialTopTabNavigator();


export default function MainScreen({data, deferred, totalSum, setData, setDeferred, setTotalSum}) {
    const navigation = useNavigation();


    const addProduct = (product) => {
        setData(prevItems => [...prevItems, product]);
    };

    useEffect(() => {
        const total = data.reduce((sum, item) => sum + item.price * item.quantity, 0)
        setTotalSum(total)
    }, [data])

    const updateQuantity = (key, quantity, type) => {
        if (type === "data") {
            setData(prevItems =>
                prevItems.map(item =>
                    item.key === key ? { ...item, quantity } : item
                )
            );
        } else if (type === "deferred") {
            setDeferred(prevItems =>
                prevItems.map(item =>
                    item.key === key ? { ...item, quantity } : item
                )
            );
        }
    };

    const deleteItem = (key, type) => {
        if (type === "data") {
            setData(prevItems =>
                prevItems.filter(item => item.key !== key)
            );
        } else if (type === "deferred") {
            setDeferred(prevItems =>
                prevItems.filter(item => item.key !== key)
            );
        }
    };

    const switchItem = (key, type) => {
        const moveProduct = (source, destination, setSource, setDestination) => {
            const product = source.find(item => item.key === key);

            if (product) {
                setDestination(prevItems => [...prevItems, product]);
                setSource(prevData => prevData.filter(item => item.key !== key));
            }
        };

        if (type === "data") {
            moveProduct(data, deferred, setData, setDeferred);
        } else if (type === "deferred") {
            moveProduct(deferred, data, setDeferred, setData);
        }
    };

    const clearCart = () => {
        setData([]);
    }

    return (
        <View style={styles.container}>
        <TouchableOpacity style={styles.historyButton} onPress={() => navigation.navigate("OrdersHistoryScreen")}>
            <Text style={styles.historyButtonText}>{"<- К истории заказов"}</Text>
        </TouchableOpacity>
        <Text style={styles.header}>Корзина</Text>
        <Tab.Navigator
            screenOptions={{
                tabBarActiveTintColor: 'blue',
                tabBarLabelStyle: { fontSize: 14, fontWeight: 'bold' },
                tabBarStyle: { backgroundColor: 'white' },
            }}
        >
            <Tab.Screen name="Товары к покупке" children={() => (
                <ScrollView style={styles.body}>
                <CartTab data={data} updateQuantity={updateQuantity} deleteItem={deleteItem} setDeferred={setDeferred} switchItem={switchItem} />
                </ScrollView>
                )} />
            <Tab.Screen name="Отложенные товары" children={() => (
                <ScrollView style={styles.body}>
                <DeferredTab data={deferred} setData={setData} updateQuantity={updateQuantity} deleteItem={deleteItem} switchItem={switchItem} />
                </ScrollView>
                )} />
            <Tab.Screen name="Добавить товар" children={() => (
                <ScrollView style={styles.body}> 
                <AddProductTab addProduct={addProduct} />
                </ScrollView>
                )} />
        </Tab.Navigator>
        <Footer totalSum={totalSum} clearCart={clearCart} ></Footer>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "white",
        height: "100%"
    },
    body: {
        flex: 1,
        flexDirection: 'column',
        marginHorizontal: "auto",
        width: '100%',
        maxHeight: "100%",
    },
    header: {
      fontSize: "2em",
      textAlign: 'center',
      marginVertical: 10,
    },
    historyButton: {
        paddingHorizontal: 15
    },
    historyButtonText: {
        fontSize: "1.5em",
        color: "gray",
        textDecorationLine: "underline",
    },
  });
