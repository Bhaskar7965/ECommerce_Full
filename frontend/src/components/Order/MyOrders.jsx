import React, { Fragment, useEffect } from 'react';
import './MyOrders.css';
import { useSelector, useDispatch } from 'react-redux';
import { myOrders } from '../../actions/orderAction';
import Loader from '../layout/Loader/Loader';
import { Link } from 'react-router-dom';
import MetaData from '../layout/MetaData';
import axios from 'axios'; // Import Axios
import { BiLinkExternal } from 'react-icons/bi';

const MyOrders = () => {
    const dispatch = useDispatch();


    const { loading, orders } = useSelector((state) => state.myOrders);
    const { user } = useSelector((state) => state.user);

    useEffect(() => {

        const fetchOrders = async () => {
            try {
                const config = {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${user.token}`
                    }
                };

                const { data } = await axios.get('/api/v1/orders/me', config);
                dispatch(myOrders(data));
            } catch (error) {
                console.error('Error fetching orders:', error);
            }
        };

        fetchOrders();
    }, [dispatch, user.token]);

    console.log(orders);

    return (
        <Fragment>
            <MetaData title={`${user?.name} Orders`} />
            {loading ? (
                <Loader />
            ) : (
                <div className="myOrdersPage">
                    <h2>My Orders</h2>
                    {orders.length === 0 ? (
                        <p>No orders found.</p>
                    ) : (
                        <table className="order-table">
                            <thead>
                                <tr>
                                    <th>Order ID</th>
                                    <th>Order Date</th>
                                    <th>Items Price</th>
                                    <th>Tax Price</th>
                                    <th>Shipping Price</th>
                                    <th>Total Price</th>
                                    <th>Order Status</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orders.reverse().map((order) => (
                                    <tr key={order._id}>
                                        <td>{order._id}</td>
                                        <td>{new Date(order.createdAt).toLocaleString()}</td>
                                        <td>₹{order.itemsPrice}</td>
                                        <td>₹{order.taxPrice}</td>
                                        <td>₹{order.shippingPrice}</td>
                                        <td>₹{order.totalPrice}</td>
                                        <td style={{ color: order.orderStatus === "Processing" ? "red" : "green" }}>
                                            {order.orderStatus}
                                        </td>
                                        <td>
                                            <Link to={`/order/${order._id}`}><BiLinkExternal /></Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            )}
        </Fragment>
    );
};

export default MyOrders;
