import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function OrderDetailsScreen({ route }) {
    const { order } = route.params;
    console.log(order.products);
    return (
        <View style={styles.container}>
            <Text style={styles.header}>Детали заказа №{order.key}</Text>
            <Text style={styles.detail}>Дата: {order.date || 'Не указана'}</Text>
            <Text style={styles.detail}>Адрес: {order.address || 'Не указан'}</Text>
            <Text style={styles.header}>Товары:</Text>
            {order.products.map((product, index) => (
                <Text key={index} style={styles.product}>
                    {product.text} (x{product.quantity}) - {product.quantity*product.price} руб.
                </Text>
            ))}
            <View style={styles.totalSumContainer}>
            <Text style={styles.totalSumText}>Сумма: {order.totalSum}₽</Text>
            </View>
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
    detail: {
        fontSize: 16,
        color: '#333',
        marginBottom: 8,
        fontWeight: 500,
    },
    totalSumContainer: {
        borderTopWidth: 1,
        paddingVertical: 10,
    },
    totalSumText: {
        fontSize: 24,
        color: '#333',
        fontWeight: 800,
    },
    product: {
        fontSize: 14,
        color: '#666',
        marginBottom: 4,
    },
});
