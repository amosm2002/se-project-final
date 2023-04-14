import React, { useState } from "react";
import { motion } from "framer-motion";
import "../../styles/product-card.css";
import { Col } from "reactstrap";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

import { useDispatch } from "react-redux";
import { cartActions } from "../../redux/slices/cartSlice";

const ProductCard = ({ item }) => {
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(item.quantity);

  const addToCart = () => {
    dispatch(
      cartActions.addItem({
        id: item.id,
        productName: item.productName,
        price: item.price,
        imgUrl: item.imgUrl,
      })
    );

    setQuantity((prevQuantity) => prevQuantity - 1);

    toast.success("Product added successfully");
  };

  return (
    <Col lg="3" md="4" className="mb-2">
      <div className="product__item">
        <div className="product__img">
          <motion.img
            whileHover={{ scale: 0.9 }}
            src={item.imgUrl}
            alt=""
            className="product__img-element"
          />
        </div>
        <div className="p-2 product__info">
          <h3 className="product__name">
            <Link to={`/shop/${item.id}`}>{item.productName}</Link>
          </h3>
          <span>
            {item.category} ({quantity} items left)
          </span>
        </div>

        <div className="product__card-bottom d-flex align-items-center justify-content-between p-2">
          <span className="price">${item.price}</span>
          <div >
            <motion.span whileTap={{ scale: 1.2 }} onClick={addToCart}>
              <h1>Add to Cart</h1>
            </motion.span>
          </div>
        </div>
      </div>
    </Col>
  );
};

export default ProductCard;