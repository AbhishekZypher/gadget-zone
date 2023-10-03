import React from 'react';
import { Button, Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom'; 
import './css/OrderPlaced.css';

const OrderPlaced = () => {
  return (
    <Container className="mt-5 mainContainer">

          <div className="text-center">
            <h2>Your order has been placed successfully</h2>
            <p>Thank you for shopping with us!</p>
            <br /><br /><br /><br /><br />
            <Link to="/">
              <Button variant="primary">Continue Shopping</Button>
            </Link>
          </div>

    </Container>
  );
};

export default OrderPlaced;
