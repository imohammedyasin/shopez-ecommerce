import React, { useEffect, useState } from 'react';
import '../../styles/Admin.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { Bar, Doughnut } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Title, Tooltip, Legend);

const Admin = () => {
  const navigate = useNavigate();

  const [userCount, setUserCount] = useState(0);
  const [productCount, setProductCount] = useState(0);
  const [ordersCount, setOrdersCount] = useState(0);
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);

  const [banner, setBanner] = useState('');

  useEffect(() => {
    fetchCountData();
  }, []);

  const fetchCountData = async () => {
    try {
      const [usersRes, productsRes, ordersRes] = await Promise.all([
        axios.get('/api/users/fetch-users'),
        axios.get('/api/products/fetch-products'),
        axios.get('/api/orders/fetch-orders')
      ]);

      setUserCount(usersRes.data.length - 1);
      setProductCount(productsRes.data.length);
      setOrdersCount(ordersRes.data.length);
      setOrders(ordersRes.data);
      setProducts(productsRes.data);
    } catch (err) {
      console.error("Error fetching admin data:", err);
    }
  };

  const updateBanner = async () => {
    try {
      await axios.post('/api/admin/update-banner', { banner });
      alert("Banner updated");
      setBanner('');
    } catch (err) {
      alert("Banner update failed");
    }
  };

  // Chart data: Orders by status
  const orderStatusCounts = orders.reduce((acc, order) => {
    const status = order.orderStatus || 'unknown';
    acc[status] = (acc[status] || 0) + 1;
    return acc;
  }, {});

  const orderStatusChartData = {
    labels: Object.keys(orderStatusCounts),
    datasets: [{
      label: 'Orders by Status',
      data: Object.values(orderStatusCounts),
      backgroundColor: [
        '#4caf50', '#ff9800', '#2196f3', '#f44336', '#9c27b0', '#00bcd4'
      ],
      borderWidth: 1
    }]
  };

  // Chart data: Products by category
  const categoryCounts = products.reduce((acc, product) => {
    const cat = product.category || 'Uncategorized';
    acc[cat] = (acc[cat] || 0) + 1;
    return acc;
  }, {});

  const categoryChartData = {
    labels: Object.keys(categoryCounts),
    datasets: [{
      label: 'Products by Category',
      data: Object.values(categoryCounts),
      backgroundColor: [
        '#ff6384', '#36a2eb', '#ffce56', '#4bc0c0', '#9966ff', '#ff9f40', '#c9cbcf'
      ],
      borderWidth: 1
    }]
  };

  // Revenue chart data
  const revenueByMonth = orders.reduce((acc, order) => {
    if (order.orderDate && order.orderStatus !== 'Cancelled') {
      const date = new Date(order.orderDate);
      const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
      const revenue = (order.price - (order.price * order.discount) / 100) * order.quantity;
      acc[monthKey] = (acc[monthKey] || 0) + revenue;
    }
    return acc;
  }, {});

  const sortedMonths = Object.keys(revenueByMonth).sort();
  const revenueChartData = {
    labels: sortedMonths,
    datasets: [{
      label: 'Revenue (₹)',
      data: sortedMonths.map(m => Math.round(revenueByMonth[m])),
      backgroundColor: '#4caf50',
      borderColor: '#388e3c',
      borderWidth: 1
    }]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: 'top' }
    }
  };

  return (
    <div className="admin-page">
      {/* Summary Cards */}
      <div className="admin-summary-cards">
        <div className="admin-home-card">
          <h5>Total Users</h5>
          <p>{userCount}</p>
          <button onClick={() => navigate('/all-users')}>View all</button>
        </div>

        <div className="admin-home-card">
          <h5>All Products</h5>
          <p>{productCount}</p>
          <button onClick={() => navigate('/all-products')}>View all</button>
        </div>

        <div className="admin-home-card">
          <h5>All Orders</h5>
          <p>{ordersCount}</p>
          <button onClick={() => navigate('/all-orders')}>View all</button>
        </div>

        <div className="admin-home-card">
          <h5>Add Product</h5>
          <p>(new)</p>
          <button onClick={() => navigate('/new-product')}>Add now</button>
        </div>

        <div className="admin-banner-input admin-home-card">
          <h5>Update Banner</h5>
          <div className="form-floating">
            <input type="text" className="form-control" id="floatingURLInput" value={banner} onChange={(e) => setBanner(e.target.value)} />
            <label htmlFor="floatingURLInput">Banner URL</label>
          </div>
          <button onClick={updateBanner}>Update</button>
        </div>
      </div>

      {/* Charts Section */}
      <div className="admin-charts">
        <div className="admin-chart-card">
          <h5>Monthly Revenue</h5>
          <div className="chart-container">
            {sortedMonths.length > 0 ? (
              <Bar data={revenueChartData} options={chartOptions} />
            ) : (
              <p className="no-data">No revenue data yet</p>
            )}
          </div>
        </div>

        <div className="admin-chart-card">
          <h5>Order Status Distribution</h5>
          <div className="chart-container">
            {orders.length > 0 ? (
              <Doughnut data={orderStatusChartData} options={chartOptions} />
            ) : (
              <p className="no-data">No orders yet</p>
            )}
          </div>
        </div>

        <div className="admin-chart-card">
          <h5>Products by Category</h5>
          <div className="chart-container">
            {products.length > 0 ? (
              <Doughnut data={categoryChartData} options={chartOptions} />
            ) : (
              <p className="no-data">No products yet</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
