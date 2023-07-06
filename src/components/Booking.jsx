import React, { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade, Navigation } from "swiper";
import { images } from "./particle/Images";
import { Link, useLocation, useParams } from "react-router-dom";
import { AiOutlineClose } from "react-icons/ai";
import {
  BiChevronRight,
  BiLockOpenAlt,
  BiRupee,
  BiMap,
  BiBed,
} from "react-icons/bi";
import { HiOutlineUsers } from "react-icons/hi";
import { MdOutlineBedroomParent, MdOutlineImageSearch } from "react-icons/md";
import ReactStars from "react-rating-stars-component";
import { TbParking } from "react-icons/tb";
import {
  MdOutlineBathroom,
  MdNoMealsOuline,
  MdOutlineVilla,
} from "react-icons/md";
import {
  GiCheckMark,
  GiForkKnifeSpoon,
  GiKeyCard,
  GiTeapotLeaves,
} from "react-icons/gi";
import { FaBath, FaPhoneAlt } from "react-icons/fa";
import { GoLocation } from "react-icons/go";
import { FaUserAlt } from "react-icons/fa";
// import { VscClose } from "react-icons/vs";
import { GoChevronDown } from "react-icons/go";
import { HiOutlineChevronRight } from "react-icons/hi";
import DatePicker from "react-datepicker";
import { DateRangePicker } from "react-date-range";
import { addDays } from "date-fns";
import Select from "react-select";
import { errorToast } from "../utils/toast";
import { getHotelBySlugApi } from "../service/hotel.service";
import { generateImageUrl } from "../service/url.service";
import Modal from "react-bootstrap/Modal";
import Accordion from "react-bootstrap/Accordion";
import Button from "react-bootstrap/Button";
import { getRoomByIdApi } from "../service/home.service";
import {
  BsCheckCircle,
  BsFillEnvelopeFill,
  BsFillPeopleFill,
  BsSearch,
} from "react-icons/bs";
import { FaUserCircle } from "react-icons/fa";
import { BiTime } from "react-icons/bi";
import { FreeMode, Thumbs } from "swiper";
import { AiOutlineShareAlt } from "react-icons/ai";
import { AiFillStar } from "react-icons/ai";
import { AiOutlineHeart } from "react-icons/ai";
import { BsChevronDown, BsThreeDots } from "react-icons/bs";
import Quantity from "./particle/Quantity";
import { RiMapPinRangeFill } from "react-icons/ri";
import { getOrderByIdApi } from "../service/order.service";
import moment from "moment";
// import Modal from 'react-bootstrap/Modal';
const Booking = () => {
  const params = useParams();
  const [orderObj, setOrderObj] = useState("");
  const [reviewModal, setReviewModal] = useState(false);
const [hotelObj, setHotelobj] = useState("");
const [roomObj, setRoomObj] = useState("");

 

  const [totalPrice, settotalPrice] = useState(0);


  useEffect(() => {
    if (params && params?.id) {
      handleGetOrderById(params.id)
    }
  }, [params]);

  const handleGetOrderById = async  (id) => {
    try {
      let {data:res} = await getOrderByIdApi(id);
      if(res.data){
        setOrderObj(res.data)
        if(res.data.hotelObj){
          setHotelobj(res.data.hotelObj)
        }
        if(res.data.roomObj){
          setHotelobj(res.data.roomObj)
        }
      }
    } catch (error) {
      errorToast(error)
    }

  }


  const [gausttaggole, setgausttaggole] = useState(false);
  const [checked, setChecked] = React.useState(false);
  const [panel, setPanel] = useState(false);
  const [show, setShow] = useState(false);
  const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 0),
      key: "selection",
    },
  ]);
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [modalShow, setModalShow] = React.useState(false);
  const [adult, setadult] = useState(1);
  const [children, setchildren] = useState(1);
  const options = [
    { value: 1, label: "Adult 1" },
    { value: 2, label: "Adult 2" },
    { value: 3, label: "Adult 3" },
    { value: 4, label: "Adult 4" },
    { value: 5, label: "Adult 5" },
  ];

  const [checkOutDetails, setcheckOutDetails] = useState({
    location: "",
    adult: adult?.value,
    price: 0,
    child: 0,
    room: 1,
  });
  const [activesection, setactivesection] = useState("info_section");
  const sidebarlist = [
    {
      id: "info_section",
      activeimg: images.Information,
      inactiveimg: images.iAInformation,
    },
    {
      id: "lock_section",
      activeimg: images.door_lock_active,
      inactiveimg: images.doorlock,
    },

    {
      id: "date_section",
      activeimg: images.iAcalendar,
      inactiveimg: images.calendar,
    },

    {
      id: "polici_sectiono",
      activeimg: images.policiesiconactive,
      inactiveimg: images.policiesicon,
    },
    {
      id: "faq_section",
      activeimg: images.faqactive,
      inactiveimg: images.faqinactive,
    },
  ];

  function toggleButton() {
    if (!panel) setPanel(true);
    else setPanel(false);
  }
 



  return (
    <main style={{ display: "unset" }}>
      <section className="padding40 bg-img5 orderObj-page">
        <div className="container">
          <div className="row reviwheading">
            <h2>Review your Booking</h2>
            <p>Hotel Information</p>
          </div>
          <div className="row gx-xl-5">
            
            <div className="col-12 col-md-8">
              <div className="left">
                {/* ================================================================= */}
                <div className="row gx-0 boxcehckout mb-20 dashboard-orderObj align-items-center">
                  <div className="col-lg-4">
                  <div className="col-lg-4">
                                  <div className="imgchedkoutleft h-100">
                                    <Link to={`/Booking/${orderObj._id}`}>
                                      <img
                                        src={generateImageUrl(orderObj?.hotelObj?.mainImage)}
                                        alt=""
                                        className="img-fluid"
                                      />
                                    </Link>
                                  </div>
                                </div>
                  </div>
                  <div className="col-lg-8">
                                  <div className="content_cartcekcgout">
                                    <Link
                                      to="/Booking"
                                      className="btn btn-brown no-hover brown-bg text-white btn-sm mb-3"
                                    >
                                   {orderObj.hotelObj?.hotelType}
                                    </Link>
                                    <h5 className="font-2 fw-bold">
                                      <Link to={`/Booking/${orderObj._id}`} className="text-dark">
                                      {orderObj.hotelObj?.name}
                                      </Link>
                                    </h5>
                                    <p className="text-dark">
                                      <RiMapPinRangeFill className="fs-5" />   {orderObj.hotelObj?.tagline}
                                    </p>
                                    <div className="detailschekinout p-0">
                                      <div className="checkinsection">
                                        <p className="small fw-semibold text-dark">
                                          CHECK IN
                                        </p>
                                        <p className="text-dark fw-semibold">
                                          {moment(orderObj.startDate).format("DD MMMM  YYYY")}
                                        </p>
                                        <p className="small fw-semibold">
                                        {moment(orderObj.startDate).format("dddd")}, 12 PM
                                        </p>
                                      </div>
                                      <div className="checkinmidelsection">
                                        <p className="text-dark fw-semibold">
                                          {orderObj.nights} Night
                                        </p>
                                      </div>
                                      <div className="checkoutsection">
                                        <p className="small fw-semibold text-dark">
                                          CHECK OUT
                                        </p>
                                        <p className="text-dark fw-semibold">
                                        {moment(orderObj.endDate).format("DD MMMM  YYYY")}
                                        </p>
                                        <p className="small fw-semibold">
                                        {moment(orderObj.endDate).format("dddd")} 12 PM
                                        </p>
                                      </div>
                                    </div>
                                    <div className="listnighchekout px-0 mt-0">
                                      <ul>
                                        <li className="text-dark fw-semibold">
                                        {orderObj.nights}  Night
                                        </li>
                                        <li className="text-dark fw-semibold">
                                        {orderObj?.adult}  Adults
                                        </li>
                                        {/* <li className="text-dark fw-semibold">
                                          1 Room
                                        </li> */}
                                      </ul>
                                    </div>
                                  </div>
                                </div>
                </div>
                {/* ================================================================= */}
                {/* <div className="newboxshadow mb-4">
                  <div className="row gy-4">
                    <div className="col-12">
                      <div className="heading_title">
                        <h3 className="mb-3">2 Rooms for 6 Guests</h3>
                      </div>
                      <div className="row border-bottom pb-3 mb-3">
                        <div className="col-12 col-md-3">
                          <BsFillPeopleFill className="text-default me-3" />
                          <span className="text-dark fw-semibold">
                            6 Guests
                          </span>
                        </div>
                        <div className="col-12 col-md-9">
                          <div className="row gy-4">
                            <div className="col-6">
                              <p className="small mb-0">Total Guests</p>
                              <p className="mb-0 text-dark fw-semibold">
                                6 Adults
                              </p>
                            </div>
                            <div className="col-6">
                              <p className="small mb-0">Primary Guest</p>
                              <p className="mb-0 text-dark fw-semibold">
                                Rachel Green
                              </p>
                            </div>
                            <div className="col-6">
                              <p className="small mb-0">Guest Phone No</p>
                              <p className="mb-0 text-dark fw-semibold">
                                5566734812
                              </p>
                            </div>
                            <div className="col-6">
                              <p className="small mb-0">Guest Email Id</p>
                              <p className="mb-0 text-dark fw-semibold">
                                asdf@gmail.com
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-12 col-md-3">
                          <GiKeyCard className="text-default me-3" />
                          <span className="text-dark fw-semibold">2 Rooms</span>
                        </div>
                        <div className="col-12 col-md-9">
                          <div className="border-bottom mb-3 pb-3">
                            <p className="fw-semibold text-dark mb-1">
                              Deluxe Room
                            </p>
                            <p className="small mb-0">
                              Cushions | TV+ 33 amenities
                            </p>
                            <p className="small mb-0">
                              <BsFillPeopleFill className="text-default me-3" />
                              3 Adults
                            </p>
                            <p className="small mb-0">
                              <BiBed className="text-default me-3" />
                              Room Only
                            </p>
                          </div>
                          <div>
                            <p className="fw-semibold text-dark mb-1">
                              Deluxe Room
                            </p>
                            <p className="small mb-0">
                              Cushions | TV+ 33 amenities
                            </p>
                            <p className="small mb-0">
                              <BsFillPeopleFill className="text-default me-3" />
                              3 Adults
                            </p>
                            <p className="small mb-0">
                              <span className="text-default me-3">
                                <BiBed /> + <GiForkKnifeSpoon />
                              </span>
                              Room With Breakfast
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div> */}
                {/* ================================================================= */}
                <div className="newboxshadow mb-4">
                  <div className="row gy-4">
                    <div className="col-12">
                      <div className="heading_title">
                        <h3 className="mb-2">Primary Contact</h3>
                        <p>
                          We will contact you on this number. You can email or
                          whatsapp the ticket to other contacts
                        </p>
                      </div>
                      <ul className="orderObj-primary-contact">
                        <li>
                          <FaUserAlt className="me-3" />
                        {orderObj.name}
                        </li>
                        <li>
                          <BsFillEnvelopeFill className="me-3" />
                          {orderObj.email}
                        </li>
                        <li>
                          <FaPhoneAlt className="me-3" />
                          {orderObj.mobile}
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                {/* ================================================================= */}
                <div className="newboxshadow mb-4" id="faq_section">
                  <div className="heading_title">
                    <h3 className="mb-2">FAQs</h3>
                  </div>
                  <div className="link_tink itneryfaqsection ">
                  <Accordion defaultActiveKey="0">
                        {orderObj?.hotelObj?.faqArr &&
                          orderObj?.hotelObj?.faqArr.map((faq, indexee) => (
                            <Accordion.Item eventKey={indexee}>
                              <Accordion.Header className="headinfaq">
                                {faq.question}
                              </Accordion.Header>
                              <Accordion.Body>
                                <p>{faq.answer}</p>
                              </Accordion.Body>
                            </Accordion.Item>
                          ))}
                      </Accordion>
                  </div>
                </div>
                {/* ================================================================= */}
                <div className="newboxshadow mb-4">
                  <div className="row gy-4">
                    <div className="col-12">
                     
                    {orderObj?.hotelObj &&
                      orderObj?.hotelObj?.propertyRules &&
                      orderObj?.hotelObj?.propertyRules?.length > 0 && (
                        <div className="row">
                          <div className="col-lg-12">
                            <div className="heading_title">
                              <h3 className="mb-3">Booking Policies</h3>
                            </div>
                          </div>
                          {orderObj?.hotelObj?.propertyRules &&
                            orderObj?.hotelObj?.propertyRules.map((rule) => (
                              <div className="col-lg-6 col-sm-6">
                                <div className="link_tink policies_cont">
                                  <h5> {rule.heading}</h5>
                                  {rule?.rulesArr &&
                                    rule?.rulesArr?.length > 0 && (
                                      <ul>
                                        {rule?.rulesArr.map((ru) => (
                                          <li>{ru.name}</li>
                                        ))}
                                      </ul>
                                    )}
                                </div>
                              </div>
                            ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                {/* ================================================================= */}
              </div>
            </div>
            <div className="col-12 col-md-4">
              <div className="right sticky-top">
                <div className="user_inof price-breakup">
                  <h5 className="fw-semibold">Price Breakup</h5>
                  <ul>
                    <li className="d-flex align-items-center justify-content-between gap-2">
                      <div>
                        <p className="mb-0 small fw-semibold text-dark">
                         SubTotal
                        </p>
                      </div>
                      <div className="d-flex align-items-end">
                        <h5 className="mb-0 brown fw-semibold">₹&nbsp;{orderObj.subTotalAmount}</h5>
                        {/* <span className="small text-dark">/Night</span> */}
                      </div>
                    </li>
                   <li className="d-flex align-items-center justify-content-between gap-2">
                      <div>
                        <p className="mb-0 small fw-semibold text-dark">
                        Total Amount
                        </p>
                      </div>
                      <div className="d-flex align-items-end">
                        <h5 className="mb-0 brown fw-semibold">₹&nbsp;{orderObj.totalAmount}</h5>
                        {/* <span className="small text-dark">/Night</span> */}
                      </div>
                    </li>
                  {/*    <li className="d-flex align-items-center justify-content-between gap-2">
                      <div>
                        <p className="mb-0 small fw-semibold text-dark">
                          Charity
                        </p>
                      </div>
                      <div className="d-flex align-items-end">
                        <h5 className="mb-0 brown fw-semibold">₹&nbsp;10</h5>
                        <span className="small text-dark">/Night</span>
                      </div>
                    </li> */}
                  </ul>
                  {/* <div className="d-flex align-items-center justify-content-between gap-2 bg-white p-3 mt-3">
                    <div>
                      <p className="text-dark fw-semibold mb-0">Total Amount</p>
                    </div>
                    <div className="text-end">
                      <h5 className="mb-0 brown fw-semibold">₹ {orderObj.totalAmount}</h5>
                    </div>
                  </div> */}
                </div>
                <div className="user_inof mt-3">
                  <h5 className="fw-semibold">Location</h5>
                  <p className="text-dark small">
                   {orderObj.hotelObj?.tagline}
                  </p>
                  <div className="map_right">
                     {orderObj.hotelObj && orderObj.hotelObj?.googleMap && (
                      <p
                        dangerouslySetInnerHTML={{
                          __html: orderObj.hotelObj.googleMap,
                        }}
                      ></p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Modal show={show} size="xl" onHide={() => setShow(false)} centered>
        <Modal.Header
          className="align-items-start border-0 pb-0"
          closeButton
        ></Modal.Header>
        <Modal.Body>
          <div className="gallery-page">
            <div className="row g-3">
              <div className="col-12 col-md-4">
                <div className="image rounded-3">
                  <img
                    src={images.Barlowscottage14}
                    alt=""
                    className="w-100 img-cover rounded-3"
                  />
                </div>
              </div>
              <div className="col-12 col-md-4">
                <div className="image rounded-3">
                  <img
                    src={images.Barlowscottage15}
                    alt=""
                    className="w-100 img-cover rounded-3"
                  />
                </div>
              </div>
              <div className="col-12 col-md-4">
                <div className="image rounded-3">
                  <img
                    src={images.Barlowscottage16}
                    alt=""
                    className="w-100 img-cover rounded-3"
                  />
                </div>
              </div>
              <div className="col-12 col-md-4">
                <div className="image rounded-3">
                  <img
                    src={images.Barlowscottage14}
                    alt=""
                    className="w-100 img-cover rounded-3"
                  />
                </div>
              </div>
              <div className="col-12 col-md-4">
                <div className="image rounded-3">
                  <img
                    src={images.Barlowscottage15}
                    alt=""
                    className="w-100 img-cover rounded-3"
                  />
                </div>
              </div>
              <div className="col-12 col-md-4">
                <div className="image rounded-3">
                  <img
                    src={images.Barlowscottage16}
                    alt=""
                    className="w-100 img-cover rounded-3"
                  />
                </div>
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>

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
};

export default Booking;
