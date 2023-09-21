import React, { Fragment, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useAlert } from "react-alert";
import { Button } from "@material-ui/core";
import MetaData from "../layout/MetaData";
import './orderList.css'
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import SideBar from "./Sidebar";
import { deleteOrder, getAllOrders, clearErrors } from "../../actions/orderAction";
import { DELETE_ORDER_RESET } from "../../constants/orderConstants";
import { useNavigate } from "react-router-dom";

const OrderList = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();

  const { error, orders } = useSelector((state) => state.allOrders);
  const { error: deleteError, isDeleted } = useSelector((state) => state.order);

  const deleteOrderHandler = (id) => {
    dispatch(deleteOrder(id));
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (deleteError) {
      alert.error(deleteError);
      dispatch(clearErrors());
    }

    if (isDeleted) {
      alert.success("Order Deleted Successfully");
      navigate("/admin/orders");
      dispatch({ type: DELETE_ORDER_RESET });
    }

    dispatch(getAllOrders());
  }, [dispatch, alert, error, deleteError, navigate, isDeleted]);

  return (
    <Fragment>
      <MetaData title={`ALL ORDERS - Admin`} />

      <div className="OrdersPage">
        <SideBar />
        <div className="productListContainer">
          <h1 id="productListHeading">ALL ORDERS</h1>
          <table>
            <thead>
              <tr>
                <th style={{ minWidth: 300, flex: 1 }}>Order ID</th>
                <th style={{ minWidth: 150, flex: 0.5 }}>Status</th>
                <th style={{ minWidth: 150, flex: 0.4 }}>Items Qty</th>
                <th style={{ minWidth: 270, flex: 0.5 }}>Amount</th>
                <th style={{ minWidth: 150, flex: 0.3 }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders &&
                orders.map((order) => (
                  <tr key={order._id}>
                    <td style={{ minWidth: 300, flex: 1 }}>{order._id}</td>
                    <td
                      style={{
                        minWidth: 150,
                        flex: 0.5,
                        color: order.orderStatus === "Delivered" ? "green" : "red",
                      }}
                    >
                      {order.orderStatus}
                    </td>
                    <td style={{ minWidth: 150, flex: 0.4 }}>{order.orderItems.length}</td>
                    <td style={{ minWidth: 270, flex: 0.5 }}>{order.totalPrice}</td>
                    <td style={{ minWidth: 150, flex: 0.3 }}>
                      <Link to={`/admin/order/${order._id}`}>
                        <AiFillEdit /> Edit
                      </Link>
                      <Button onClick={() => deleteOrderHandler(order._id)}>
                        <AiFillDelete />
                      </Button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </Fragment>
  );
};

export default OrderList;
