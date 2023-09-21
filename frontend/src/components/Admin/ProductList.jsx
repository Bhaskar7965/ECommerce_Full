import React, { Fragment, useEffect } from 'react';
import Sidebar from './Sidebar.jsx';
import './ProductList.css';
import { Link, } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getAdminProducts, clearErrors } from '../../actions/productAction.js';
import { useAlert } from 'react-alert';
import MetaData from '../layout/MetaData.jsx';
import axios from 'axios';
import { MdDelete } from 'react-icons/md';
import { BsPencilSquare } from 'react-icons/bs';

const ProductList = () => {
    const alert = useAlert();
    const dispatch = useDispatch();

    const { error, products } = useSelector((state) => state.products);

    useEffect(() => {
        const fetchData = async () => {
            try {
                await dispatch(getAdminProducts());
                if (error) {
                    alert.error(error);
                    dispatch(clearErrors());
                }
            } catch (error) {
                console.error('Error fetching product list:', error);
            }
        };

        fetchData();
    }, [dispatch, alert, error]);

    const handleDeleteProduct = async (productId) => {
        try {
            await axios.delete(`/api/v1/admin/product/${productId}`);
            dispatch(getAdminProducts());
            alert.success('Product deleted successfully');
        } catch (error) {
            alert.error('Error deleting product');
        }
    };

    return (
        <Fragment>
            <MetaData title={`ALL PRODUCTS - Admin`} />

            <div className="dashboard">
                <Sidebar />
                <div className="productListContainer">
                    <h1 id="productListHeading">ALL PRODUCTS</h1>

                    <table>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Price</th>
                                <th>Stock</th>
                                <th>Actions</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products && products.map(product => (
                                <tr key={product._id}>
                                    <td>{product._id}</td>
                                    <td>{product.name}</td>
                                    <td>₹{product.price}</td>
                                    <td style={{ color: product.stock === 0 ? "red" : "green" }}>
                                        {product.stock}
                                    </td>
                                    <td>
                                        <Link to={`/admin/product/${product._id}`}><i style={{ color: 'blueviolet' }}><BsPencilSquare /></i></Link>
                                    </td>
                                    <td>
                                        <i
                                            className="fas fa-trash-alt"
                                            style={{ cursor: 'pointer', color: 'tomato', fontSize: '1.5rem' }}
                                            onClick={() => handleDeleteProduct(product._id)}
                                        ><MdDelete /></i>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </Fragment>
    )
}

export default ProductList