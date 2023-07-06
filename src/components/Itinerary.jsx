import React, { useContext, useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade, Navigation, Pagination } from "swiper";
import { images } from "./particle/Images";
import Offcanvas from "react-bootstrap/Offcanvas";
import "swiper/css/pagination";
import { Link, useLocation, useParams } from "react-router-dom";
import { AiOutlineClose } from "react-icons/ai";
import { RiMapPinRangeFill } from "react-icons/ri";
import { SlCalender } from "react-icons/sl";
import { FaRegUser } from "react-icons/fa";
import Lightroom from "react-lightbox-gallery";

import {
  BiChevronRight,
  BiLockOpenAlt,
  BiChevronLeft,
  BiRupee,
  BiMap,
} from "react-icons/bi";
import { HiOutlineUsers } from "react-icons/hi";
import { MdOutlineBedroomParent, MdOutlineImageSearch } from "react-icons/md";
import { TbParking } from "react-icons/tb";
import {
  startOfWeek,
  endOfWeek,
  startOfMonth,
  parse,
  endOfMonth,
  format,
  isSameMonth,
  isSameDay,
  addMonths,
  subMonths,
} from "date-fns";
import {
  MdOutlineBathroom,
  MdNoMealsOuline,
  MdOutlineVilla,
} from "react-icons/md";

