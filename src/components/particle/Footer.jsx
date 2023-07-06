import React, { useContext, useEffect, useState } from "react";
import logo from "../../assets/img/main_logo.png";
import { IoIosCall } from "react-icons/io";
import { SlEnvolope } from "react-icons/sl";
import { Link, useNavigate } from "react-router-dom";
import { images } from "./Images";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaTwitter,
} from "react-icons/fa";
import { getAllLocationApi, getCollectionApi } from "../../service/home.service";
import { errorToast } from "../../utils/toast";
import { SearchContext } from "../../App";
export const Footer = () => {
  const navigate= useNavigate()
  const [collectionArr, setcollectionArr] = useState([])
  const [locationAllArr, setlocationAllArr] = useState([])
  const handleCollection = async () => {
    try {
      let { data: res } = await getCollectionApi();
      if (res.data) {
        setcollectionArr(res.data);
      }
    } catch (error) {
      //console.error(error);
      errorToast(error);
    }
  };
  const [searchObj, setSearchObj] = useContext(SearchContext)


  
  const handlelocation = async (source) => {
    try {
      let { data: res } = await getAllLocationApi(`status=APPROVED`,source);
      if (res.data) {
        setlocationAllArr(res.data);
      }
    } catch (error) {
      //console.error(error);
      errorToast(error);
    }
  };

  useEffect(() => {
    handlelocation();
    handleCollection();
  }, []);



  const handleLocationSet = (obj) => {
    let hotelSearch = {
      ...searchObj,
      location:obj.slug,
      collection:"",
      type:"",
      name:obj.name,
      // startDate,
      // endDate,
      // adult,
      // child
    }
    let loca  = locationAllArr.find((el =>  `${el.name}`.toLowerCase()== `${obj?.name}`.toLowerCase() ))
    let query = `location=${loca?._id}`
    hotelSearch.query = query;
    hotelSearch.location = obj.slug;
    setSearchObj(hotelSearch)
    navigate(`/location/${obj.slug}`)
  }


  const handleCollectionSet = (obj) => {
    let hotelSearch = {
      ...searchObj,
      collection:obj.slug,
      location:"All",
      type:"",
      name:"All",
      // startDate,
      // endDate,
      // adult,
      // child
    }
    
    setSearchObj(hotelSearch)
    navigate(`/collection/${obj.slug}`)
  }

  const handleHotelSet = (value) => {
    let hotelSearch = {
      ...searchObj,
      collection:"",
      location:"All",
      type:value,
      name:"All",
      // startDate,
      // endDate,
      // adult,
      // child
    }
    
    setSearchObj(hotelSearch)
    setSearchObj(hotelSearch)
    if(value == 'Hotels'){
      navigate(`/our-hotels`)
      } else {
        navigate(`/our-homestays`)
  
      }


  }

  return (
    <>
      {/* ======================================================================================= */}
      <footer>
        <div className="footer">
          <div className="container">
            <div className="row gy-4 gy-xxl-0">
              <div className="col-lg-3 col-md-6 col-6">
                <div className="footer_list">
                  <h3>Top Locations</h3>
                  <ul>
                    {
                      locationAllArr && locationAllArr.map((el, index) => (
                        <li key={index}>
                        <div style={{cursor:"pointer"}} onClick={()=> handleLocationSet(el)}> {el.name} </div>
                      </li>
                      ))
                    }
                  
                  </ul>
                </div>
              </div>
              <div className="col-lg-3 col-md-6 col-6">
                <div className="footer_list">
                  <h3>Top Collections</h3>
                  <ul>
                  {
                      collectionArr && collectionArr.map((el, index) => (
                        <li key={index}>
                        <div style={{cursor:"pointer"}} onClick={()=> handleCollectionSet(el)}> {el.name} </div>
                      </li>
                      ))
                    }
                 
                  </ul>
                </div>
              </div>
              <div className="col-lg-3 col-md-6 col-6">
                <div className="footer_list">
                  <h3>About SF</h3>
                  <ul>
                  <li>
                        <div style={{cursor:"pointer"}} onClick={()=> handleHotelSet("Home Stays")}>Home Stays </div>
                      </li>
                  
                    <li>
                      <Link to="/about-us">About Us</Link>
                    </li>
                    <li>
                      <Link to="/Blogs">Blogs</Link>
                    </li>
                    <li>
                      <Link to="/Contact">Contact</Link>
                    </li>
                    <li>
                      <Link to="/PropertyListing">List Your Property</Link>
                    </li>
                    <li>
                      <Link to="/Offers">Offers</Link>
                    </li>
                    <li>
                      <Link to="/Faq">FAQs</Link>
                    </li>
                    <li>
                      <Link to="/Testimonials">Testimonials</Link>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-lg-3 col-md-6 col-12">
                <div className="footer_list">
                  <h3>Support</h3>
                  <ul>
                    <li>
                      <Link to="/Cancellation-Policy">Cancellation Policy</Link>
                    </li>
                    <li>
                      <Link to="/Terms">Terms of Use</Link>
                    </li>
                    <li>
                      <Link to="/Privacy-Policy">Privacy Policy</Link>
                    </li>
                    <li className="d-flex">
                      <i
                        className="fa fa-map-marker me-2 brown"
                        aria-hidden="true"
                      ></i>
                      &nbsp;
                      <p className="mb-0">
                        Sundays Forever Stays Private Limited <br />
                        House no-4 Mussoorie Dhanaulti Road, Village Nali Kala{" "}
                        <br />
                        Dehradun- 248001 Uttarakhand
                      </p>
                    </li>

                    <li>
                      <a href="mailto:contact@sundaysforever.com">
                        <i
                          className="fa fa-envelope me-2 brown"
                          aria-hidden="true"
                        ></i>
                        &nbsp; Contact@sundaysforever.com
                      </a>
                    </li>
                    <li>
                      <i
                        className="fa fa-phone me-2 brown"
                        aria-hidden="true"
                      ></i>
                      &nbsp; <a href="tel:+91 9354163074">+91 9354163074</a> ,{" "}
                      <a href="tel:+91 9315614643">+91 9315614643</a>,{" "}<br/>
                      <a href="tel:+91 8197955637"> &nbsp; &nbsp; &nbsp; {" "}{" "} +91 8197955637</a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            {/* <hr style={{ borderColor: "#fff" }} />
            <div className="row">
              <div className="col-12">
                <p className="brown text-center fw-semibold mb-4 mt-3">
                  POPULAR DESTINATION TO RENT A HOLIDAY HOME IN INDIA
                </p>
              </div>
              <div className="col-lg-3 col-md-6 col-sm-6">
                <div className="footer_list">
                  <h3>Bungalows</h3>
                  <ul>
                    <li>
                      <Link to="#">Bungalows in Lonavala</Link>
                    </li>
                    <li>
                      <Link to="#">Bungalows in Igatpuri</Link>
                    </li>
                    <li>
                      <Link to="#">Bungalows in Alibaug</Link>
                    </li>
                    <li>
                      <Link to="#">Bungalows in Karjat</Link>
                    </li>
                    <li>
                      <Link to="#">Bungalows in Ahmedabad</Link>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-lg-3 col-md-6 col-sm-6">
                <div className="footer_list">
                  <h3>Cottages</h3>
                  <ul>
                    <li>
                      <Link to="#">Cottages in Manali</Link>
                    </li>
                    <li>
                      <Link to="#">Cottages in Mussoorie</Link>
                    </li>
                    <li>
                      <Link to="#">Cottages in Shimla</Link>
                    </li>
                    <li>
                      <Link to="#">Cottages in Coorg</Link>
                    </li>
                    <li>
                      <Link to="#">Cottages in Wayanad</Link>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-lg-3 col-md-6 col-sm-6">
                <div className="footer_list">
                  <h3>Luxury Villas</h3>
                  <ul>
                    <li>
                      <Link to="#">Luxury villas in Bangalore</Link>
                    </li>
                    <li>
                      <Link to="#">Luxury villas in Kochi</Link>
                    </li>
                    <li>
                      <Link to="#">Luxury villas in Goa</Link>
                    </li>
                    <li>
                      <Link to="#">Luxury villas in Chennai</Link>
                    </li>
                    <li>
                      <Link to="#">Luxury villas in Kasauli</Link>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-lg-3 col-md-6 col-sm-6">
                <div className="footer_list">
                  <h3>Homestay</h3>
                  <ul>
                    <li>
                      <Link to="#">Homestay in Ooty</Link>
                    </li>
                    <li>
                      <Link to="#">Homestay in Kodaikanal</Link>
                    </li>
                    <li>
                      <Link to="#">Homestay in Jaipur</Link>
                    </li>
                    <li>
                      <Link to="#">Homestay in Udaipur</Link>
                    </li>
                    <li>
                      <Link to="#">Homestay in Gangtok</Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div> */}
          </div>
        </div>
        <div className="copy-right">
          <div className="container">
            <p className="mb-0">
              &copy; 2023, Sundays Forever, All rights reserved, Designed by
              Ebslon Infotech
            </p>
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
                <a href="https://twitter.com/sundaysforever1"  target='_blank' className="icon">
                  <FaTwitter />
                </a>
              </li>
              <li>
                <a href="#" className="icon">
                  <FaLinkedinIn />
                </a>
              </li>
            </ul>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
