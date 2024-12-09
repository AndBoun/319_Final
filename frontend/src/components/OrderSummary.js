import React, { useEffect } from "react";
import { Container, Card, ListGroup, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

function OrderSummary({ cartItems, setCartItems, total, setTotal, formData }) {
  const navigate = useNavigate();

  const handleComplete = async () => {
    try {
      const response = await fetch('http://localhost:8080/create-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: formData.email, cartItems, total, formData }),
      });

      if (response.ok) {
        setCartItems([]);
        setTotal(0);
        alert("Order completed! Thank you for your purchase.");
        navigate('/');
      } else {
        alert("Failed to complete the order. Please try again.");
      }
    } catch (error) {
      console.error('Error completing order:', error);
      alert("Failed to complete the order. Please try again.");
    }
  };

  // Helper function to group cart items
  const groupedCartItems = cartItems.reduce((acc, item) => {
    const existingItem = acc.find((i) => i.name === item.name);
    if (existingItem) {
      existingItem.count++;
      existingItem.totalPrice += item.price;
    } else {
      acc.push({ ...item, count: 1, totalPrice: item.price });
    }
    return acc;
  }, []);

  return (
    <Container className="py-5">
      <h2 className="mb-4">Order Summary</h2>
      <Card className="mb-4">
        <Card.Header style={{ backgroundColor: '#779B9D', color: 'white' }}>
          <h4 style={{color: 'white'}}>Customer Information</h4>
        </Card.Header>
        <Card.Body>
          <p>
            <strong>Name:</strong> {formData.fullName}
          </p>
          <p>
            <strong>Email:</strong> {formData.email}
          </p>
          <p>
            <strong>Shipping Address:</strong> {formData.address}
          </p>
          <p>
            {formData.city}, {formData.state} {formData.zipCode}
          </p>
        </Card.Body>
      </Card>

      <Card>
        <ListGroup variant="flush">
          {groupedCartItems.map((item, index) => (
            <ListGroup.Item
              key={index}
              className="d-flex justify-content-between align-items-center px-4 py-3"
            >
              <div className="d-flex align-items-center">
                <img
                  src={item.image}
                  alt={item.attribute}
                  style={{
                    width: "50px",
                    marginRight: "15px",
                    objectFit: "cover",
                  }}
                />
                <span>
                  {item.name} x{item.count}
                </span>
              </div>
              <span>${item.totalPrice.toFixed(2)}</span>
            </ListGroup.Item>
          ))}
          <ListGroup.Item className="d-flex justify-content-between px-4 py-3">
            <strong>Total</strong>
            <strong>${total.toFixed(2)}</strong>
          </ListGroup.Item>
        </ListGroup>
      </Card>

      <div className="text-center mt-4">
        <Button
          variant="primary"
          type="submit"
          size="lg"
          onClick={handleComplete}
        >
          <Link to="/" style={{ color: "white", textDecoration: "none" }}>
            Complete Purchase
          </Link>
        </Button>
      </div>
    </Container>
  );
}

export default OrderSummary;