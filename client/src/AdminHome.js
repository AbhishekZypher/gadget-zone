import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';

const AdminHome = () => {
  return (
    <Container className="mt-5 text-center"> 
      <Row>
        <Col md={6} className="mx-auto"> 
          <h1>Welcome, Administrator!</h1>
          <p>This is the admin dashboard where you can manage the website.</p>
          <Button href="/adminOrders" variant="dark">Manage Orders</Button>{'       '}
          <Button href="/adminUser" variant="dark">Manage Users</Button>{'       '}
          <Button href="/adminProducts" variant="dark  ">Manage Products</Button>
        </Col>
      </Row>
    </Container>
  );
};

export default AdminHome;