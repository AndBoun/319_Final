import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const AccountPage = () => {
  const [accountInfo, setAccountInfo] = useState(null);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch account information and orders from the backend
    const fetchAccountData = async () => {
      const token = localStorage.getItem('token'); // Retrieve the token from localStorage or other storage
      if (!token) {
        setError('Unauthorized: No token provided');
        setLoading(false);
        return;
      }

      try {
        const response = await fetch('http://localhost:8080/account', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
        });

        const contentType = response.headers.get('content-type');
        if (!contentType || !contentType.includes('application/json')) {
          throw new Error('Invalid response from server');
        }

        if (response.ok) {
          const data = await response.json();
          setAccountInfo(data.accountInfo);
          setOrders(data.orders);
          setLoading(false);
        } else {
          const result = await response.json();
          setError(result.error);
          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching account data:", error);
        setError('Failed to fetch account data');
        setLoading(false);
      }
    };

    fetchAccountData();
  }, [navigate]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="alert alert-danger" role="alert">{error}</div>;
  }

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6">
          <div className="card shadow">
            <div className="card-body">
              <h2 className="card-title text-center mb-4">Account Information</h2>
              {accountInfo && (
                <div className="mb-3">
                  <p><strong>Email:</strong> {accountInfo.email}</p>
                </div>
              )}
              <h3 className="card-title text-center mb-4">Current Orders</h3>
              {orders.length > 0 ? (
                <ul className="list-group">
                  {orders.map((order, index) => (
                    <li key={index} className="list-group-item">
                      <p><strong>Order ID:</strong> {order.id}</p>
                      <p><strong>Items:</strong> {order.items.join(', ')}</p>
                      <p><strong>Total:</strong> ${order.total}</p>
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No current orders.</p>
              )}
              <div className="text-center mt-3">
                <Link to="/" className="btn btn-primary">Back to Home</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountPage;