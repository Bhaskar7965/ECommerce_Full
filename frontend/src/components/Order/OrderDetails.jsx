import React, { Fragment, useEffect, useRef } from 'react'
import './orderDetails.css'
import { useSelector, useDispatch } from 'react-redux'
import MetaData from '../layout/MetaData'
import { Link, useParams } from 'react-router-dom'
import { useAlert } from 'react-alert'
import { getOrderDetails, clearErrors } from '../../actions/orderAction'
import Loader from '../layout/Loader/Loader'
import { useReactToPrint } from 'react-to-print'

const OrderDetails = () => {
    const { id } = useParams()
    const { order, loading, error } = useSelector(state => state.orderDetails);
    const { user } = useSelector((state) => state.user);

    const dispatch = useDispatch();
    const alert = useAlert();

    useEffect(() => {
        dispatch(getOrderDetails(id));
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }
    }, [dispatch, alert, error, id])

    const componentRef = useRef();

    const generatePDF = useReactToPrint({
        content: () => componentRef.current,
        documentTitle: `Order ${order && order._id}`,
        onAfterPrint: () => {
            alert.success('Payment Bill Printed Successfully');
        }
    });


    const handleDownloadPDF = () => {
        generatePDF();
    }

    return (
        <Fragment>
            {loading ? <Loader /> : (
                <Fragment>
                    <MetaData title="Order Details" />
                    <div className="orderDetailsPage">
                        <div className="orderDetailsContainer">
                            <div>
                                <h1 component="h1">
                                    Order #{order && order._id}
                                </h1>
                                <h1>Shipping Info</h1>
                                <div className="orderDetailsContainerBox">
                                    <div>
                                        <p>Name:</p>
                                        <span>{order?.user && user?.name}</span>
                                    </div>
                                    <div>
                                        <p>Phone:</p>
                                        <span>
                                            {order.shippingInfo && order.shippingInfo.phoneNo}
                                        </span>
                                    </div>
                                    <div>
                                        <p>Address:</p>
                                        <span>
                                            {order.shippingInfo &&
                                                `${order.shippingInfo.address}, ${order.shippingInfo.city}, ${order.shippingInfo.state}, ${order.shippingInfo.postalCode}, ${order.shippingInfo.country}`}
                                        </span>
                                    </div>
                                    <h1>Order Status</h1>
                                    <div className="orderDetailsContainerBox">
                                        <div>
                                            <p
                                                className={
                                                    order.orderStatus && order.orderStatus === "Delivered"
                                                        ? "greenColor"
                                                        : "redColor"
                                                }
                                            >
                                                {order.orderStatus && order.orderStatus}
                                            </p>
                                        </div>
                                        {order.orderStatus === "Delivered" && order.deliveredAt && (
                                            <div>
                                                <p>Delivered Date:</p>
                                                <span>
                                                    {new Date(order.deliveredAt).toLocaleString("en-IN", {
                                                        timeZone: "Asia/Kolkata",
                                                        dateStyle: "short",
                                                        timeStyle: "short",
                                                    })}
                                                </span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                            <div ref={componentRef} >
                                <div className="paymentDetailsContainerBox">
                                    <h4>Payment Bill:</h4>
                                    <hr style={{ marginBottom: '15px' }} />
                                    <div>
                                        <p
                                            className={
                                                order.paymentInfo &&
                                                    order.paymentInfo.status === "succeeded"
                                                    ? "greenColor"
                                                    : "redColor"
                                            }
                                        >
                                            {order.paymentInfo &&
                                                order.paymentInfo.status === "succeeded"
                                                ? "PAID"
                                                : "NOT PAID"}
                                        </p>
                                    </div>


                                    <div>
                                        <p>Name:</p>
                                        <span>{order?.user && user?.name}</span>
                                    </div>
                                    <div>
                                        <p>Phone:</p>
                                        <span>
                                            {order.shippingInfo && order.shippingInfo.phoneNo}
                                        </span>
                                    </div>
                                    <div>
                                        <p>Delivery Address:</p>
                                        <span>
                                            {order.shippingInfo &&
                                                `${order.shippingInfo.city}, ${order.shippingInfo.state}, ${order.shippingInfo.postalCode}`}
                                        </span>
                                    </div>
                                    <div>
                                        <p>Order ID:</p>
                                        <span>{order && order._id}</span>
                                    </div>
                                    <div className='orderDetailBill'>
                                        <table>
                                            <thead>
                                                <tr>
                                                    <th>Item</th>
                                                    <th>Quantity</th>
                                                    <th>Unit Price</th>
                                                    <th>Total</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {order.orderItems &&
                                                    order.orderItems.map((item) => (
                                                        <tr key={item._id} className="orderItem">
                                                            <td>
                                                                <Link to={`/product/${item.product}`}>{item.name}</Link>
                                                            </td>
                                                            <td>{item.quantity}</td>
                                                            <td>₹{item.price}</td>
                                                            <td>₹{item.price * item.quantity}</td>
                                                        </tr>
                                                    ))}
                                            </tbody>
                                            <tfoot>
                                                <tr>
                                                    <td colSpan="3">Total:</td>
                                                    <td>₹{order.itemsPrice}</td>
                                                </tr>
                                                <tr>
                                                    <td colSpan="3">Tax Price:</td>
                                                    <td>₹{order.taxPrice}</td>
                                                </tr>
                                                <tr>
                                                    <td colSpan="3">Shipping Price:</td>
                                                    <td>₹{order.shippingPrice}</td>
                                                </tr>
                                                <tr className='totalRow'>
                                                    <td colSpan="3">Gross Total:</td>
                                                    <td>₹{order.totalPrice}</td>
                                                </tr>
                                            </tfoot>
                                        </table>
                                    </div>
                                </div>

                                <button onClick={() => handleDownloadPDF()}>Download PDF</button>


                            </div>
                        </div>

                        <div className="orderDetailsCartItems">
                            <h1>Order Items:</h1>
                            <div className="orderDetailsCartItemsContainer">
                                {order.orderItems &&
                                    order.orderItems.map((item) => (
                                        <div key={item.product}>
                                            <img src={item.image} alt="Product" />
                                            <Link to={`/product/${item.product}`}>
                                                {item.name}
                                            </Link>{" "}
                                            <span>
                                                {item.quantity} X ₹{item.price} ={" "}
                                                <b>₹{item.price * item.quantity}</b>
                                            </span>
                                        </div>
                                    ))}
                            </div>
                        </div>
                    </div>
                </Fragment>
            )
            }
        </Fragment >
    )
}

export default OrderDetails