import React from "react";
import "../styles/cart.css";
import Helmet from "../components/Helmet/Helmet";
import CommonSection from "../components/UI/CommonSection";
import { Container, Row, Col } from "reactstrap";

import { motion } from "framer-motion";
import { cartActions } from "../redux/slices/cartSlice";
import { useSelector, useDispatch } from "react-redux";

import { Link } from "react-router-dom";

// Define the Cart component
const Cart = () => {
  // Retrieve cart data from the Redux store using the `useSelector` hook
  const cartItems = useSelector((state) => state.cart.cartItems);
  const totalAmount = useSelector((state) => state.cart.totalAmount);

  // Render the component
  return (
    <Helmet title="Cart">
      {/* Render a header section */}
      <CommonSection title="Shopping Cart" />

      {/* Render the main content of the cart */}
      <section>
        <Container>
          <Row>
            <Col lg="9">
              {/* If there are no items in the cart, render a message */}
              {cartItems.length === 0 ? (
                <h2 className="fs-4 text-center">No item added to the cart</h2>
              ) : (
                // Otherwise, render a table of the cart items
                <table className="table bordered">
                  <thead>
                    <tr>
                      <th>Image</th>
                      <th>Title</th>
                      <th>Price</th>
                      <th>Qty</th>
                      <th>Delete</th>
                    </tr>
                  </thead>

                  <tbody>
                    {/* Map over the cart items and render each one */}
                    {cartItems.map((item, index) => (
                      <Tr item={item} key={index} />
                    ))}
                  </tbody>
                </table>
              )}
            </Col>

            <Col lg="3">
              {/* Render the total amount of the cart */}
              <div>
                <h6 className="d-flex align-items-center justify-content-between ">
                  Subtotal
                  <span className="fs-4 fw-bold">${totalAmount}</span>
                </h6>
              </div>
              {/* Render a message about taxes and shipping */}
              <p className="fs-6 mt-2">
                taxes and shipping will calculate in checkout
              </p>
              {/* Render checkout and continue shopping buttons */}
              <div>
                <button className="buy__btn w-100 ">
                  <Link to="/checkout">Checkout</Link>
                </button>
                <button className="buy__btn w-100 mt-3">
                  <Link to="/shop">Continue Shopping</Link>
                </button>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

// Define a sub-component for rendering each row of the cart items table
const Tr = ({ item }) => {
  const dispatch = useDispatch();

  // Define a function to delete the product using the `cartActions` reducer
  const deleteProduct = () => {
    dispatch(cartActions.deleteItem(item.id));
  };

  // Render the row of the table
  return (
    <tr>
      <td>
        <img src={item.imgUrl} alt="" />
      </td>
      <td>{item.productName}</td>
      <td>${item.price}</td>
      <td>{item.quantity}px</td>
      {/* Render a delete button with a motion effect */}
      <td>
        <motion.i
          whileTap={{ scale: 1.2 }}
          onClick={deleteProduct}
          class="ri-delete-bin-line"
        ></motion.i>
      </td>
    </tr>
  );
};

// Export the Cart component as the default export of the module
export default Cart;
