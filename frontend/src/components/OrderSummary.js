import React, { useEffect } from 'react';
import { Container, Card, ListGroup } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';

function OrderSummary({cartItems, setCartItems, total, setTotal, formData}) {
    
    // useEffect(() => {
    //     // Reset cart and total after showing order summary
    //     return () => {
    //         setCartItems([]);
    //         setTotal(0);
    //     };
    // }, [setCartItems, setTotal]);

    return (
        <Container className="py-5">
            <h2 className="mb-4">Order Summary</h2>
            <Card className="mb-4">
                <Card.Header>
                    <h4>Customer Information</h4>
                </Card.Header>
                <Card.Body>
                    <p><strong>Name:</strong> {formData.fullName}</p>
                    <p><strong>Email:</strong> {formData.email}</p>
                    <p><strong>Shipping Address:</strong> {formData.address}</p>
                    <p>{formData.city}, {formData.state} {formData.zipCode}</p>
                </Card.Body>
            </Card>

            <Card>
                <Card.Header>
                    <h4>Order Details</h4>
                </Card.Header>
                <ListGroup variant="flush">
                    {cartItems.map((item, index) => (
                        <ListGroup.Item key={index} className="d-flex justify-content-between">
                            <span>{item.name}</span>
                            <span>${item.price.toFixed(2)}</span>
                        </ListGroup.Item>
                    ))}
                    <ListGroup.Item className="d-flex justify-content-between">
                        <strong>Total</strong>
                        <strong>${total.toFixed(2)}</strong>
                    </ListGroup.Item>
                </ListGroup>
            </Card>
        </Container>
    );
}

export default OrderSummary;
