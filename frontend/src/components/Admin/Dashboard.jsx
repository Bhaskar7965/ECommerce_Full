import React, { useEffect } from 'react';
import Sidebar from './Sidebar.jsx';
import './Dashboard.css';
import { Link } from 'react-router-dom';
import ReactApexCharts from 'react-apexcharts';
import { useSelector, useDispatch } from 'react-redux';
import { getAdminProducts } from '../../actions/productAction.js';

const Dashboard = () => {

    let outOfStock = 0;
    const dispatch = useDispatch();

    const { products } = useSelector((state) => state.products);
    const { orders } = useSelector((state) => state.allOrders);
    const { users } = useSelector((state) => state.allUsers);

    products && products.forEach((product) => {
        if (product.stock === 0) {
            outOfStock += 1;
        }
    });

    useEffect(() => {
        dispatch(getAdminProducts());
    }, [dispatch]);

    const lineState = {
        options: {
            chart: {
                id: 'line-chart',
            },
            xaxis: {
                categories: ['Initial Amount', 'Amount Earned'],
            },
            colors: ['#f23d56'],
            dataLabels: {
                enabled: true,
            },
        },
        series: [
            {
                name: 'TOTAL AMOUNT',
                data: [0, 3455],
            },
        ],
    };

    const donutChartData = {
        options: {
            labels: ['outOfStock', 'In Stock'],
            colors: ['#f23d56', '#00A6B4'],
        },
        series: [outOfStock, products && products.length - outOfStock],
    };

    return (
        <div className='dashboard'>
            <Sidebar />
            <div className='dashboardContainer'>
                <h1>Dashboard</h1>
                <div className='dashboardSummary'>
                    <div>
                        <p>
                            Total Amount <br /> ₹1233
                        </p>
                    </div>
                    <div className='dashboardSummaryBox2'>
                        <Link to='/admin/products'>
                            <p>Product</p>
                            <p>{products && products.length}</p>
                        </Link>
                        <Link to='/admin/orders'>
                            <p>Orders</p>
                            <p>{orders && orders.length}</p>
                        </Link>
                        <Link to='/admin/users'>
                            <p>Users</p>
                            <p>{users && users.length}</p>
                        </Link>
                    </div>
                </div>

                <div className='lineChart'>
                    <ReactApexCharts
                        options={lineState.options}
                        series={lineState.series}
                        type='line'
                        height={350}
                    />
                </div>

                <div className="donutChart">
                    <ReactApexCharts
                        options={donutChartData.options}
                        series={donutChartData.series}
                        type="donut"
                        height={350}
                    />
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
