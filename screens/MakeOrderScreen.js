import React from 'react';
import { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { YMaps, Map, Placemark } from '@pbe/react-yandex-maps';


export default function MakeOrderScreen({ data, setData, totalSum, setOrders, orders }) {
    const navigation = useNavigation();

    const [deliveryDate, setDeliveryDate] = useState("");
    const [deliveryAddress, setDeliveryAddress] = useState([55.751244, 37.618423]);

    const addOrder = () => {
        const newOrder = {
            key: `${Date.now()}`, // Генерация уникального key с использованием текущего времени
            date: deliveryDate,
            address: deliveryAddress.join(", "),
            products: [...data],
            totalSum: totalSum,
        }
        setOrders(prevItems => [...prevItems, newOrder]);
        setData([]);
        setDeliveryDate('');
        setDeliveryAddress('');
    }

    const defaultState = {
        center: deliveryAddress,
        zoom: 10,
      };

    const handleMapClick = (event) => {
        const coords = event.get('coords');
        setDeliveryAddress(coords);
      };


    return (
        <ScrollView style={styles.container}>
            <Text style={styles.header}>Оформление заказа</Text>

            {/* Данные о товарах */}
            <View style={styles.orderDetails}>
                {data.map(item => (
                    <View key={item.key} style={styles.item}>
                        <Text style={styles.itemText}>{item.text}</Text>
                        <Text>{`Цена: ${item.price} ₽`}</Text>
                        <Text>{`Количество: ${item.quantity}`}</Text>
                    </View>
                ))}
            </View>

            {/* Сумма заказа */}
            <Text style={styles.totalSum}>Итого: {totalSum} ₽</Text>

            {/* Выбор даты доставки */}
            <Text>Выберите дату доставки:</Text>
            <input
                type="date"
                value={deliveryDate}
                onChange={(e) => setDeliveryDate(e.target.value)}
                style={{ padding: 10, fontSize: 16, marginBottom: 10 }}
            />

            {/* Ввод адреса доставки */}
            <Text>Введите адрес доставки:</Text>
            <div style={styles.webMap}>
                <YMaps>
                    <Map
                        defaultState={defaultState}
                        width="100%"
                        height="400px"
                        onClick={handleMapClick}
                    >
                        <Placemark geometry={deliveryAddress} />
                    </Map>
                </YMaps>
            </div>
            <TextInput
                style={styles.input}
                placeholder="Улица, дом, квартира"
                value={deliveryAddress}
                onChangeText={setDeliveryAddress}
            />

            {/* Кнопка подтверждения заказа */}
            <Button
                title="Подтвердить заказ"
                onPress={() => {
                    addOrder();
                    alert(`Заказ подтвержден на адрес: ${deliveryAddress} с датой доставки: ${deliveryDate}`);
                    navigation.navigate('MainScreen');
                }}
            />
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "white",
        padding: 20,
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    orderDetails: {
        marginBottom: 20,
    },
    item: {
        marginBottom: 10,
        borderBottomWidth: 1,
    },
    itemText: {
        fontWeight: 'bold',
    },
    totalSum: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    input: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        marginBottom: 20,
        paddingHorizontal: 10,
    },
});
