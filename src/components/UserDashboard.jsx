import React, { useContext, useEffect, useState } from "react";
import { useRef } from "react";
import { Modal } from "react-bootstrap";
import { FaMoneyCheck, FaTicketAlt, FaUserAlt ,FaPowerOff} from "react-icons/fa";
import { MdModeEdit } from "react-icons/md";
import { RiMapPinRangeFill } from "react-icons/ri";
import ReactStars from "react-rating-stars-component";
import { Link, useNavigate } from "react-router-dom";
import { images } from "./particle/Images";
import PageBanner from "./particle/PageBanner";
import { AuthoriseContext } from "../App";
import { errorToast, successToast } from "../utils/toast";
import { getUserById, removeToken } from "../service/user.service";
import { getAllActiveOrdersByUserId } from "../service/order.service";
import { generateImageUrl } from "../service/url.service";
import moment from "moment";

function UserDashboard() {
  const dashboard_profile = useRef(null);
  const dashboard_booking = useRef(null);
  const dashboard_payment = useRef(null);
  const [reviewModal, setReviewModal] = useState(false);
  const [name, setName] = useState(false);
  const [email, setEmail] = useState(false);
  const [phone, setMobile] = useState(false);
  const [docs, setDocs] = useState(false);
  const [address, setAddress] = useState(false);
  const [emergencyNo, setEmergencyNo] = useState(false);
  const navigate = useNavigate();
  const [userObj, setUserObj] = useState("");
  const [currentTab, setCurrentTab] = useState(1);
  const [bookingArr, setBookingArr] = useState([]);
  const [isAuthorized, setIsAuthorized] = useContext(AuthoriseContext);

  const [tabs, setTabs] = useState([
    {
      name: "My Profile",
      active: true,
      tab: 1,
      refTo: dashboard_profile,
      icon: <FaUserAlt />,
    },
    {
      name: "My Booking",
      active: false,
      tab: 2,
      refTo: dashboard_booking,
      icon: <FaTicketAlt />,
    },
   
    // {
    //   name: "Make a Payment",
    //   active: false,
    //   tab: 3,
    //   refTo: dashboard_payment,
    //   icon: <FaMoneyCheck />,
    // },
  ]);
  useEffect(() => {
    handleGetProfileData()
  }, [])

  useEffect(() => {
if(userObj && userObj?._id){
      setName(userObj.firstName + ' ' + userObj.lastName)
      setEmail(userObj?.email)
      setMobile(userObj.phone)
}
  }, [userObj])
  
  const handleGetProfileData = async () => {
    try {
      let { data: res } = await getUserById();
      if (res.data) {
        setUserObj(res.data)
    handleGetUserBooking();

      } else {
        navigate('/Login')
      }
      // console.log(res, "getUserById")
    }
    catch (err) {
      errorToast(err)
      navigate('/Login')
    }
  }

  const handleGetUserBooking = async () => {
    try {
      let { data: res } = await getAllActiveOrdersByUserId();
      if (res.data) {
        setBookingArr(res.data)
      }
      // console.log(res, "getUserById")
    }
    catch (err) {
      errorToast(err)
    }
  }




  const tabClick = (i) => {
    const temp = tabs.map((item, index) => {
      if (i === index) {
        item.active = true;
        setCurrentTab(item.tab);
        // window.scroll(0, item.refTo.current.offsetTop - 16);
      } else {
        item.active = false;
      }
      return item;
    });
    setTabs([...temp]);
  };
  const [bookingTabs, setBookingTabs] = useState([
    {
      name: "Upcoming",
      active: true,
      tab: 1,
    },
    {
      name: "Completed",
      active: false,
      tab: 1,
    },
    {
      name: "Cancelled",
      active: false,
      tab: 1,
    },
  ]);
  const bookingtabClick = (i) => {
    const temp = bookingTabs.map((item, index) => {
      if (i === index) {
        item.active = true;
      } else {
        item.active = false;
      }
      return item;
    });
    setBookingTabs([...temp]);
  };

  const handlelogut = () => {
    removeToken();
    successToast("Logout Successfully")
    setIsAuthorized(false);
    navigate(-1);
  }


  return (
    <main style={{ display: "unset" }} className="bg-img">
      <PageBanner
        title="User Dashboard"
        img={images.Barlowscottage17}
        cols="col-lg-6"
        nav
        className="listing-banner mt-5"
      />
      <section className="mb-40 mt-40 user-dashboard px-4pc">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12 col-md-4 col-xxl-3">
              <div className="left sticky-top mb-4">
                <ul>
                  <li className="name-box">{ userObj ? userObj?.firstName.toUpperCase().charAt(0)+ userObj?.lastName.toUpperCase().charAt(0) : ' ' }</li>
                  {tabs.map((item, i) => {
                    return (
                      <li
                        key={i}
                        className={`item ${item.active ? "active" : ""}`}
                        onClick={() => tabClick(i)}
                      >
                        {item.icon} {item.name}
                      </li>
                    );
                  })}
                      <li
                        className={`item `}
                        onClick={() => handlelogut()}
                      >
                     <FaPowerOff/>  LogOut
                      </li>
                </ul>
              </div>
            </div>
            <div className="col-12 col-md-8 col-xxl-9">
              <div className="right">
                <div className="row gy-4">
                  {/* ====================================================================== */}
                  {currentTab === 1 && (
                    <div className="col-12">
                      <div className="box" ref={dashboard_profile}>
                        <h4 className="font-2 fw-bold">My Profile</h4>
                        <p>Basic info, for a faster booking experience</p>
                        <div className="row info col-md-8 gap-0">
                          <div className="col-12">
                            <div className="dashboard-profile">
                              <p className="mb-2 text-dark fw-semibold d-flex justify-content-between gap-2">
                                <span className="fw-bold me-3">Name:</span>
                                {/* <Link
                                  className="text-bg-light btn btn-sm ms-3"
                                  onClick={() => setName(!name)}
                                >
                                  {name ? "Save" : "Edit"}
                                </Link> */}
                              </p>
                              {name}
                              {/* {name ? (
                                <input type="text" className="form-control" placeholder="Your Name" />
                              ) : (
                              <p>{name}</p> 
                              )} */}
                            </div>
                          </div>
                          <div className="col-12">
                            <div className="dashboard-profile">
                              <p className="mb-2 text-dark fw-semibold d-flex justify-content-between gap-2">
                                <span className="fw-bold me-3">Email:</span>
                                {/* <Link
                                  className="text-bg-light btn btn-sm ms-3"
                                  onClick={() => setEmail(!email)}
                                >
                                </Link> */}
                              </p>
                              {email}
                              {/* {email ? (
                                <input type="Email" className="form-control" placeholder="Your Email" />
                              ) : (
                                "sj123.gmail.com"
                              )} */}
                            </div>
                          </div>
                          <div className="col-12">
                            <div className="dashboard-profile">
                              <p className="mb-2 text-dark fw-semibold d-flex justify-content-between gap-2">
                                <span className="fw-bold me-3">Phone No:</span>
                                {/* <Link
                                  className="text-bg-light btn btn-sm ms-3"
                                  onClick={() => setMobile(!phone)}
                                >
                                </Link> */}
                              </p>
                              {phone}
                              {/* {phone ? (
                                <input type="number" className="form-control" placeholder="Your Mobile No." />
                              ) : (
                                "9878965426"
                              )} */}
                            </div>
                          </div>
                          {/* <div className="col-12">
                            <div className="dashboard-profile">
                              <p className="mb-2 text-dark fw-semibold d-flex justify-content-between gap-2">
                                <span className="fw-bold me-3">
                                  Government ID:
                                </span>
                                <Link
                                  className="text-bg-light btn btn-sm ms-3"
                                  onClick={() => setDocs(!docs)}
                                >
                                  {docs ? "Save" : "Edit"}
                                </Link>
                              </p>
                              {docs ? (
                                <input type="file" className="form-control" />
                              ) : (
                                "dtgfyg6764fe54cd"
                              )}
                            </div>
                          </div> */}
                          {/* <div className="col-12">
                            <div className="dashboard-profile">
                              <p className="mb-2 text-dark fw-semibold d-flex justify-content-between gap-2">
                                <span className="fw-bold me-3">Address:</span>
                                <Link
                                  className="text-bg-light btn btn-sm ms-3"
                                  onClick={() => setAddress(!address)}
                                >
                                  {address ? "Save" : "Edit"}
                                </Link>
                              </p>
                              {address ? (
                                <textarea className="form-control" placeholder="Your Address" rows="2"></textarea>
                              ) : (
                                "dtgfyg6764fe54cd"
                              )}
                            </div>
                          </div>
                          <div className="col-12">
                            <div className="dashboard-profile">
                              <p className="mb-2 text-dark fw-semibold d-flex justify-content-between gap-2">
                                <span className="fw-bold me-3">
                                  Emergency contact:
                                </span>
                                <Link
                                  className="text-bg-light btn btn-sm ms-3"
                                  onClick={() => setEmergencyNo(!emergencyNo)}
                                >
                                  {emergencyNo ? "Save" : "Edit"}
                                </Link>
                              </p>
                              {emergencyNo ? (
                                <input type="number" className="form-control" placeholder="Emergency No." />
                              ) : (
                                "9876765654"
                              )}
                            </div>
                          </div> */}
                        </div>
                      </div>
                    </div>
                  )}
                  {/* ====================================================================== */}
                  {currentTab === 2 && (
                    <div className="col-12">
                      <div className="box" ref={dashboard_booking}>
                        <div className="d-flex align-items-center justify-content-between mb-4 flex-wrap gap-2">
                          <div>
                            <h4 className="font-2 fw-bold">My Bookings</h4>
                            <p className="mb-0">Review your Booking</p>
                          </div>
                          <ul className="blog-filters">
                            {bookingTabs &&
                              bookingTabs.map((item, i) => {
                                return (
                                  <li
                                    key={i}
                                    className={`rounded ${
                                      item.active ? "active" : ""
                                    }`}
                                    onClick={() => bookingtabClick(i)}
                                  >
                                    {item.name}
                                  </li>
                                );
                              })}
                          </ul>
                        </div>
                        <div className="row">
                        
                          {
                            bookingArr && bookingArr.map((booking)=>(
                              <div className="col-12">
                              <div className="row gx-0 boxcehckout mb-20 dashboard-booking align-items-center">
                                <div className="col-lg-4">
                                  <div className="imgchedkoutleft h-100">
                                    <Link to={`/Booking/${booking._id}`}>
                                      <img
                                        src={generateImageUrl(booking?.hotelObj?.mainImage)}
                                        alt=""
                                        className="img-fluid"
                                      />
                                    </Link>
                                  </div>
                                </div>
                                <div className="col-lg-8">
                                  <div className="content_cartcekcgout">
                                    <Link
                                      to="/Booking"
                                      className="btn btn-brown no-hover brown-bg text-white btn-sm mb-3"
                                    >
                                   {booking.hotelObj?.hotelType}
                                    </Link>
                                    <h5 className="font-2 fw-bold">
                                      <Link to={`/Booking/${booking._id}`} className="text-dark">
                                      {booking.hotelObj?.name}
                                      </Link>
                                    </h5>
                                    <p className="text-dark">
                                      <RiMapPinRangeFill className="fs-5" />   {booking.hotelObj?.tagline}
                                    </p>
                                    <div className="detailschekinout p-0">
                                      <div className="checkinsection">
                                        <p className="small fw-semibold text-dark">
                                          CHECK IN
                                        </p>
                                        <p className="text-dark fw-semibold">
                                          {moment(booking.startDate).format("DD MMMM  YYYY")}
                                        </p>
                                        <p className="small fw-semibold">
                                        {moment(booking.startDate).format("dddd")}, 12 PM
                                        </p>
                                      </div>
                                      <div className="checkinmidelsection">
                                        <p className="text-dark fw-semibold">
                                          {booking.nights} Night
                                        </p>
                                      </div>
                                      <div className="checkoutsection">
                                        <p className="small fw-semibold text-dark">
                                          CHECK OUT
                                        </p>
                                        <p className="text-dark fw-semibold">
                                        {moment(booking.endDate).format("DD MMMM  YYYY")}
                                        </p>
                                        <p className="small fw-semibold">
                                        {moment(booking.endDate).format("dddd")} 12 PM
                                        </p>
                                      </div>
                                    </div>
                                    <div className="listnighchekout px-0 mt-0">
                                      <ul>
                                        <li className="text-dark fw-semibold">
                                        {booking.nights}  Night
                                        </li>
                                        <li className="text-dark fw-semibold">
                                        {booking?.adult}  Adults
                                        </li>
                                        {/* <li className="text-dark fw-semibold">
                                          1 Room
                                        </li> */}
                                      </ul>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            ))
                          }
                       
                       
                        </div>
                      </div>
                    </div>
                  )}
                  {/* ====================================================================== */}
                  {currentTab === 3 && (
                    <div className="col-12">
                      <div className="box" ref={dashboard_payment}>
                        <h4 className="font-2 fw-bold">Make a Payment</h4>
                        <p>Enter below details to proceed</p>
                        <form action="" className="form row">
                          <div className="col-12 col-lg-6 mb-3">
                            <input
                              type="text"
                              placeholder="Booking ID"
                              className="form-control shadow-none border"
                            />
                          </div>
                          <div className="col-12 col-lg-6 mb-3">
                            <input
                              type="text"
                              placeholder="Email or Mobile Number"
                              className="form-control shadow-none border"
                            />
                          </div>
                          <div className="col-12">
                            <button className="btn btn-brown px-4">
                              Submit
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Modal
        show={reviewModal}
        size="lg"
        onHide={() => setReviewModal(false)}
        centered
        className="review-modal"
      >
        <Modal.Header className="align-items-start border-0 p-0"></Modal.Header>
        <Modal.Body className="p-4">
          <div>
            <h5>Review Your Experience</h5>
            <p className="mb-0">
              We would like to you to share your amazing experiance with us.
            </p>
          </div>
          <form action="#" className="row form">
            <div className="col-12 mb-2">
              <ReactStars count={5} size={40} value={3} activeColor="#ffd700" />
            </div>
            <div className="col-12 mb-3">
              <input type="text" className="form-control" placeholder="Title" />
            </div>
            <div className="col-12 mb-3">
              <textarea
                className="form-control"
                placeholder="Your Message"
                rows={4}
              ></textarea>
            </div>
            <div className="col-12">
              <button className="btn btn-brown">Submit</button>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </main>
  );
}

export default UserDashboard;
