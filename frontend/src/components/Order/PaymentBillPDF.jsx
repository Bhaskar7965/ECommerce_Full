import React from 'react';
import { Page, Document, View, StyleSheet, Text } from '@react-pdf/renderer';

const styles = StyleSheet.create({
    page: {
        flexDirection: 'column',
        backgroundColor: '#ffffff',
        padding: 20,
    },
    title: {
        fontSize: 20,
        marginBottom: 10,
        textAlign: 'center',
    },
    table: {
        display: 'table',
        width: 'auto',
        marginVertical: 10,
    },
    tableRow: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: '#000',
        borderBottomStyle: 'solid',
        alignItems: 'center',
    },
    tableHeader: {
        backgroundColor: '#f2f2f2',
        borderBottomWidth: 1,
        borderBottomColor: '#000',
        borderBottomStyle: 'solid',
        padding: 5,
    },
    tableCell: {
        fontSize: 12,
        padding: 5,
        textAlign: 'center',
    },
});

const PaymentBillPDF = ({ order }) => {
    // Function to generate the table rows for the order items
    const renderTableRows = () => {
        return order.orderItems.map((item) => (
            <View style={styles.tableRow} key={item._id}>
                <Text style={styles.tableCell}>{item.name}</Text>
                <Text style={styles.tableCell}>{item.quantity}</Text>
                <Text style={styles.tableCell}>₹{item.price}</Text>
                <Text style={styles.tableCell}>₹{item.price * item.quantity}</Text>
            </View>
        ));
    };

    // Function to calculate the total price of the order
    const calculateTotalPrice = () => {
        return (
            order.itemsPrice + order.taxPrice + order.shippingPrice
        );
    };

    return (
        <Document>
            <Page size="A4" style={styles.page}>
                <Text style={styles.title}>Order Bill</Text>
                <Text>Order ID: {order._id}</Text>
                <Text>
                    Order Date:{' '}
                    {new Date(order.createdAt).toLocaleString('en-IN', {
                        timeZone: 'Asia/Kolkata',
                        dateStyle: 'short',
                        timeStyle: 'short',
                    })}
                </Text>
                <View style={styles.table}>
                    {/* Table header */}
                    <View style={styles.tableRow}>
                        <Text style={styles.tableHeader}>Item</Text>
                        <Text style={styles.tableHeader}>Quantity</Text>
                        <Text style={styles.tableHeader}>Unit Price</Text>
                        <Text style={styles.tableHeader}>Total</Text>
                    </View>
                    {/* Table rows */}
                    {renderTableRows()}
                    {/* Table footer */}
                    <View style={styles.tableRow}>
                        <Text style={{ ...styles.tableCell, fontWeight: 'bold' }} colSpan={3}>
                            Total:
                        </Text>
                        <Text style={{ ...styles.tableCell, fontWeight: 'bold' }}>₹{order.itemsPrice}</Text>
                    </View>
                    <View style={styles.tableRow}>
                        <Text style={{ ...styles.tableCell, fontWeight: 'bold' }} colSpan={3}>
                            Tax Price:
                        </Text>
                        <Text style={{ ...styles.tableCell, fontWeight: 'bold' }}>₹{order.taxPrice}</Text>
                    </View>
                    <View style={styles.tableRow}>
                        <Text style={{ ...styles.tableCell, fontWeight: 'bold' }} colSpan={3}>
                            Shipping Price:
                        </Text>
                        <Text style={{ ...styles.tableCell, fontWeight: 'bold' }}>₹{order.shippingPrice}</Text>
                    </View>
                    <View style={styles.tableRow}>
                        <Text style={{ ...styles.tableCell, fontWeight: 'bold' }} colSpan={3}>
                            Gross Total:
                        </Text>
                        <Text style={{ ...styles.tableCell, fontWeight: 'bold' }}>₹{calculateTotalPrice()}</Text>
                    </View>
                </View>
            </Page>
        </Document>
    );
};

export default PaymentBillPDF;
