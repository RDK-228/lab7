import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function OrdersHistoryScreen({ orders }) {
    const navigation = useNavigation();

    const handleOrderPress = (order) => {
        navigation.navigate('OrderDetailsScreen', { order });
    };

    const renderOrderItem = ({ item }) => (
        <TouchableOpacity
            style={styles.orderItem}
            onPress={() => handleOrderPress(item)}
        >
            <Text style={styles.orderKey}>Заказ №{item.key}</Text>
            <Text style={styles.orderDate}>Дата: {item.date || 'Не указана'}</Text>
            <Text style={styles.orderAddress}>Адрес: {item.address || 'Не указан'}</Text>
            <Text style={styles.orderTotalSum}>Сумма: {item.totalSum}₽</Text>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.header}>История заказов</Text>
            {orders.length > 0 ? (
                <FlatList
                    data={orders}
                    keyExtractor={(item) => item.key}
                    renderItem={renderOrderItem}
                />
            ) : (
                <Text style={styles.noOrders}>У вас пока нет заказов</Text>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#f9f9f9',
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    orderItem: {
        backgroundColor: '#fff',
        padding: 16,
        borderRadius: 8,
        marginBottom: 12,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    orderKey: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    orderDate: {
        fontSize: 14,
        color: '#666',
        marginTop: 4,
    },
    orderAddress: {
        fontSize: 14,
        color: '#666',
        marginTop: 4,
    },
    orderTotalSum: {
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: 8,
    },
    noOrders: {
        fontSize: 16,
        color: '#999',
        textAlign: 'center',
        marginTop: 32,
    },
});
