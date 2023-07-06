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

export const Barlowscottage = () => {
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

const guest = [
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
  {
    id: "reviews_section",
    activeimg: images.iAstar,
    inactiveimg: images.star,
  },
  {
    id: "location_area",
    activeimg: images.iAlocation,
    inactiveimg: images.location,
  },
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
                          src={images.Barlowscottage1}
                          className="img-fluid"
                        />
                      </SwiperSlide>
                      <SwiperSlide>
                        {" "}
                        <img
                          src={images.Barlowscottage2}
                          className="img-fluid"
                        />
                      </SwiperSlide>
                      <SwiperSlide>
                        {" "}
                        <img
                          src={images.Barlowscottage3}
                          className="img-fluid"
                        />
                      </SwiperSlide>
                     
                      <SwiperSlide>
                        <img
                          src={images.Barlowscottage4}
                          className="img-fluid"
                        />
                      </SwiperSlide>
                      <SwiperSlide>
                        <img
                          src={images.Barlowscottage5}
                          className="img-fluid"
                        />
                      </SwiperSlide>
                      <SwiperSlide>
                        <img
                          src={images.Barlowscottage6}
                          className="img-fluid"
                        />
                      </SwiperSlide>
                      <SwiperSlide>
                        <img
                          src={images.Barlowscottage7}
                          className="img-fluid"
                        />
                      </SwiperSlide>
                      <SwiperSlide>
                        <img
                          src={images.Barlowscottage8}
                          className="img-fluid"
                        />
                      </SwiperSlide>
                      <SwiperSlide>
                        <img
                          src={images.Barlowscottage10}
                          className="img-fluid"
                        />
                      </SwiperSlide>
                      <SwiperSlide>
                        <img
                          src={images.Barlowscottage11}
                          className="img-fluid"
                        />
                      </SwiperSlide>
                      <SwiperSlide>
                        <img
                          src={images.Barlowscottage12}
                          className="img-fluid"
                        />
                      </SwiperSlide>
                      <SwiperSlide>
                        <img
                          src={images.Barlowscottage13}
                          className="img-fluid"
                        />
                      </SwiperSlide>
                      <SwiperSlide>
                        <img
                          src={images.Barlowscottage14}
                          className="img-fluid"
                        />
                      </SwiperSlide>
                      <SwiperSlide>
                        <img
                          src={images.Barlowscottage15}
                          className="img-fluid"
                        />
                      </SwiperSlide>
                      <SwiperSlide>
                        <img
                          src={images.Barlowscottage16}
                          className="img-fluid"
                        />
                      </SwiperSlide>
                      <SwiperSlide>
                        <img
                          src={images.Barlowscottage17}
                          className="img-fluid"
                        />
                      </SwiperSlide>
                      <SwiperSlide>
                        <img
                          src={images.Barlowscottage18}
                          className="img-fluid"
                        />
                      </SwiperSlide>
                      <SwiperSlide>
                        <img
                          src={images.Barlowscottage19}
                          className="img-fluid"
                        />
                      </SwiperSlide>
                      <SwiperSlide>
                        <img
                          src={images.Barlowscottage20}
                          className="img-fluid"
                        />
                      </SwiperSlide>
                      <SwiperSlide>
                        <img
                          src={images.Barlowscottage21}
                          className="img-fluid"
                        />
                      </SwiperSlide>
                      <SwiperSlide>
                        <img
                          src={images.Barlowscottage22}
                          className="img-fluid"
                        />
                      </SwiperSlide>
                      <SwiperSlide>
                        <img
                          src={images.Barlowscottage23}
                          className="img-fluid"
                        />
                      </SwiperSlide>
                      <SwiperSlide>
                        <img
                          src={images.Barlowscottage24}
                          className="img-fluid"
                        />
                      </SwiperSlide>
                      <SwiperSlide>
                        <img
                          src={images.Barlowscottage25}
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
                          src={images.Barlowscottage2}
                          className="img-fluid"
                        />
                      </SwiperSlide>
                      <SwiperSlide>
                        <img
                          src={images.Barlowscottage1}
                          className="img-fluid"
                        />
                      </SwiperSlide>
                      <SwiperSlide>
                        {" "}
                        <img
                          src={images.Barlowscottage2}
                          className="img-fluid"
                        />{" "}
                      </SwiperSlide>
                 
                      <SwiperSlide>
                        <img
                          src={images.Barlowscottage3}
                          className="img-fluid"
                        />
                      </SwiperSlide>
                      <SwiperSlide>
                        <img
                          src={images.Barlowscottage4}
                          className="img-fluid"
                        />
                      </SwiperSlide>
                      <SwiperSlide>
                        <img
                          src={images.Barlowscottage5}
                          className="img-fluid"
                        />
                      </SwiperSlide>
                      <SwiperSlide>
                        <img
                          src={images.Barlowscottage6}
                          className="img-fluid"
                        />
                      </SwiperSlide>
                      <SwiperSlide>
                        <img
                          src={images.Barlowscottage7}
                          className="img-fluid"
                        />
                      </SwiperSlide>
                      <SwiperSlide>
                        <img
                          src={images.Barlowscottage8}
                          className="img-fluid"
                        />
                      </SwiperSlide>
                      <SwiperSlide>
                        <img
                          src={images.Barlowscottage9}
                          className="img-fluid"
                        />
                      </SwiperSlide>
                      <SwiperSlide>
                        <img
                          src={images.Barlowscottage10}
                          className="img-fluid"
                        />
                      </SwiperSlide>
                      <SwiperSlide>
                        <img
                          src={images.Barlowscottage11}
                          className="img-fluid"
                        />
                      </SwiperSlide>
                      <SwiperSlide>
                        <img
                          src={images.Barlowscottage12}
                          className="img-fluid"
                        />
                      </SwiperSlide>
                      <SwiperSlide>
                        <img
                          src={images.Barlowscottage13}
                          className="img-fluid"
                        />
                      </SwiperSlide>
                      <SwiperSlide>
                        <img
                          src={images.Barlowscottage15}
                          className="img-fluid"
                        />
                      </SwiperSlide>
                      <SwiperSlide>
                        <img
                          src={images.Barlowscottage14}
                          className="img-fluid"
                        />
                      </SwiperSlide>
                      <SwiperSlide>
                        <img
                          src={images.Barlowscottage16}
                          className="img-fluid"
                        />
                      </SwiperSlide>
                      <SwiperSlide>
                        <img
                          src={images.Barlowscottage17}
                          className="img-fluid"
                        />
                      </SwiperSlide>
                      <SwiperSlide>
                        <img
                          src={images.Barlowscottage18}
                          className="img-fluid"
                        />
                      </SwiperSlide>
                      <SwiperSlide>
                        <img
                          src={images.Barlowscottage19}
                          className="img-fluid"
                        />
                      </SwiperSlide>
                      <SwiperSlide>
                        <img
                          src={images.Barlowscottage20}
                          className="img-fluid"
                        />
                      </SwiperSlide>
                      <SwiperSlide>
                        <img
                          src={images.Barlowscottage21}
                          className="img-fluid"
                        />
                      </SwiperSlide>
                      <SwiperSlide>
                        <img
                          src={images.Barlowscottage22}
                          className="img-fluid"
                        />
                      </SwiperSlide>
                      <SwiperSlide>
                        <img
                          src={images.Barlowscottage23}
                          className="img-fluid"
                        />
                      </SwiperSlide>
                      <SwiperSlide>
                        <img
                          src={images.Barlowscottage24}
                          className="img-fluid"
                        />
                      </SwiperSlide>
                      <SwiperSlide>
                        <img
                          src={images.Barlowscottage25}
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
                    <h1>Hill Top Cottage</h1>
                    <p className="mb-2">
                      <AiFillStar />
                      <AiFillStar />
                      <AiFillStar />
                      <AiFillStar />
                      <AiFillStar /> Mussoorie, Uttarakhand

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

                              <div
                                className="dropdown_main_ position-relative"
                                onClick={() => {
                                  setChecked(!checked);
                                }}
                              >
                                <div className="list_gaut">
                                  1 Adult{" "}
                                  <GoChevronDown
                                    className="dawon_arrow"
                                    style={{ top: 0, right: "22%" }}
                                  />
                                </div>
                              </div>
                            </div>
                            {checked && (
                              <div className="gaust_list">
                                <ul>
                                  {guest &&
                                    guest.map((el) => <li>{el.label}</li>)}
                                </ul>
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="col-lg-3 col-sm-6 col-md-6">
                          <div className="price_section">
                            <h3>Per Night</h3>
                            <h4>
                              <BiRupee /> 14,000
                            </h4>
                            <h5>
                              <BiRupee /> 18,000
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
                              {/* <span>4</span> */}
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
                              {/* <span>2</span> */}
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
                              {/* <span>1,024 ft2</span> */}
                              <img src={images.leaf} alt=""  />
                            </div>
                          </div>
                        </div>
                        <div className="col-lg-3 col-sm-6 col-md-6">
                          <div className="card_facilut">
                            <h3>Parking </h3>
                            <div className="d-flex">
                              {/* <span>Available </span> */}
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
                      A comfortable, cozy 3 bedroom independent cottage perfect for you if you wish to get up every morning to gorgeous views of the mountains right from your bed.
                                    <br />
Two of the bedrooms open out to a quaint sit-out, perfect for your morning cuppa or to sip on your favourite wine with a Barbeque and Bonfire. No evening is complete without the Bonfire & Barbecue, most popular with all our guests
                        {togglecontentshow && (
                          <div className="gaust_list1">
                           With big wide windows that frame the ever-changing moods of the hills & light airy rooms, the cottage is the perfect MOUNTAIN vacation home. We now have HIGH SPEED INTERNET making this a perfect work-from-home with a VIEW. 
                           <br />

With an inviting bedroom & living room, put together with a lot of love, Hill Top Cottage is an intimate spot for two. A place built for relaxation, the cottage has an outside seating space and a garden.Walk up a few steps and you’ll reach the garden. Note: Barlows Cottage requires to to walk down a fair number of steps to reach the cottage from the gate, so if you are travelling with elderly or those with knee related trouble etc then please do connect with us someone for our team with more details before you decide to book.
<br />We have high speed Wi-Fi, board games, Netflix, Amazon Prime & Tata Sky. A full-time staff with a Chef and two house caretakers are available to take care of your needs.

<br />We are pet-friendly. <br />
Our Chef is trained in Indian, Chinese, Italian and Continental cuisines. So whether you enjoy pancakes or parathas on bright sunny mornings, pizzas or chilly chicken on sun kissed afternoons, or momos or barbecues on starlit nights, we’ve got you.
We recommend you definitely try the Banoffee pie and chocolate cake :
<br />For those of you looking for a workcation, the high speed Internet will help you stay connected and our staff will be there to look after all your needs. For the rest of those who wish to detach themselves from work, just walk down the trekking trail that starts from the corner of the house, or go up for a walk to the quaint Barlowgang market (500 metres away), your could also drive up 5-7 mins to reach the hustle and bustle of the main Mall Road or the even better, soak in the old world charm of Landour. Don't forget to visit the FAY CAFE, just a 5-7 mins walk from the cottage, it's got the most beautiful views and the best Italian and Tandoori in town. 

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
                                src={images.Barlowscottage1}
                                alt=""
                                className="img-fluid"
                              />
                              <p> Bedroom 1</p>
                            </div>
                          </SwiperSlide>
                          <SwiperSlide>
                            <div className="Itinerary_slide">
                              <img
                                src={images.Barlowscottage3}
                                alt=""
                                className="img-fluid"
                              />
                              <p>Bedroom 2</p>
                            </div>
                          </SwiperSlide>
                          <SwiperSlide>
                            <div className="Itinerary_slide">
                              <img
                                src={images.Barlowscottage5}
                                alt=""
                                className="img-fluid"
                              />
                              <p>Bedroom 3</p>
                            </div>
                          </SwiperSlide>
                          <SwiperSlide>
                            <div className="Itinerary_slide">
                              <img
                                src={images.Barlowscottage7}
                                alt=""
                                className="img-fluid"
                              />
                              <p>Bedroom 4</p>
                            </div>
                          </SwiperSlide>
                          <SwiperSlide>
                            <div className="Itinerary_slide">
                              <img
                                src={images.Barlowscottage3}
                                alt=""
                                className="img-fluid"
                              />
                              <p>Bedroom 5</p>
                            </div>
                          </SwiperSlide>
                          <SwiperSlide>
                            <div className="Itinerary_slide">
                              <img
                                src={images.Barlowscottage10}
                                alt=""
                                className="img-fluid"
                              />
                              <p>Bedroom 6</p>
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
                    <div className="review_section mt-4 ">
                      <div className="row">
                        <div className="col-lg-12">
                          <div className="heading_title mb-3">
                            <h3>⭐ 4.82 · 252 reviews</h3>
                          </div>
                        </div>
                        <div className="col-lg-6 col-sm-6 col-md-6">
                          <div className="flex_prosser">
                            <h3>Cleanliness</h3>
                            <div className="w-8">
                              <div className="prosserbar">
                                <div className="progress-bars"></div>
                              </div>
                            </div>
                            <span>4.8</span>
                          </div>
                          <div className="flex_prosser">
                            <h3>Communication</h3>
                            <div className="w-8">
                              <div className="prosserbar">
                                <div className="progress-bars"></div>
                              </div>
                            </div>
                            <span>4.8</span>
                          </div>
                          <div className="flex_prosser">
                            <h3>Check-in</h3>
                            <div className="w-8">
                              <div className="prosserbar">
                                <div className="progress-bars"></div>
                              </div>
                            </div>
                            <span>4.8</span>
                          </div>
                        </div>
                        <div className="col-lg-6 col-sm-6 col-md-6">
                          <div className="flex_prosser justify-content-end">
                            <h3>Accuracy</h3>
                            <div className="w-8">
                              <div className="prosserbar">
                                <div className="progress-bars"></div>
                              </div>
                            </div>
                            <span>4.8</span>
                          </div>
                          <div className="flex_prosser justify-content-end">
                            <h3>Location</h3>
                            <div className="w-8">
                              <div className="prosserbar">
                                <div className="progress-bars"></div>
                              </div>
                            </div>
                            <span>4.8</span>
                          </div>
                          <div className="flex_prosser justify-content-end">
                            <h3>Value</h3>
                            <div className="w-8">
                              <div className="prosserbar">
                                <div className="progress-bars"></div>
                              </div>
                            </div>
                            <span>4.8</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="review_text mt-4">
                      <div className="row">
                        <div className="col-lg-6 col-sm-6 col-md-6">
                          <div className="card_reveiew">
                            <div className="revie_card_header">
                              <div className="testimonial_img">
                                <img
                                  src={images.testimonial}
                                  alt=""
                                  className="img-fluid"
                                />
                              </div>
                              <div className="user_nametestimonail">
                                <h3>Rostislav</h3>
                                <p>January 2023</p>
                              </div>
                            </div>
                            <div className="testimoan_body">
                              <p>
                                Great place for animal lovers! Beautiful place
                                to stay 🙏
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="col-lg-6 col-sm-6 col-md-6">
                          <div className="card_reveiew">
                            <div className="revie_card_header">
                              <div className="testimonial_img">
                                <img
                                  src={images.testimonialimg2}
                                  alt=""
                                  className="img-fluid"
                                />
                              </div>
                              <div className="user_nametestimonail">
                                <h3>Rostislav</h3>
                                <p>January 2023</p>
                              </div>
                            </div>
                            <div className="testimoan_body">
                              <p>
                                The place was very clean and had everything we
                                needed. Communication was great too; the
                                staffs were very responsive and friendly. Most
                                importantly, they always have cute... <br />
                                <strong> Show More </strong>
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="row mt-4">
                        <div className="col-lg-6 col-sm-6 col-md-6">
                          <div className="card_reveiew">
                            <div className="revie_card_header">
                              <div className="testimonial_img">
                                <img
                                  src={images.testimonial}
                                  alt=""
                                  className="img-fluid"
                                />
                              </div>
                              <div className="user_nametestimonail">
                                <h3>Sam</h3>
                                <p>December 2022</p>
                              </div>
                            </div>
                            <div className="testimoan_body">
                              <p>
                                A stunning stay! Such a beautiful location and
                                very peaceful! Surrounded by rice fields and
                                the views of the mountains. Beautiful huts
                                with everything you need, very clean and
                                even...
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="col-lg-6 col-sm-6 col-md-6">
                          <div className="card_reveiew">
                            <div className="revie_card_header">
                              <div className="testimonial_img">
                                <img
                                  src={images.testimonialimg2}
                                  alt=""
                                  className="img-fluid"
                                />
                              </div>
                              <div className="user_nametestimonail">
                                <h3>Rostislav</h3>
                                <p>January 2023</p>
                              </div>
                            </div>
                            <div className="testimoan_body">
                              <p>
                                Good host , and a clean place .I’ll visit
                                again for sure 😁
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="row mt-4">
                        <div className="col-lg-6 col-sm-6 col-md-6">
                          <div className="card_reveiew">
                            <div className="revie_card_header">
                              <div className="testimonial_img">
                                <img
                                  src={images.testimonialimg4}
                                  alt=""
                                  className="img-fluid"
                                />
                              </div>
                              <div className="user_nametestimonail">
                                <h3>Troy</h3>
                                <p>November 2022</p>
                              </div>
                            </div>
                            <div className="testimoan_body">
                              <p>
                                Good host , and a clean place . I’ll visit
                                again for sure 😁
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="col-lg-6 col-sm-6 col-md-6">
                          <div className="card_reveiew">
                            <div className="revie_card_header">
                              <div className="testimonial_img">
                                <img
                                  src={images.testimonialimg3}
                                  alt=""
                                  className="img-fluid"
                                />
                              </div>
                              <div className="user_nametestimonail">
                                <h3>Hardi</h3>
                                <p>November 2022</p>
                              </div>
                            </div>
                            <div className="testimoan_body">
                              <p>
                                Good host , and a clean place . I’ll visit
                                again for sure 😁
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="row mt-4 ">
                        <div className="col-lg-4">
                          <Link to="" className="btn btn-show">
                            Show All 220 reviews
                          </Link>
                        </div>
                      </div>
                    </div>

                    <div id="location_area">
                      <div className="row mt-4 pt-4">
                        <div className="col-lg-12">
                          <div className="heading_title">
                            <h3> Where you’ll be </h3>
                          </div>
                        </div>
                        <div className="col-lg-12 mt-3 map_text">
                          <div className="map_itiners">
                            <iframe
                              src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d6955.856463245549!2d79.56942100000002!3d29.343098999999995!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x4712785a57523e99!2sSundays%20Forever%20Thistle%20House!5e0!3m2!1sen!2sin!4v1674035864557!5m2!1sen!2sin"
                              width="100%"
                              height="450"
                            ></iframe>
                          </div>
                          <p>
                            We are situated in the green area of Pai - rice
                            paddy field surrounded by mountains with close
                            proximity to local Maeyen waterfall.
                          </p>
                        </div>
                      </div>
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
                              <li>In-House Chef</li>
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
            <div className="user_inof sticky-top">
              <div className="user_img">
                <img src={images.checkicon} alt="" className="absolute_img" />
                <img src={images.userimg} alt="" className="img-fluid " />
              </div>
              <div className="usernmaeinfo">
                <h3>Adam Magnuss</h3>
                <p>
                  <AiFillStar className="iconstart" /> 4.5/5 (123)
                </p>
              </div>
              <div className="border-bottom mt-4 mb-4"></div>
              <div className="about_user">
                <p>
                  Been traveling around the world for the past few years. Love
                  Thailand and its people. Now that we understand safety and
                  comfort are important for all travellers and we would do
                  what we can to provide that.
                </p>
              </div>
              <div className="border-bottom mt-4 mb-4"></div>
              <div className="stay_section">
                <h3>COTTAGE POLICIES</h3>
                {/* <p>
                  We will try to accommodate our visitors in every way we can.
                </p> */}
                <ul>
                  <li> Picturesque Views</li>
                  <li> Comfortable Stay</li>
                  <li> Pet Friendly Stays</li>
                  <li>  In-House Chef </li>
                </ul>
              </div>
              <div className="btn-host_user text-center mt-4 mb-4">
                <Link className="btn btn-host">Contact Host</Link>
              </div>
              <p className="pyment_text">
                To protect your payment, never transfer money or communicate
                outside of the Sunday forever website or app.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
 
  </>
  )
}
export default Barlowscottage;