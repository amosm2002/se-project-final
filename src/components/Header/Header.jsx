import React from 'react';
import "./header.css";

import { motion } from 'framer-motion';

import { NavLink, useNavigate } from 'react-router-dom';
import logo from '../../assets/images/logo.png'
import userIcon from '../../assets/images/user-icon.png'

import { Container, Row } from 'reactstrap';

import { useRef, useEffect } from 'react';

import { useSelector } from 'react-redux';
import useAuth from '../../custom-hooks/useAuth';
import { Link } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from "../../firebase.config";
import { toast } from "react-toastify";

const nav__links = [
  {
    path: "home",
    display: "Home",
  },
  {
    path: "shop",
    display: "Shop",
  },
  {
    path: "cart",
    display: "Cart",
  },
];

const Header = () => {
  const headerRef = useRef(null);
  const totalQuantity = useSelector(state => state.cart.totalQuantity);
  const profileActionRef = useRef(null);

  const menuRef = useRef(null);
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  const stickyHeaderFunc = () => {
    window.addEventListener("scroll", () => {
      if (
        document.body.scrollTop > 80 ||
        document.documentElement.scrollTop > 80
      ) {
        headerRef.current.classList.add("sticky__header");
      } else {
        headerRef.current.classList.remove("sticky__header");
      }
    });
  };

  const logout = () => {
    signOut(auth)
      .then(() => {
        toast.success("Logged out");
        navigate("/home");
      })
      .catch(err => {
        toast.error(err.message);
      });
  };

  useEffect(() => {
    stickyHeaderFunc();

    return () => window.removeEventListener("scroll", stickyHeaderFunc);
  });

  const menuToggle = () => menuRef.current.classList.toggle("active__menu");

  const navigateToCart = () => {
    navigate("/cart");
  };

  const navigateToHome = () => {
    navigate("/home");
  };

  const toggleProfileActions = () => {
    profileActionRef.current.classList.toggle("show__profileActions");
  }
  return (
    <header className="header" ref={headerRef}>
      <Container>
        <Row>
          <div className="nav__wrapper">
            <div className="logo">
              <img onClick={navigateToHome} src={logo} alt="logo" />
              <div onClick={navigateToHome}>
                <h1>Known Query</h1>
              </div>
            </div>

            <div className="navigation" ref={menuRef} onClick={menuToggle}>
              <motion.ul className="menu">
                {nav__links.map((item, index) => (
                  <li className="nav__item" key={index}>
                    <NavLink
                      to={item.path}
                      className={navClass =>
                        navClass.isActive ? "nav__active" : ""
                      }
                    >
                      {item.display}
                    </NavLink>
                  </li>
                ))}
              </motion.ul>
            </div>

            <div className="nav__icons">
              

              <div className="profile">
              <span className="badge">{totalQuantity}</span>
                <motion.img
                  whileTap={{ scale: 1.2 }}
                  src={
                    currentUser && currentUser.photoURL
                      ? currentUser.photoURL
                      : userIcon
                  }
                  alt=""
                  onClick={toggleProfileActions}
                />

                <div
                  className="profile__actions"
                  ref={profileActionRef}
                  onClick={toggleProfileActions}
                >
                  {currentUser ? (
                    <div className="d-flex flex-column ">
                      <span onClick={logout}>Logout</span>
                      <span>
                        <Link to="/dashboard">Dashboard</Link>
                      </span>
                    </div>
                  ) : (
                    <div className=" d-flex align-items-center justify-content-center flex-column">
                      <Link to="/signup">Signup</Link>
                      <Link to="/login">Login</Link>
                      <Link to="/dashboard">Dashboard</Link>
                    </div>
                  )}
                </div>
              </div>
              <div className="mobile__menu">
                <span onClick={menuToggle}>
                  <i class="ri-menu-line"></i>
                </span>
              </div>
            </div>
          </div>
        </Row>
      </Container>
    </header>
  );
};

export default Header;