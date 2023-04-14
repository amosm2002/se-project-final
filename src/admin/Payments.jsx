import React, { useState } from "react";
import { Container, Row, Col, Form, FormGroup } from "reactstrap";
import { toast } from "react-toastify";

import { useNavigate } from "react-router-dom";

const Payments = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const generateDiscountCode = () => {
    toast.success("Discount code created");
    navigate("/home/");
  };
  
  return (
    <section>
      <Container>
        <Row>
          <Col lg="12">
            {loading ? (
              <h4 className="py-5 ">Loading.......</h4>
            ) : (
              <>
                <h4 className="mb-5">Create Discount Code</h4>
                <Form>
                  <FormGroup className="form__group w-25">
                    <span style={{ color: "purple" }}>Discount Code</span>
                    <input type="text" placeholder="......" style={{ color: "purple" }} />
                  </FormGroup>
                  <FormGroup className="form__group w-25">
                    <span style={{ color: "purple" }}>Reason</span>
                    <input type="text" placeholder="......" style={{ color: "purple" }} />
                  </FormGroup>

                  <div className="d-flex align-items-center justify-content-between gap-5">
                    <FormGroup className="form__group w-50">
                      <span style={{ color: "purple" }}>Discount Percent</span>
                      <select className="select-box p-2" style={{ color: "purple" }}>
                        <option disabled>Select discount percent</option>
                        {[...Array(21)].map((_, i) => (
                          <option key={i}>{`${i * 5}%`}</option>
                        ))}
                      </select>
                    </FormGroup>
                  </div>

                  <button className="buy__btn" type="submit" onClick={generateDiscountCode}>
                    Create Discount Code
                  </button>
                </Form>
              </>
            )}
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Payments;