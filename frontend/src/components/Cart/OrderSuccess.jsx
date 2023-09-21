import React from 'react'
import { AiFillCheckCircle } from 'react-icons/ai'
import { Link } from 'react-router-dom'
import './OrderSuccess.css'

const OrderSuccess = () => {
    return (
        <div className="orderSuccess">
            <AiFillCheckCircle />

            <h2>Your Order has been Placed successfully</h2>
            <Link to="/orders">View Orders</Link>
        </div>
    )
}

export default OrderSuccess