import _ from "lodash";
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
import {
  getHotelBySlugApi,
  getRoomsAvailablesApi,
} from "../service/hotel.service";
import { generateImageUrl } from "../service/url.service";
import Modal from "react-bootstrap/Modal";
import Accordion from "react-bootstrap/Accordion";
import Button from "react-bootstrap/Button";
import { getRoomByIdApi, postContactEnquiry } from "../service/home.service";
import { BsCheckCircle, BsSearch } from "react-icons/bs";
import { FaUserCircle } from "react-icons/fa";
import { BiTime } from "react-icons/bi";
import { FreeMode, Thumbs } from "swiper";
import { AiOutlineShareAlt } from "react-icons/ai";
import { AiFillStar } from "react-icons/ai";
import { AiOutlineHeart } from "react-icons/ai";
import { BsChevronDown, BsThreeDots } from "react-icons/bs";
import Quantity from "./particle/Quantity";
import { useLayoutEffect } from "react";
import { addLocalSearch, getLocalSearch } from "../service/localStorage";
import moment from "moment";
import axios from "axios";
// import Modal from 'react-bootstrap/Modal';
import Carousel from "react-gallery-carousel";
import "react-gallery-carousel/dist/index.css";
import { SearchContext } from "../App";
import { calculateGstOnAmount } from "../utils/helpers";
export const Itinerary = () => {
  const params = useParams();
  const location = useLocation()
  const [hotelObj, sethotelObj] = useState("");
  const [roomObj, setroomObj] = useState("");
  const [roomsArr, setroomsArr] = useState([]);
  const [hotelId, sethotelId] = useState("");
  const [showcontent, setshowcontent] = useState(false);
  const [searchObj, setSearchObj] = useContext(SearchContext)
  const [disableCheckout, setDisableCheckout] =useState(false)
  const [selectRoom, setselectRoom] = useState([]);
  const [activeRoom, setactiveRoom] = useState("");
  const [modalTitle, setmodalTitle] = useState("");
  const [modalDescription, setmodalDescription] = useState("");
  const [showGuest, setShowGuest] = useState(false);
  const itinery_about = useRef(null);
  const itinery_amenities = useRef(null);
  const itinery_availability = useRef(null);
  const itinery_spotlight = useRef(null);
  const itinery_faq = useRef(null);
  const itinery_policy = useRef(null);
  const [localSearch, setlocalSearch] = useState("");
  const [roomAvailabilArr, setroomAvailabilArr] = useState([]);
  let mindate = new Date();
  const [roomImageArr, setRoomImageArr] = useState([]);
  // mindate.setDate(mindate.getDate() - 1);
  const [adult, setAdult] = useState(1);
  const [child, setChild] = useState(0);
  const [availabilityModal, setAvailabilityModal] = useState(false);
  const [calendarModal, setCalendarModal] = useState(false);
  const [maxGuest, setMaxGuest] = useState(0);
  const [showImageModal, setshowImageModal] = useState(false);
  const [imageSrc, setimageSrc] = useState("");
  const [isAvailable, setisAvailable] = useState(false);
  const [message, setMessage] = useState("");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [title, setTitle] = useState("");
  const [phone, setphone] = useState("");
  const [cmessage, setcmessage] = useState("");
  const [bookingTotal, setbookingTotal] = useState(0);
  const [gst, setGst] = useState({
    tax:0,
    amount:0,
  });
  const [grandTotal, setGrandTotal] = useState(0);

  const pickerRef = useRef(null);
  const pickerRef1 = useRef(null);

  const handleSubmit = async () => {
    try {
      if (name == "") {
        errorToast("Name is mandatory");
        return;
      } else if (email == "") {
        errorToast("Email is mandatory");
        return;
      } else if (phone == "") {
        errorToast("Phone is mandatory");
        return;
      } else if (phone.length != 10) {
        errorToast("Invalid Phone number");
        return;
      } else if (title == "") {
        errorToast("Subject is mandatory");
        return;
      } else if (cmessage == "") {
        errorToast("Message is mandatory");
        return;
      }

      let obj = {
        name,
        phone,
        email,
        message: cmessage,
        title,
      };

      let { data: res } = await postContactEnquiry(obj);
      if (res.message) {
        errorToast(res.message);
        setAvailabilityModal(false);

        setName("");
        setEmail("");
        setphone("");
        setTitle("");
        setcmessage("");
      }
    } catch (error) {
      console.error(error);
      errorToast(error);
    }
  };
  const handleModel = (row) => {
    if (windowWidth > 768) {
      // setModalShow(true);
    } else {
      setShowattraction(true);
    }
    setmodalTitle(row.title);
    setmodalDescription(row.description);
  };

  const handleImageModal = (img) => {
    console.log(img, "srcsrcsrcsrc");
    setShow(false);
    setshowImageModal(false);
    setimageSrc(img);
    setshowImageModal(true);
  };

  const handlegetLocalsearch = () => {
    let cart = getLocalSearch();
    console.log(cart, "startDatestartDate");

    if (cart && cart?.location) {
      console.log(
        new Date(cart.startDate),
        "data.startDate",
        new Date(
          new Date().getFullYear(),
          new Date().getMonth(),
          new Date().getDate()
        )
      );
      if (
        new Date(cart.startDate).getTime() <
        new Date(
          new Date().getFullYear(),
          new Date().getMonth(),
          new Date().getDate()
        ).getTime()
      ) {
        // removeLocalSearch();
        return 0;
      }

      setlocalSearch(cart);
      setStartDate(new Date(cart.startDate));
      setEndDate(new Date(cart.endDate));
      setAdult(cart.adult);
      setChild(cart.child);
    }
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

  const formatedPrice = (price) => {
    let x = price;
    x = x.toString();
    let lastThree = x.substring(x.length - 3);
    let otherNumbers = x.substring(0, x.length - 3);
    if (otherNumbers != "") lastThree = "," + lastThree;
    let res = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + lastThree;

    return res;
  };
  const handleGetRoomsById = async (id) => {
    try {

      let query = `hotelId=${id}&price=asc`;

      if (startDate) {
        query += `&startDate=${moment(startMonthDate).subtract(1, 'days').format("YYYY-MM-DD")}`;
      }
      if (endDate) {
        query += `&endDate=${moment(endMonthDate).format("YYYY-MM-DD")}`;
      }

      let { data: res } = await getRoomByIdApi(query);

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

  const incrementQuantity = () => {
    if (adult >= 0) {
      setAdult((item) => item + 1);
    }
  };
  const decrementQuantity = () => {
    if (adult > 1) {
      setAdult((item) => item - 1);
    }
  };

  const incrementChildQuantity = () => {
    if (child >= 0) {
      setChild((item) => item + 1);
    }
  };
  const decrementChildQuantity = () => {
    if (child > 0) {
      setChild((item) => item - 1);
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
      maxGuest: room.maxGuest,
      price: room.price,
      totalPrice: room.price,
      adultPrice: room.adultPrice,
      childPrice: room.childPrice,
    };
    setactiveRoom(room);
    setMaxGuest(room.maxGuest)
    let temToom = [];
    settotalPrice(room.price);
    temToom.push(obj);
    console.log(temToom, "temToomtemToomtemToom");
    // if (teemRoom.length == 0) {
    //   teemRoom.push(obj);
    // } else {
    //   if (teemRoom && !teemRoom.some((el) => el.id === room._id)) {
    //     console.log(
    //       teemRoom,
    //       "|teemRoomteemRoom",
    //       teemRoom.some((el) => el.id !== room._id),
    //       room._id
    //     );
    //     teemRoom.push(obj);
    //   }
    // }

    setselectRoom([...temToom]);
  };

  const handleChangeAdult = (val) => {
    let chec = { ...checkOutDetails, adult: val.value };
    setAdult(val);
    console.log(chec, "adult set");
    setcheckOutDetails(chec);
  };

  const getCheckOutDetails = () => {
    let price = 0;
    let totalRoom = checkOutDetails.room;
    let totalAdult = adult;
    let tempRoomArr = [];
    console.log(selectRoom.length, "selectRoomlrbb");
    if (selectRoom && selectRoom?.length == 0) {
      // errorToast("Please Select Atlest One Room");
      // errorToast("Please Select Atlest One Room");
      // return 0;
    }
    selectRoom.forEach((element) => {
      if (element) {
        console.log(element, "roomObjroomObj");
        let tRoom = parseInt(totalAdult / element.maxGuest);
        console.log(tRoom, "troom", totalAdult);
        totalRoom += tRoom;
        console.log("troom=", totalRoom);

        let remaingAdult =
          parseInt(totalAdult) - parseInt(tRoom * element.maxGuest);
        console.log("remaingAdult=", remaingAdult);

        let pr = parseInt(tRoom) * parseInt(element.price);

        console.log(pr, "pridc==");
        if (remaingAdult > 0 && totalAdult > element.maxGuest) {
          pr += parseInt(remaingAdult) * parseInt(element.adultPrice);
        }
        let tempele = { ...element, totalPrice: pr };

        console.log(pr, "pridc==");
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

    console.log(tempRoomArr, "tempRoomArr====");

    setcheckOutDetails(check);
    if (price > 0) {
      settotalPrice(price);
    }
    // setselectRoom(tempRoomArr);
  };

  const getAvailabiltyDetails = () => {
    setisAvailable(false);
    setMessage("");
    setbookingTotal(0);
    if (new Date(endDate).getTime() <= new Date(startDate).getTime()) {
      errorToast("Please Select Valid date");
      return;
    }
console.log(maxGuest,"maxGuestmaxGuestmaxGuestmaxGuest")
    let totguues = parseInt(adult) + parseInt(child);
    if (maxGuest > 0 && totguues > maxGuest) {
      errorToast(`maxmium people for this property is ${maxGuest}`);
      return;
    }
    getAvailibilty();
  };

  useEffect(() => {
    if (selectRoom && selectRoom?.length >= 0) {
      getCheckOutDetails();
    }
  }, [selectRoom]);
  useEffect(() => {
    if (hotelId) {
      handlegetLocalsearch();

      if (hotelObj) {
          setMaxGuest(parseInt(hotelObj?.guest) + parseInt(hotelObj?.maxChild) + parseInt(hotelObj?.maxAdult));
      }

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

  // useEffect(() => {
   
  // }, [params]);

  useEffect(() => {
    if (roomObj && roomObj?._id) {
      let priec = roomObj.price;
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
      // let seobj = {
      //   id:roomObj?._id,
      //   name:roomObj?.name,
      //   maxGuest:roomObj?.opionsArr[0].maxGuest,
      //   price:roomObj?.opionsArr[0].price,
      //   totalPrice:roomObj?.opionsArr[0].adultPrice,
      //   adultPrice:roomObj?.opionsArr[0].adultPrice,
      //   childPrice:roomObj?.opionsArr[0].childPrice,
      //   subtotalPrice:roomObj?.opionsArr[0].adultPrice,
      // }

      let seobj = {
        id: roomObj?._id,
        name: roomObj?.name,
        maxGuest: roomObj.maxGuest,
        price: roomObj.price,
        totalPrice: roomObj.price,
        adultPrice: roomObj.adultPrice,
        childPrice: roomObj.childPrice,
        subtotalPrice: roomObj.price,
      };
      tempArr.push(seobj);
      setselectRoom(tempArr);
      setactiveRoom(roomObj);
      setMaxGuest(roomObj.maxGuest)
      settotalPrice(roomObj.price);
      setcheckOutDetails(obj);
    }
  }, [roomObj]);





  useEffect(()=> {
    if(location.pathname.split("/")[2] == "white-hill" || location.pathname.split("/")[2]=="sundays-forever-spars-shimla"){
      setDisableCheckout(true)
    }
    else{
      setDisableCheckout(false)
    }
    let slug = location.pathname.split("/")[2];
    if (slug) {
      console.log(slug, "paramsparamsparams");
      handleGetHotelBySlug(slug);
    }
    console.log(location.pathname.split("/")[2], "location")
  }, [location])

   
  const [showattraction, setShowattraction] = useState(false);
  const handleCloseattraction = () => setShowattraction(false);
  const handleShowattraction = () => setShowattraction(true);

  const [shownewpage, setShownewpage] = useState(false);
  const handleClosnewpage = () => setShownewpage(false);
  const handleShownewpage = () => setShownewpage(true);

  const [shownewpagehotal, setShownewpagehotal] = useState(false);
  const handleClosnewpagehotal = () => setShownewpagehotal(false);
  const handleShownewpagehotal = () => setShownewpagehotal(true);

  const [gausttaggole, setgausttaggole] = useState(false);
  const [checked, setChecked] = React.useState(false);
  const [panel, setPanel] = useState(false);
  const [show, setShow] = useState(false);
  const [showmoblemodel, setShowmoblemodel] = useState(false);
  const [state, setStae] = useState([
    {
      startDate: new Date(
        new Date().getFullYear(),
        new Date().getMonth(),
        new Date().getDate()
      ),
      endDate: addDays(
        new Date(
          new Date().getFullYear(),
          new Date().getMonth(),
          new Date().getDate()
        ),
        0
      ),
      key: "selection",
    },
  ]);
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [startDate, setStartDate] = useState(
    new Date(
      new Date().getFullYear(),
      new Date().getMonth(),
      new Date().getDate()
    )
  );
  const [endDate, setEndDate] = useState(
    new Date(
      new Date().getFullYear(),
      new Date().getMonth(),
      new Date().getDate()
    )
  );
  const [startMonthDate, setStartMonthDate] = useState(
    new Date(
      new Date().getFullYear(),
      new Date().getMonth(),
      new Date().getDay()
    )
  );
  const [endMonthDate, setEndMonthDate] = useState(
    new Date(new Date().getFullYear(), new Date().getMonth() + 1, 1)
  );
  const [modalShow, setModalShow] = React.useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [children, setchildren] = useState(1);
  const options = [
    { value: 1, label: "Adult 1" },
    { value: 2, label: "Adult 2" },
    { value: 3, label: "Adult 3" },
    { value: 4, label: "Adult 4" },
    { value: 5, label: "Adult 5" },
  ];

  useEffect(() => {
    if (hotelId) {
      let source = axios.CancelToken.source();
      getRoomsAvailables(source);
      return function () {
        source.cancel();
      };
    }
  }, [endMonthDate, startMonthDate, activeRoom, hotelId]);

  useEffect(() => {
    console.log(startMonthDate, "startMonthDatestartMonthDate");
  }, [startMonthDate]);

  const getRoomsAvailables = async (source) => {
    try {
      setroomAvailabilArr([]);
      let query = "";

      if (startDate) {
        query += `startDate=${moment(startMonthDate).subtract(1, 'days').format("YYYY-MM-DD")}`;
      }
      if (endDate) {
        query += `&endDate=${moment(endMonthDate).format("YYYY-MM-DD")}`;
      }

      if (hotelId) {
        query += `&hotelId=${hotelId}`;
      }

      if (activeRoom && activeRoom?._id) {
        query += `&roomId=${activeRoom?._id}`;
      } else {
        query += `&roomId=0`;
      }

    
      let { data: res } = await getRoomsAvailablesApi(query, source);
      if (res.data) {
        setroomAvailabilArr(res.data);
      }
    } catch (error) {
      errorToast(error);
    }
  };

  const getAvailibilty = async (source) => {
    setisAvailable(false);
    setMessage("");
    try {
      let query = "";
      if (startDate) {
        query += `startDate=${moment(startDate).toISOString()}`;
      }
      if (endDate) {
        query += `&endDate=${moment(endDate).toISOString()}`;
      }

      if (hotelId) {
        query += `&hotelId=${hotelId}`;
      }
      if (hotelId) {
        query += `&adult=${adult}`;
      }
      if (hotelId) {
        query += `&child=${child}`;
      }
      if (maxGuest > 0) {
        query += `&maxGuest=${maxGuest}`;
      }
      query += `&isAvailable=true`;
      if (activeRoom && activeRoom?._id) {
        query += `&roomId=${activeRoom?._id}`;
      } else {
        query += `&roomId=0`;
      }
      query += `&calendar=true`;
      let { data: res } = await getRoomsAvailablesApi(query, source);
      if (res.data && res.data?.length > 0) {
        setisAvailable(true);
        setMessage("Available");
        setbookingTotal(res.price);

        let gstObj = calculateGstOnAmount(res.price);
        if(gstObj) {
          setGst(gstObj);
          setGrandTotal(parseInt(gstObj?.amount) +  parseInt(res.price))
        }
        let roomId = res.data[0]?.roomId;
        let hotelSearch = {
          ...searchObj,
          startDate,
          endDate,
          adult,
          child,
          hotelId,
          roomId,
        }

        addLocalSearch(hotelSearch);
        setSearchObj(hotelSearch)
      } else {
        setisAvailable(false);
        setMessage("Not Available");
      }
    } catch (error) {
      errorToast(error);
    }
  };

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

  useLayoutEffect(() => {
    window.addEventListener("resize", function updateSize() {
      setWindowWidth(window.innerWidth);
    });
    setWindowWidth(window.innerWidth);
    return () =>
      window.removeEventListener("resize", function updateSize() {
        setWindowWidth(window.innerWidth);
      });
  }, [window]);

  const [tabs, setTabs] = useState([
    { name: "About", active: true, tab: 1, refTo: itinery_about },
    { name: "Amenities", active: false, tab: 2, refTo: itinery_amenities },
    {
      name: "availability",
      active: false,
      tab: 3,
      refTo: itinery_availability,
    },
    { name: "Spotlight", active: false, tab: 4, refTo: itinery_spotlight },
    { name: "FAQs", active: false, tab: 5, refTo: itinery_faq },
    { name: "Policy", active: false, tab: 6, refTo: itinery_policy },
  ]);

  const tabClick = (i) => {
    const temp = tabs.map((item, index) => {
      if (i === index) {
        item.active = true;
        window.scroll(0, item.refTo.current.offsetTop - 80);
      } else {
        item.active = false;
      }
      return item;
    });
    setTabs([...temp]);
  };

  const [Attractionsbottom, setAttractionsbottom] = useState(false);
  const AttractionshandleClosebottom = () => setAttractionsbottom(false);

  const [showbottom, setShowbottom] = useState(false);

  const handleClosebottom = () => setShowbottom(false);
  const handleShowbottom = () => setShowbottom(true);
  const handleShowbottom1 = (images) => {
    setRoomImageArr(images);
    setShownewpagehotal(true);
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

  const room_type = {
    0: {
      slidesPerView: 2,
    },
    992: {
      slidesPerView: 2,
    },
  };
  const spotlight_slider = {
    0: {
      slidesPerView: 2,
    },
    992: {
      slidesPerView: 2,
    },
    1200: {
      slidesPerView: 3,
    },
  };

  const handleSelectRoomMainImage = (roomIndex, imageIndex) => {
    console.log(roomsArr, roomIndex, imageIndex);

    let tempArr = _.cloneDeep(roomsArr);

    tempArr[roomIndex].mainImage =
      tempArr[roomIndex].imagesArr[imageIndex].imageUrl;
    setroomsArr(tempArr);
  };

  useEffect(() => {
    if (
      pickerRef.current !== null &&
      pickerRef1.current !== null &&
      pickerRef.current.input &&
      pickerRef1.current.input
    ) {
      if (windowWidth > 992) {
        pickerRef.current.input.readOnly = false;
      } else {
        pickerRef.current.input.readOnly = true;
      }
      if (windowWidth > 992) {
        pickerRef1.current.input.readOnly = false;
      } else {
        pickerRef1.current.input.readOnly = false;
      }
    }

    console.log("asd");
  }, [windowWidth, pickerRef, pickerRef1]);

  var imagesgallery = [
    {
      src: "https://images.unsplash.com/photo-1577279549270-b9e297533cdd?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1534&q=80",
      desc: "Person wearing shoes",
      sub: "Gift Habeshaw",
    },
    {
      src: "https://images.unsplash.com/photo-1577277625082-36df4915ebeb?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80",
      desc: "Blonde woman wearing sunglasses smiling at the camera ",
      sub: "Dmitriy Frantsev",
    },
  ];
  var settings = {
    columnCount: {
      default: 5,
      mobile: 3,
      tab: 4,
    },
    mode: "dark",
  };

  return (
    <main style={{ display: "unset" }}>
      <section className="itinery_box padding40 position-relative">
        <div className="container-fluid">
          <div className="row gx-xl-5">
            <div className="col-12 col-lg-8 col-md-12">
              <div className="left">
                {windowWidth < 992 ? (
                  <div className="mobile_seciont">
                    <Swiper
                      spaceBetween={0}
                      slidesPerView={1}
                      speed={3000}
                      loop
                      modules={[Pagination]}
                      autoplay={{ disableOnInteraction: false, delay: 4000 }}
                      centeredSlides
                      pagination={{ clickable: true }}
                      scrollbar={{ draggable: true }}
                      onSwiper={(swiper) => console.log(swiper)}
                      onSlideChange={() => console.log("slide change")}
                    >
                      <SwiperSlide>
                        <div className="home_slide">
                          <img
                            src={generateImageUrl(hotelObj.mainImage)}
                            alt=""
                            className="img-fluid mobilephoto"
                          />
                        </div>
                      </SwiperSlide>

                      {hotelObj &&
                        hotelObj.imagesArr &&
                        hotelObj.imagesArr.map(
                          (img, indexcccc33) =>
                            indexcccc33 < 3 && (
                              <SwiperSlide>
                                <div className="home_slide ">
                                  <img
                                    src={generateImageUrl(img.imageUrl)}
                                    alt={indexcccc33}
                                    className="img-fluid mobilephoto"
                                  />
                                </div>
                              </SwiperSlide>
                            )
                        )}
                    </Swiper>
                    {hotelObj?.imagesArr &&
                      hotelObj?.imagesArr?.length >= 4 && (
                        <div
                          className="showmoreimg"
                          // onClick={() => setShow(true)}
                          onClick={handleShownewpage}
                        >
                          <img
                            src={generateImageUrl(
                              hotelObj.imagesArr[4]?.imageUrl
                            )}
                            className="backimg"
                          />
                          <h3>
                            {" "}
                            +
                            {parseInt(hotelObj.imagesArr?.length) +
                              1 +
                              parseInt(hotelObj.roomsArr?.length)}
                            Photos
                          </h3>
                        </div>
                      )}
                  </div>
                ) : (
                  <div id="property-gallery" className="new_propery_gallert">
                    <div
                      id="property-gallery-left"
                      className="property-gallery-left"
                    >
                      <img
                        src={generateImageUrl(hotelObj.mainImage)}
                        className="img-fluid"
                        onClick={() =>
                          handleImageModal(generateImageUrl(hotelObj.mainImage))
                        }
                      />
                    </div>
                    {hotelObj &&
                      hotelObj.imagesArr &&
                      hotelObj.imagesArr.map(
                        (img, indexcccc) =>
                          indexcccc == 0 && (
                            <div className="right">
                              <div
                                className="ng-star-inserted"
                                onClick={() =>
                                  handleImageModal(
                                    generateImageUrl(img.imageUrl)
                                  )
                                }
                              >
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
                                    hotelObj.imagesArr[indexcccc + 1]?.imageUrl
                                  )}
                                  className="img-fluid"
                                />
                                <div className="total-photo-count">
                                  <div className="all-photos-btn-text">
                                    +
                                    {parseInt(hotelObj.imagesArr?.length) +
                                      1 +
                                      parseInt(hotelObj.roomsArr?.length)}
                                    Photos
                                  </div>
                                </div>
                              </div>
                            </div>
                          )
                      )}
                  </div>
                )}

                <div className="row my-4 pb-2 align-items-end border-bottom">
                  <div className="col-lg-8">
                    <div className="hding_title faciluty_section ">
                      <h1>{hotelObj?.name}</h1>
                      <div className="">
                        <p>
                          <GoLocation /> {hotelObj?.locationObj?.name}
                        </p>
                        <div className="list_emenys ">
                       
                          <ul>
                          <li>
                                <div className="card_facilut">
                                      <div className="numberlist_fr">
                                  <MdOutlineBedroomParent />
                                  </div>

                                  &nbsp;<span>{hotelObj?.bedroom}</span><h3>Bedroom</h3> 
                                  </div>
                                </li>
                                <li> <div className="card_facilut">
                                      <div className="numberlist_fr">
                                  <MdOutlineBathroom />
                                  </div>
                                  
                                  &nbsp;<span>{hotelObj?.bathroom}</span> <h3>Bathrooms</h3> 
                                  </div>
                                  
                                </li>
                                <li>
                                <div className="card_facilut">
                                      <div className="numberlist_fr">
                                  <HiOutlineUsers />
                                  </div>

                                  &nbsp;<span>{hotelObj?.guest}</span><h3>People</h3>  
                                  </div>
                                </li>
                                <li>
                                <div className="card_facilut">
                                      <div className="numberlist_fr">
                                  <MdNoMealsOuline />
                                  </div>

                                  <h3>Meal</h3>  <span>{hotelObj?.meal}</span> 
                                  </div>
                                </li>
                            {/* {hotelObj.roomAndAmenitiesServiceArr &&
                              hotelObj.roomAndAmenitiesServiceArr.map(
                                (roomAmenties, i) => (
                                  <li>
                                    <div className="card_facilut">
                                      <div className="numberlist_fr">
                                     
                                        {getIcon(roomAmenties.name)}

                                        {/^[0-9]*$/.test(roomAmenties.no) ? (
                                          <span>{roomAmenties.no} </span>
                                        ) : (
                                          ""
                                        )}
                                      </div>
                                      <h3>
                                        {" "}
                                        {roomAmenties.name
                                          .charAt(0)
                                          .toUpperCase() +
                                          roomAmenties.name.slice(1)}{" "}
                                      </h3>

                                      {!/^[0-9]*$/.test(roomAmenties.no) ? (
                                        <span>{roomAmenties.no} </span>
                                      ) : (
                                        ""
                                      )}
                                    </div>
                                  </li>
                                )
                              )} */}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-4">
                    <div className="price_section">
                    <p className="small mb-0 fw-semibold"> From &nbsp;</p>
                      <h4>
                        {hotelObj?.dicountPrice && (
                          <span className="cutprice_new">
                            <BiRupee /> 15000
                          </span>
                        )}
                        <BiRupee />
                        {totalPrice != "" ? (
                          <span>{formatedPrice(totalPrice)}</span>
                        ) : (
                          roomObj &&
                          roomObj.opionsArr && (
                            <span>
                              {formatedPrice(roomObj.opionsArr[0].adultPrice)}
                            </span>
                          )
                        )}
                      </h4>
                      <p className="small mb-0 fw-semibold"> / Night</p>
                    </div>
                  </div>
                </div>
                <div className="itiner_body">
                  <ul className="blog-filters sticky-top mb-4">
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
                  <div className="newboxshadow mb-4" ref={itinery_about}>
                    <div className="dicription_area mt-0">
                      <div className="headin_discri">
                        <div className="heading_title">
                          <h3 className="mb-2">Description</h3>
                        </div>
                      </div>
                      <div className="conten_decipt">
                        {showcontent == false ? (
                          <p
                            dangerouslySetInnerHTML={{
                              __html: hotelObj?.description?.substring(0, 200),
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
                          <Link onClick={() => setshowcontent(!showcontent)}>
                            Show {showcontent == false ? "more" : "less"}
                            <BiChevronRight />
                          </Link>
                        </div>
                      </div>
                    </div>
                
                      <>
                        {/* <div className="heading_title">
                                          <h3 className="mb-2">Rooms Type </h3>
                                        </div> */}
                        {windowWidth < 992 ? (
                          <div>
                            {roomsArr &&
                              roomsArr?.length > 0 &&
                              roomsArr.map((room, indexm) => (
                                <>
                                  <div className="hotalmobilesection">
                                    <div className="row gx-1">
                                      <div className="col-lg-6 col-6 col-md-6 col-sm-6">
                                        <div className="maintopimg">
                                          <img
                                            src={generateImageUrl(
                                              room.mainImage
                                            )}
                                            className="w-100 h-320"
                                          />
                                        </div>
                                      </div>
                                      <div className="col-lg-6 col-6 col-md-6 col-sm-6">
                                        <div className="row">
                                          {room.imagesArr &&
                                            room.imagesArr
                                              .slice(0, 2)
                                              .map((eim, inde) => (
                                                <>
                                                  {inde == 0 && (
                                                    <div className="col-lg-12 ">
                                                      <img
                                                        src={generateImageUrl(
                                                          eim.imageUrl
                                                        )}
                                                        className="w-100 smallhotalimg"
                                                      />
                                                    </div>
                                                  )}
                                                  {inde == 1 && (
                                                    <div className="col-lg-12">
                                                      <div
                                                        className="bluresection position-relative"
                                                     
                                                        onClick={() =>
                                                          handleShowbottom1(
                                                            room.imagesArr
                                                          )
                                                        }
                                                      >
                                                        <img
                                                          src={generateImageUrl(
                                                            eim.imageUrl
                                                          )}
                                                          className="w-100 smallhotalimg blurimg"
                                                        />
                                                        <div className="smallOverlay_text">
                                                          <h4>
                                                            {
                                                              room.imagesArr
                                                                ?.length
                                                            }
                                                            +
                                                          </h4>
                                                        </div>
                                                      </div>
                                                    </div>
                                                  )}
                                                </>
                                              ))}
                                        </div>
                                      </div>
                                      <div className="info_hotalmobile">
                                        <div className="col-12">
                                          <div className="content_cartcekcgout">
                                            <h2>{room?.name}</h2>
                                            {/* <p>
                                                    <RiMapPinRangeFill /> Ibis Styles Goa
                                                    Calangute Resort - An Accor Brand
                                                  </p> */}
                                            {/* <div className="detailschekinout">
                                                    <div className="checkinsection">
                                                      <div
                                                        className="d-flex"
                                                        style={{ gap: 10 }}
                                                      >
                                                        <div className="iconmobile">
                                                          <SlCalender />
                                                        </div>
                                                        <div className="checkdate">
                                                          <p>CHECK IN & CHECK OUT</p>
                                                          <h5>15 Mar, Wed - 16 Mar, Thu</h5>
                                                        </div>
                                                      </div>
                                                    </div>
                                                    <div className="checkoutsection">
                                                      <div
                                                        className="d-flex"
                                                        style={{ gap: 10 }}
                                                      >
                                                        <div className="iconmobile">
                                                          <FaRegUser />
                                                        </div>
                                                        <div className="checkdate">
                                                          <p>Guests & Rooms</p>
                                                          <h5>1 Guest/1 Room</h5>
                                                        </div>
                                                      </div>
                                                    </div>
                                                  </div> */}
                                            <div className="standeredroom mt-3">
                                              <div className="liststanderrrom">
                                                <h5 className="font16 blackText latoBlack">
                                                  ₹ {room.price}
                                                </h5>
                                                {room.pointDescription &&
                                                  room.pointDescription
                                                    ?.length > 0 && (
                                                    <ul class="combo__featureList">
                                                      {room.pointDescription.map(
                                                        (pointDescription) =>
                                                          pointDescription.name !=
                                                            "" && (
                                                            <li class="font11 lineHight18">
                                                              {
                                                                pointDescription.name
                                                              }
                                                            </li>
                                                          )
                                                      )}
                                                    </ul>
                                                  )}
                                              </div>
                                              <div className="liststanderrromimg">
                                                <img
                                                  src={generateImageUrl(
                                                    room.mainImage
                                                  )}
                                                  className="w-100 smallhotalimg"
                                                />
                                              </div>
                                            </div>
                                            <div className="borderratingsection">
                                              {/* <div className="rateingarea">
                                                      <p class="makeFlex hrtlCenter">
                                                        <span class="font16 blackText latoBlack">
                                                          ₹ 1,258
                                                        </span>
                                                        <span class="pricing__list">
                                                          ₹ 2,099
                                                        </span>
                                                      </p>
                                                      <p class="lightGreyText">
                                                        Per Night/ 1 Adult
                                                      </p>
                                                      <p class="lightGreyText">
                                                        +₹ 263 taxes &amp; fees
                                                      </p>
                                                    </div> */}
                                              <div className="bokingareabtn">
                                                {activeRoom &&
                                                activeRoom._id == room._id ? (
                                                  <></>
                                                ) : (
                                                  // <button
                                                  //   type="button"
                                                  //   onClick={(e) => {
                                                  //     e.stopPropagation();
                                                  //     handleSelectReomveRoom(room);
                                                  //   }}
                                                  //   className="btn btn-brown"
                                                  //   style={{
                                                  //     width: "max-content",
                                                  //   }}
                                                  // >
                                                  //   Remove Room
                                                  // </button>
                                                  <button
                                                    type="button"
                                                    onClick={(e) => {
                                                      e.stopPropagation();
                                                      handleSelectRoom(room);
                                                    }}
                                                    className="btn btn-brown"
                                                    style={{
                                                      width: "max-content",
                                                    }}
                                                  >
                                                    Select Room
                                                  </button>
                                                )}
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </>
                              ))}
                          </div>
                        ) : (
                          <div>
                            {roomsArr && roomsArr?.length > 0 && (
                              <div className="roomhotalcard mt-4">
                                <div className="heading_title">
                                  <h3 className="mb-2">Rooms Type</h3>
                                </div>
                                <div className="table-responsive">
                                  <table className="table table-bordered tablebotompading">
                                    <thead>
                                      <tr className="bg">
                                        <th scope="col">Rooms</th>
                                        <th scope="col">Options</th>
                                        <th scope="col">Price</th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                      {roomsArr &&
                                        roomsArr.map((room, indexm) => (
                                          <tr key={indexm}>
                                            <td>
                                              <div className="roomhotalcardheader">
                                                <div className="itiner_header">
                                                  <div className="row">
                                                    <div className="col-lg-12">
                                                      <div className="big_img_right">
                                                        <Swiper
                                                          style={{
                                                            "--swiper-navigation-color":
                                                              "#fff",
                                                            "--swiper-pagination-color":
                                                              "#fff",
                                                            "--swiper-navigation-size":
                                                              "18",
                                                          }}
                                                          speed={3000}
                                                          delay={3}
                                                          loop={true}
                                                          spaceBetween={10}
                                                          allowSlideNext={false}
                                                          allowSlidePrev={false}
                                                          // onSwiper={(a)=> console.log(a,"asd")}
                                                          // onSlideChange={(a)=> console.log(a,"asd1")}
                                                          navigation={false}
                                                          thumbs={{
                                                            swiper:
                                                              thumbsSwiper &&
                                                              !thumbsSwiper.destroyed
                                                                ? thumbsSwiper
                                                                : null,
                                                          }}
                                                          modules={[
                                                            FreeMode,
                                                            Navigation,
                                                            Thumbs,
                                                            EffectFade,
                                                          ]}
                                                          effect="fade"
                                                          className="mySwiper2"
                                                        >
                                                          <SwiperSlide>
                                                            <div className="zoom_effect">
                                                              <img
                                                                src={generateImageUrl(
                                                                  room.mainImage
                                                                )}
                                                                alt=""
                                                                className="img-fluid"
                                                              />
                                                            </div>
                                                          </SwiperSlide>
                                                          {room.imagesArr &&
                                                            room.imagesArr.map(
                                                              (img, imndex) => (
                                                                <SwiperSlide
                                                                  onClick={() =>
                                                                    handleSelectRoomMainImage(
                                                                      indexm,
                                                                      imndex
                                                                    )
                                                                  }
                                                                >
                                                                  <img
                                                                    src={generateImageUrl(
                                                                      img.imageUrl
                                                                    )}
                                                                    className="img-fluid"
                                                                  />
                                                                </SwiperSlide>
                                                              )
                                                            )}
                                                        </Swiper>
                                                      </div>
                                                    </div>
                                                    <div className="col-lg-12">
                                                      <div className="swiper_left">
                                                        <Swiper
                                                          onSwiper={(a) =>
                                                            console.log(
                                                              a,
                                                              "asd"
                                                            )
                                                          }
                                                          loop={true}
                                                          spaceBetween={10}
                                                          slidesPerView={4}
                                                          freeMode={true}
                                                          watchSlidesProgress={
                                                            true
                                                          }
                                                          modules={[
                                                            FreeMode,
                                                            Navigation,
                                                            Thumbs,
                                                          ]}
                                                          className="mySwiper"
                                                        >
                                                          {/* <SwiperSlide>
                                                                    <img
                                                                      src={generateImageUrl(
                                                                        room.mainImage
                                                                      )}
                                                                      alt=""
                                                                      className="img-fluid"
                                                                    />
                                                                  </SwiperSlide> */}

                                                          {room.imagesArr &&
                                                            room.imagesArr.map(
                                                              (img, imndex) => (
                                                                <SwiperSlide
                                                                  onClick={() =>
                                                                    handleSelectRoomMainImage(
                                                                      indexm,
                                                                      imndex
                                                                    )
                                                                  }
                                                                >
                                                                  <img
                                                                    src={generateImageUrl(
                                                                      img.imageUrl
                                                                    )}
                                                                    className="img-fluid"
                                                                  />
                                                                </SwiperSlide>
                                                              )
                                                            )}
                                                        </Swiper>
                                                      </div>
                                                    </div>
                                                  </div>
                                                </div>
                                              </div>
                                            </td>
                                            <td>
                                              <div className="room-options mt-4">
                                                <div className="row gy-3">
                                                  <div className="col-12">
                                                    <h5 className="brown">
                                                      {room.name}
                                                    </h5>
                                                    {room.pointDescription &&
                                                      room.pointDescription
                                                        ?.length > 0 && (
                                                        <ul>
                                                          {room.pointDescription.map(
                                                            (
                                                              pointDescription
                                                            ) => (
                                                              <li>
                                                                <BsCheckCircle />
                                                                {
                                                                  pointDescription.name
                                                                }
                                                              </li>
                                                            )
                                                          )}
                                                        </ul>
                                                      )}
                                                  </div>
                                                  {/* <div className="col-12">
                                                                      <h6 className="fw-semibold">
                                                                        Room With Free
                                                                        Cancellation |
                                                                        Breakfast only
                                                                      </h6>
                                                                      <ul>
                                                                        <li>
                                                                          <BsCheckCircle />
                                                                          Free Cancellation
                                                                          till 4 hrs before
                                                                          check in
                                                                        </li>
                                                                        <li>
                                                                          <BsCheckCircle />
                                                                          Free Breakfast
                                                                        </li>
                                                                        <li>
                                                                          <BsCheckCircle />
                                                                          Flexible rate BB
                                                                          DSB2C
                                                                        </li>
                                                                      </ul>
                                                                    </div> */}
                                                </div>
                                              </div>
                                            </td>
                                            <td>
                                              <div className="mt-4">
                                                <p className="small mb-0 fw-semibold">
                                                  Per Night
                                                </p>
                                                <h4 className="brown d-flex fw-bold">
                                                  <BiRupee />
                                                  {room.price}
                                                </h4>
                                              </div>
                                              {/* <p className="small">
                                                                  +₹ 1,530 taxes & fees
                                                                </p> */}

                                              {activeRoom &&
                                              activeRoom._id == room._id ? (
                                                <>   <h5 className="brown">Selected</h5></>
                                              ) : (
                                               
                                                // <button
                                                //   type="button"
                                                //   onClick={(e) => {
                                                //     e.stopPropagation();
                                                //     handleSelectReomveRoom(room);
                                                //   }}
                                                //   className="btn btn-brown"
                                                //   style={{
                                                //     width: "max-content",
                                                //   }}
                                                // >
                                                //   Remove Room
                                                // </button>
                                                <button
                                                  type="button"
                                                  onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleSelectRoom(room);
                                                  }}
                                                  className="btn btn-brown"
                                                  style={{
                                                    width: "max-content",
                                                  }}
                                                >
                                                  Select Room
                                                </button>
                                              )}
                                            </td>
                                          </tr>
                                        ))}
                                    </tbody>
                                  </table>
                                </div>
                              </div>
                            )}
                          </div>
                        )}
                      </>
               

                    {hotelObj &&
                      hotelObj.hotelType == "Home Stays" &&
                      hotelObj.roomsArr &&
                      hotelObj.roomsArr?.length > 0 && (
                        <div id="lock_section">
                          <div className="row mt-4">
                            <div className="col-lg-12 mb-3">
                              <div className="heading_title">
                                <h3>Where you'll sleep</h3>
                              </div>
                            </div>
                            <div className="col-lg-12 itnery_slider">
                              <Swiper
                                slidesPerView={2}
                                spaceBetween={15}
                                speed={2000}
                                loop
                                modules={[Navigation]}
                                navigation
                                breakpoints={room_type}
                              >
                                {hotelObj &&
                                  hotelObj.roomsArr &&
                                  hotelObj.roomsArr?.length > 0 &&
                                  hotelObj.roomsArr?.map((ro) => (
                                    <SwiperSlide>
                                      <div className="Itinerary_slide">
                                        {ro.image ? (
                                          <img
                                            src={generateImageUrl(ro.image)}
                                            alt=""
                                            className="img-fluid"
                                          />
                                        ) : (
                                          ro.imagesArr?.length > 0 && (
                                            <img
                                              src={generateImageUrl(
                                                ro.imagesArr[0].imageUrl
                                              )}
                                              alt=""
                                              className="img-fluid"
                                            />
                                          )
                                        )}

                                        {/* <p className="absolute-content">bedroom 1</p> */}
                                        <div className="content p-3">
                                          <h5 className="mb-0">{ro.name}</h5>
                                          <p className="mb-0 text-dark fs-15">
                                            {ro.view}
                                          </p>
                                        </div>
                                      </div>
                                    </SwiperSlide>
                                  ))}
                              </Swiper>
                            </div>
                          </div>
                        </div>
                      )}
                  </div>
                  <div className="newboxshadow mb-4" ref={itinery_amenities}>
                    <div className="row gy-4">
                      <div className="col-12">
                        <div className="heading_title">
                          <h3 className="mb-2">Amenities </h3>
                        </div>
                        <div className="heigit_list">
                          <ul>
                            {hotelObj &&
                              hotelObj.amenitiesArr &&
                              hotelObj?.amenitiesArr.map(
                                (amenityCategory) =>
                                  amenityCategory?.amenityArr &&
                                  amenityCategory?.amenityArr.map(
                                    (amenity, rrtt) => (
                                      <li key={rrtt}>
                                        {amenity.amenityImage && (
                                          <div className="list_ung">
                                            <img
                                              src={generateImageUrl(
                                                amenity.amenityImage
                                              )}
                                              alt=""
                                              className="img-fluid"
                                            />
                                          </div>
                                        )}

                                        <span className="flex-1">
                                          {amenity.amenityName}
                                        </span>
                                      </li>
                                    )
                                  )
                              )}
                            {/* {roomsArr && roomsArr?.length > 0 ? (
                              <>
                                {activeRoom.amenitiesArr &&
                                  activeRoom.amenitiesArr &&
                                  activeRoom.amenitiesArr.map(
                                    (amenityCategory) =>
                                      amenityCategory.amenityArr &&
                                      amenityCategory.amenityArr.map(
                                        (amenity, rrtt) => (
                                          <li key={rrtt}>
                                            {amenity.amenityImage && (
                                              <div className="list_ung">
                                                <img
                                                  src={generateImageUrl(
                                                    amenity.amenityImage
                                                  )}
                                                  alt=""
                                                  className="img-fluid"
                                                />
                                              </div>
                                            )}

                                            {amenity.amenityName}
                                          </li>
                                        )
                                      )
                                  )}
                              </>
                            ) : (
                              <>
                                {hotelObj &&
                                  hotelObj.amenitiesArr &&
                                  hotelObj?.amenitiesArr.map(
                                    (amenityCategory) =>
                                      amenityCategory?.amenityArr &&
                                      amenityCategory?.amenityArr.map(
                                        (amenity, rrtt) => (
                                          <li key={rrtt}>
                                            {amenity.amenityImage && (
                                              <div className="list_ung">
                                                <img
                                                  src={generateImageUrl(
                                                    amenity.amenityImage
                                                  )}
                                                  alt=""
                                                  className="img-fluid"
                                                />
                                              </div>
                                            )}

                                            {amenity.amenityName}
                                          </li>
                                        )
                                      )
                                  )}
                              </>
                            )} */}
                          </ul>
                        </div>
                      </div>

                      {hotelObj?.isFoodAndDiningIncluded &&
                        hotelObj?.foodAndDiningArr && (
                          <div className="col-12">
                            <div className="heading_title">
                              <h3>Features</h3>
                            </div>
                            <div className="heigit_list">
                              <ul>
                                {hotelObj.foodAndDiningArr &&
                                  hotelObj.foodAndDiningArr.map(
                                    (featue, icd) => (
                                      <li key={icd}>
                                        <GiCheckMark />
                                        {featue.name}
                                      </li>
                                    )
                                  )}
                              </ul>
                            </div>
                          </div>
                        )}
                    </div>
                  </div>
                  <div className="newboxshadow mb-4" ref={itinery_availability}>
                    <div className="heading_title">
                      <h3 className="mb-2">Availability</h3>
                    </div>
                    {/* <div className="border_date">
                      <DateRangePicker
                        onChange={(item) => setStae([item.selection])}
                        showSelectionPreview={true}
                        moveRangeOnFirstSelection={true}
                        months={2}
                        ranges={state}
                        // direction="horizontal"
                        direction={
                          windowWidth > 768 ? "horizontal" : "vertical"
                        }
                      />
                    </div> */}
                    <Calendar
                      setEndMonthDate={setEndMonthDate}
                      setStartMonthDate={setStartMonthDate}
                      roomAvailabilArr={roomAvailabilArr}
                    />
                  </div>
                  {hotelObj.spotlightArr &&
                    hotelObj.spotlightArr?.length > 0 && (
                      <div
                        className="newboxshadow mb-4"
                        ref={itinery_spotlight}
                      >
                        <div className="heading_title">
                          <h3 className="mb-2">Spotlight</h3>
                        </div>
                        <div className="spotlig_slider itnery_slider">
                          <Swiper
                            spaceBetween={15}
                            slidesPerView={3}
                            speed={1000}
                            modules={[Navigation]}
                            navigation
                            breakpoints={spotlight_slider}
                          >
                            {hotelObj.spotlightArr &&
                              hotelObj.spotlightArr.map(
                                (spotlight, mim) =>
                                  spotlight.imageUrl !== "" &&
                                  spotlight.imageUrl && (
                                    <SwiperSlide>
                                      <div className="card_spotslide">
                                        <img
                                          src={generateImageUrl(
                                            spotlight.imageUrl
                                          )}
                                          alt=""
                                          className="img-fluid"
                                        />
                                      </div>
                                    </SwiperSlide>
                                  )
                              )}
                          </Swiper>
                        </div>
                      </div>
                    )}
                  <div
                    className="newboxshadow mb-4"
                    id="faq_section"
                    ref={itinery_faq}
                  >
                    <div className="heading_title">
                      <h3 className="mb-2">FAQs</h3>
                    </div>
                    <div className="link_tink itneryfaqsection ">
                      <Accordion defaultActiveKey="0">
                        {hotelObj.faqArr &&
                          hotelObj.faqArr.map((faq, indexee) => (
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
                  <div
                    className="newboxshadow mb-4"
                    id="polici_sectiono"
                    ref={itinery_policy}
                  >
                    {hotelObj &&
                      hotelObj?.propertyRules &&
                      hotelObj?.propertyRules?.length > 0 && (
                        <div className="row">
                          <div className="col-lg-12">
                            <div className="heading_title">
                              <h3 className="mb-3">Booking Policies</h3>
                            </div>
                          </div>
                          {hotelObj?.propertyRules &&
                            hotelObj?.propertyRules.map((rule) => (
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
            </div>

            <div className="col-12 col-lg-4 col-md-12">
              <div className="right sticky-top">
                {windowWidth > 768 && (
                  <div className="user_inof date_area">
                    <div className="d-flex align-items-baseline border-bottom pb-3 mb-4">
                      <h3 className="fw-bold mb-0">
                        From ₹{formatedPrice(totalPrice)}
                      </h3>
                      <p className="small mb-0 fw-semibold">/Night</p>
                    </div>
                    <div className="row gy-3">
                      <div className="col-12 col-md-6">
                        <div className="date_card">
                          <div className="heading_date">
                            <h3>Check In</h3>
                          </div>
                          <div className="date_selectcheck">
                            <DatePicker
                              className="hidden1"
                              closeOnScroll={(e) => e.target === document}
                              selected={startDate}
                              minDate={mindate}
                              onChange={(date) => setStartDate(date)}
                              dateFormat="dd MMM yyyy"
                            />
                            {/* <div className="dawon_arrow">
                              <GoChevronDown />
                            </div> */}
                          </div>
                        </div>
                      </div>
                      <div className="col-12 col-md-6">
                        <div className="date_card">
                          <div className="heading_date">
                            <h3>Check Out</h3>
                          </div>
                          <div className="date_selectcheck">
                            <DatePicker
                              className="hidden1"
                              closeOnScroll={(e) => e.target === document}
                              selected={endDate}
                              onChange={(date) => {
                                if (
                                  new Date(date).getTime() <=
                                  new Date(startDate).getTime()
                                ) {
                                  errorToast("Please Select Valid date");
                                  return;
                                }
                                setEndDate(date);
                              }}
                              minDate={startDate}
                              dateFormat="dd MMM yyyy"
                            />
                            {/* <div className="dawon_arrow">
                              <GoChevronDown />
                            </div> */}
                          </div>
                        </div>
                      </div>
                      <div className="col-12">
                        <div
                          className="date_card position-relative"
                          // onFocus={() => setShowGuest(true)}
                          // onBlur={() => setShowGuest(false)}
                        >
                          <div className="heading_date">
                            <h3>Guest</h3>
                          </div>
                          {/* <Select
                              className="adult_section"
                              value={adult}
                              options={options}
                              onChange={(val) => handleChangeAdult(val)}
                            /> */}
                          <div onClick={() => setShowGuest(!showGuest)}>
                            <input
                              value={`Adult ${adult}  and Child ${child}`}
                              type="text"
                              placeholder="Guest"
                              onClick={() => setShowGuest(!showGuest)}
                            />
                          </div>
                          <div
                            className="guest-absolute"
                            style={{ position: "unset" }}
                          >
                            <ul>
                              <li>
                                <div>
                                  <p className="fw-semibold mb-0">Adults</p>
                                  <p className="small mb-0">12+</p>
                                </div>
                                <div className="quantity-box">
                                  <span
                                    onClick={decrementQuantity}
                                    className="bg"
                                  >
                                    -
                                  </span>
                                  <span>{adult}</span>
                                  <span
                                    onClick={incrementQuantity}
                                    className="bg"
                                  >
                                    +
                                  </span>
                                </div>
                              </li>
                              <li>
                                <div>
                                  <p className="fw-semibold mb-0">Children</p>
                                  <p className="small mb-0">6-11</p>
                                </div>
                                <div className="quantity-box">
                                  <span
                                    onClick={decrementChildQuantity}
                                    className="bg"
                                  >
                                    -
                                  </span>
                                  <span>{child}</span>
                                  <span
                                    onClick={incrementChildQuantity}
                                    className="bg"
                                  >
                                    +
                                  </span>
                                </div>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                      <div className="col-12">
                        <div className="btn_propery m-0">
                          <button
                            type="button"
                            onClick={() => getAvailabiltyDetails()}
                            className="btn btn-brown w-100 py-2"
                          >
                            Check Availability
                          </button>
                          {message != "" && (
                            <>
                              <h3 className="text-success text-center my-3">
                                {message}
                              </h3>
                              {isAvailable && (
                                // <button
                                //   type="button"
                                //   onClick={() => setAvailabilityModal(true)}
                                //   className="btn btn-brown w-100 py-2"
                                // >
                                //   Book Now
                                // </button>
                                <>

                              {
                                disableCheckout ?
                                
                                 <button className="btn btn-brown w-100 py-2" >Booking Stopped</button>

                                :
                                <Link className="btn btn-brown w-100 py-2" to="/Checkout">Checkout</Link>
                              }
                              
                              </>
                              )}
                            </>
                          )}
                          <h3></h3>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                {bookingTotal > 0  && (
                  <div className="user_inof mt-3 price-breakup">
                    <h5 className="fw-semibold">Price Breakup</h5>
                    <ul>
                    <li className="d-flex align-items-center justify-content-between gap-2">
                            <div>
                              <p className="mb-0 small fw-semibold text-dark">
                              Subtotal
                              </p> <p className="mb-0 small fw-semibold small">
                          
                              </p>
                               
                            </div>
                            <div className="d-flex align-items-end">
                              <h5 className="mb-0 brown fw-semibold">
                                ₹&nbsp;      {formatedPrice(bookingTotal)}
                              </h5>
                            </div>
                          </li>
                          {
                            gst.tax > 0 && (
                              <li className="d-flex align-items-center justify-content-between gap-2">
                              <div>
                                <p className="mb-0 small fw-semibold text-dark">
                                Gst (  {gst?.tax}% )
                                </p> <p className="mb-0 small fw-semibold small">
                            
                                </p>
                                 
                              </div>
                              <div className="d-flex align-items-end">
                                <h5 className="mb-0 brown fw-semibold">
                                  ₹&nbsp; {gst?.amount}
                                </h5>
                              </div>
                            </li>
                            )
                          }
                     
                 
                    </ul> 

                    <div className="d-flex align-items-center justify-content-between gap-2 bg p-3">
                      <div>
                        <p className="text-dark fw-semibold mb-0">
                          Total Amount to be paid
                        </p>
                        <p className="small mb-0 fw-semibold">
                          ({adult} Adult) ,{child >  0 && ( <>{child} Child </>)} 
                        </p>
                      </div>
                      <div className="text-end">
                        <h5 className="mb-0 brown fw-semibold">
                          ₹ {formatedPrice(grandTotal)}
                        </h5>
                        <p className="small mb-0 fw-semibold">+ taxes & fees</p>
                      </div>
                    </div>
                  </div>
                )}
                <div className="user_inof mt-3">
                  <h5 className="fw-semibold">Location</h5>
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
                              {hotelObj?.propertyHighlightsArr?.length} Nearby
                            </p>
                            <div className="link_view">
                              <button
                                type="button"
                                className="btn btn-view"
                                onClick={() =>
                                  handleModel({
                                    title: "Attractions",
                                    description: hotelObj.propertyHighlightsArr,
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
                            <div
                              className="_box_header_itners"
                              onClick={handleShowbottom}
                            >
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

                    {/*-------------------------------------- sort by---------------------------------------------- */}
                    {/*-------------------------------------- sort by---------------------------------------------- */}

                    <Offcanvas
                      show={showattraction}
                      onHide={handleCloseattraction}
                      placement="bottom"
                      name="bottom"
                      className="boottomsheet attractions"
                    >
                      <Offcanvas.Header closeButton className="px-3">
                        <Offcanvas.Title>{modalTitle}</Offcanvas.Title>
                      </Offcanvas.Header>
                      <Offcanvas.Body className="hotalimagesbody">
                        <div className="container">
                          <div className="row gx-1">
                            {modalDescription &&
                              modalDescription?.length > 0 && (
                                <div
                                  className="user_inof mt-3 shadow-none border-0"
                                  style={{ backgroundColor: "#f1e5ca" }}
                                >
                                  <div className="list_usermainview_modal">
                                    <ul>
                                      {modalDescription.map((el) => (
                                        <li>{el.name}</li>
                                      ))}
                                    </ul>
                                  </div>
                                </div>
                              )}
                          </div>
                        </div>
                      </Offcanvas.Body>
                    </Offcanvas>

                    {/*-------------------------------------- sort by end---------------------------------------------- */}
                    {/*-------------------------------------- sort by end---------------------------------------------- */}

                    {/*-------------------------------------- slider new page popup gallery home stay start ---------------------------------------------- */}
                    {/*-------------------------------------- slider new page popup gallery home stay start ---------------------------------------------- */}

                    <Offcanvas
                      show={shownewpage}
                      onHide={handleClosnewpage}
                      placement="bottom"
                      name="bottom"
                      className="newpagebootomsheet"
                    >
                      <Offcanvas.Header closeButton className="px-3">
                        <Offcanvas.Title>Gallery</Offcanvas.Title>
                      </Offcanvas.Header>
                      <Offcanvas.Body className="hotalimagesbody">
                        <div className="gallery_mobilesectionhomesty">
                          <Lightroom
                            images={hotelObj?.imagesArr?.map((el) => ({
                              ...el,
                              src: generateImageUrl(el.imageUrl),
                            }))}
                            settings={settings}
                          />
                        </div>
                      </Offcanvas.Body>
                    </Offcanvas>
                    {/*-------------------------------------- slider new page popup gallery home stay end ---------------------------------------------- */}
                    {/*-------------------------------------- slider new page popup gallery home stay end ---------------------------------------------- */}

                    {/* ---------------------------------mobile hotal room slider ----------------------------------------------------- */}
                    {/* ---------------------------------mobile hotal room slider ----------------------------------------------------- */}

                    <Offcanvas
                      show={showbottom}
                      onHide={handleClosebottom}
                      placement="bottom"
                      name="bottom"
                      className="boottomsheet"
                    >
                      <Offcanvas.Header closeButton>
                        <Offcanvas.Title>Room Image</Offcanvas.Title>
                      </Offcanvas.Header>
                      <Offcanvas.Body className="hotalimagesbody">
                        <div className="container">
                          <div className="row gx-1">
                            {roomImageArr &&
                              roomImageArr.map((ele, ind) => (
                                <div
                                  className="col-6"
                                  onClick={() =>
                                    handleImageModal(
                                      generateImageUrl(ele.imageUrl)
                                    )
                                  }
                                >
                                  <div className="hotal_gallery h-320">
                                    <img
                                      src={generateImageUrl(ele.imageUrl)}
                                      className="w-100 h-320"
                                    />
                                  </div>
                                </div>
                              ))}
                          </div>
                        </div>
                      </Offcanvas.Body>
                    </Offcanvas>

                    {/* ---------------------------------mobile hotal room slider ----------------------------------------------------- */}
                    {/* ---------------------------------mobile hotal room slider ----------------------------------------------------- */}

                    {/*-------------------------------------- sort by---------------------------------------------- */}
                    {/*-------------------------------------- sort by---------------------------------------------- */}

                    <MyVerticallyCenteredModal
                      show={modalShow}
                      onHide={() => setModalShow(false)}
                    />
                  </div>
                </div>
                {windowWidth > 768 &&
                  modalDescription &&
                  modalDescription?.length > 0 && (
                    <div
                      className="user_inof mt-3 shadow-none border-0"
                      style={{ backgroundColor: "#f1e5ca" }}
                    >
                      <h5 className="fw-semibold mb-3">{modalTitle}</h5>
                      <div className="list_usermainview_modal">
                        <ul>
                          {modalDescription.map((el) => (
                            <li>{el.name}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {windowWidth < 768 && (
        <div className="intinery-bottom">
          <div className="d-flex justify-content-between gap-3 align-items-end">
            <div>
              <h6 className="small fw-semibold mb-0">Total Guest:</h6>
              <p className="small mb-0">
                {" "}
                Adult {adult} and Child {child}
              </p>
            </div>
            <h6 className="fw-semibold mb-0">
              ₹ {formatedPrice(totalPrice)}{" "}
              <span className="text-muted small">/Night</span>
            </h6>
          </div>
          {message != "" && (
            <>
              <h3 className="text-success text-center my-3">{message}</h3>
              {isAvailable && (
                                // <button
                                //   type="button"
                                //   onClick={() => setAvailabilityModal(true)}
                                //   className="btn btn-brown w-100 py-2"
                                // >
                                //   Book Now
                                // </button>
                                <>
                              {
                                disableCheckout ?
                                
                                <button className="btn btn-brown w-100 py-2" >Booking Stopped</button>

                                :
                                <Link className="btn btn-brown w-100 py-2" to="/Checkout">Checkout</Link>
                              }
                              
                              </>
                              )}
            </>
          )}
          <button
            className="btn btn-brown w-100 rounded py-2 mt-3"
            onClick={() => setCalendarModal(true)}
          >
            Check Availability
          </button>
        </div>
      )}

      {/*---------------------------------------------- gallyer modal hotal silidere mobile stART ---------------------------------------- */}
      {/*---------------------------------------------- gallyer modal hotal silidere mobile stART---------------------------------------- */}
      <Offcanvas
        show={shownewpagehotal}
        onHide={handleClosnewpagehotal}
        placement="bottom"
        name="bottom"
        className="newpagebootomsheet"
      >
        <Offcanvas.Header closeButton className="px-3">
          <Offcanvas.Title>Gallery</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body className="hotalimagesbody">
          <div className="gallery_mobilesectionhomesty">
            <Lightroom
              images={
                roomImageArr && roomImageArr?.length > 0
                  ? roomImageArr?.map((el) => ({
                      ...el,
                      src: generateImageUrl(el.imageUrl),
                    }))
                  : []
              }
              settings={settings}
            />
          </div>
        </Offcanvas.Body>
      </Offcanvas>

      {/* <Modal show={showmoblemodel} size="xl" onHide={() => setShowmoblemodel(false)} centered>
        <Modal.Header
          className="align-items-start border-0 pb-0"
          closeButton
        ></Modal.Header>
        <Modal.Body>
        <h1>jkasdhfkjasdhfkjsdh</h1>
      
          <div className="gallery-page">
            <div className="row g-3">
            <Swiper
            spaceBetween={5}
            slidesPerView={1}
            speed={1000}
            loop
            modules={[Navigation,]}
            navigation
            >
                  {roomImageArr &&  roomImageArr
                  .filter((el, i) => i >= 3)
                  .map((img, indexeeeee) => (
                    <div
                      className="col-12 col-lg-12"
                      key={indexeeeee}
                      onClick={() =>
                        handleImageModal(generateImageUrl(img.imageUrl))
                      }
                    >
                      <SwiperSlide>
                      <div className="image rounded-3">
                        <img
                          src={generateImageUrl(img.imageUrl)}
                          alt=""
                          className="w-100 img-cover rounded-3"
                        />
                      </div>
                      </SwiperSlide>

                    </div>
                  ))}
                   </Swiper>
            </div>
          </div>
        </Modal.Body>
      </Modal> */}

      {/*---------------------------------------------- gallyer modal hotal silidere mobile end---------------------------------------- */}
      {/*---------------------------------------------- gallyer modal hotal silidere mobile end---------------------------------------- */}

      {/*---------------------------------------------- gallyer modal slier home stay hotal start ---------------------------------------- */}
      {/*---------------------------------------------- gallyer modal slier home stay hotal start---------------------------------------- */}

      <Modal show={show} size="xl" onHide={() => setShow(false)} centered>
        <Modal.Header
          className="align-items-start border-0 pb-0"
          closeButton
        ></Modal.Header>
        <Modal.Body>
          <div className="gallery-page">
            <div className="row g-3">
              {hotelObj &&
                hotelObj.imagesArr.length > 0 &&
                hotelObj.imagesArr
                  .map((img, indexeeeee) => (
                    <div
                      className="col-6 col-lg-4"
                      key={indexeeeee}
                      onClick={() =>
                        handleImageModal(generateImageUrl(img.imageUrl))
                      }
                    >
                      <div className="image rounded-3">
                        <img
                          src={generateImageUrl(img.imageUrl)}
                          alt=""
                          className="w-100 img-cover rounded-3"
                        />
                      </div>
                    </div>
                  ))}
              {/* <Swiper
            spaceBetween={5}
            slidesPerView={1}
            speed={1000}
            loop
            modules={[Navigation,]}
            navigation
          >

                <SwiperSlide>
                      <div className="image rounded-3">
                        <img
                          src={generateImageUrl(hotelObj.mainImage)}
                          alt=""
                          className="w-100 img-cover rounded-3"
                        />
                      </div>
                      </SwiperSlide>

              {hotelObj &&
                hotelObj.imagesArr.length > 0 &&
                hotelObj.imagesArr
                  .map((img, indexeeeee) => (
                    <div
                      className="col-12 col-lg-12"
                      key={indexeeeee}
                      onClick={() =>
                        handleImageModal(generateImageUrl(img.imageUrl))
                      }
                    >
                      <SwiperSlide>
                      <div className="image rounded-3">
                        <img
                          src={generateImageUrl(img.imageUrl)}
                          alt=""
                          className="w-100 img-cover rounded-3"
                        />
                      </div>
                      </SwiperSlide>

                    </div>
                  ))}

                  
              {hotelObj &&
                hotelObj.roomsArr.length > 0 &&
                hotelObj.roomsArr
                  .map((hot, indexeee4ee) => (
                    <div
                      className="col-12 col-lg-12"
                      key={indexeee4ee}
                      onClick={() =>
                        handleImageModal(generateImageUrl(hot.image))
                      }
                    >
                      <SwiperSlide>
                      <div className="image rounded-3">
                        <img
                          src={generateImageUrl(hot.image)}
                          alt=""
                          className="w-100 img-cover rounded-3"
                        />
                      </div>
                      </SwiperSlide>

                    </div>
                  ))}
                   </Swiper> */}
            </div>
          </div>
        </Modal.Body>
      </Modal>

      {/*---------------------------------------------- gallyer modal slier home stay hotal end---------------------------------------- */}
      {/*---------------------------------------------- gallyer modal slier home stay hotal end---------------------------------------- */}

      <Modal
        show={showImageModal}
        size="xl"
        onHide={() => setshowImageModal(false)}
        centered
        className="slidermodalimageone"
        style={{ zIndex: "99999999999" }}
      >
        <Modal.Header
          className="align-items-start border-0 pb-0"
          closeButton
        ></Modal.Header>
        <Modal.Body style={{ overflow: "scroll" }}>
          <div className="stay-homesingle_slide">
            {/* <div className="row">
              <img src={imageSrc} alt="Image Not Found" className="img-fluid" />
            </div> */}
            <div className="row">
              <div className="col-lg-12">
                <Swiper
                  spaceBetween={5}
                  slidesPerView={1}
                  speed={1000}
                  loop
                  modules={[Navigation]}
                  navigation
                  className="popmodel_o1penlider"
                >

                <SwiperSlide 
                      onClick={() =>
                        handleImageModal((imageSrc))
                      }
                    >
                      <div className="image rounded-3">
                        <img
                          src={(imageSrc)}
                          alt=""
                          className="w-100 img-cover rounded-3"
                          style={{ flex: 1 }}
                        />
                      </div>
                    </SwiperSlide>
          {hotelObj &&
                hotelObj.imagesArr.length > 0 &&
                hotelObj.imagesArr
                  .map((img, indexeeeee) => (
                    <SwiperSlide 
                      key={indexeeeee}
                      onClick={() =>
                        handleImageModal(generateImageUrl(img.imageUrl))
                      }
                    >
                      <div className="image rounded-3">
                        <img
                          src={generateImageUrl(img.imageUrl)}
                          alt=""
                          className="w-100 img-cover rounded-3"
                          style={{ flex: 1 }}
                        />
                      </div>
                    </SwiperSlide>
                  ))}
                  {/* <SwiperSlide className="d-flex">
                    <img
                      src={imageSrc}
                      alt="Image Not Found"
                      className="img-fluid"
                      style={{ flex: 1 }}
                    />
                  </SwiperSlide> */}
                </Swiper>
              </div>
             
            </div>
          </div>
        </Modal.Body>
      </Modal>

      <Modal
        show={availabilityModal}
        size="xl"
        onHide={() => setAvailabilityModal(false)}
        centered
        className="availability-modal p-1 moblie_itner_modaldate"
      >
        <Modal.Header
          className="align-items-start border-0 pb-0"
          closeButton
        ></Modal.Header>
        <Modal.Body>
          <div className="user_inof date_area">
            <h3 className="fw-bold mb-4">Book Now </h3>
            <hr />
            <h4 className="p-3">{hotelObj?.name}</h4>
            <div className="row m-3 gx-0">
              <div className="col-md-4">
                <div className="flex_mobileclass">
                  <h4> From </h4>
                  <h5 className="text-secondary">
                    {moment(new Date(startDate)).format("DD-MM-YYYY")} To :{" "}
                    {moment(new Date(endDate)).format("DD-MM-YYYY")}{" "}
                  </h5>
                </div>
              </div>
              <div className="col-md-4">
                <div className="flex_mobileclass">
                  <h4> Price </h4>
                  <h5 className="text-secondary">
                    <BiRupee /> {bookingTotal}
                  </h5>
                </div>
              </div>

              <div className="col-md-4">
                <div className="flex_mobileclass">
                  <h4> People </h4>
                  <h5 className="text-secondary">
                    Adult : {adult} Children : {child}
                  </h5>
                </div>
              </div>
            </div>
            {/* <hr/> */}
            {/* <div className="row m-3">
              <div className="col-md-4 col-6">
           
              </div>
              <div className="col-md-4 col-6">
              </div>

              <div className="col-md-4 col-4">
              </div>
            </div> */}

            <form className="form row gy-2 pt-3">
              <div className="col-12 col-md-6  p-3">
                <input
                  type="text"
                  className="form-control"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter Your Name"
                />
              </div>
              <div className="col-12 col-md-6 p-3">
                <input
                  type="email"
                  className="form-control"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter Your Email"
                />
              </div>
              <div className="col-12 col-md-6  p-3">
                <input
                  type="text"
                  className="form-control"
                  value={phone}
                  onChange={(e) => setphone(e.target.value)}
                  placeholder="Enter Your Phone"
                />
              </div>
              <div className="col-12 col-md-6  p-3">
                <input
                  type="text"
                  className="form-control"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Enter Your Title"
                />
              </div>
              <div className="col-12  p-3">
                <textarea
                  className="form-control"
                  rows="5"
                  value={cmessage}
                  onChange={(e) => setcmessage(e.target.value)}
                  placeholder="Enter Your Message"
                ></textarea>
              </div>
              <div className="col-12">
                <button
                  type="button"
                  className="btn btn-brown rounded-0 no-hover brown-bg text-white mt-3 py-2 px-4"
                  onClick={() => handleSubmit()}
                >
                  Submit
                </button>
              </div>
            </form>
            {/* <div className="row gy-3">
              <div className="col-12 col-md-6">
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
              <div className="col-12 col-md-6">
                <div className="date_card">
                  <div className="heading_date">
                    <h3>Check Out</h3>
                  </div>
                  <div className="date_selectcheck">
                    <DatePicker
                      className="hidden1"
                      closeOnScroll={(e) => e.target === document}
                      selected={endDate}
                      onChange={(date) => setEndDate(date)}
                    />
                    <div className="dawon_arrow">
                      <GoChevronDown />
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-12">
                <div className="date_card position-relative">
                  <div className="heading_date">
                    <h3>Guest</h3>
                  </div>
                  <div onClick={() => setShowGuest(!showGuest)}>
                    <input
                      type="text"
                      placeholder="Guest"
                      onClick={() => setShowGuest(!showGuest)}
                    />
                  </div>
                  {showGuest && (
                    <div className="guest-absolute">
                      <ul>
                        <li>
                          <div>
                            <p className="fw-semibold mb-0">Adults</p>
                            <p className="small mb-0">12+</p>
                          </div>
                          <Quantity quantity={adult} setQuantity={setadult} />
                        </li>
                        <li>
                          <div>
                            <p className="fw-semibold mb-0">Children</p>
                            <p className="small mb-0">6-11</p>
                          </div>
                          <Quantity
                            quantity={children}
                            setQuantity={setchildren}
                          />
                        </li>
                      </ul>
                    </div>
                  )}
                </div>
              </div>
              <div className="col-12">
                <div className="btn_propery m-0">
                  <button
                    type="button"
                    onClick={() => getCheckOutDetails()}
                    className="btn btn-brown w-100 py-2"
                  >
                    Check Availability
                  </button>
                </div>
              </div>
            </div> */}
          </div>
        </Modal.Body>
      </Modal>

      <Modal
        show={calendarModal}
        size="lg"
        onHide={() => setCalendarModal(false)}
        className="availability-modal mobile_chnages px-2 pt-4 mt-2"
      >
        <Modal.Header
          className="align-items-start border-0 pb-0 pt-0"
          closeButton
        ></Modal.Header>
        <Modal.Body>
          <div className="user_inof date_area">
            <h3 className="fw-bold mb-4">Book Now </h3>
            <hr />

            <div className="row gy-3">
              <div className="col-12 col-md-6">
                <div className="date_card">
                  <div className="heading_date">
                    <h3>Check In</h3>
                  </div>
                  <div className="date_selectcheck">
                    <DatePicker
                      className="hidden1"
                      // closeOnScroll={(e) => e.target === document}
                      selected={startDate}
                      minDate={mindate}
                      onFocus={(e) => e.target.blur()}
                      disabledKeyboardNavigation
                      onChange={(date) => setStartDate(date)}
                      dateFormat="dd MMM yyyy"
                      ref={pickerRef1}
                    />
                    {/* <div className="dawon_arrow">
                      <GoChevronDown />
                    </div> */}
                  </div>
                </div>
              </div>
              <div className="col-12 col-md-6">
                <div className="date_card">
                  <div className="heading_date">
                    <h3>Check Out</h3>
                  </div>
                  <div className="date_selectcheck">
                    <DatePicker
                      className="hidden1"
                      // closeOnScroll={(e) => e.target === document}
                      selected={endDate}
                      onFocus={(e) => e.target.blur()}
                      disabledKeyboardNavigation
                      onChange={(date) => {
                        if (
                          new Date(date).getTime() <=
                          new Date(startDate).getTime()
                        ) {
                          errorToast("Please Select Valid date");
                          return;
                        }
                        setEndDate(date);
                      }}
                      minDate={startDate}
                      dateFormat="dd MMM yyyy"
                      ref={pickerRef}
                    />
                    {/* <div className="dawon_arrow">
                      <GoChevronDown />
                    </div> */}
                  </div>
                </div>
              </div>
              <div className="col-12">
                <div className="date_card position-relative">
                  <div className="heading_date">
                    <h3>Guest</h3>
                  </div>
                  <div onClick={() => setShowGuest(!showGuest)}>
                    <input
                      value={`Adult ${adult}  and Child ${child}`}
                      type="text"
                      placeholder="Guest"
                      onClick={() => setShowGuest(!showGuest)}
                      readonly
                    />
                  </div>
                  {showGuest && (
                    <div className="guest-absolute">
                      <ul>
                        <li>
                          <div>
                            <p className="fw-semibold mb-0">Adults</p>
                            <p className="small mb-0">12+</p>
                          </div>
                          <div className="quantity-box">
                            <span onClick={decrementQuantity} className="bg">
                              -
                            </span>
                            <span>{adult}</span>
                            <span onClick={incrementQuantity} className="bg">
                              +
                            </span>
                          </div>
                        </li>
                        <li>
                          <div>
                            <p className="fw-semibold mb-0">Children</p>
                            <p className="small mb-0">6-11</p>
                          </div>
                          <div className="quantity-box">
                            <span
                              onClick={decrementChildQuantity}
                              className="bg"
                            >
                              -
                            </span>
                            <span>{child}</span>
                            <span
                              onClick={incrementChildQuantity}
                              className="bg"
                            >
                              +
                            </span>
                          </div>
                        </li>
                      </ul>
                      <Link
                        className="btn btn-brown rounded btn-doneselece"
                        onClick={() => setShowGuest(!showGuest)}
                      >
                        Done
                      </Link>
                    </div>
                  )}
                </div>
              </div>
              <div className="col-12">
                <div className="btn_propery m-0">
                  <button
                    type="button"
                    onClick={() => {
                      setCalendarModal(false);
                      getAvailabiltyDetails();
                    }}
                    className="btn btn-brown w-100 py-2"
                  >
                    Check Availability
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </main>
  );
};

const Calendar = ({ setEndMonthDate, setStartMonthDate, roomAvailabilArr }) => {
  let [curDate, setCurDate] = useState(
    new Date(
      new Date().getFullYear(),
      new Date().getMonth(),
      new Date().getDay()
    )
  );
  let [seleDate, setseleDate] = useState(new Date());

  useEffect(() => {
    const monthStart1 = startOfMonth(curDate);
    const monthEnd1 = endOfMonth(monthStart1);
    const startDate1 = startOfWeek(monthStart1);
    const endDate1 = endOfWeek(monthEnd1);

    console.log(startDate1, "curDatecurDate", endDate1, monthStart1);
    setEndMonthDate(endDate1);
    setStartMonthDate(monthStart1);
  }, [curDate]);

  const formatedPrice2 = (price) => {
    let x = price;
    x = x.toString();
    let lastThree = x.substring(x.length - 3);
    let otherNumbers = x.substring(0, x.length - 3);
    if (otherNumbers != "") lastThree = "," + lastThree;
    let res = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + lastThree;

    return res;
  };

  const getAvailabilty = (date, monthStart, formattedDate, seletedDate) => {
    let testDate = new Date(
      new Date(date).getFullYear(),
      new Date(date).getMonth(),
      new Date(date).getDate()
    );

    let dateObj = roomAvailabilArr.find(
      (el) =>
        new Date(testDate).getTime() == new Date(el.availableDate).getTime() &&
        new Date(testDate).getTime() >=
          new Date(
            new Date().getFullYear(),
            new Date().getMonth(),
            new Date().getDate()
          )
    );
console.log(new Date(dateObj?.availableDate),formattedDate,new Date(testDate),"sadsa")
    return (
      <>
        {dateObj && dateObj._id ? (
          <div
            className={`col cell ${
              dateObj.isAvailable == false ? "notavailable" : ""
            }    ${
              !isSameMonth(date, monthStart)
                ? "disabled"
                : isSameDay(date, seletedDate)
                ? "selected"
                : ""
            }      `}
            key={date}
            // onClick={() => onDateClick(parse(cloneDay))}
          >
            <span className="number">{formattedDate}</span>
            <p className="bg numdatecalunder">
              <BiRupee /> {formatedPrice2(dateObj.price)}
            </p>
          </div>
        ) : (
          <div
            className={`col cell ${
              !isSameMonth(date, monthStart)
                ? "disabled"
                : isSameDay(date, seletedDate)
                ? "selected"
                : ""
            } `}
            key={date}
            // onClick={() => onDateClick(parse(cloneDay))}
          >
            <span className="number">{formattedDate}</span>
          </div>
        )}
      </>
    );
    // if(dateObj){
    //   return <div style={{fontSize:12}}><p>{dateObj.isAvailable == true?1:0}</p><p className="text-success">{dateObj.price}</p></div>
    // } else {
    //   return <div style={{fontSize:12}}><p className="text-success">&nbsp;</p></div>
    // }
  };

  const renderHeader = () => {
    const dateFormat = "MM yyyy";

    return (
      <div className=" dateyear">
        <div className="col-start">
          <div className="icon" onClick={() => prevMonth()}>
            <BiChevronLeft />
          </div>
        </div>
        <div className="col-center">
          <span>{moment(curDate).format("MMMM  Y")}</span>
        </div>
        <div className="co" onClick={() => nextMonth()}>
          <div className="icon">
            {" "}
            <BiChevronRight />
          </div>
        </div>
      </div>
    );
  };
  const renderDays = () => {
    const dateFormat = "dd";
    const days = [];

    let startDate = startOfWeek(curDate);
    for (let i = 0; i < 7; i++) {
      days.push(
        <div className="col col-center" key={i}>
          {moment(addDays(startDate, i)).format("dddd").substring(0, 3)}
        </div>
      );
    }

    return <div className="days row weekdays">{days}</div>;
  };

  const renderCells = () => {
    let currentMonth = curDate;
    let seletedDate = seleDate;
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);

    const dateFormat = "dd";
    const rows = [];

    let days = [];
    let day = startDate;
    let formattedDate = "";

    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        formattedDate = format(day, dateFormat);
        const cloneDay = day;
        days.push(
          // <div

          //   className={`col cell ${
          //     !isSameMonth(day, monthStart)
          //       ? "disabled"
          //       : isSameDay(day, seletedDate) ? "selected" : ""
          //   }`}
          //   key={day}
          //   // onClick={() => onDateClick(parse(cloneDay))}
          // >
          //   <span className="number">{formattedDate}</span>
          //   <p className="bg">1200</p>
          // </div>

          getAvailabilty(day, monthStart, formattedDate, seletedDate)
        );
        day = addDays(day, 1);
      }
      rows.push(
        <div className="row monthdate" key={day}>
          {days}
        </div>
      );
      days = [];
    }
    return <div className="body">{rows}</div>;
  };

  // const onDateClick = day => {
  //   seletedDate = day
  //   };

  const nextMonth = () => {
    setCurDate(addMonths(curDate, 1));
  };

  const prevMonth = () => {
    setCurDate(subMonths(curDate, 1));
  };

  return (
    <div className="calendar">
      {renderHeader()}
      {renderDays()}
      {renderCells()}
    </div>
  );
  //   console.log(dateArray,"dateArraydateArray")
  // return (
  //   <div className="row justify-content-center">
  //   <div className="col-lg-6">
  //     <div className="btn_propery">
  //       <p>Fevruary 28th 2023 march 1st 2023</p>
  //       <p>Prices show in INR for 1-night Stay</p>
  //       <div className="dateyear">
  //         <div>
  //           <BiChevronLeft />
  //         </div>
  //         <div>
  //           <p>March</p>
  //         </div>
  //         <div>
  //           <BiChevronRight />
  //         </div>
  //       </div>
  //       {/* <div className="weekdays">
  //         <ul>
  //           <li>Mo</li>
  //           <li>Tu</li>
  //           <li>We</li>
  //           <li>Th</li>
  //           <li>Fr</li>
  //           <li>Sa</li>
  //           <li>Su</li>
  //         </ul>
  //       </div> */}
  //       <div className="monthdate">
  //         <ul>
  //           {/* <li class='activedate'>1</li>
  //           <li>2  <p class='Price'>12,000</p> </li>
  //           <li class='crosedate'><p class='close'>  </p> 3</li> */}

  //       {
  //         dateArray && dateArray.map((date) => (
  //           <li>{moment(date).format('DD')}</li>

  //         ))
  //       }
  //         </ul>
  //       </div>
  //       {/* <button
  //         className="btn btn-host"
  //         type="button"
  //         onClick={() => getAvailabilty()}
  //         href="/Itinerary"
  //       >
  //         Check availability <HiOutlineChevronRight />
  //       </button> */}
  //     </div>
  //   </div>
  // </div>
  // )
};

export default Itinerary;
