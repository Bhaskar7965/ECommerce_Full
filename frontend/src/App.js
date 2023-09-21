import './App.css';
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import WebFont from 'webfontloader';
import ProductDetails from './components/Product/ProductDetails.jsx';
import Header from './components/layout/Header/Header';
import Footer from './components/layout/Footer/Footer';
import UserOptions from './components/layout/Header/UserOptions';
import Home from './components/Home/Home.jsx';
import Products from './components/Product/Products';
import Search from './components/Product/Search.jsx';
import LoginSignup from './components/User/LoginSignup';
import Profile from './components/User/Profile.jsx';
import UpdateProfile from './components/User/UpdateProfile';
import UpdatePassword from './components/User/UpdatePassword';
import Shipping from './components/Cart/Shipping';
import Cart from './components/Cart/Cart';
import ConfirmOrder from './components/Cart/ConfirmOrder';
import Payment from './components/Cart/Payment';
import OrderSuccess from './components/Cart/OrderSuccess';
import MyOrders from './components/Order/MyOrders';
import OrderDetails from './components/Order/OrderDetails';
import Dashboard from './components/Admin/Dashboard';
import ProductList from './components/Admin/ProductList';
import UpdateProduct from './components/Admin/UpdateProduct.jsx';
import ProcessOrder from './components/Admin/ProcessOrder.jsx';
import UserLists from './components/Admin/UserLists.jsx';
import NewProduct from './components/Admin/NewProduct';
import OrderList from './components/Admin/OrderList';
import store from './store';
import { getAllUsers, loadUser } from './actions/userAction';
import { useSelector } from 'react-redux';
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import axios from 'axios';
import { getAllOrders } from './actions/orderAction';

function App() {

  const { isAuthenticated, user } = useSelector((state) => state.user);
  const [stripeApiKey, setStripeApiKey] = useState('');

  async function getStripeApiKey() {
    const { data } = await axios.get('/api/v1/stripeapi');
    setStripeApiKey(data.stripeApiKey);
  }

  useEffect(() => {
    WebFont.load({
      google: {
        families: ['Roboto', 'Droid Sans', 'Chilanka'],
      },
    });

    store.dispatch(loadUser());
    getStripeApiKey();
    getAllOrders();
    getAllUsers();
  }, []);

  return (
    <Router>
      <Header />
      {isAuthenticated && <UserOptions user={user} />}
      <Elements stripe={loadStripe(stripeApiKey)}>
        <Routes> {/* Wrap routes with <Routes> */}
          <Route exact path="/" element={<Home />} />
          <Route exact path="/product/:id" element={<ProductDetails />} />
          <Route exact path="/products" element={<Products />} />
          <Route path="/products/:keyword" element={<Products />} />
          <Route exact path='/search' element={<Search />} />
          <Route
            exact
            path="/account"
            element={isAuthenticated ? <Profile /> : <Navigate to="/login" />}
          />
          <Route
            exact
            path="/password/update"
            element={isAuthenticated ? <UpdatePassword /> : <Navigate to="/login" />}
          />
          <Route
            exact
            path="/me/update"
            element={isAuthenticated ? <UpdateProfile /> : <Navigate to="/login" />}
          />
          <Route
            exact
            path="/Cart"
            element={isAuthenticated ? <Cart /> : <Navigate to="/login" />}
          />
          <Route
            exact
            path="/shipping"
            element={isAuthenticated ? <Shipping /> : <Navigate to="/login" />}
          />
          <Route
            exact
            path="/order/confirm"
            element={isAuthenticated ? <ConfirmOrder /> : <Navigate to="/login" />}
          />

          <Route
            exact
            path='/process/payment'
            element={isAuthenticated ? <Payment /> : <Navigate to="/login" />}
          />
          <Route
            exact
            path='/success'
            element={isAuthenticated ? <OrderSuccess /> : <Navigate to="/login" />}
          />
          <Route
            exact
            path='/orders'
            element={isAuthenticated ? <MyOrders /> : <Navigate to="/login" />}
          />
          <Route
            exact
            path='/order/:id'
            element={isAuthenticated ? <OrderDetails /> : <Navigate to="/login" />}
          />

          <Route
            exact
            path='/admin/dashboard'
            element={isAuthenticated && user.role === 'admin' ? <Dashboard /> : <Navigate to="/login" />}
          />
          <Route
            exact
            path='/admin/products'
            element={isAuthenticated && user.role === 'admin' ? <ProductList /> : <Navigate to="/login" />}
          />
          <Route
            exact
            path='/admin/product'
            element={isAuthenticated && user.role === 'admin' ? <NewProduct /> : <Navigate to="/login" />}
          />
          <Route
            exact
            path='/admin/product/:id'
            element={isAuthenticated && user.role === 'admin' ? <UpdateProduct /> : <Navigate to="/login" />}
          />
          <Route
            exact
            path='/admin/orders'
            element={isAuthenticated && user.role === 'admin' ? <OrderList /> : <Navigate to="/login" />}
          />
          <Route
            exact
            path='/admin/order/:id'
            element={isAuthenticated && user.role === 'admin' ? <ProcessOrder /> : <Navigate to="/login" />}
          />
          <Route
            exact
            path='admin/users'
            element={isAuthenticated && user.role === 'admin' ? <UserLists /> : <Navigate to="/login" />}
          />

          <Route exact path='/login' element={<LoginSignup />} />
        </Routes>
      </Elements>
      <Footer />
    </Router >
  );
}

export default App;
