import React from "react";
import { Container, Row } from "reactstrap";

import useAuth from "../custom-hooks/useAuth";
import "../styles/admin-nav.css";

import { NavLink, useNavigate } from 'react-router-dom';
import Header from "../components/Header/Header";
import logo from "../../src/assets/images/logo.png"
import { motion } from 'framer-motion';
import userIcon from "../../src/assets/images/user-icon.png"
import { useRef, useEffect } from 'react';
import { signOut } from 'firebase/auth';
import { auth } from "../../src/firebase.config"
import { toast } from "react-toastify";
import { Link } from 'react-router-dom';

const admin__nav = [
  {
    display: "Dashboard",
    path: "/dashboard",
  },
  {
    display: "All-Products",
    path: "/dashboard/all-products",
  },

  {
    display: "Add Product",
    path: "/dashboard/add-product",
  },
  {
    display: "Orders",
    path: "/dashboard/orders",
  },
  {
    display: "Payments",
    path: "/dashboard/payments",
  },
  {
    display: "Users",
    path: "/dashboard/users",
  },
];

const AdminNav = () => {
  const menuRef = useRef(null);
  const profileActionRef = useRef(null);
  const headerRef = useRef(null);
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const navigateToHome = () => {
    navigate("/home");
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

  const menuToggle = () => menuRef.current.classList.toggle("active__menu");

  useEffect(() => {
    stickyHeaderFunc();

    return () => window.removeEventListener("scroll", stickyHeaderFunc);
  });

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

  const toggleProfileActions = () => {
    profileActionRef.current.classList.toggle("show__profileActions");
  }

  return (
    <>
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
            <div className="admin__navigation">
              <ul className="admin__menu-list">
                {admin__nav.map((item, index) => (
                  <li className="admin__menu-item" key={index}>
                    <NavLink
                      to={item.path}
                      className={navClass =>
                        navClass.isActive ? "admin__menu-active" : ""
                      }
                    >
                      {item.display}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>
            <div className="nav__icons">
              

              <div className="profile">
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
                        <Link to="/home">Home</Link>
                      </span>
                    </div>
                  ) : (
                    <div className=" d-flex align-items-center justify-content-center flex-column">
                      <Link to="/signup">Signup</Link>
                      <Link to="/login">Login</Link>
                      <Link to="/home">Home</Link>
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





      
      {/* <section className="admin__menu p-0">
        <Container>
          <Row>
            <div className="admin__navigation">
              <ul className="admin__menu-list">
                {admin__nav.map((item, index) => (
                  <li className="admin__menu-item" key={index}>
                    <NavLink
                      to={item.path}
                      className={navClass =>
                        navClass.isActive ? "admin__menu-active" : ""
                      }
                    >
                      {item.display}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>
          </Row>
        </Container>
      </section> */}
    </>
  );
};

export default AdminNav;
