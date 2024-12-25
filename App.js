import React from 'react';
import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Footer from './components/Footer';
import MainScreen from './screens/MainScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import MakeOrderScreen from './screens/MakeOrderScreen';
import OrdersHistoryScreen from './screens/OrdersHistoryScreen';
import OrderDetailsScreen from './screens/OrderDetailsScreen';


const Stack = createStackNavigator();


export default function App() {

  const [data, setData] = useState([])

  const [deferred, setDeferred] = useState([
    // { key: '9', price: 101, quantity: 1, text: 'Товар A' },
    // { key: '10', price: 102, quantity: 1, text: 'Товар B' },
  ]);

  const [totalSum, setTotalSum] = useState(0);

  const [orders, setOrders] = useState([

  ]);

  
  useEffect(() => {

    const loadData = async () => {
        try {
            const storedData = await AsyncStorage.getItem('inCart');
            const storedDeferred = await AsyncStorage.getItem('deferred');
            const storedOrders = await AsyncStorage.getItem('orders');

            if (storedData) setData(JSON.parse(storedData));
            else {
                response = await axios.get('https://my-json-server.typicode.com/maksanik/myFakeJSON/inCart');
                setData(response.data);
            }
            if (storedDeferred) setDeferred(JSON.parse(storedDeferred));
            else {
                response = await axios.get('https://my-json-server.typicode.com/maksanik/myFakeJSON/deffered');
                setDeferred(response.data);
            }
            if (storedOrders) setOrders(JSON.parse(storedOrders));
            else {
                response = await axios.get('https://my-json-server.typicode.com/maksanik/myFakeJSON/orders');
                setOrders(response.data);
            }
        } catch (e) {
            console.error('Ошибка загрузки данных:', e);
        }
    };
    loadData();
}, []);

useEffect(() => {
    const saveData = async () => {

        try {
            await AsyncStorage.setItem('inCart', JSON.stringify(data));
            await AsyncStorage.setItem('deferred', JSON.stringify(deferred));
            await AsyncStorage.setItem('orders', JSON.stringify(orders));

        } catch (e) {
            console.error('Ошибка сохранения данных:', e);
        }

        try {
            const cart_response = await axios.post('https://jsonplaceholder.typicode.com/users/1/posts', data);
            const deferred_response = await axios.post('https://jsonplaceholder.typicode.com/users/1/posts', deferred);
            const orders_response = await axios.post('https://jsonplaceholder.typicode.com/users/1/posts', orders);

        } catch (e) {
            console.error('Ошибка отправки данных:', e);
        }
    };
    saveData();
}, [data, deferred]);


  return (
    <NavigationContainer>
      <View style={styles.body}>
      <Stack.Navigator>
        <Stack.Screen
          name="MainScreen"
          children={() => (
            <MainScreen
              data={data}
              deferred={deferred}
              totalSum={totalSum}
              setData={setData}
              setDeferred={setDeferred}
              setTotalSum={setTotalSum}
            />
          )}
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="MakeOrderScreen" 
          children={() => (
            <MakeOrderScreen data={data} setData={setData} totalSum={totalSum} setOrders={setOrders} orders={orders} />
          )}
          options={{ headerTitle: "Вернуться к корзине"}}/>
        <Stack.Screen name="OrdersHistoryScreen" 
          children={() => (
            <OrdersHistoryScreen orders={orders} />
            )}
          options={{ headerTitle: "Вернуться к корзине"}}/>
        <Stack.Screen name="OrderDetailsScreen" component={OrderDetailsScreen} options={{ title: 'Детали заказа' }} />
      </Stack.Navigator>
      </View>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    flexDirection: 'column',
    borderLeftWidth: 4,
    borderRightWidth: 4,
    borderColor: "#ddd",
    marginHorizontal: "auto",
    maxWidth: 1000,
    width: '100%',
  },
  header: {
    fontSize: "2em",
    textAlign: 'center',
    marginVertical: 10,
  }
});
