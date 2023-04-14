import React, { useState } from "react";
import { Container, Row, Col, Form, FormGroup } from "reactstrap";
import Helmet from "../components/Helmet/Helmet";
import CommonSection from "../components/UI/CommonSection";

import "../styles/checkout.css";
import { useSelector } from "react-redux";
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js'
import PaymentForm from "../components/PaymentForm";

const PUBLIC_KEY = "pk_test_51MZhWVBDbLXLPKqShy9eOAHqZHoEveD71quiHMpj8HBsf6FgMOkRPwyeN9cmfgVANBrEN3v0o4pi4ANQSN4bjWz000nxCbbEtS"

const stripeTestPromise = loadStripe(PUBLIC_KEY);

const Checkout = () => {
  const totalQty = useSelector((state) => state.cart.totalQuantity);
  const totalAmount = useSelector((state) => state.cart.totalAmount);
  const tax = totalAmount * 0.0825;
  const [discountCode, setDiscountCode] = useState("");
  const [discountApplied, setDiscountApplied] = useState(false);

  let discountAmount = 0;
  if (discountApplied && (discountCode.toLowerCase().includes("military") || discountCode.toLowerCase().includes("sorry10"))) {
    discountAmount = totalAmount * 0.1;
  }

  const handleDiscountApply = () => {
    setDiscountApplied(true);
  };

  const handleDiscountClear = () => {
    setDiscountCode("");
    setDiscountApplied(false);
  };

  const buttonStyle = {
    border: "none",
    outline: "none",
    padding: "8px 20px",
    borderRadius: "5px",
    backgroundColor: "#591183",
    color: "white",
    cursor: "pointer",
    fontSize: "1rem",
    marginTop: "5px",
  };

  return (
    <Helmet title="Checkout">
      <CommonSection title="Checkout" />
      <section>
        <Container>
          <Row>
            <Col lg="8">
              <h6 className="mb-4 fw-bold">Billing Information</h6>
              <Form className="billing__form">
                <FormGroup className="form__group">
                  <input type="text" placeholder="Enter your name" />
                </FormGroup>

                <FormGroup className="form__group">
                  <input type="email" placeholder="Enter your email" />
                </FormGroup>

                <FormGroup className="form__group w-25">
                  <label>Discount code?</label>
                  <input
                    type="text"
                    placeholder="Enter discount code"
                    value={discountCode}
                    onChange={(e) => setDiscountCode(e.target.value)}
                  />
                  <button
                    style={buttonStyle}
                    type="button"
                    onClick={handleDiscountApply}
                  >
                    Apply
                  </button>
                  
                </FormGroup>
                
                
              </Form>
            </Col>

            <Col lg="4">
              <div className="checkout__cart">
                <h6>
                  Total Qty: <span>{totalQty} items</span>
                </h6>
                <h6>
                  Subtotal: <span>${totalAmount.toFixed(2)}</span>
                  </h6>

{discountAmount > 0 && (
  <h6>
    Discount:
    <span style={{ color: "green" }}>
      -${discountAmount.toFixed(2)}
    </span>
  </h6>
)}

<h6>
  <span>Tax:</span>
  <span>${tax.toFixed(2)}</span>
</h6>

<h4>
  Total Cost:{" "}
  <span>
    ${(totalAmount + tax - discountAmount).toFixed(2)}
  </span>
</h4>
</div>
<Elements stripe={stripeTestPromise}>
                  <PaymentForm />
                </Elements>
</Col>
</Row>
</Container>
</section>
</Helmet>
);
};

export default Checkout;