import React, { useContext, useEffect, useLayoutEffect, useRef, useState } from "react";
import { Accordion, Modal } from "react-bootstrap";
import { BiBed, BiTime } from "react-icons/bi";
import { BsCheckLg, BsPeopleFill } from "react-icons/bs";
import { FaBath, FaUserCircle } from "react-icons/fa";
import { ImLocation } from "react-icons/im";
import { MdContentCopy } from "react-icons/md";
import { RiCoupon3Fill } from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";
import { Autoplay, EffectFade, Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { BsSearch } from "react-icons/bs";
import {
  getAllBannerApi,
  getBlogApi,
  getCollectionApi,
  getFaqApi,
  getHomePageApi,
  getOfferApi,
  getTestimonialApi,
} from "../service/home.service";
import { getAllHotelApi } from "../service/hotel.service";
import { addLocalSearch, getLocalQuery, getLocalSearch } from "../service/localStorage";
import { generateImageUrl } from "../service/url.service";
import { errorToast } from "../utils/toast";
import BannerTabs from "./particle/BannerTabs";
import { images } from "./particle/Images";
import NewsLetter from "./particle/NewsLetter";
import { SearchContext } from "../App";

export const Index = () => {
  const getIcon = (name) => {
    switch (name) {
      case "bathroom":
        return <FaBath />;
        break;
      case "people":
        return <BsPeopleFill />;
        break;
      case "bedroom":
        return <BiBed />;
        break;
      default:
        break;
    }
  };

  const instagramSectionRef = useRef();
  const [instagramSectionIsVisible, setInstagramSectionIsVisible] =
    useState(false);

  const blogsSectionRef = useRef();
  const [blogSectionIsVisible, setBlogSectionIsVisible] = useState(false);

  const videoSectionRef = useRef(null);
  const [VideoSectionIsVisible, setVideoSectionIsVisible] = useState(false);
  const [show, setShow] = useState(false);

  const [hotels, sethotels] = useState([]);
  const navigate = useNavigate();
  const [experienceModal, setExperienceModal] = useState(false);
  const [bannerArr, setbannerArr] = useState([]);
  const [hotelObj, sethotelObj] = useState("");
  const [testimonialModal, setTestimonialModal] = useState(false);
  const [locationArr, setLocationArr] = useState([]);
  const [mostViewedPropertiesArr, setMostViewedPropertiesArr] = useState([]);
  const [mainMostViewedPropertiesArr, setMainMostViewedPropertiesArr] =
    useState([]);
  const [budgetFriendlyArr, setbudgetFriendlyArr] = useState([]);
  const [copied, setCopied] = useState(false);

  const [premiumCollectionArr, setpremiumCollectionArr] = useState([]);
  const [, set] = useState();
  const [collectionArr, setcollectionArr] = useState([]);
  const [testimnialArr, settestimnialArr] = useState([]);
  const [blogArr, setblogArr] = useState([]);
  const [offerArr, setofferArr] = useState([]);
  const [faqArr, setfaqArr] = useState([]);
  const [testimonialObj, setTestimonialObj] = useState();
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const [allHotel, setallHotel] = useState([]);
  const [searchObj, setSearchObj] = useContext(SearchContext)

  const [discorpion, setDiscorpion] = useState(
    "At Sundays Forever, our primary goal is to provide our guests with an exceptional experience that they will cherish forever. We understand that luxury is not just about lavish amenities, but also about the feeling of being pampered and cared for. Our team is dedicated to tailoring every aspect of their stay to their preferences, including personalized services and bespoke experiences. We are committed to elevating the guest experience to new heights and take pride in creating memories that last a lifetime."
  );
  const [readmore, setReadmore] = useState(false);
  const [availabilityModal, setAvailabilityModal] = useState(false);

  const handlegetHotel = async () => {
    try {
      let query = getLocalQuery();

      let { data: res } = await getAllHotelApi(`${query}&price=asc`, null);
      if (res.data) {
        sethotels(res.data);
      }
    } catch (error) {
      console.error(error);
      errorToast(error);
    }
  };

  const handlegetBlog = async (query) => {
    try {
      let { data: res } = await getBlogApi(query);
      if (res.data) {
        setblogArr(res.data);
      }
    } catch (error) {
      console.error(error);
      errorToast(error);
    }
  };

  const handlegetTestimonial = async (query) => {
    try {
      let { data: res } = await getTestimonialApi(query);
      // console.log(res.data, "handlegetTestimonial");
      if (res.data) {
        settestimnialArr(res.data);
      }
    } catch (error) {
      console.error(error);
      errorToast(error);
    }
  };

  const handleCollection = async () => {
    try {
      let { data: res } = await getCollectionApi();
      if (res.data) {
        setcollectionArr(res.data);
      }
    } catch (error) {
      console.error(error);
      errorToast(error);
    }
  };

  const handleOffers = async (query) => {
    try {
      let { data: res } = await getOfferApi(query);
      if (res.data) {
        setofferArr(res.data);
      }
    } catch (error) {
      console.error(error);
      errorToast(error);
    }
  };

  const handleFaqs = async () => {
    try {
      let { data: res } = await getFaqApi("type=Home");
      if (res.data) {
        setfaqArr(res.data);
      }
    } catch (error) {
      console.error(error);
      errorToast(error);
    }
  };

  const handleHoemPage = async () => {
    try {
      let { data: res } = await getHomePageApi();
      if (res.data && res.data.length > 0) {
        // console.log(res.data, "data");
        sethotelObj(res.data[0]);
        let arr = [];

        if (res.data[0].location && res.data[0].location.length > 0) {
          arr = [
            { label: "All", name: "All", active: true },
            ...res.data[0].location.map((el) => ({ ...el, active: false })),
          ];
        }
        setLocationArr(arr);
        setMostViewedPropertiesArr(res.data[0]?.mostViewProperties);
        setMainMostViewedPropertiesArr(res.data[0]?.mostViewProperties);
        setpremiumCollectionArr(res.data[0]?.preminumCollection);
        setbudgetFriendlyArr(res.data[0]?.budgetFriendly);
      }
    } catch (error) {
      console.error(error);
      errorToast(error);
    }
  };

  useEffect(() => {
    handleHoemPage();
    handleBannerCollection();
    handleCollection();
    handlegetTestimonial("limit=6");
    handlegetBlog("limit=4");
    handleOffers("limit=3&active=true");
    handleFaqs("type=Home");
    handlegetHotel();
  }, []);

  const handleBannerCollection = async () => {
    try {
      let { data: res } = await getAllBannerApi();
      if (res.data) {
        setbannerArr(res.data);
      }
    } catch (error) {
      console.error(error);
      errorToast(error);
    }
  };

  const [tabs, setTabs] = useState([
    { name: "All", active: true, tab: 1 },
    { name: "Filter 1", active: false, tab: 2 },
    { name: "Filter 2", active: false, tab: 3 },
    { name: "Filter 3", active: false, tab: 4 },
    { name: "Filter 4", active: false, tab: 5 },
  ]);

  const tabClick = (i) => {
    if (i != 0) {
      const temp = locationArr.map((item, index) => {
        i === index ? (item.active = true) : (item.active = false);
        return item;
      });
      setTabs([...temp]);

      let locationName = locationArr[i]._id;

      let tempArr = hotels.filter((el) => el.location == locationName);
      // console.log(tempArr,"tempArrtempArr")
      setMostViewedPropertiesArr([...tempArr]);
    } else {
      setMostViewedPropertiesArr([...mainMostViewedPropertiesArr]);
    }
  };

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

  const locationSlider = {
    0: {
      slidesPerView: 3,
    },
    576: {
      slidesPerView: 3,
    },
    992: {
      slidesPerView: 5,
    },
    1200: {
      slidesPerView: 6,
    },
    1400: {
      slidesPerView: 6,
    },
  };

  const why_sf = {
    0: {
      slidesPerView: 2,
      spaceBetween: 10,
    },
    576: {
      slidesPerView: 2,
      spaceBetween: 20,
    },
    768: {
      slidesPerView: 3,
      spaceBetween: 20,
    },
    992: {
      slidesPerView: 3,
    },
    1200: {
      slidesPerView: 4,
    },
    1400: {
      slidesPerView: 4,
    },
  };

  const collection_box = {
    0: {
      slidesPerView: 2,
      spaceBetween: 10,
    },
    768: {
      slidesPerView: 3,
      spaceBetween: 10,
    },
    992: {
      slidesPerView: 3,
    },
    1400: {
      slidesPerView: 4,
    },
  };

  const guest_experience = {
    0: {
      slidesPerView: 3,
      spaceBetween: 10,
    },
    992: {
      slidesPerView: 4,
    },
  };

  const guest_testi = {
    0: {
      slidesPerView: 1,
      spaceBetween: 10,
    },
    992: { slidesPerView: 1, spaceBetween: 20 },
    1200: {
      slidesPerView: 3,
      spaceBetween: 10,
    },
  };

  useEffect(() => {
    ///////video section
    let options21 = {
      root: null,
      rootMargin: "100px",
      threshold: 0,
    };

    let callback21 = (entries, observer) => {
      const [entry] = entries;
      if (entry.isIntersecting) {
        // console.log("Banner Intersecting");
        // videoSectionRef.current.play();
        // setVideoSectionIsVisible(true);
        // setFixSectionFourPosition(true);
      } else {
        // console.log("Banner Not Intersecting");
        // videoSectionRef.current.pause();
        // setVideoSectionIsVisible(false);
        // setFixSectionFourPosition(false);
      }
    };

    let observer21 = new IntersectionObserver(callback21, options21);
    if (videoSectionRef.current) {
      observer21.observe(videoSectionRef.current);
    }

    ///////instagram section
    let options = {
      root: null,
      rootMargin: "100px",
      threshold: 0,
    };

    let callback = (entries, observer) => {
      const [entry] = entries;
      if (entry.isIntersecting) {
        // console.log("Intersecting");
        setInstagramSectionIsVisible(true);
        // setFixSectionFourPosition(true);
      } else {
        // console.log("Not Intersecting");
        setInstagramSectionIsVisible(false);
        // setFixSectionFourPosition(false);
      }
    };

    let observer = new IntersectionObserver(callback, options);
    if (instagramSectionRef.current) {
      observer.observe(instagramSectionRef.current);
    }

    ///////blogs section
    let options2 = {
      root: null,
      rootMargin: "100px",
      threshold: 0,
    };

    let callback2 = (entries, observer) => {
      const [entry] = entries;
      if (entry.isIntersecting) {
        // console.log("Blogs Intersecting");
        setBlogSectionIsVisible(true);
        // setFixSectionFourPosition(true);
      } else {
        // console.log("Blogs Not Intersecting");
        setBlogSectionIsVisible(false);
        // setFixSectionFourPosition(false);
      }
    };

    let observer2 = new IntersectionObserver(callback2, options2);
    if (blogsSectionRef.current) {
      observer2.observe(blogsSectionRef.current);
    }
  }, []);

  const copyToClipboard = (text) => {
    const textarea = document.createElement("textarea");
    textarea.value = text;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand("copy");
    document.body.removeChild(textarea);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 500);
  };



  
  const handleLocationSet = (obj) => {

    if(obj.name == "All"){
      let hotelSearch = {
        ...searchObj,
        location:'All',
        collection:"",
        type:"",
        name:"All"
        // startDate,
        // endDate,
        // adult,
        // child
      }

      setSearchObj(hotelSearch)
      navigate(`/properties`)
      return

    }
    let hotelSearch = {
      ...searchObj,
      location:obj.slug,
      collection:"",
      type:"",
      name:obj.name
      // startDate,
      // endDate,
      // adult,
      // child
    }
    setSearchObj(hotelSearch)
    navigate(`/location/${obj.slug}`)
  }

  const handleCollectionSet = (obj) => {
    let hotelSearch = {
      ...searchObj,
      collection:obj.slug,
      location:"All",
      type:"",
      name:"All"
      // startDate,
      // endDate,
      // adult,
      // child
    }
    
    setSearchObj(hotelSearch)
    navigate(`/collection/${obj.slug}`)
  }


  const handleCollecProertirs = () => {
    let hotelSearch = {
      ...searchObj,
      location:"All",
      type:""
      // startDate,
      // endDate,
      // adult,
      // child
    }
    let localData = getLocalSearch()

    localData = {...localData,
      location:"All",
    } 
    setSearchObj(hotelSearch)
    addLocalSearch(localData);

    navigate(`/properties`)
  }
  return (
    <main>
      <section className="slider_baner_home">
        {bannerArr && (
          <Swiper
            slidesPerView={1}
            loop
            speed={2000}
            // onSlideChange={(e) => console.log(e.activeIndex, "event")}
            modules={[Autoplay, EffectFade]}
            effect="fade"
            autoplay={{ disableOnInteraction: false }}
          >
            {bannerArr.length > 0 &&
              bannerArr.map((banner, i) => (
                <SwiperSlide key={i} virtualIndex={i}>
                  <img
                    src={generateImageUrl(banner.image)}
                    alt=""
                    className="img-fluid"
                  />
                </SwiperSlide>
              ))}
          </Swiper>
        )}

        <div className="slider_caption">
          <div className="container">
            <h2 className="font-2 mb-0">Sundays Forever Boutique Stays</h2>
            {windowWidth > 992 && locationArr && (
              <BannerTabs
                className="home-banner-tabs bg"
                location={locationArr}
              />
            )}
          </div>
        </div>
      </section>

      {windowWidth < 992 && locationArr && (
        <div className="mobilepadnig">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="searcinputmobile" onClick={() => setShow(true)}>
                  <BsSearch /> <p>Search for your home near ....</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <section className="mb-40 padding40 bg location-browsing">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="title_header mb-5">
                <h2>
                  Browse By <span className="brown">Locations</span>
                </h2>
              </div>
            </div>
          </div>

          {hotelObj && hotelObj.location && hotelObj.location?.length > 0 && (
            <Swiper
            loop
              spaceBetween={16}
              slidesPerView={6}
              // autoplay={{ disableOnInteraction: false }}
              speed={2000}
              modules={[Navigation,]}
              navigation
              className="location_areacolum"
              breakpoints={locationSlider}
            >
              {hotelObj.location &&
                hotelObj.location?.length > 0 &&
                hotelObj.location.map((lcoation, index) => (
                  <SwiperSlide key={index}>
                    <div className="box_location">
                      <img src={generateImageUrl(lcoation.imageUrl)} alt="" />
                      <div
                       style={{cursor:"pointer"}} onClick={()=> handleLocationSet(lcoation)}
                        // to={`/properties?location=${lcoation.name}`}
                        className="absolute-text"
                      >
                        <p> {lcoation.name} </p>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
            </Swiper>
          )}
        </div>
      </section>

      <section className="padding40 mb-40 property-listing">
        <div className="container">
          <div className="row align-items-center mobile_reverse gy-4 gy-xl-0">
            <div className="col-12 col-xl-5">
              <div className="left">
                <div className="title_header mb-3">
                  <h2>Guest Experience</h2>
                </div>
                {windowWidth < 992 ? (
                  <div className="flexmobileclass">
                    {readmore ? discorpion : discorpion.substring(0, 300)}
                    <span onClick={() => setReadmore((prev) => !prev)}>
                      <p className="linkreadmore">
                        {readmore ? "Read Less" : "Read More"}
                      </p>
                    </span>
                  </div>
                ) : (
                  <div className="flexmobileclass">
                    {readmore ? discorpion : discorpion.substring(0, 550)}
                    {
                      discorpion.length > 550 && (
                        <span onClick={() => setReadmore((prev) => !prev)}>
                        <p className="linkreadmore">
                          {readmore ? "Read Less" : "Read More"}
                        </p>
                      </span>
                      )
                    }
                 
                  </div>
                )}

                {/* <ul>
                    <li>
                    <span className="green-bg">
                      <BsCheckLg />
                    </span> 
                    Boost revenue
                  </li>
                  <li>
                   <span className="green-bg">
                      <BsCheckLg />
                    </span> 
                    Attract travelers
                  </li>
                  <li>
                     <span className="green-bg">
                      <BsCheckLg />
                    </span> 
                    Increased visibility
                  </li>
                  <li>
                <span className="green-bg">
                      <BsCheckLg />
                    </span> 
                    Streamline management
                  </li>
                </ul> */}
                {/* <Link
                  to="/Property/Listing"
                  className="btn btn-brown rounded mt-4"
                >
                  List your property
                </Link> */}
              </div>
            </div>
            <div className="col-12 col-xl-7">
              <div className="right">
                {/* <iframe
                  width="100%"
                  height="500"
                  src="https://www.youtube.com/embed/Wuk3_nyn-gs"
                  title="YouTube video player"
                  frameborder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowfullscreen
                  className="rounded-4"
                ></iframe> */}

                <video

                  poster={images.videothemnel}
                  src={images.experience_5}
                  ref={videoSectionRef}
                  className="w-100 img-cover rounded-3 pointer mainvideoheaer"
                  controls
                  loop
                  muted
                  playsInline
                ></video>
                
              </div>
            </div>
          </div>
        </div>
      </section>

      {hotelObj &&
        hotelObj.mostViewProperties &&
        hotelObj.mostViewProperties?.length > 0 && (
          <section className="pb-40">
            <div className="container">
              <div className="title_header witb-btn">
                <h2>
                  Most Viewed <span className="brown">Properties</span>
                </h2>
                {/* <button onClick={()=>handleCollecProertirs()}  style={{border:'none',background:'none'}}  className="brown fw-semibold ">
                  View All
                </button> */}
              </div>
              <ul className="filters-2 my-3">
                {locationArr &&
                  locationArr?.length > 0 &&
                  locationArr.map((item, i) => {
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
              <div className="row g-2 g-sm-3 g-xl-4 cccc">
                {mostViewedPropertiesArr &&
                  mostViewedPropertiesArr.length > 0 &&
                  mostViewedPropertiesArr.map((hotel, i) => {
                    if (i < 9) {
                      return (
                        <div className="col-6 col-lg-4" key={i}>
                          <div className="places-box premium-collection">
                            <div className="overflow-hidden image">
                              <Link to={`/property/${hotel.slug}`}>
                                <img
                                  src={generateImageUrl(hotel.mainImage)}
                                  alt=""
                                  className="w-100"
                                />
                              </Link>
                            </div>

                            <div className="content">
                              <h4>
                                <Link to={`/property/${hotel.slug}`}>
                                  {hotel.name}
                                </Link>
                              </h4>

                              <p className="mb-2 small">
                                <ImLocation className="brown" />
                                &nbsp;{hotel?.locationObj?.name}
                              </p>
                              {/* {hotel.roomAndAmenitiesServiceArr && (
                                <ul className="tags bg text-default">
                                  {hotel.roomAndAmenitiesServiceArr &&
                                    hotel.roomAndAmenitiesServiceArr.map(
                                      (rom,i) =>
                                        /^\d*\.?\d*$/.test(rom.no) ? (
                                          <li key={i}>
                                            {getIcon(rom.name)}
                                            &nbsp;{rom.no}{" "}
                                            {rom.name.charAt(0).toUpperCase() +
                                              rom.name.slice(1)}
                                          </li>
                                        ) : (
                                          ""
                                        )
                                    )}
                                </ul>
                              )} */}
                              <ul className="tags text-default">
                                <li>
                                  <BiBed />
                                  &nbsp;{hotel?.bedroom} Bedroom
                                </li>
                                <li>
                                  <FaBath />
                                  &nbsp;{hotel?.bathroom} Bathrooms
                                </li>
                                <li>
                                  <BsPeopleFill />
                                  &nbsp;{hotel?.guest} People
                                </li>
                              </ul>
                              <div className="d-flex align-items-center gap-2 justify-content-between">
                                <div>
                                  <div className="price">
                                  <p className="mb-0 small">
                                      From &nbsp;
                                  </p>
                                    <h5 className="brown">  ₹{hotel.price}</h5>
                                    <p className="text-default mb-0 small">
                                      / Night
                                    </p>
                                  </div>
                                  <p className="mb-0 small">
                                    (excl. taxes & charges)
                                  </p>
                                </div>
                                <Link
                                  to={`/property/${hotel.slug}`}
                                  className="btn btn-brown-outline btn-sm"
                                >
                                  Book Now
                                </Link>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    }
                  })}

                  {  mostViewedPropertiesArr?.length == 0 && 
                    (
                      <div className="col-6 col-lg-4" >
                      <h4>No Properties Found</h4>
                    </div>
                    )
                  }
              </div>
              {
                mostViewedPropertiesArr && mostViewedPropertiesArr?.length > 6 && (
                  <div className="row g-2 g-sm-3 g-xl-4 mt-4">
                  <div className="col-lg-12 text-center">
                    <button onClick={()=>handleLocationSet(locationArr.find((el) => el.active == true))}  className="btn btn-brown rounded"> View All</button>
                  </div>
                </div>
                )
              }
           
            </div>
          </section>
        )}

      <section className="padding40 bg home-benefits">
        <div className="container">
          <div className="title_header mb-3">
            <h2>
              Why
              <span className="brown"> Sunday Forever?</span>
            </h2>
          </div>
          <Swiper
            spaceBetween={30}
            slidesPerView={4}
            speed={1000}
            loop
            
            // autoplay={{ disableOnInteraction: false, delay: 3000 }}
            // modules={[Navigation, Autoplay]}
            modules={[Navigation,]}
            navigation
            className="p-4"
            breakpoints={why_sf}
          >
            <SwiperSlide>
              <div className="box">
                <div className="icon">
                  <img src={images.why_1} alt="" />
                </div>
                <div className="content">
                  <div className="img">
                    <img src={images.benefits1} alt="" />
                  </div>
                  <p className="mb-0">Trusted Brand</p>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="box">
                <div className="icon">
                  <img src={images.why_2} alt="" />
                </div>
                <div className="content">
                  <div className="img">
                    <img src={images.benefits2} alt="" />
                  </div>
                  <p className="mb-0">Bespoke Hospitality ​</p>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="box">
                <div className="icon">
                  <img src={images.why_3} alt="" />
                </div>
                <div className="content">
                  <div className="img">
                    <img src={images.benefits3} alt="" />
                  </div>
                  <p className="mb-0">High quality linens & toiletries​ ​</p>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="box">
                <div className="icon">
                  <img src={images.why_4} alt="" />
                </div>
                <div className="content">
                  <div className="img">
                    <img src={images.benefits4} alt="" />
                  </div>
                  <p className="mb-0">SF Loyalty Club Benefits ​</p>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="box">
                <div className="icon">
                  <img src={images.why_5} alt="" />
                </div>
                <div className="content">
                  <div className="img">
                    <img src={images.benefits5} alt="" />
                  </div>
                  <p className="mb-0">Private Chef ​</p>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="box">
                <div className="icon">
                  <img src={images.why_6} alt="" />
                </div>
                <div className="content">
                  <div className="img">
                    <img src={images.benefits6} alt="" />
                  </div>
                  <p className="mb-0">Pick-up & Drop Facility ​</p>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="box">
                <div className="icon">
                  <img src={images.why_7} alt="" />
                </div>
                <div className="content">
                  <div className="img">
                    <img src={images.benefits7} alt="" />
                  </div>
                  <p className="mb-0">Pet Friendly​​</p>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="box">
                <div className="icon">
                  <img src={images.why_8} alt="" />
                </div>
                <div className="content">
                  <div className="img">
                    <img src={images.benefits8} alt="" />
                  </div>
                  <p className="mb-0">24 Hr Assistance ​</p>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="box">
                <div className="icon">
                  <img src={images.why_9} alt="" />
                </div>
                <div className="content">
                  <div className="img">
                    <img src={images.benefits9} alt="" />
                  </div>
                  <p className="mb-0">Great Food​​</p>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="box">
                <div className="icon">
                  <img src={images.why_10} alt="" />
                </div>
                <div className="content">
                  <div className="img">
                    <img src={images.benefits10} alt="" />
                  </div>
                  <p className="mb-0">Customer Friendly ​Flexi Refund Policy</p>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="box">
                <div className="icon">
                  <img src={images.why_11} alt="" />
                </div>
                <div className="content">
                  <div className="img">
                    <img src={images.benefits11} alt="" />
                  </div>
                  <p className="mb-0">Professional Housekeeping​ ​</p>
                </div>
              </div>
            </SwiperSlide>
          </Swiper>
        </div>
      </section>

      <section className="home-experience">
        <div className="container">
          <div className="title_header mb-4 witb-btn">
            <h2>
              Guest <span className="brown">Diaries</span>
            </h2>
            <Link to="/Gallery" className="brown fw-semibold">
              View All
            </Link>
          </div>
          <Swiper
            slidesPerView={4}
            spaceBetween={20}
            speed={3500}
            loop
            modules={[Autoplay]}
            autoplay={{ disableOnInteraction: false, delay: 0 }}
            
            breakpoints={guest_experience}
          >
            <SwiperSlide>
              <img
                src={images.experience_1}
                alt=""
                className="w-100 h-auto img-cover rounded-3 pointer"
                onClick={() => navigate("/Gallery")}
              />
              <img
                src={images.experience_2}
                alt=""
                className="w-100 h-auto img-cover rounded-3 pointer"
                onClick={() => navigate("/Gallery")}
              />
            </SwiperSlide>
            <SwiperSlide>
              <img
                src={images.experience_3}
                alt=""
                className="w-100 h-auto img-cover rounded-3 pointer"
                onClick={() => navigate("/Gallery")}
              />
              <img
                src={images.experience_4}
                alt=""
                className="w-100 h-auto img-cover rounded-3 pointer"
                onClick={() => navigate("/Gallery")}
              />
            </SwiperSlide>
            <SwiperSlide>
             <img
                src={images.himansi}
                alt=""
                className="w-100 h-auto img-cover rounded-3 pointer"
                onClick={() => navigate("/Gallery")}
              />
              <a href="https://www.youtube.com/shorts/MY6Gg5rjdcY" target="_blank" >       <video
                src={images.Reelvideo}
                // controls
                height={420}
                autoPlay
                loop
                muted
                playsInline
                className="w-100 h-auto img-cover rounded-3 pointer mt-3"
              ></video>
              </a>
       
           
            </SwiperSlide>
            <SwiperSlide>
              <video
                src={images.experience_5}
                // controls
                height={420}
                autoPlay
                loop
                muted
                playsInline
                className="w-100 img-cover rounded-3 pointer"
              ></video>
              <img
                src={images.experience_6}
                alt=""
                className="w-100 h-auto img-cover rounded-3 pointer"
                onClick={() => navigate("/Gallery")}
              />
            </SwiperSlide>
            <SwiperSlide>
              <img
                src={images.experience_18}
                alt=""
                className="w-100 h-auto img-cover rounded-3 pointer"
                onClick={() => navigate("/Gallery")}
              />
              <img
                src={images.experience_19}
                alt=""
                height={200}
                className="w-100 img-contain rounded-3 pointer"
                onClick={() => navigate("/Gallery")}
              />
            </SwiperSlide>
            <SwiperSlide>
              <img
                src={images.experience_8}
                alt=""
                className="w-100 h-auto img-cover rounded-3 pointer"
                onClick={() => navigate("/Gallery")}
              />
              <img
                src={images.experience_9}
                alt=""
                className="w-100 h-auto img-cover rounded-3 pointer"
                onClick={() => navigate("/Gallery")}
              />
            </SwiperSlide>
            <SwiperSlide>
              <video
                src={images.experience_10}
                // controls
                autoPlay
                loop
                muted
                playsInline
                className="w-100 h-auto img-cover rounded-3 pointer"
              ></video>
              <img
                src={images.experience_11}
                alt=""
                className="w-100 h-auto img-cover rounded-3 pointer"
                onClick={() => navigate("/Gallery")}
              />
            </SwiperSlide>
            <SwiperSlide>
              <img
                src={images.experience_12}
                alt=""
                className="w-100 h-auto img-cover rounded-3 pointer"
                onClick={() => navigate("/Gallery")}
              />
              <img
                src={images.experience_13}
                alt=""
                className="w-100 h-auto img-cover rounded-3 pointer"
                onClick={() => navigate("/Gallery")}
              />
            </SwiperSlide>
            <SwiperSlide>
              <img
                src={images.experience_14}
                alt=""
                className="w-100 h-auto img-cover rounded-3 pointer"
                onClick={() => navigate("/Gallery")}
              />
              <video
                src={images.experience_15}
                // controls
                autoPlay
                loop
                muted
                playsInline
                height={420}
                className="w-100 img-cover rounded-3 pointer"
              ></video>
            </SwiperSlide>
            <SwiperSlide>
              <img
                src={images.experience_16}
                alt=""
                className="w-100 h-auto img-cover rounded-3 pointer"
                onClick={() => navigate("/Gallery")}
              />
              <img
                src={images.experience_17}
                alt=""
                className="w-100 h-auto img-cover rounded-3 pointer"
                onClick={() => navigate("/Gallery")}
              />
            </SwiperSlide>
            <SwiperSlide>
              <img
                src={images.experience_39}
                alt=""
                className="w-100 h-auto img-cover rounded-3 pointer"
                onClick={() => navigate("/Gallery")}
              />
              <img
                src={images.experience_7}
                alt=""
                className="w-100 h-auto img-cover rounded-3 pointer"
                onClick={() => navigate("/Gallery")}
              />
            </SwiperSlide>
            <SwiperSlide>
              <video
                src={images.experience_20}
                // controls
                autoPlay
                loop
                muted
                playsInline
                height={420}
                className="w-100 img-cover rounded-3 pointer"
              ></video>
              <img
                src={images.experience_21}
                alt=""
                className="w-100 h-auto img-cover rounded-3 pointer"
                onClick={() => navigate("/Gallery")}
              />
            </SwiperSlide>
            <SwiperSlide>
              <img
                src={images.experience_22}
                alt=""
                className="w-100 h-auto img-cover rounded-3 pointer"
                onClick={() => navigate("/Gallery")}
              />
              <img
                src={images.experience_23}
                alt=""
                className="w-100 h-auto img-cover rounded-3 pointer"
                onClick={() => navigate("/Gallery")}
              />
              <img
                src={images.experience_24}
                alt=""
                className="w-100 h-auto img-cover rounded-3 pointer"
                onClick={() => navigate("/Gallery")}
              />
            </SwiperSlide>
            <SwiperSlide>
              <img
                src={images.experience_25}
                alt=""
                className="w-100 h-auto img-cover rounded-3 pointer"
                onClick={() => navigate("/Gallery")}
              />
              <img
                src={images.experience_26}
                alt=""
                className="w-100 h-auto img-cover rounded-3 pointer"
                onClick={() => navigate("/Gallery")}
              />
              <img
                src={images.experience_27}
                alt=""
                className="w-100 h-auto img-cover rounded-3 pointer"
                onClick={() => navigate("/Gallery")}
              />
            </SwiperSlide>
            <SwiperSlide>
              <img
                src={images.experience_28}
                alt=""
                className="w-100 h-auto img-cover rounded-3 pointer"
                onClick={() => navigate("/Gallery")}
              />
              <img
                src={images.experience_29}
                alt=""
                className="w-100 h-auto img-cover rounded-3 pointer"
                onClick={() => navigate("/Gallery")}
              />
              <img
                src={images.experience_30}
                alt=""
                className="w-100 h-auto img-cover rounded-3 pointer"
                onClick={() => navigate("/Gallery")}
              />
            </SwiperSlide>
            <SwiperSlide>
              <img
                src={images.experience_31}
                alt=""
                className="w-100 h-auto img-cover rounded-3 pointer"
                onClick={() => navigate("/Gallery")}
              />
              <video
                src={images.experience_32}
                // controls
                autoPlay
                loop
                muted
                playsInline
                className="w-100 h-auto img-cover rounded-3 pointer"
              ></video>
            </SwiperSlide>
            <SwiperSlide>
              <img
                src={images.experience_33}
                alt=""
                className="w-100 h-auto img-cover rounded-3 pointer"
                onClick={() => navigate("/Gallery")}
              />
              <img
                src={images.experience_34}
                alt=""
                className="w-100 h-auto img-cover rounded-3 pointer"
                onClick={() => navigate("/Gallery")}
              />
            </SwiperSlide>
            <SwiperSlide>
              <img
                src={images.experience_35}
                alt=""
                className="w-100 h-auto img-cover rounded-3 pointer"
                onClick={() => navigate("/Gallery")}
              />
              <img
                src={images.experience_36}
                alt=""
                className="w-100 h-auto img-cover rounded-3 pointer"
                onClick={() => navigate("/Gallery")}
              />
            </SwiperSlide>
            <SwiperSlide>
              <video
                src={images.experience_37}
                // controls
                autoPlay
                loop
                muted
                playsInline
                height={420}
                className="w-100 img-cover rounded-3 pointer"
              ></video>
              <img
                src={images.experience_38}
                alt=""
                className="w-100 h-auto img-cover rounded-3 pointer"
                onClick={() => navigate("/Gallery")}
              />
            </SwiperSlide>
          </Swiper>
          {/* <div className="youtube-video">
            <iframe
              width="100%"
              src="https://www.youtube.com/embed/-zCwoIqRnmQ"
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            ></iframe>
          </div> */}
        </div>
      </section>

      <section className="pb-40 our-collection">
        <div className="container">
          <div className="title_header mb-4">
            <h2>
              Our <span className="brown">Collection</span>
            </h2>
          </div>
          <Swiper
            spaceBetween={15}
            slidesPerView={4}
            speed={2000}
            loop
            // autoplay={{ disableOnInteraction: false, delay: 3000 }}
            modules={[Navigation,]}
            navigation
            breakpoints={collection_box}
          >
            {collectionArr &&
              collectionArr.map((collection, index) => (
                <SwiperSlide key={index}>
                  <div  style={{cursor:"pointer"}} onClick={()=> handleCollectionSet(collection)}>
                    <div
                      className="collection-box"
                      style={{
                        backgroundImage: `url(${generateImageUrl(
                          collection.imageUrl
                        )})`,
                      }}
                    >
                      <h4 className="font-2">{collection.name}</h4>
                      <p className="mb-0">{collection.description}</p>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
          </Swiper>
        </div>
      </section>

      {offerArr && offerArr?.length > 0 && (
        <section className="home-coupons mb-40">
          <div className="container">
            <div className="title_header witb-btn mb-3">
              <div>
                <h2>
                  Top offers&nbsp;
                  <span className="brown">
                    for you <RiCoupon3Fill />
                  </span>
                </h2>
                <h6
                  className={`fw-semibold brown ${
                    copied ? "visible" : "invisible"
                  }`}
                >
                  Text Copied
                </h6>
              </div>
              <Link to="/Offers" className="brown fw-semibold">
                View All
              </Link>
            </div>
            <div className="row row-overflow g-3 g-md-4">
              {offerArr &&
                offerArr.map((offer, OfferIndex) => (
                  <div className="col-6 col-lg-4" key={OfferIndex}>
                    <div className="box">
                      <p
                        className="code"
                        onClick={() => copyToClipboard(offer.discountCode)}
                      >
                        {offer.discountCode}&nbsp;
                        <MdContentCopy />
                      </p>
                      <p className="off">
                        {offer.type == "PERCENTAGE" ? (
                          <>
                            <span>{offer.value}%</span> off*
                          </>
                        ) : (
                          <>
                            <span>{offer.value}</span> off*
                          </>
                        )}
                      </p>
                      <p className="desp">{offer.description}</p>
                      <p className="small">*T&C Apply</p>
                    </div>
                  </div>
                ))}
              {/*          
     <div className="col-6 col-lg-4">
       <div className="box">
         <p className="code">
           NOCANCEL3&nbsp;
           <MdContentCopy />
         </p>
         <p className="off">
           <span>20%</span> off*
         </p>
         <p className="desp">
           Sure about your travel plans? Waive your free cancellation for
           a 20% discount on 3 nights or more!
         </p>
         <p className="small">*T&C Apply</p>
       </div>
     </div>
     <div className="col-6 col-lg-4">
       <div className="box">
         <p className="code">
           LASTMINUTEDEAL2&nbsp;
           <MdContentCopy />
         </p>
         <p className="off">
           <span>20%</span> off*
         </p>
         <p className="desp">
           Check-in within the next 3 days? That too, 2 Nights or more?
           Wow, get 20% off, if you book right now. Upto Rs 15,000.
         </p>
         <p className="small">*T&C Apply</p>
       </div>
     </div> */}
            </div>
          </div>
        </section>
      )}

      <section className="pb-40 home-testimonial iocnright_left">
        <div className="container">
          <div className="title_header witb-btn mb-4">
            <h2>
              Guest <span className="brown">Testimonials </span>
            </h2>
            <Link to="/Testimonials" className="brown fw-semibold">
              View All
            </Link>
          </div>
          <Swiper
            spaceBetween={20}
            slidesPerView={3}
            // speed={1000}
            // loop
            // // autoplay={{ disableOnInteraction: false, delay: 4000 }}
            modules={[Navigation,]}
            navigation
            // // centeredSlides
            breakpoints={guest_testi}
          >
            {testimnialArr &&
              testimnialArr.map((testimonial, testimonialIndex) => (
                <SwiperSlide key={testimonialIndex}>
                  <div className="box bg">
                    <div className="overflow-hidden image">
                      <Link to="/BlogDetail">
                        {testimonial.imageUrl != "" ? (
                          <img
                            src={generateImageUrl(testimonial.imageUrl)}
                            alt=""
                            className="img-fluid"
                          />
                        ) : (
                          <img src={images.logo} alt="" className="img-fluid" />
                        )}
                      </Link>
                    </div>
                    <div className="content">
                      <div className="desp">
                        <p>
                          {testimonial.comment.substring(0, 150)}...{" "}
                          <Link
                            to="#"
                            className="brown fw-semibold"
                            onClick={() => {
                              setTestimonialModal(true);
                              setTestimonialObj(testimonial);
                            }}
                          >
                            Read More
                          </Link>
                        </p>
                      </div>
                      <h6 className="brown mb-0 fw-semibold">
                        {testimonial.name}
                      </h6>
                      <p className="mb-0 place">{testimonial.place}</p>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
          </Swiper>
        </div>
      </section>

      <NewsLetter />

      <section className="pb-40 mobile_blog_width" ref={blogsSectionRef}>
        <div className="container">
          <div className="title_header witb-btn mb-4">
            <h2>
              Our <span className="brown">Blogs</span>
            </h2>
            <Link to="/Blogs" className="brown fw-semibold">
              View All
            </Link>
          </div>
          <div className="row g-3 g-md-4 row-overflow">
            {blogSectionIsVisible &&
              blogArr &&
              blogArr.map((blog, blogIndex) => (
                <div className="col-6 col-xl-4 col-xxl-6" key={blogIndex}>
                  <div className="home-blog">
                    <div className="overflow-hidden image">
                      <Link to={`/BlogDetail/${blog.slug}`}>
                        <img
                          src={generateImageUrl(blog.image)}
                          alt=""
                          className="img-fluid"
                        />
                      </Link>
                    </div>
                    <div className="content flex-1">
                      <h5 className="font-2 head">
                        <Link to={`/BlogDetail/${blog.slug}`}>
                          {blog.title}
                        </Link>
                      </h5>
                      <ul className="tags green">
                        <li>
                          <FaUserCircle />
                          {blog.author}
                        </li>
                        <li>
                          <BiTime />
                          {new Date(blog.createdAt).toDateString()}
                        </li>
                      </ul>
                      <p>
                        <p
                          dangerouslySetInnerHTML={{
                            __html: blog.description
                              ? blog.description.substring(0, 100)
                              : "",
                          }}
                        ></p>
                        ...
                        <Link to={`/BlogDetail/${blog.slug}`}>Read More</Link>
                      </p>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </section>






      <span ref={instagramSectionRef}>
        {instagramSectionIsVisible && (
          <div className="insta-pic">
            <div className="container-fluid">
              <div data-mc-src="d8a9f53b-6c7f-45cd-9100-f962cf97737c#null"></div>
            </div>
          </div>
        )}
      </span>

      <Modal
        show={experienceModal}
        size="xl"
        onHide={() => setExperienceModal(false)}
        centered
        className="experience-modal"
      >
        <Modal.Header
          className="align-items-start border-0 p-0"
          closeButton
        ></Modal.Header>
        <Modal.Body className="p-0">
          <div className="row">
            <div className="col-12 col-md-6">
              <div className="left">
                <Swiper
                  slidesPerView={1}
                  speed={2000}
                  modules={[Autoplay, Navigation]}
                  navigation
                  autoplay={{ disableOnInteraction: false }}
                >
                  <SwiperSlide>
                    <img src={images.imageslider} alt="" className="img" />
                  </SwiperSlide>
                  <SwiperSlide>
                    <video
                      src={images.intro_video}
                      controls
                      playsInline
                      className="img"
                    ></video>
                  </SwiperSlide>
                </Swiper>
              </div>
            </div>
            <div className="col-12 col-md-6">
              <div className="right">
                <h3>Title</h3>
                <p>
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                  Porro explicabo dolorem, veniam delectus corrupti aliquam
                  vitae voluptatem quae earum reiciendis praesentium mollitia
                  exercitationem. Nostrum recusandae reprehenderit assumenda ex
                  tempore necessitatibus.
                </p>
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>

      <Modal
        show={show}
        size="lg"
        onHide={() => setShow(false)}
        centered
        className="experience-modal testimonial-modal"
      >
        <Modal.Header
          className="align-items-start border-0 pb-0"
          closeButton
        ></Modal.Header>
        <Modal.Body className="p-0">
          <div className="row">
            <div className="col-12 col-md-12">
              {windowWidth < 992 && (
                <BannerTabs className="home-banner-tabs " />
              )}
            </div>
          </div>
        </Modal.Body>
      </Modal>

      {/* 

        {hotelObj.budgetFriendly && (
        <section className="pb-40">
          <div className="container">
            <div className="title_header align-items-end witb-btn mb-4">
              <div>
                <h2>
                  Budget Friendly
                  <span className="brown"> Homes</span>
                </h2>
              </div>
              <Link to="/properties" className="brown fw-semibold">
                View All
              </Link>
            </div>
            <div className="row g-3 g-sm-4 row-overflow">
              {hotelObj.budgetFriendly &&
                hotelObj.budgetFriendly.map((hotel, i) => (
                  <div className="col-6 col-xl-4">
                    <div className="places-box style-2">
                      <div className="overflow-hidden image">
                        <Link to={`/property/${hotel.slug}`}>
                          <img
                            src={generateImageUrl(hotel.mainImage)}
                            alt=""
                            className="w-100"
                          />
                        </Link>
                        {hotel.roomAndAmenitiesServiceArr && (
                          <ul className="tags gap-0">
                            {hotel.roomAndAmenitiesServiceArr &&
                              hotel.roomAndAmenitiesServiceArr.map((rom) =>
                                /^[0-9]*$/.test(rom.no) ? (
                                  <li>
                                    {getIcon(rom.name)}
                                    &nbsp;{rom.no}{" "}
                                    {rom.name.charAt(0).toUpperCase() +
                                      rom.name.slice(1)}
                                  </li>
                                ) : (
                                  ""
                                )
                              )}
                          </ul>
                        )}
                      </div>

                      <div className="content">
                        <h4>
                          <Link to={`/property/${hotel.slug}`}>
                            {hotel.name}
                          </Link>
                        </h4>
                        <p className="mb-2 small">
                          <ImLocation className="brown" />
                          &nbsp;{hotel?.locationObj?.name}
                        </p>

                        <div className="d-flex align-items-center gap-2 justify-content-between">
                          <div>
                            <div className="price">
                              <h5 className="brown">₹{hotel.price}</h5>
                              <p className="text-default mb-0 small">/ Night</p>
                            </div>
                            <p className="mb-0 small">
                              (excl. taxes & charges)
                            </p>
                          </div>
                          <Link
                            to={`/property/${hotel.slug}`}
                            className="btn btn-brown btn-sm"
                          >
                            Book Now
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </section>
      )}

      <section className="pb-40">
        <div className="container">
          <div className="title_header align-items-end witb-btn mb-4">
            <div>
              <p className="mb-1">Plush by Sunday Forever</p>
              <h2>
                Our Premium
                <span className="brown"> Collection</span>
              </h2>
            </div>
            <Link to="/properties" className="brown fw-semibold">
              View All
            </Link>
          </div>
          <div className="row g-3 g-sm-4 row-overflow">
            {hotelObj.preminumCollection &&
              hotelObj.preminumCollection.map((hotel, i) => (
                <div className="col-6 col-xl-4">
                  <div className="places-box style-2">
                    <div className="overflow-hidden image">
                      <Link to={`/property/${hotel.slug}`}>
                        <img
                          src={generateImageUrl(hotel.mainImage)}
                          alt=""
                          className="w-100"
                        />
                      </Link>
                      {hotel.roomAndAmenitiesServiceArr && (
                        <ul className="tags gap-0">
                          {hotel.roomAndAmenitiesServiceArr &&
                            hotel.roomAndAmenitiesServiceArr.map((rom) =>
                              /^[0-9]*$/.test(rom.no) ? (
                                <li>
                                  {getIcon(rom.name)}
                                  &nbsp;{rom.no}{" "}
                                  {rom.name.charAt(0).toUpperCase() +
                                    rom.name.slice(1)}
                                </li>
                              ) : (
                                ""
                              )
                            )}
                        </ul>
                      )}
                    </div>

                    <div className="content">
                      <h4>
                        <Link to={`/property/${hotel.slug}`}>
                          {hotel.name}
                        </Link>
                      </h4>
                      <p className="mb-2 small">
                        <ImLocation className="brown" />
                        &nbsp;{hotel?.locationObj?.name}
                      </p>

                      <div className="d-flex align-items-center gap-2 justify-content-between">
                        <div>
                          <div className="price">
                            <h5 className="brown">₹{hotel.price}</h5>
                            <p className="text-default mb-0 small">/ Night</p>
                          </div>
                          <p className="mb-0 small">(excl. taxes & charges)</p>
                        </div>
                        <Link
                          to={`/property/${hotel.slug}`}
                          className="btn btn-brown btn-sm"
                        >
                          Book Now
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </section>
      

      <section className="pb-40 faq-page">
        <div className="container">
          <div className="title_header witb-btn mb-4">
            <h2>
              Frequently Asked
              <span className="brown"> Questions</span>
            </h2>
            <Link to="/Faq" className="brown fw-semibold">
              View All
            </Link>
          </div>
          <Accordion flush>
            {faqArr &&
              faqArr.map((faq, key) => (
                <Accordion.Item eventKey={key}>
                  <Accordion.Header>{faq.question}</Accordion.Header>
                  <Accordion.Body>
                    <p>{faq.answer}</p>
                  </Accordion.Body>
                </Accordion.Item>
              ))}
          </Accordion>
        </div>
      </section>

      <span ref={instagramSectionRef}>
        {instagramSectionIsVisible && (
          <div className="insta-pic">
            <div className="container-fluid">
              <div data-mc-src="d8a9f53b-6c7f-45cd-9100-f962cf97737c#null"></div>
            </div>
          </div>
        )}
      </span> */}

      <Modal
        show={availabilityModal}
        size="xl"
        onHide={() => setAvailabilityModal(false)}
        centered
        className="availability-modal"
      >
        <Modal.Header
          className="align-items-start border-0 pb-0"
          closeButton
        ></Modal.Header>
        <Modal.Body>
          <div className="user_inof date_area">
            <h3 className="fw-bold mb-4">Kings Cottage</h3>
          </div>
        </Modal.Body>
      </Modal>

      <Modal
        show={testimonialObj && testimonialModal}
        size="lg"
        onHide={() => setTestimonialModal(false)}
        centered
        className="experience-modal testimonial-modal"
      >
        <Modal.Header className="align-items-start border-0 p-0" ></Modal.Header>
        <Modal.Body className="p-0">
          <div className="row">
            <div className="col-12 col-md-6">
              <div className="left centermodaltestimonal h-100">
                <img
                  src={generateImageUrl(testimonialObj?.imageUrl)}
                  alt=""
                  className="img"
                />
              </div>
            </div>
            <div className="col-12 col-md-6">
              <div className="right">
                <h3 className="mb-0">{testimonialObj?.name}</h3>
                <p className="brown mb-2">{testimonialObj?.place}</p>
                <p className="mb-0">{testimonialObj?.comment}</p>
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </main>
  );
};

export default Index;
