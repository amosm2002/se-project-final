import React from 'react'
import "./footer.css"

import { Container, Row, Col, ListGroup, ListGroupItem } from 'reactstrap';
import logo from '../../assets/images/logo.png'

const Footer = () => {

  const year = new Date().getFullYear()
  return (
    <footer className="footer">
      <Container>
        
          
          <div className="logo">
            <div className="logo__holder">
            <img src={logo}/>
              <h1 className="logo__title">Known Query</h1>
            </div>
            </div>
            <p className="footer__text mt-4">
            Our mission is to provide an unparalleled shopping experience for our customers, 
            offering a vast selection of high-quality products at competitive prices. 
            We strive to make shopping with us easy and convenient, 
            with seamless navigation, efficient checkout, and reliable delivery. 
            Our goal is to consistently exceed customer expectations and to build lasting relationships based on trust, 
            value, and satisfaction. We are committed to being an ethical and responsible business, 
            while always striving to innovate and improve.
            </p>
          
          <Col lg='12'>
            <p className="footer__copyright"></p>
          </Col>
        
      </Container>
    </footer>
  );
};

export default Footer