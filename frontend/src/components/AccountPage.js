import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { API_URL } from '../config';

const AccountPage = () => {
  const [accountInfo, setAccountInfo] = useState(null);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [serverError, setServerError] = useState('');
  const navigate = useNavigate();

  const deleteAccount = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('You must be logged in to delete your account');
      return;
    }

    try {
      const response = await fetch(`${API_URL}/delete-account`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        alert('Account deleted successfully');
        localStorage.removeItem('token');
        navigate('/login');
      } else {
        const result = await response.json();
        setServerError(result.error || 'Failed to delete account');
      }
    } catch (error) {
      console.error('Error deleting account:', error);
      setServerError('Failed to delete account');
    }
  };

  useEffect(() => {
    const fetchAccountData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          setError('You must be logged in to view this page');
          setLoading(false);
          return;
        }

        const response = await fetch(`${API_URL}/account`, {
          headers: {
            'Authorization': `Bearer ${token}`,
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
      <h2>Account Page</h2>
      {/* Display account information and orders */}
      {accountInfo && (
        <div>
          <h3>Account Information</h3>
          <p><strong>Name:</strong> {accountInfo.name}</p>
          <p><strong>Email:</strong> {accountInfo.email}</p>
        </div>
      )}
      {orders.length > 0 ? (
        <ul>
          {orders.map((order, index) => (
            <React.Fragment key={order.id}>
              <li>
                <h4>Order #{order.id}</h4>
                <div>
                  {order.items.map((item, idx) => (
                    <div key={idx}>
                      <p>{item.name} - {item.count || 1} pcs</p>
                    </div>
                  ))}
                </div>
                <p>{order.items.reduce((total, item) => total + (item.count || 1), 0)}<strong> Items</strong></p>
                <p><strong>Total:</strong> ${order.total.toFixed(2)}</p>
                <p><strong>Shipping Info:</strong> {order.shippingInfo.address}, {order.shippingInfo.city}, {order.shippingInfo.state}, {order.shippingInfo.zipCode}</p>
              </li>
              {index < orders.length - 1 && <hr />}
            </React.Fragment>
          ))}
        </ul>
      ) : (
        <p>No current orders.</p>
      )}
      <div className="text-center mt-3">
        <Link to="/" className="btn btn-primary me-2">Back to Home</Link>
        <button onClick={deleteAccount} className="btn btn-danger">Delete Account</button>
      </div>
      {serverError && <div className="alert alert-danger mt-3">{serverError}</div>}
    </div>
  );
};

export default AccountPage;