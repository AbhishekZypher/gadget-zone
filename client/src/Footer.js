import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import './css/Footer.css';

function Footer() {
  return (
    <footer className="footer" style={{ backgroundColor: '#f4f6f9',color: 'black' }}>
      <div className="footer-top" style={{ backgroundColor: '#f4f6f9' }}>
        <Container>
          <Row>
            <Col lg={3} md={6}>
              <h5>Services</h5>
              <ul className="list-unstyled custom-list">
                <li><Button className="custom-button" variant="link" href="/">Home</Button></li>
                <li><Button className="custom-button" variant="link" href="/allProducts">Products</Button></li>
                <li><Button className="custom-button" variant="link" href="#about">About</Button></li>
                <li><Button className="custom-button" variant="link" href="/signup">Join Us</Button></li>
              </ul>
            </Col>
            <Col lg={3} md={6}>
              <h5>Our Moto</h5>
              <ul className="list-unstyled">
                <li>"The only way to do great work is to love what you do." - Steve Jobs</li><br/>
                <li>"Success is not the key to happiness. Happiness is the key to success." - Albert Schweitzer</li>
              </ul>
            </Col>
            <Col lg={6} md={12}>
              <h5>About Us</h5>
              <p> 150 Main Street, suite 402, Cambridge, ON N1R 6P9.</p>
              <p> Mob: 519-623-4890 </p>
            </Col>
          </Row>
          <Row>
        <Col>
          <div className="line-container">
            <hr className="line" />
            <div className="line-text" style={{marginBottom:'15px'}}>© 2023 Gadget Zone. All rights reserved.</div>
          </div>
        </Col>
      </Row>
        </Container>
      </div>
    </footer>
  );
}

export default Footer;
