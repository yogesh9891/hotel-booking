import React, { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";
import { images } from "./particle/Images";
import { Link, useLocation, useParams } from "react-router-dom";
import { AiOutlineClose } from "react-icons/ai";
import { BiChevronRight, BiLockOpenAlt, BiRupee, BiMap } from "react-icons/bi";
import { HiOutlineUsers } from "react-icons/hi";
import { MdOutlineBedroomParent } from "react-icons/md";
import { TbParking } from "react-icons/tb";
import {
  MdOutlineBathroom,
  MdNoMealsOuline,
  MdOutlineVilla,
} from "react-icons/md";
import { GiCheckMark, GiTeapotLeaves } from "react-icons/gi";
import { FaBath } from "react-icons/fa";
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
import { BsSearch } from "react-icons/bs";
import { FaUserCircle } from "react-icons/fa";
import { BiTime } from "react-icons/bi";
// import Modal from 'react-bootstrap/Modal';
export const Itinerary = () => {
  const params = useParams();
  const [hotelObj, sethotelObj] = useState("");
  const [roomObj, setroomObj] = useState("");
  const [roomsArr, setroomsArr] = useState([]);
  const [hotelId, sethotelId] = useState("");
  const [showcontent, setshowcontent] = useState(false);
  const [selectRoom, setselectRoom] = useState([]);
  const [activeRoom, setactiveRoom] = useState("");
  const [modalTitle, setmodalTitle] = useState("");
  const [modalDescription, setmodalDescription] = useState("");

  const handleModel = (row) => {
    setModalShow(true);
    setmodalTitle(row.title);
    setmodalDescription(row.description);
  };

  const [totalPrice, settotalPrice] = useState(0);
  const handleGetHotelBySlug = async (slug) => {
    try {
      let { data: res } = await getHotelBySlugApi(slug);
      if (res.data) {
        sethotelObj(res.data);
        settotalPrice(res.data.price);
        sethotelId(res.data._id);
      }
    } catch (error) {
      errorToast(error);
    }
  };
  const handleGetRoomsById = async (id) => {
    try {
      let { data: res } = await getRoomByIdApi(`hotelId=${id}`);
      if (res.data) {
        setroomsArr(res.data);
        if (res.data && res.data?.length > 0) {
          setroomObj(res.data[0]);
        }
      }
    } catch (error) {
      errorToast(error);
    }
  };

  const handleSelectReomveRoom = (room) => {
    let teemRoom = selectRoom;
    let index = teemRoom.findIndex((el) => el.id === room._id);
    let newTem = teemRoom.filter((el) => el.id !== room._id);
    setselectRoom([...newTem]);
    console.log(
      newTem,
      "|teemRoomteemRoom",
      teemRoom.some((el) => el.id !== room._id),
      room._id
    );
  };
  const handleSelectRoom = (room) => {
    let teemRoom = selectRoom;
    let obj = {
      id: room?._id,
      name: room?.name,
      maxGuest: room?.opionsArr[0].maxGuest,
      price: room?.opionsArr[0].adultPrice,
      totalPrice: room?.opionsArr[0].adultPrice,
      adultPrice: room?.opionsArr[0].adultPrice,
      childPrice: room?.opionsArr[0].adultPrice,
    };

    if (teemRoom.length == 0) {
      teemRoom.push(obj);
    } else {
      if (teemRoom && !teemRoom.some((el) => el.id === room._id)) {
        console.log(
          teemRoom,
          "|teemRoomteemRoom",
          teemRoom.some((el) => el.id !== room._id),
          room._id
        );
        teemRoom.push(obj);
      }
    }

    setselectRoom([...teemRoom]);
  };

  const handleChangeAdult = (val) => {
    let chec = { ...checkOutDetails, adult: val.value };
    setadult(val);
    console.log(chec, "adult set");
    setcheckOutDetails(chec);
  };

  const getCheckOutDetails = () => {
    let price = 0;
    let totalRoom = checkOutDetails.room;
    let totalAdult = checkOutDetails.adult;
    let tempRoomArr = [];

    if (selectRoom && selectRoom?.length == 0) {
      errorToast("Please Select Atlest One Room");
      return 0;
    }
    selectRoom.forEach((element) => {
      if (element) {
        console.log(element);
        let tRoom = parseInt(totalAdult / element.maxGuest);
        console.log(tRoom);
        totalRoom += tRoom;
        console.log(totalRoom);

        let remaingAdult =
          parseInt(totalAdult) - parseInt(tRoom * element.maxGuest);
        console.log(remaingAdult);

        let pr = parseInt(tRoom) * parseInt(element.price);

        if (remaingAdult > 0) {
          pr += parseInt(remaingAdult) * parseInt(element.adultPrice);
        }
        let tempele = { ...element, totalPrice: pr };

        console.log(pr);
        price += parseInt(pr);
        console.log(price);

        tempRoomArr.push(tempele);
      }
    });
    let check = {
      location: "",
      adult: totalAdult,
      price: price,
      child: 0,
      room: totalRoom,
    };
    setcheckOutDetails(check);
    if (price > 0) {
      settotalPrice(price);
    }
    setselectRoom(tempRoomArr);
  };

  // useEffect(() => {

  //   if(selectRoom && selectRoom?.length > 0){
  //     getCheckOutDetails()
  //   }

  // }, [selectRoom])
  useEffect(() => {
    if (hotelId) {
      handleGetRoomsById(hotelId);
    }
  }, [hotelId]);

  const handleCalculatePrice = () => {
    let maxOccupancy = 2;
    let totalAdults = 3;

    let adultPrice = 3000;
    let RoomPrice = 3300;
    let rooms = 0;
    let remainingAdults = 0;
    let price = 0;

    let temprooms = totalAdults / maxOccupancy;
    temprooms = Math.floor(temprooms);
    remainingAdults = totalAdults - temprooms * maxOccupancy;

    price += RoomPrice * temprooms;

    console.log(price, "before remaining price");

    if (remainingAdults > 0) {
      price += adultPrice * remainingAdults;
    }

    console.log(
      temprooms,
      "temprooms",
      maxOccupancy,
      "maxOccupancy",
      totalAdults,
      "totalAdults",
      rooms,
      "rooms",
      remainingAdults,
      "remainingAdults",
      price,
      "total price"
    );
  };

  const getIcon = (name) => {
    switch (name) {
      case "bathroom":
        return <MdOutlineBathroom />;
        break;
      case "people":
        return <HiOutlineUsers />;
        break;
      case "bedroom":
        return <MdOutlineBedroomParent />;
        break;
      case "parking":
        return <TbParking />;
        break;
      case "meal":
        return <MdNoMealsOuline />;
        break;
      case "villa":
        return <MdOutlineVilla />;
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    if (params.slug) {
      console.log(params.slug, "paramsparamsparams");
      handleGetHotelBySlug(params.slug);
    }
  }, [params]);

  useEffect(() => {
    if (roomObj && roomObj?._id) {
      let priec = roomObj.opionsArr[0].adultPrice;
      console.log(priec, "priecpriecpriec");
      settotalPrice(priec);
      let obj = {
        location: "",
        adult: adult?.value,
        price: priec,
        child: 0,
        room: 1,
      };
      let tempArr = selectRoom;
      let seobj = {
        id: roomObj?._id,
        name: roomObj?.name,
        maxGuest: roomObj?.opionsArr[0].maxGuest,
        price: roomObj?.opionsArr[0].price,
        totalPrice: roomObj?.opionsArr[0].adultPrice,
        adultPrice: roomObj?.opionsArr[0].adultPrice,
        childPrice: roomObj?.opionsArr[0].childPrice,
        subtotalPrice: roomObj?.opionsArr[0].adultPrice,
      };
      tempArr.push(seobj);
      setselectRoom(tempArr);
      setactiveRoom(roomObj);
      setcheckOutDetails(obj);
    }
  }, [roomObj]);

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
  const [modalShow, setModalShow] = React.useState(false);
  const [adult, setadult] = useState({ value: 1, label: "Adult 1" });
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
  const [tabs, setTabs] = useState([
    { name: "About", active: true, tab: 1 },
    { name: "Amenities", active: false, tab: 2 },
    { name: "Meals", active: false, tab: 3 },
    { name: "Location", active: false, tab: 4 },
    { name: "Home Rules & Truths", active: false, tab: 5 },
    { name: "Policy", active: false, tab: 6 },
    { name: "FAQs", active: false, tab: 6 },
  ]);
  const tabClick = (i) => {
    const temp = tabs.map((item, index) => {
      i === index ? (item.active = true) : (item.active = false);
      return item;
    });
    setTabs([...temp]);
  };

  function MyVerticallyCenteredModal(props) {
    return (
      <Modal
        className="list_modal_view"
        {...props}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            {modalTitle}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="list_usermainview_modal">
            <ol>
              {modalDescription &&
                modalDescription?.length > 0 &&
                modalDescription.map((el) => <li>{el.name}</li>)}
            </ol>
          </div>
        </Modal.Body>
      </Modal>
    );
  }

  return (
    <main className="border-top pt-5" style={{ display: "unset" }}>
      <div className="itinery_box padding40">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-9">
              <div className="itiner_header">
                <div className="row">
                  <div className="col-lg-12">
                    <div id="property-gallery" className="new_propery_gallert">
                      <div
                        id="property-gallery-left"
                        className="property-gallery-left"
                      >
                        <img
                          src={generateImageUrl(hotelObj.mainImage)}
                          className="img-fluid"
                        />
                      </div>
                      {hotelObj &&
                        hotelObj.imagesArr &&
                        hotelObj.imagesArr.map((img, indexcccc) =>
                          indexcccc == 0 ? (
                            // <div className="right" key={indexcccc}>
                            //   <div className="ng-star-inserted">
                            //     <img
                            //       src={generateImageUrl(img.imageUrl)}
                            //       className="img-fluid"
                            //     />
                            //   </div>
                            //   <div className="ng-star-inserted">
                            //     <img
                            //       src={generateImageUrl(
                            //         hotelObj.imagesArr[indexcccc + 1]?.imageUrl
                            //       )}
                            //       className="img-fluid"
                            //     />
                            //   </div>
                            // </div>
                            <></>
                          ) : (
                            indexcccc == 2 && (
                              <div className="right">
                                <div className="ng-star-inserted">
                                  <img
                                    src={generateImageUrl(img.imageUrl)}
                                    className="img-fluid"
                                  />
                                </div>
                                <div
                                  className="ng-star-inserted"
                                  onClick={() => setShow(true)}
                                >
                                  <img
                                    src={generateImageUrl(
                                      hotelObj.imagesArr[indexcccc + 1]
                                        ?.imageUrl
                                    )}
                                    className="img-fluid"
                                  />
                                  <div className="total-photo-count">
                                    <div className="all-photos-btn-text">
                                      +{hotelObj.imagesArr?.length - 3} photos
                                    </div>
                                  </div>
                                </div>
                              </div>
                            )
                          )
                        )}
                    </div>
                  </div>
                </div>
                <div className="row my-4 pb-2 align-items-end border-bottom">
                  <div className="col-lg-9">
                    <div className="hding_title">
                      <h1>{hotelObj?.name}</h1>
                      <p className="mb-0">
                        <GoLocation /> {hotelObj?.locationObj?.name}
                      </p>
                    </div>
                  </div>
                  <div className="col-lg-3">
                    <div className="price_section">
                      <h4>
                        <BiRupee />
                        {totalPrice != "" ? (
                          <span>{totalPrice}</span>
                        ) : (
                          roomObj &&
                          roomObj.opionsArr && (
                            <span>{roomObj.opionsArr[0].adultPrice}</span>
                          )
                        )}
                      </h4>
                      <p className="small mb-0 fw-semibold">/ Night</p>
                    </div>
                    {/* <div className="list_header_rightside">
                      <ul>
                        <li>
                          <a href="#" className="iocnl share">
                            <AiOutlineShareAlt />
                          </a>
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
                    </div> */}
                  </div>
                </div>
              </div>
              <div className="itiner_body">
                <div className="row">
                  <div className="col-lg-12 col-sm-1 col-md-1 ">
                    <section className="blog_section padding40 bg-img">
                      <div className="container">
                        <ul className="blog-filters mb-4">
                          {tabs.map((item, i) => {
                            return (
                              <li
                                key={i}
                                className={`${item.active ? "active" : ""}`}
                                onClick={() => tabClick(i)}
                              >
                                {item.name}
                              </li>
                            );
                          })}
                        </ul>

                        {tabs.map((item, i) => {
                          if (item.active && item.tab === 1) {
                            return (
                              <div className="row gy-4" key={i}>
                                <div className="dicription_area mt-4">
                                  <div className="headin_discri">
                                    <div className="heading_title">
                                      <h3 className="mb-2"> Description </h3>
                                    </div>
                                  </div>
                                  <div className="conten_decipt">
                                    {showcontent == false ? (
                                      <p
                                        dangerouslySetInnerHTML={{
                                          __html:
                                            hotelObj?.description?.substring(
                                              0,
                                              200
                                            ),
                                        }}
                                      ></p>
                                    ) : (
                                      <p
                                        dangerouslySetInnerHTML={{
                                          __html: hotelObj?.description,
                                        }}
                                      ></p>
                                    )}

                                    <div>
                                      <Link
                                        onClick={() =>
                                          setshowcontent(!showcontent)
                                        }
                                      >
                                        Show{" "}
                                        {showcontent == false ? "more" : "less"}
                                        <BiChevronRight />
                                      </Link>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            );
                          }
                          if (item.active && item.tab === 2) {
                            return (
                              <div className="row gy-4 faciluty_section" key={i}>
                                <div className="list_emenys">
                                  <ul>
                                    {hotelObj.roomAndAmenitiesServiceArr &&
                                      hotelObj.roomAndAmenitiesServiceArr.map(
                                        (roomAmenties, i) => (
                                          <li>
                                            <div className="card_facilut">
                                              <div className="numberlist_fr">
                                                {/* <MdOutlineBedroomParent /> */}
                                                {getIcon(roomAmenties.name)}

                                                {/^[0-9]*$/.test(
                                                  roomAmenties.no
                                                ) ? (
                                                  <span>
                                                    {roomAmenties.no}{" "}
                                                  </span>
                                                ) : (
                                                  ""
                                                )}
                                              </div>
                                              <h3>
                                                {" "}
                                                {roomAmenties.name
                                                  .charAt(0)
                                                  .toUpperCase() +
                                                  roomAmenties.name.slice(
                                                    1
                                                  )}{" "}
                                              </h3>

                                              {!/^[0-9]*$/.test(
                                                roomAmenties.no
                                              ) ? (
                                                <span>{roomAmenties.no} </span>
                                              ) : (
                                                ""
                                              )}
                                            </div>
                                          </li>
                                        )
                                      )}
                                  </ul>
                                </div>
                              </div>
                            );
                          }
                          if (item.active && item.tab === 3) {
                            return (
                              <div className="row gy-4" key={i}>
                              <h2> slkdfhsaldfhkjlasdhfklhaslkfjd</h2>
                              </div>
                            );
                          }
                          if (item.active && item.tab === 4) {
                            return (
                              <div className="row gy-4" key={i}>
                                <h2>map _location</h2>
                              </div>
                            );
                          }
                          if (item.active && item.tab === 5) {
                            return (
                              <div className="row gy-4" key={i}>
                                <div className="col-lg-4 col-sm-6 col-md-6">
                                  <div className="blogcard">
                                    <div className="overflow-hidden">
                                      <Link to="/BlogDetail">
                                        <img
                                          src={images.Barlowscottage19}
                                          alt=""
                                          className="img-fluid"
                                        />
                                      </Link>
                                    </div>
                                    <ul className="tags bg text-default">
                                      <li>
                                        <FaUserCircle />
                                        Megha
                                      </li>
                                      <li>
                                        <BiTime />
                                        December 21, 2023
                                      </li>
                                    </ul>
                                    <div className="blog_content">
                                      <h5 className="font-2 head">
                                        <Link to="/BlogDetail">
                                          How Traveling Can Help You Fight
                                          Depression
                                        </Link>
                                      </h5>
                                      <p>
                                        Sadness and anxiety is something we all
                                        experience. It is an extremely normal
                                        reaction to difficult times in life and
                                        usually passes with a little time and
                                        effort. But depression is more than just
                                        a ...{" "}
                                        <Link to="/BlogDetail">Read More</Link>
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            );
                          }
                        })}
                      </div>
                    </section>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-3">
              <div className="row gy-4 mb-5">
                <div className="col-12">
                  <div className="user_inof bg shadow-none date_area">
                    <div className="row gy-3">
                      <div className="col-12">
                        <div className="date_card">
                          <div className="heading_date">
                            <h3>Check In</h3>
                          </div>
                          <div className="date_selectcheck">
                            <DatePicker
                              className="hidden1"
                              closeOnScroll={(e) => e.target === document}
                              selected={startDate}
                              onChange={(date) => setStartDate(date)}
                            />
                            <div className="dawon_arrow">
                              <GoChevronDown />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-12">
                        <div className="date_card">
                          <div className="heading_date">
                            <h3>Check Out</h3>
                          </div>
                          <div className="date_selectcheck">
                            <DatePicker
                              className="hidden1"
                              closeOnScroll={(e) => e.target === document}
                              selected={startDate}
                              onChange={(date) => setStartDate(date)}
                            />
                            <div className="dawon_arrow">
                              <GoChevronDown />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-12">
                        <div className="position-relative">
                          <div className="date_card ">
                            <div className="heading_date">
                              <h3>Guest</h3>
                            </div>
                            <Select
                              className="adult_section"
                              value={adult}
                              options={options}
                              onChange={(val) => handleChangeAdult(val)}
                            />
                          </div>
                        </div>
                      </div>

                      <div className="col-12">
                        <div className="position-relative">
                          <div className="date_card ">
                            {selectRoom &&
                              selectRoom.map((room1) => (
                                <div className="d-flex justifyspny">
                                  <div className="latoBoldlackText">
                                    <span className="textsbig">
                                      {room1.name} x {checkOutDetails.adult}{" "}
                                      Adult
                                    </span>{" "}
                                    <br />
                                    {/* <spna className="textsmall">Base Price</spna> */}
                                  </div>
                                  <div className="price_room">
                                    <p>₹ {room1.totalPrice}</p>
                                  </div>
                                </div>
                              ))}

                            <div className="d-flex justifyspny">
                              <div className="latoBoldlackText">
                                <span className="totaltext">
                                  Total Amount to be paid
                                </span>{" "}
                                <br />
                              </div>
                              <div className="price_room">
                                <p>₹ {totalPrice}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-lg-12">
                          <div
                            className="btn_propery"
                            style={{ marginLeft: 0, marginRight: 0 }}
                          >
                            <button
                              type="button"
                              onClick={() => getCheckOutDetails()}
                              className="btn btn-host"
                            >
                              {/* <button type="button"  onClick={()=>getCheckOutDetails()} className="btn btn-host"> */}
                              Check availability
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* <div className="col-12">
                  <div className="user_inof">
                    <div className="about_user">
                      <p>
                        Been traveling around the world for the past few years.
                        Love Thailand and its people. Now that we understand
                        safety and comfort are important for all travellers and
                        we would do what we can to provide that.
                      </p>
                    </div>
                    <div className="border-bottom my-4"></div>
                    <div className="stay_section">
                      <h3>During your stay</h3>
                      <p>
                        We will try to accommodate our visitors in every way we
                        can.
                      </p>
                      <ul>
                        {hotelObj.pointDescription &&
                          hotelObj.pointDescription.map((des, i) => (
                            <li key={i}>{des.name}</li>
                          ))}
                      </ul>
                  
                      <div className="btn_propery">
                        <a className="btn btn-host" href="/Itinerary">
                          Contact Us
                        </a>
                      </div>
                    </div>

                    <p className="pyment_text">
                      To protect your payment, never transfer money or
                      communicate outside of the Sunday forever website or app.
                    </p>
                  </div>
                </div> */}
                </div>
                <div className="sticky-top">
                  <div className="col-12 ">
                    <div className="user_inof ">
                      <div className="usernmaeinfo">
                        <h3>Location</h3>
                      </div>
                      <p>{hotelObj?.tagline}</p>
                      <div className="map_right mb-4">
                        {hotelObj && hotelObj?.googleMap && (
                          <p
                            dangerouslySetInnerHTML={{
                              __html: hotelObj.googleMap,
                            }}
                          ></p>
                        )}
                      </div>
                      <div className="row g-3">
                        {hotelObj &&
                          hotelObj?.propertyHighlightsArr &&
                          hotelObj?.propertyHighlightsArr?.length > 0 && (
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
                                <p>
                                  {hotelObj?.propertyHighlightsArr?.length}{" "}
                                  Nearby
                                </p>
                                <div className="link_view">
                                  <button
                                    type="button"
                                    className="btn btn-view"
                                    onClick={() =>
                                      handleModel({
                                        title: "Attractions",
                                        description:
                                          hotelObj.propertyHighlightsArr,
                                      })
                                    }
                                  >
                                    View
                                  </button>
                                </div>
                              </div>
                            </div>
                          )}
                        {hotelObj &&
                          hotelObj?.locationAndSurroundingsArr &&
                          hotelObj?.locationAndSurroundingsArr?.length > 0 && (
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
                                <p>
                                  {hotelObj?.locationAndSurroundingsArr?.length}{" "}
                                  Nearby
                                </p>
                                <div className="link_view">
                                  <button
                                    type="button"
                                    className="btn btn-view"
                                    onClick={() =>
                                      handleModel({
                                        title: "Restaurants",
                                        description:
                                          hotelObj.locationAndSurroundingsArr,
                                      })
                                    }
                                  >
                                    View
                                  </button>
                                </div>
                              </div>
                            </div>
                          )}
                        {hotelObj &&
                          hotelObj?.nightLifeArr &&
                          hotelObj?.nightLifeArr?.length > 0 && (
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
                                <p>{hotelObj?.nightLifeArr?.length} Nearby</p>
                                <div className="link_view">
                                  <button
                                    type="button"
                                    className="btn btn-view"
                                    onClick={() =>
                                      handleModel({
                                        title: "Night Life",
                                        description: hotelObj.nightLifeArr,
                                      })
                                    }
                                  >
                                    View
                                  </button>
                                </div>
                              </div>
                            </div>
                          )}

                        {hotelObj &&
                          hotelObj?.ActivitiesAndNearbyAttractionsArr &&
                          hotelObj?.ActivitiesAndNearbyAttractionsArr?.length >
                            0 && (
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
                                <p>
                                  {
                                    hotelObj?.ActivitiesAndNearbyAttractionsArr
                                      ?.length
                                  }{" "}
                                  Nearby
                                </p>
                                <div className="link_view">
                                  <button
                                    type="button"
                                    className="btn btn-view"
                                    onClick={() =>
                                      handleModel({
                                        title: "Activities",
                                        description:
                                          hotelObj.ActivitiesAndNearbyAttractionsArr,
                                      })
                                    }
                                  >
                                    View
                                  </button>
                                </div>
                              </div>
                            </div>
                          )}

                        <MyVerticallyCenteredModal
                          show={modalShow}
                          onHide={() => setModalShow(false)}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Modal show={show} size="xl" onHide={() => setShow(false)} centered>
          <Modal.Header className="align-items-start border-0 pb-0" closeButton>
            {/* <div className="title_header text-center col-12 col-lg-8 mx-auto mb-0">
            <h2>
              Home <span className="brown">Stay</span>
            </h2>
            <p className="mb-0">
              A home stay offers a unique and personalized vacation experience,
              allowing travelers to immerse themselves in local culture and
              hospitality.
            </p>
          </div> */}
          </Modal.Header>
          <Modal.Body>
            <div className="gallery-page">
              <div className="row g-3">
                {hotelObj &&
                  roomsArr &&
                  roomsArr.map(
                    (room) =>
                      room.imagesArr &&
                      room.imagesArr.length > 0 &&
                      room.imagesArr.map((img, indexeeeee) => (
                        <div className="col-12 col-md-4" key={indexeeeee}>
                          <div className="image rounded-3">
                            <img
                              src={generateImageUrl(img.imageUrl)}
                              alt=""
                              className="w-100 img-cover rounded-3"
                            />
                          </div>
                        </div>
                      ))
                  )}

                {/* <div className="col-12 col-md-4">
                <div className="image rounded-3">
                  <img
                    src={images.gallery2}
                    alt=""
                    className="w-100 img-cover rounded-3"
                  />
                </div>
              </div>
              <div className="col-12 col-md-4">
                <div className="image rounded-3">
                  <img
                    src={images.gallery4}
                    alt=""
                    className="w-100 img-cover rounded-3"
                  />
                </div>
              </div>
              <div className="col-12 col-md-4">
                <div className="image rounded-3">
                  <img
                    src={images.gallery6}
                    alt=""
                    className="w-100 img-cover rounded-3"
                  />
                </div>
              </div>
              <div className="col-12 col-md-4">
                <div className="image rounded-3">
                  <img
                    src={images.gallery8}
                    alt=""
                    className="w-100 img-cover rounded-3"
                  />
                </div>
              </div>
              <div className="col-12 col-md-4">
                <div className="image rounded-3">
                  <img
                    src={images.gallery1}
                    alt=""
                    className="w-100 img-cover rounded-3"
                  />
                </div>
              </div>
              <div className="col-12 col-md-4">
                <div className="image rounded-3">
                  <img
                    src={images.gallery3}
                    alt=""
                    className="w-100 img-cover rounded-3"
                  />
                </div>
              </div>
              <div className="col-12 col-md-4">
                <div className="image rounded-3">
                  <img
                    src={images.gallery5}
                    alt=""
                    className="w-100 img-cover rounded-3"
                  />
                </div>
              </div>
              <div className="col-12 col-md-4">
                <div className="image rounded-3">
                  <img
                    src={images.gallery7}
                    alt=""
                    className="w-100 img-cover rounded-3"
                  />
                </div>
              </div>
              <div className="col-12 col-md-4">
                <div className="image rounded-3">
                  <img
                    src={images.gallery9}
                    alt=""
                    className="w-100 img-cover rounded-3"
                  />
                </div>
              </div> */}
              </div>
            </div>
          </Modal.Body>
        </Modal>
      </div>
    </main>
  );
};

export default Itinerary;
