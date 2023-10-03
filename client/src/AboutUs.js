import React from 'react';
// import './css/Laptops.css';
import { Row, Col, Container } from 'react-bootstrap';
import bckImg from './img/aboutUs.png';
import genImg from './img/amiGan.jpg';
import gatesImg from './img/billGates.jpg';
import muskImg from './img/elonMusk.jpg';

const AboutUs = () => {

  return (
<div className="products-grid">
    <h1>About Us</h1>
    <Container>
      <Row className="mt-5">
        <Col md={6}>
          <h2>About GadgetZone</h2>
          <p>
            Welcome to GadgetZone, your one-stop destination for all your electronic needs. We are passionate about technology and strive to provide the latest and greatest gadgets to our customers.
          </p>
          <p>
            At GadgetZone, we believe in offering high-quality products at competitive prices. We carefully curate our inventory to ensure that we only offer the best brands and products to our customers. Whether you're looking for smartphones, laptops, gaming consoles, or smart home devices, we have you covered.
          </p>
          <p>
            Our team of knowledgeable and friendly experts is always ready to assist you with any queries or concerns you may have. We pride ourselves on providing exceptional customer service, making your shopping experience with us a breeze.
          </p>
        </Col>
        <Col md={6}>
          <img src={bckImg} alt="About Us" className="img-fluid" />
        </Col>
      </Row>

        <h2>OUR TEAM</h2>

        <Row className="mt-5">
        <Col xs={12} md={4}>
          <img src={genImg} alt="Amrapali Gan" className="img-fluid" />
          <h2>Amrapali Gan</h2>
          <p className="title">CEO</p>
          <p>
          Amrapali Gan is an Indian-American businesswoman. In December 2021, she was appointed as CEO of OnlyFans, which she joined in September 2020 as chief marketing and communications officer.
          She succeeded founding CEO Tim Stokely. She stepped down in July 2023. She has previously worked for Red Bull and Quest Nutrition, and was VP of Cannabis Cafe.
          </p>
          <p>amrapaliGan@gmail.com</p>
        </Col>

        <Col xs={12} md={4}>
          <img src={gatesImg} alt="Bill Gates" className="img-fluid" />
          <h2>Bill Gates</h2>
          <p className="title">Founder</p>
          <p>
          Bill Gates is an American entrepreneur, software developer, and philanthropist. Born on October 28, 1955, he co-founded Microsoft in 1975, playing a pivotal role in the personal 
          computer revolution. As the CEO and chief software architect, he led the company to unprecedented success. Gates stepped down from his full-time role at Microsoft in 2006 to focus 
          on the Bill & Melinda Gates Foundation, a global philanthropic organization he co-founded with his then-wife. The foundation aims to improve healthcare, reduce poverty, and enhance 
          education worldwide. A visionary and influential figure in technology and philanthropy, Gates remains a prominent advocate for global development and public health initiatives.
          </p>  
          <p>billGates@gmail.com</p>
        </Col>

        <Col xs={12} md={4}>
          <img src={muskImg} alt="Elon Musk" className="img-fluid" />
          <h2>Elon Musk</h2>
          <p className="title">COO</p>
          <p>
            Elon Musk, a visionary entrepreneur and CEO of SpaceX, Tesla, Neuralink, and former CEO of PayPal, is renowned for his groundbreaking innovations in space exploration, electric vehicles, and 
            brain-computer interfaces. Born in South Africa in 1971, Musk co-founded Zip2 and X.com before achieving success with his ventures. SpaceX revolutionized space travel, reusability, and Mars 
            colonization aspirations. Tesla transformed the electric car market, promoting sustainable transportation. His ambition for renewable energy and AI integration reshaped industries. Despite 
            controversies, Musk's relentless pursuit of bold ideas continues to inspire and influence the world's technological landscape, making him a prominent figure in modern history.
          </p>
          <p>elonMusk@gmail.com</p>
        </Col>
      </Row>

    </Container>
    </div>
  );
};

export default AboutUs;
