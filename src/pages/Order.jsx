import React, { useState } from 'react'
import { Container, Row, Col, Form, FormGroup } from 'reactstrap'
import Helmet from "../components/Helmet/Helmet";

function Order() {
  const [confirmationCode, setConfirmationCode] = useState(Math.random().toString(36).substring(2, 8).toUpperCase())

  return (
    <Helmet title="Order Confirmation">
      <section style={{ minHeight: "70vh" }}>
        <Container>
          <Row>
            <Col lg="12" className="text-center">
              <h2 style={{ fontSize: "5rem", fontWeight: "bold" }}>Order Confirmed!</h2>
              <h4 style={{ marginTop: "2rem", fontSize: "2rem", fontWeight: "bold", display: "block", textAlign: "center" }}>Confirmation Code: {confirmationCode}</h4>
              <p style={{ marginTop: "2rem", fontSize: "1.5rem" }}>Thank you for your purchase. Please do business with us again!</p>
            </Col>
          </Row>
        </Container>
      </section>
    </Helmet>
  )
}

export default Order