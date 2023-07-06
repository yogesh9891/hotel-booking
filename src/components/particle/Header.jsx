import React, { useContext, useLayoutEffect, useState } from "react";
import { useEffect } from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Offcanvas from "react-bootstrap/Offcanvas";
import { BsSearch } from "react-icons/bs";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaTwitter,
  FaYoutube,
  FaUserCircle,
} from "react-icons/fa";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { AuthoriseContext, SearchContext } from "../../App";
import logo from "../../assets/img/main_logo.png";
import { images } from "./Images";
import { logoutUser, removeToken } from "../../service/user.service";

export const Header = () => {
  const [showSearch, setShowSearch] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [propertyDropdown, setPropertyDropdown] = useState(false);
  const [navbartollge, setNavbartollge] = useState(false);
  const [searchObj, setSearchObj] = useContext(SearchContext)
  const navigate= useNavigate()
  const [isAuthorized, setIsAuthorized] = useContext(AuthoriseContext);

  useLayoutEffect(() => {
    window.addEventListener("resize", function updateSize() {
      setWindowWidth(window.innerWidth);
    });
    setWindowWidth(window.innerWidth);
    return () =>
      window.removeEventListener("resize", function updateSize() {
        setWindowWidth(window.innerWidth);
      });
  }, []);

  const toggleOffCanvas = () => {
    setNavbartollge((navbartollge) => !navbartollge);
  };

  const handlelogut = () => {
    removeToken();
    setIsAuthorized(false);
    navigate("/Login")
  }

  const handleTypeSet = (value) => {
    let hotelSearch = {
      ...searchObj,
      location:"All",
      collection:"",
      type:value,
      name:"All",

      // startDate,
      // endDate,
      // adult,
      // child
    }
    // let loca  = locationAllArr.find((el =>  `${el.name}`.toLowerCase()== `${obj?.name}`.toLowerCase() ))
    // let query = `location=${loca?._id}`
    // hotelSearch.query = query;
    setSearchObj(hotelSearch)
    // if(value == 'Hotels'){
    //   navigate(`/our-hotels`)
    //   } else {
    //     navigate(`/our-homestays`)
  
    //   }
    navigate(`/properties`)
    setNavbartollge(false)
  }


 

  return (
    <header>
      <div className="header">
        {/* ===================================================================== */}
        <div className="topheader py-2">
          <div className="row align-items-center">
            <div className="col-12 col-sm-9 col-md-8">
              <div className="left_topbar">
                <ul>
                  <li>
                    <a href="mailto:contact@sundaysforever.com">
                      <i className="fa fa-envelope me-2" aria-hidden="true"></i>
                      contact@sundaysforever.com
                    </a>
                  </li>
                  <li>
                    <a href="tel:9354163074">
                      <i className="fa fa-phone me-2" aria-hidden="true"></i>
                      +91 9354163074
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-12 col-sm-3 col-md-4">
              <div className="right_icon text-end">
                <ul className="social-links">
                  <li>
                    <a href="https://www.facebook.com/SundaysForever/" target='_blank' className="icon">
                      <FaFacebookF />
                    </a>
                  </li>
                  <li>
                    <a href="https://www.instagram.com/sundaysforeverstays/" target='_blank' className="icon">
                      <FaInstagram />
                    </a>
                  </li>
                  <li>
                    <a href="https://twitter.com/sundaysforever1" target='_blank' className="icon">
                      <FaTwitter />
                    </a>
                  </li>
                  <li>
                    <a href="#" className="icon" >
                      <FaLinkedinIn />
                    </a>
                  </li>
                  <li>
                    <a href="https://www.youtube.com/@sundaysforeverstays" className="icon" target='_blank'>
                      <FaYoutube />
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        {/* ===================================================================== */}
        <Navbar
          onToggle={() => toggleOffCanvas()}
          expanded={navbartollge}
          expand="lg"
          className="navbar_top bg-white"
        >
          <Container fluid className="p-0">
            <Link to="/" className="main_logo">
              <img src={images.logo} alt="" className="img-fluid" />
            </Link>
            <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-lg`} />
            <Navbar.Offcanvas
              id={`offcanvasNavbar-expand-lg`}
              aria-labelledby={`offcanvasNavbarLabel-expand-lg`}
              placement="end"
              className="navbar_top_offcanvas"
            >
              <Offcanvas.Header closeButton>
                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-lg`}>
                  <Link to="/" className="main_logo">
                    <img
                      src={images.logo}
                      alt=""
                      className="img-fluid"
                      style={{ width: "11pc" }}
                    />
                  </Link>
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body className="p-0">
                <Nav className="flex-grow-1">
                  {/* <div
                    style={{cursor:"pointer"}}
                    onClick={() => handleTypeSet("Hotels") }
                    className="nav-link"
                    // to="properties?type=Hotels"
                    // onMouseEnter={() => setPropertyDropdown(true)}
                  >
                    Hotels
                  </div>
                  <div
                    style={{cursor:"pointer"}}
                    onClick={() => handleTypeSet("Home Stays")}
                    className="nav-link"
                    // to="/properties?type=Home Stays"
                  >
                    Home Stays
                  </div> */}
                     <div
                    style={{cursor:"pointer"}}
                    onClick={() => handleTypeSet("Home Stays")}
                    className="nav-link"
                    // to="/properties?type=Home Stays"
                  >
                    Properties
                  </div>
                  <Link
                    onClick={() => setNavbartollge(false)}
                    className="nav-link"
                    to="/about-us"
                  >
                    About Us
                  </Link>
                  <Link
                    onClick={() => setNavbartollge(false)}
                    className="nav-link"
                    to="/Blogs"
                  >
                    Blogs
                  </Link>
                  <Link
                    onClick={() => setNavbartollge(false)}
                    className="nav-link"
                    to="/Contact"
                  >
                    Contact Us
                  </Link>
                  {windowWidth < 992 && (
                    <>
                    {
                      isAuthorized == false ? (   <Link  onClick={() => setNavbartollge(false)} className="nav-link" to="/Login">
                      Login
                    </Link>) : (   
                      <Link  to="/UserDashboard"  className="nav-link" >
                           My Account
                      </Link>)
                    }
                   
                      <Link  onClick={() => setNavbartollge(false)} className="nav-link" to="/PropertyListing">
                        List Your Property
                      </Link>
                    </>
                  )}
                </Nav>
              </Offcanvas.Body>
            </Navbar.Offcanvas>
            {windowWidth > 992 && (
              <ul className="right-icons">
                <li>
                {
                      isAuthorized == false ? ( <Link
                    className="btn btn-brown no-hover brown-bg text-white btn-sm"
                    to="/Login"
                  >
                    Login
                  </Link>
                      ): ( 
                        <Link  to="/UserDashboard"  className="btn btn-brown no-hover brown-bg text-white btn-sm" >
                      My Account
                      </Link>
                      
                      )
                }
                 
                </li>
                <li>
                  <Link
                    className="btn btn-brown no-hover brown-bg text-white btn-sm"
                    to="/PropertyListing"
                  >
                    List Your Property
                  </Link>
                </li>
              </ul>
            )}
          </Container>
        </Navbar>
        {/* =========================DROPDOWNS============================================ */}
        {/* <div
          className={`nav-dropdown property-dropdown ${
            propertyDropdown ? "show" : ""
          }`}
          onMouseLeave={() => setPropertyDropdown(false)}
        >
          <div className="row">
            <div className="col-12 col-md-6">
              <div className="img">
                <Link to="/Hotels">
                  <img src={images.hotel_img} alt="" />
                </Link>
              </div>
            </div>
            <div className="col-12 col-md-6">
              <div className="img">
                <Link to="/Hotels">
                  <img src={images.homestays_img} alt="" />
                </Link>
              </div>
            </div>
          </div>
        </div> */}
        {/* ============================= script in header ======================================== */}
         
      </div>
    </header>
  );
};

export default Header;
