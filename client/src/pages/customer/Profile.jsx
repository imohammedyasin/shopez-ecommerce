import React, { useContext, useEffect, useState } from 'react';
import '../../styles/Profile.css';
import { GeneralContext } from '../../context/GeneralContext';
import axios from 'axios';

const Profile = () => {
  const { logout } = useContext(GeneralContext);

  const username = localStorage.getItem('username');
  const email = localStorage.getItem('email');

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await axios.get('/api/orders/fetch-orders');
      setOrders(response.data.reverse());
    } catch (err) {
      console.error("Error fetching orders:", err);
    } finally {
      setLoading(false);
    }
  };

  const cancelOrder = async (orderId) => {
    if (!orderId) {
      alert("Order ID is required");
      return;
    }

    if (!window.confirm("Are you sure you want to cancel this order?")) return;

    try {
      const { data } = await axios.put("/api/orders/cancel-order", { orderId });
      alert(data.message || "Order cancelled successfully!");
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === orderId ? { ...order, orderStatus: "Cancelled" } : order
        )
      );
    } catch (error) {
      alert(error.response?.data?.message || "Error cancelling order");
    }
  };

  return (
    <div className="profilePage">
      <div className="profileCard">
        <span>
          <h5>Username: </h5>
          <p>{username}</p>
        </span>
        <span>
          <h5>Email: </h5>
          <p>{email}</p>
        </span>
        <span>
          <h5>Orders: </h5>
          <p>{orders.length}</p>
        </span>
        <button className="btn btn-danger" onClick={logout}>Logout</button>
      </div>

      <div className="profileOrders-container">
        <h3>Orders</h3>
        {loading ? (
          <p>Loading orders...</p>
        ) : (
          <div className="profileOrders">
            {orders.length === 0 && <p>No orders yet</p>}
            {orders.map((order) => (
              <div className="profileOrder" key={order._id}>
                <img src={order.mainImg} alt={order.title} />
                <div className="profileOrder-data">
                  <h4>{order.title}</h4>
                  <p>{order.description}</p>
                  <div>
                    <span><p><b>Size: </b> {order.size}</p></span>
                    <span><p><b>Quantity: </b> {order.quantity}</p></span>
                    <span><p><b>Price: </b> &#8377; {parseInt(order.price - (order.price * order.discount) / 100) * order.quantity}</p></span>
                    <span><p><b>Payment: </b> {order.paymentMethod}</p></span>
                  </div>
                  <div>
                    <span><p><b>Address: </b> {order.address}</p></span>
                    <span><p><b>Pincode: </b> {order.pincode}</p></span>
                    <span><p><b>Ordered on: </b> {order.orderDate?.slice(0, 10)}</p></span>
                  </div>
                  <div>
                    <span><p><b>Order status: </b> {order.orderStatus}</p></span>
                  </div>
                  {(order.orderStatus === 'order placed' || order.orderStatus === 'Order placed' || order.orderStatus === 'In-transit') && (
                    <button className="btn btn-danger" onClick={() => cancelOrder(order._id)}>Cancel</button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
