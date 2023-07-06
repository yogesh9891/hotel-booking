import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import { images } from "./particle/Images";
import { Link } from "react-router-dom";
import { AiOutlineShareAlt } from "react-icons/ai";
import { AiFillStar } from "react-icons/ai";
import { AiOutlineHeart } from "react-icons/ai";
import { BsChevronDown, BsThreeDots } from "react-icons/bs";
import { BiChevronRight, BiLockOpenAlt, BiRupee } from "react-icons/bi";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { RiDashboard2Line } from "react-icons/ri";
import { BsCalendarEvent } from "react-icons/bs";
import { GiStarsStack } from "react-icons/gi";
import { ImLocation2 } from "react-icons/im";
import { GoChevronDown } from "react-icons/go";
import ProgressBar from "react-bootstrap/ProgressBar";
import join_img from "../assets/img/join_img.jpg";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { DateRangePicker } from "react-date-range";
import { addDays } from "date-fns";
import { FreeMode, Navigation, Thumbs } from "swiper";
import Select from 'react-select'

export const Thistlehouse = () => {
    const [gausttaggole, setgausttaggole] = useState(false);
    const [checked, setChecked] = React.useState(false);
    const [panel, setPanel] = useState(false);
    const [togglecontentshow, settogglecontentshow] = useState();
    const [state, setState] = useState([
      {
        startDate: new Date(),
        endDate: addDays(new Date(), 0),
        key: "selection",
      },
    ]);
    const [thumbsSwiper, setThumbsSwiper] = useState(null);
    const [startDate, setStartDate] = useState(new Date());
  
    const options = [
      { value: "1 Adult", label: "1 Adult" },
      { value: "2 Adult", label: "2 Adult" },
      { value: "3 Adult", label: "3 Adult" },
      { value: "4 Adult", label: "4 Adult" },
      { value: "5 Adult", label: "5 Adult" },
      { value: "6 Adult", label: "6 Adult" },
    ];
   
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
        id: "offer_section",
        activeimg: images.iAcricleimg,
        inactiveimg: images.cricleimg,
      },
      {
        id: "date_section",
        activeimg: images.iAcalendar,
        inactiveimg: images.calendar,
      },
    //   {
    //     id: "reviews_section",
    //     activeimg: images.iAstar,
    //     inactiveimg: images.star,
    //   },
    //   {
    //     id: "location_area",
    //     activeimg: images.iAlocation,
    //     inactiveimg: images.location,
    //   },
    ];
  
    function toggleButton() {
      if (!panel) setPanel(true);
      else setPanel(false);
    }
  return (
    <>
    <div className="itinery_box padding40 border-top pt-5">
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-9">
            <div className="itiner_header">
              <div className="row">
                <div className="col-lg-3">
                  <div className="swiper_left">
                    <Swiper
                      direction="vertical"
                      onSwiper={setThumbsSwiper}
                      loop={true}
                      spaceBetween={10}
                      slidesPerView={3}
                      freeMode={true}
                      watchSlidesProgress={true}
                      modules={[FreeMode, Navigation, Thumbs]}
                      className="mySwiper"
                    >
                      <SwiperSlide>
                        <img
                          src={images.ihistlehotelimg1}
                          className="img-fluid"
                        />
                      </SwiperSlide>
                      <SwiperSlide>
                        {" "}
                        <img
                          src={images.ihistlehotelimg2}
                          className="img-fluid"
                        />
                      </SwiperSlide>
                      <SwiperSlide>
                        {" "}
                        <img
                          src={images.ihistlehotelimg3}
                          className="img-fluid"
                        />
                      </SwiperSlide>
                      <SwiperSlide>
                        <img
                          src={images.ihistlehotelimg4}
                          className="img-fluid"
                        />
                      </SwiperSlide>
                      <SwiperSlide>
                        <img
                          src={images.ihistlehotelimg5}
                          className="img-fluid"
                        />
                      </SwiperSlide>
                      <SwiperSlide>
                        <img
                          src={images.ihistlehotelimg6}
                          className="img-fluid"
                        />
                      </SwiperSlide>
                      <SwiperSlide>
                        <img
                          src={images.ihistlehotelimg7}
                          className="img-fluid"
                        />
                      </SwiperSlide>
                      <SwiperSlide>
                        <img
                          src={images.ihistlehotelimg8}
                          className="img-fluid"
                        />
                      </SwiperSlide>
                      <SwiperSlide>
                        <img
                          src={images.ihistlehotelimg9}
                          className="img-fluid"
                        />
                      </SwiperSlide>
                      <SwiperSlide>
                        <img
                          src={images.ihistlehotelimg10}
                          className="img-fluid"
                        />
                      </SwiperSlide>
                      <SwiperSlide>
                        <img
                          src={images.ihistlehotelimg11}
                          className="img-fluid"
                        />
                      </SwiperSlide>
                      <SwiperSlide>
                        <img
                          src={images.ihistlehotelimg12}
                          className="img-fluid"
                        />
                      </SwiperSlide>
                      <SwiperSlide>
                        <img
                          src={images.ihistlehotelimg13}
                          className="img-fluid"
                        />
                      </SwiperSlide>
                      <SwiperSlide>
                        <img
                          src={images.ihistlehotelimg14}
                          className="img-fluid"
                        />
                      </SwiperSlide>
                      <SwiperSlide>
                        <img
                          src={images.ihistlehotelimg15}
                          className="img-fluid"
                        />
                      </SwiperSlide>
                      <SwiperSlide>
                        <img
                          src={images.ihistlehotelimg16}
                          className="img-fluid"
                        />
                      </SwiperSlide>
                      <SwiperSlide>
                        <img
                          src={images.ihistlehotelimg17}
                          className="img-fluid"
                        />
                      </SwiperSlide>
                      <SwiperSlide>
                        <img
                          src={images.ihistlehotelimg18}
                          className="img-fluid"
                        />
                      </SwiperSlide>
                      <SwiperSlide>
                        <img
                          src={images.ihistlehotelimg19}
                          className="img-fluid"
                        />
                      </SwiperSlide>
                      <SwiperSlide>
                        <img
                          src={images.ihistlehotelimg20}
                          className="img-fluid"
                        />
                      </SwiperSlide>
                      <SwiperSlide>
                        <img
                          src={images.ihistlehotelimg21}
                          className="img-fluid"
                        />
                      </SwiperSlide>
                      <SwiperSlide>
                        <img
                          src={images.ihistlehotelimg22}
                          className="img-fluid"
                        />
                      </SwiperSlide>
                      <SwiperSlide>
                        <img
                          src={images.ihistlehotelimg23}
                          className="img-fluid"
                        />
                      </SwiperSlide>
                    
                    </Swiper>
                  </div>
                </div>

                <div className="col-lg-9">
                  <div className="big_img_right">
                    <Swiper
                      style={{
                        "--swiper-navigation-color": "#fff",
                        "--swiper-pagination-color": "#fff",
                      }}
                      speed={3000}
                      delay={3}
                      loop={true}
                      spaceBetween={10}
                      navigation={true}
                      thumbs={{
                        swiper:
                          thumbsSwiper && !thumbsSwiper.destroyed
                            ? thumbsSwiper
                            : null,
                      }}
                      modules={[FreeMode, Navigation, Thumbs]}
                      className="mySwiper2"
                    >
                      <SwiperSlide>
                        <img
                          src={images.ihistlehotelimg1}
                          className="img-fluid"
                        />
                      </SwiperSlide>
                      <SwiperSlide>
                        <img
                          src={images.ihistlehotelimg2}
                          className="img-fluid"
                        />
                      </SwiperSlide>
                      <SwiperSlide>
                        {" "}
                        <img
                          src={images.ihistlehotelimg3}
                          className="img-fluid"
                        />{" "}
                      </SwiperSlide>
                      <SwiperSlide>
                        <img
                          src={images.ihistlehotelimg4}
                          className="img-fluid"
                        />
                      </SwiperSlide>
                      <SwiperSlide>
                        <img
                          src={images.ihistlehotelimg5}
                          className="img-fluid"
                        />
                      </SwiperSlide>
                      <SwiperSlide>
                        <img
                          src={images.ihistlehotelimg6}
                          className="img-fluid"
                        />
                      </SwiperSlide>
                      <SwiperSlide>
                        <img
                          src={images.ihistlehotelimg7}
                          className="img-fluid"
                        />
                      </SwiperSlide>
                      <SwiperSlide>
                        <img
                          src={images.ihistlehotelimg8}
                          className="img-fluid"
                        />
                      </SwiperSlide>
                      <SwiperSlide>
                        <img
                          src={images.ihistlehotelimg9}
                          className="img-fluid"
                        />
                      </SwiperSlide>
                      <SwiperSlide>
                        <img
                          src={images.ihistlehotelimg10}
                          className="img-fluid"
                        />
                      </SwiperSlide>
                      <SwiperSlide>
                        <img
                          src={images.ihistlehotelimg11}
                          className="img-fluid"
                        />
                      </SwiperSlide>
                      <SwiperSlide>
                        <img
                          src={images.ihistlehotelimg12}
                          className="img-fluid"
                        />
                      </SwiperSlide>
                      <SwiperSlide>
                        <img
                          src={images.ihistlehotelimg13}
                          className="img-fluid"
                        />
                      </SwiperSlide>
                      <SwiperSlide>
                        <img
                          src={images.ihistlehotelimg14}
                          className="img-fluid"
                        />
                      </SwiperSlide>
                      <SwiperSlide>
                        <img
                          src={images.ihistlehotelimg14}
                          className="img-fluid"
                        />
                      </SwiperSlide>
                      <SwiperSlide>
                        <img
                          src={images.ihistlehotelimg15}
                          className="img-fluid"
                        />
                      </SwiperSlide>
                      <SwiperSlide>
                        <img
                          src={images.ihistlehotelimg16}
                          className="img-fluid"
                        />
                      </SwiperSlide>
                      <SwiperSlide>
                        <img
                          src={images.ihistlehotelimg17}
                          className="img-fluid"
                        />
                      </SwiperSlide>
                      <SwiperSlide>
                        <img
                          src={images.ihistlehotelimg18}
                          className="img-fluid"
                        />
                      </SwiperSlide>
                      <SwiperSlide>
                        <img
                          src={images.ihistlehotelimg19}
                          className="img-fluid"
                        />
                      </SwiperSlide>
                      <SwiperSlide>
                        <img
                          src={images.ihistlehotelimg20}
                          className="img-fluid"
                        />
                      </SwiperSlide>
                      <SwiperSlide>
                        <img
                          src={images.ihistlehotelimg21}
                          className="img-fluid"
                        />
                      </SwiperSlide>
                      <SwiperSlide>
                        <img
                          src={images.ihistlehotelimg22}
                          className="img-fluid"
                        />
                      </SwiperSlide>
                      <SwiperSlide>
                        <img
                          src={images.ihistlehotelimg23}
                          className="img-fluid"
                        />
                      </SwiperSlide>
                    </Swiper>
                  </div>
                </div>
              </div>
              <div className="row mt-4">
                <div className="col-lg-9">
                  <div className="row"></div>
                  <div className="hding_title">
                    <h1>Thistle House | 4 Bedroom Cottage</h1>
                    <p className="mb-2">
                      <AiFillStar />
                      <AiFillStar />
                      <AiFillStar />
                      <AiFillStar />
                      <AiFillStar />Bhimtal, Uttarakhand
                    </p>
                  </div>
                </div>
                <div className="col-lg-3">
                  <div className="list_header_rightside">
                    <ul>
                      <li>
                        <a href="#" className="iocnl share">
                          <AiOutlineShareAlt />{" "}
                        </a>{" "}
                      </li>
                      <li>
                        <a href="#" className="iocnl heart">
                          <AiOutlineHeart />
                        </a>
                      </li>
                      <li>
                        <a href="#" className="iocnl dot">
                          <BsThreeDots />
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="border-top mb-4"></div>
              </div>
            </div>
            <div className="itiner_body">
              <div className="row">
                <div className="col-lg-1 col-sm-1 col-md-1 ">
                  <div className="list_tabs_vertical sticky-top">
                    <ul>
                      {sidebarlist.map((el) => (
                        <li>
                          <a
                            href={"#" + el.id}
                            className={
                              activesection == el.id
                                ? "active itnerys_iocn"
                                : ""
                            }
                            onClick={() => setactivesection(el.id)}
                          >
                            <img
                              src={
                                activesection == el.id
                                  ? el.activeimg
                                  : el.inactiveimg
                              }
                              alt=""
                              className="img-fluid"
                            />
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="col-lg-11 col-sm-11 col-md-11">
                  <div id="info_section">
                    <div className="date_area">
                      <div className="row">
                        <div className="col-lg-3 col-sm-6 col-md-6">
                          <div className="date_card">
                            <div className="heading_date">
                              <h3>Check In</h3>
                            </div>
                            <div className="border-top"></div>
                            <div className="date_selectcheck">
                              <DatePicker
                                className="hidden1"
                                closeOnScroll={(e) => e.target === document}
                                selected={startDate}
                                onChange={(date) => setStartDate(date)}
                              />
                              <GoChevronDown className="dawon_arrow" />
                            </div>
                          </div>
                        </div>
                        <div className="col-lg-3 col-sm-6 col-md-6">
                          <div className="date_card">
                            <div className="heading_date">
                              <h3>Check Out</h3>
                            </div>
                            <div className="border-top"></div>
                            <div className="date_selectcheck">
                              <DatePicker
                                className="hidden1"
                                closeOnScroll={(e) => e.target === document}
                                selected={startDate}
                                onChange={(date) => setStartDate(date)}
                              />
                              <GoChevronDown className="dawon_arrow" />
                            </div>
                          </div>
                        </div>
                        <div className="col-lg-3 col-sm-6 col-md-6">
                        <div className="position-relative">
                              <div className="date_card ">
                                <div className="heading_date">
                                  <h3>Guest</h3>
                                </div>
                                <div className="border-top"></div>
                                <Select  className="adult_section mt-1" options={options} />
                              </div>
                            </div>
                        </div>
                        <div className="col-lg-3 col-sm-6 col-md-6">
                          <div className="price_section">
                            <h3>Per Night</h3>
                            <h4>
                              <BiRupee /> 22,000
                            </h4>
                            <h5>
                              <BiRupee /> 28,000
                            </h5>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="faciluty_section">
                      <div className="row">
                        <div className="col-lg-3 col-sm-6 col-md-6">
                          <div className="card_facilut">
                            <h3>  Room Service</h3>
                            <div className="d-flex">
                              <span>4</span>
                              <img
                                src={images.bad}
                                alt=""
                                className="img-fluid"
                              />
                            </div>
                          </div>
                        </div>
                        <div className="col-lg-3 col-sm-6 col-md-6">
                          <div className="card_facilut">
                            <h3>Wifi Access</h3>
                            <div className="d-flex">
                              <span>2</span>
                              <img
                                src={images.wifipassword}
                                alt=""
                                className="img-fluid"
                              />
                            </div>
                          </div>
                        </div>
                        <div className="col-lg-3 col-sm-6 col-md-6">
                          <div className="card_facilut">
                            <h3>Lawns</h3>
                            <div className="d-flex">
                              <span>1,024 ft2</span>
                              <img src={images.leaf} alt=""  />
                            </div>
                          </div>
                        </div>
                        <div className="col-lg-3 col-sm-6 col-md-6">
                          <div className="card_facilut">
                            <h3>Parking </h3>
                            <div className="d-flex">
                              <span>Available </span>
                              <img
                                src={images.Parkingrea}
                                alt=""
                                className="img-fluid"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="dicription_area mt-4">
                      <div className="headin_discri">
                        <div className="heading_title">
                          <h3> Description </h3>
                        </div>
                      </div>
                      <div className="conten_decipt">
                      Just 600 meters from the lake, in the heart of Bhimtal, is Sundays Forever Thistle House, a private, spacious, comfortable home with all facilities of a luxury stay coupled with the warmth and hospitality of our in-house staff.
Facilities:
                        {togglecontentshow && (
                          <div className="gaust_list1">
                           Privacy : guests have the entire property to themselves
Full-time staff of 5 from cooks to caretakers
                            <br />
                           <p >Power Back up</p>
                           <p>Wi-Fi</p>
                           <p>Parking</p>
                           <p>500 meters to the main market</p>
                           <p>Garden & Gazebo</p>
                           <p>Food Specialty: Barbeque, Tandoori, Thin Crust Pizza's, Cakes, Indian & Chinese</p>
                          </div>
                        )}
                       
                        <Link
                          onClick={() => {
                            settogglecontentshow(!togglecontentshow); 
                          }}
                         
                        >
                           {togglecontentshow == true ? 'Show Less'  : 'Show more'}
                           <BiChevronRight />
                        </Link>
                      </div>
                    </div>
                  </div>

                  <div id="lock_section">
                    <div className="row mt-4">
                      <div className="col-lg-12 mb-3">
                        <div className="heading_title">
                          {" "}
                          <h3>Where you'll sleep</h3>
                        </div>
                      </div>
                      {/* <div className="col-lg-2">
                      <p className="mb-0">Bedroom</p>
                      <p>1 queen Bed</p>
                    </div> */}
                      <div className="col-lg-12 itnery_slider">
                        <Swiper
                          navigation
                          modules={[Navigation]}
                          spaceBetween={15}
                          slidesPerView={3}
                          autoplay={true}
                          speed={1000}
                          delay={3}
                        >
                          <SwiperSlide>
                            <div className="Itinerary_slide">
                              <img
                                src={images.ihistlehotelimg2}
                                alt=""
                                className="img-fluid"
                              />
                              <p> Bedroom 1</p>
                            </div>
                          </SwiperSlide>
                          <SwiperSlide>
                            <div className="Itinerary_slide">
                              <img
                                src={images.ihistlehotelimg3}
                                alt=""
                                className="img-fluid"
                              />
                              <p>Bedroom 2</p>
                            </div>
                          </SwiperSlide>
                          <SwiperSlide>
                            <div className="Itinerary_slide">
                              <img
                                src={images.ihistlehotelimg4}
                                alt=""
                                className="img-fluid"
                              />
                              <p>Bedroom 3</p>
                            </div>
                          </SwiperSlide>
                          <SwiperSlide>
                            <div className="Itinerary_slide">
                              <img
                                src={images.ihistlehotelimg6}
                                alt=""
                                className="img-fluid"
                              />
                              <p>Bedroom 4</p>
                            </div>
                          </SwiperSlide>
                          <SwiperSlide>
                            <div className="Itinerary_slide">
                              <img
                                src={images.ihistlehotelimg7}
                                alt=""
                                className="img-fluid"
                              />
                              <p>Bedroom 5</p>
                            </div>
                          </SwiperSlide>
                          <SwiperSlide>
                            <div className="Itinerary_slide">
                              <img
                                src={images.ihistlehotelimg8}
                                alt=""
                                className="img-fluid"
                              />
                              <p>Bedroom 6</p>
                            </div>
                          </SwiperSlide>
                          <SwiperSlide>
                            <div className="Itinerary_slide">
                              <img
                                src={images.ihistlehotelimg15}
                                alt=""
                                className="img-fluid"
                              />
                              <p>Bedroom 7</p>
                            </div>
                          </SwiperSlide>
                        </Swiper>

                        {/* <div className="img-relexbad">
                        <img src={images.relexbed} alt=""  className="img-fluid" />
                      </div> */}
                      </div>
                    </div>
                  </div>

                  <div id="offer_section">
                    <div className="row mt-4">
                      <div className="col-lg-12 mb-3">
                        <div className="heading_title">
                          <h3> What this place offers</h3>
                        </div>
                      </div>
                      <div className="col-lg-6">
                        <div className="card__offer_list">
                          <ul>
                            <li>
                              <div className="img_icon">
                                <img
                                  src={images.icon1}
                                  alt=""
                                  className="img-fluid"
                                />
                              </div>
                              <h3>Mini Bar</h3>
                            </li>
                            <li>
                              <div className="img_icon">
                                <img
                                  src={images.icon8}
                                  alt=""
                                  className="img-fluid"
                                />
                              </div>
                              <h3>Breakfast</h3>
                            </li>
                            <li>
                              <div className="img_icon">
                                <img
                                  src={images.icon7}
                                  alt=""
                                  className="img-fluid"
                                />
                              </div>
                              <h3>Free-to-use- Smartphone</h3>
                            </li>
                            <li>
                              <div className="img_icon">
                                <img
                                  src={images.icon6}
                                  alt=""
                                  className="img-fluid"
                                />
                              </div>
                              <h3>Wi-Fi</h3>
                            </li>
                            <li>
                              <div className="img_icon">
                                <img
                                  src={images.icon5}
                                  alt=""
                                  className="img-fluid"
                                />
                              </div>
                              <h3>Hair Dryer</h3>
                            </li>
                          </ul>
                        </div>
                      </div>
                      <div className="col-lg-6">
                        <div className="card__offer_list">
                          <ul>
                            <li>
                              <div className="img_icon">
                                <img
                                  src={images.icon4}
                                  alt=""
                                  className="img-fluid"
                                />
                              </div>
                              <h3>Sauna</h3>
                            </li>
                            <li>
                              <div className="img_icon">
                                <img
                                  src={images.icon3}
                                  alt=""
                                  className="img-fluid"
                                />
                              </div>
                              <h3>Coffee Maker</h3>
                            </li>
                            <li>
                              <div className="img_icon">
                                <img
                                  src={images.icon2}
                                  alt=""
                                  className="img-fluid"
                                />
                              </div>
                              <h3>Widescreen TV</h3>
                            </li>
                            <li>
                              <div className="img_icon">
                                <img
                                  src={images.icon1}
                                  alt=""
                                  className="img-fluid"
                                />
                              </div>
                              <h3>Air Conditioner</h3>
                            </li>
                            <Link to="#" className="btn btn-show">
                              Show All 20 Amenities
                            </Link>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div id="date_section">
                    <div className="row mt-4">
                      <div className="col-lg-12">
                        <div className="heading_title">
                          <h3>Select check-in date</h3>
                          <p>Add your travel dates for exact pricing</p>
                        </div>
                      </div>
                      <div className="col-lg-12">
                        <div className="border_date">
                          <DateRangePicker
                            onChange={(item) => setState([item.selection])}
                            showSelectionPreview={true}
                            moveRangeOnFirstSelection={true}
                            months={2}
                            ranges={state}
                            direction="horizontal"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div id="reviews_section">
                    

                 

                    <div id="location_area">
                      <div className="row mt-4">
                        <div className="col-lg-12 mb-3">
                          <div className="heading_title">
                            <h3> Things to know </h3>
                          </div>
                        </div>
                        <div className="col-lg-4 col-sm-6 col-md-6">
                          <div className="link_tink">
                            <h5>House rules</h5>
                            <ul>
                              <li>Check-in after 2:00 pm</li>
                              <li>Checkout before 12:00 pm</li>
                              <li>2 guests maximum</li>
                              <li>
                                <a href="#">
                                  Show More <BiChevronRight />{" "}
                                </a>
                              </li>
                            </ul>
                          </div>
                        </div>
                        <div className="col-lg-4 col-sm-6 col-md-6">
                          <div className="link_tink">
                            <h5>Safety & property</h5>
                            <ul>
                              <li>Carbon monoxide alarm</li>
                              <li>Smoke alarm</li>
                              <li>Pet(s) live on property</li>
                              <li>
                                <a href="#">
                                  Show More <BiChevronRight />{" "}
                                </a>
                              </li>
                            </ul>
                          </div>
                        </div>
                        <div className="col-lg-4 col-sm-6 col-md-6">
                          <div className="link_tink">
                            <h5>Cancellation policy</h5>
                            <ul>
                              <li>
                                Add your trip dates to get the cancellation
                                details for this stay.
                              </li>
                              <li>
                                <a href="#">
                                  Add Dates <BiChevronRight />{" "}
                                </a>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-3">
              <div className="user_inof">
                {/* <div className="user_img">
                  <img src={images.checkicon} alt="" className="absolute_img" />
                  <img src={images.userimg} alt="" className="img-fluid " />
                </div>*/}
                <div className="usernmaeinfo">
                  <h3>Book Properties</h3>
                  <p>Cozy cabin๑ in the middle of paddies w/breakfast</p>
                  <div className="guests_txt">Max Guests: 10</div>
                  <div className="btn_propery">
                    <a className="btn btn-host" href="/Itinerary">
                      Select Property
                    </a>
                  </div>
                </div>

                {/* <div className="border-bottom mt-4 mb-4"></div>
                <div className="about_user">
                  <p>
                    Been traveling around the world for the past few years. Love
                    Thailand and its people. Now that we understand safety and
                    comfort are important for all travellers and we would do
                    what we can to provide that.
                  </p>
                </div> */}
                <div className="border-bottom mt-4 mb-4"></div>
                <div className="stay_section">
                  <h3>During your stay</h3>
                  <p>
                    We will try to accommodate our visitors in every way we can.
                  </p>
                  <ul>
                    <li>Languages: English, ภาษาไทย</li>
                    <li>Response rate: 100%</li>
                    <li>Response time: within an hour</li>
                  </ul>
                </div>
                <div className="btn-host_user text-center mt-4 mb-4">
                  <div className="btn_propery">
                    {" "}
                    <Link className="btn btn-host">Contact Host</Link>{" "}
                  </div>
                </div>
                <p className="pyment_text">
                  To protect your payment, never transfer money or communicate
                  outside of the Sunday forever website or app.
                </p>
              </div>

              <div className="user_inof mt-4">
                <div className="usernmaeinfo">
                  <h3>Book Properties</h3>
                </div>
                <p>Opposite Taxi Stand, Residency Road-Eidgah Street, 180001</p>
                <div className="map_right">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d6955.856463245549!2d79.56942100000002!3d29.343098999999995!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x4712785a57523e99!2sSundays%20Forever%20Thistle%20House!5e0!3m2!1sen!2sin!4v1674035864557!5m2!1sen!2sin"
                    width="100%"
                    height="320"
                  ></iframe>
                </div>
                <div className="row mt-4">
                  <div className="col-lg-6 col-ms-6 col-md-6">
                    <div className="box_right_itners">
                      <div className="_box_header_itners">
                        <h4>Attractions</h4>
                        <img
                          src={images.indiagateimg}
                          alt=""
                          className="img-fluid"
                        />
                      </div>
                      <p>5 Nearby</p>
                      <div className="link_view">
                        <a href="#" className="btn btn-view">
                          View
                        </a>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-6 col-ms-6 col-md-6">
                    <div className="box_right_itners">
                      <div className="_box_header_itners">
                        <h4>Restaurants</h4>
                        <img
                          src={images.Restaurants}
                          alt=""
                          className="img-fluid"
                        />
                      </div>
                      <p>5 Nearby</p>
                      <div className="link_view">
                        <a href="#" className="btn btn-view">
                          View
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row mt-4">
                  <div className="col-lg-6 col-ms-6 col-md-6">
                    <div className="box_right_itners">
                      <div className="_box_header_itners">
                        <h4>Night Life</h4>
                        <img
                          src={images.nightlife}
                          alt=""
                          className="img-fluid"
                        />
                      </div>
                      <p>5 Nearby</p>
                      <div className="link_view">
                        <a href="#" className="btn btn-view">
                          View
                        </a>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-6 col-ms-6 col-md-6">
                    <div className="box_right_itners">
                      <div className="_box_header_itners">
                        <h4>Activities</h4>
                        <img
                          src={images.activities}
                          alt=""
                          className="img-fluid"
                        />
                      </div>
                      <p>5 Nearby</p>
                      <div className="link_view">
                        <a href="#" className="btn btn-view">
                          View
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
        </div>
      </div>
    </div>
    <div className="news_letter ">
        <div className="container position-relative">
          <div className="leftimg"></div>
          <div className="row py-4 align-items-center">
            <div className="col-lg-6">
              <div className="newsletter_card">
                <h3>Subscriber For Newsletter</h3>
                <p>
                  Be the first to know about sales & offers, new arrivals, <br />
                  latest trends, events, brand news, and more.
                </p>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="news_letter_input">
              <div className="input-group mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter your email address"
                />
                <div className="input-group-append">
                  <span className="input-group-text" id="basic-addon2">
                  Subscribe Now
                  </span>
                </div>
              </div>
              </div>
            </div>
          </div>
        <div className="rightimg"></div>
        </div>
      </div>
  </>
  )
}
export default Thistlehouse;