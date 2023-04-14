import React from "react";
import { useEffect } from "react";

import CommonSection from "../components/UI/CommonSection";
import Helmet from "../components/Helmet/Helmet";
import { Container, Row, Col } from "reactstrap";

import "../styles/shop.css";

import ProductsList from "../components/UI/ProductsList";
import useGetData from "../custom-hooks/useGetData";

import { useState } from "react";


const Shop = () => {
  const { data: products} = useGetData("products");
  const [productsData, setProductsData] = useState([]);
  const [sortBy, setSortBy] = useState('reset');
  useEffect(() => {
    setProductsData([...products]);
  }, [products]);

  const handleFilter = (e) => {
    const filterValue = e.target.value;

    if(filterValue === "reset") {
      setProductsData(products);
    }
    if(filterValue === "accessories") {
      const filteredProducts = products.filter(item => item.category === "accessories");

      setProductsData(filteredProducts);
    }
    if(filterValue === "electronics") {
      const filteredProducts = products.filter(item => item.category === "electronics");

      setProductsData(filteredProducts);
    }
    if(filterValue === "books") {
      const filteredProducts = products.filter(item => item.category === "books");

      setProductsData(filteredProducts);
    }
    if(filterValue === "toys") {
      const filteredProducts = products.filter(item => item.category === "toys");

      setProductsData(filteredProducts);
    }
    if(filterValue === "handmade") {
      const filteredProducts = products.filter(item => item.category === "handmade");

      setProductsData(filteredProducts);
    }
    setSortBy('reset'); 
  }

  const handleFilterPrice = (e) => {
    const filterValue = e.target.value;
    if(filterValue === "reset") {
      setProductsData(products);
    }
    else if (filterValue === "expensive") {
      const sortedProducts = productsData.slice().sort((a, b) => b.price - a.price);
      setProductsData(sortedProducts);
      setSortBy('expensive'); 
    }
    else {
      const sortedProducts = productsData.slice().sort((a, b) => a.price - b.price);
      setProductsData(sortedProducts);
      setSortBy('cheapest'); 
    }
  }


  const handleSearch = e => {
    const searchTerm = e.target.value

    const searchedProducts = products.filter(item => item.productName.toLowerCase().includes(searchTerm.toLowerCase()))

    setProductsData(searchedProducts)
  }


  return (
    <Helmet title="Shop">
      <CommonSection title="Products" />
      <section>
        <Container>
          <Row>
          <Col lg="6" md="12">
              <div className="search__box">
                <input
                  type="text"
                  placeholder="Search......"
                  onChange={handleSearch}
                />
                <span>
                  <i class="ri-search-line"></i>
                </span>
              </div>
            </Col>
            <Col lg="3" md="6">
              <div className="filter__widget">
                <select onChange={handleFilter}>
                  <option value="reset">Filter By Category</option>
                  <option value="accessories">Clothing, Shoes, Jewelry & Watches</option>
                  <option value="electronics">Electronics</option>
                  <option value="books">Books</option>
                  <option value="toys">Toys</option>
                  <option value="handmade">Handmade</option>

                </select>
              </div>
            </Col>
            
             <Col lg="3" md="6" className="text-end">
              <div className="filter__widget">
                  <select value={sortBy} onChange={handleFilterPrice}>
                  <option value="reset">Sort By</option>
                  <option value="cheapest">Cheapest</option>
                  <option value="expensive">Expensive</option>
                </select>
              </div>
            </Col> 
            
          </Row>
        </Container>
      </section>

      <section className="pt-0">
        <Container>
          <Row>
            {productsData.length === 0 ? (
              <h1 className="text-center fs-4">No products are found!</h1>
            ) : (
              <ProductsList data={productsData} />
            )}
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default Shop;