import React, { useEffect, useState ,useLayoutEffect} from "react";
import { BiBed } from "react-icons/bi";
import { Modal } from "react-bootstrap";
import { BsPeopleFill, BsSearch } from "react-icons/bs";
import { GoSettings } from "react-icons/go";
import { FaBath } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import { images } from "./particle/Images";
import PageBanner from "./particle/PageBanner";
import DatePicker from "react-datepicker";
import { ImLocation } from "react-icons/im";
import { BiFilterAlt } from "react-icons/bi";
import { GrClose } from "react-icons/gr";
import { HiOutlineSortDescending } from "react-icons/hi";
import HotelFilter from "./HotelFilter";
import Select from "react-select";
import { getAllHotelApi } from "../service/hotel.service";
import { errorToast } from "../utils/toast";
import { generateImageUrl } from "../service/url.service";
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';

import {
  getAllLocationApi,
  getAmenityApi,
  getCollectionApi,
} from "../service/home.service";
import BannerTabs from "./particle/BannerTabs";
import ReactPaginate from "react-paginate";

function Hotels() {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [closemodal, setClosemodal] = useState();
  const [filter, setFilter] = useState(false);
  const [show, setShow] = useState(false);

  const [hotels, sethotels] = useState([]);
  const [loading, setloading] = useState(true);
  const [hotelArr, sethotelArr] = useState([]);
  const [locationArr, setLocationArr] = useState([]);
  const location = useLocation()
  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 12;
  console.log(location.pathname,"const location = useLocation()const location = useLocation()")


  const [showrightcanvas, setShowrightcanvas] = useState(false);
  const handleCloserightcanvas = () => setShowrightcanvas(false);
  const handleShowrightcanvas = () => setShowrightcanvas(true);


  const [showsortbyrightcanvas, setShowsortbyrightcanvas] = useState(false);
  const handleCloserightsortbycanvas = () => setShowsortbyrightcanvas(false);
  const handleShowrightsortbycanvas = () => setShowsortbyrightcanvas(true);



  const [sortBy, setSortBy] = useState("Relevant");

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [showLocation, setShowLocation] = useState(false);
  const [showFilter, setShowFilter] = useState(false);
  const options = [
    { value: "Relevant", label: "Relevant" },
    // { value: "Date, new to old", label: "Date, new to old" },
    // { value: "Date, old to new", label: "Date, old to new" },
    { value: "low", label: "Price-Low to high" },
    { value: "high", label: "Price-High to Low" },
  ];

  const [sortBymodal, setSortBymodal] = useState(false);
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















  
  // ================================PAGINATION=================================================

  useEffect(() => {

    console.log(hotels,"hotelshotelshotels")
    console.log(sortBy,"sortBysortBysortBysortBysortBysortBysortBysortBy")
    setloading(true);
    if(sortBy  && hotels ){
      if(sortBy == 'low') {
        let hotelTemp =    hotels.sort((a, b) => {
          return a.price - b.price;
      });
      sethotelArr([...hotelTemp]);
      console.log(hotelTemp,"currentItemscurrentItems")
      } else if(sortBy == 'high'){
        let hotelTemp =    hotels.sort((a, b) => {
          return b.price - a.price;
      });
      sethotelArr([...hotelTemp]);
      console.log(hotelTemp,"currentItemscurrentItems")
      } else {
       sethotelArr(hotels);
      }
   


    } else {
       sethotelArr(hotels);
    }
    setloading(false);
  }, [hotels,sortBy]);

  // Simulate fetching items from another resources.
  // (This could be items from props; or items loaded in a local state
  // from an API endpoint with useEffect and useState)
  const endOffset = itemOffset + itemsPerPage;
  // console.log(`Loading items from ${itemOffset} to ${endOffset}`);

  const [currentItems, setCurrentItems] = useState([]);
  const [pageCount, setPageCount] = useState(0);

  useEffect(() => {
    let currentItems = hotelArr.slice(itemOffset, endOffset);
    setCurrentItems(currentItems)
    console.log(currentItems,"currentItemscurrentItems")
    const pageCount = Math.ceil(hotels?.length / itemsPerPage);
    setPageCount(pageCount)
  }, [hotelArr])
  

  useEffect(() => {
    let currentItems = hotelArr.slice(itemOffset, endOffset);
    setCurrentItems(currentItems)
    console.log(currentItems,"currentItemscurrentItems")
    const pageCount = Math.ceil(hotels?.length / itemsPerPage);
    setPageCount(pageCount)
  }, [itemOffset])
  

  // Invoke when user click to request another page.
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % hotelArr?.length;
    // console.log(
    //   `User requested page number ${event.selected}, which is offset ${newOffset}`
    // );
    setItemOffset(newOffset);

  };
 
  // =================================================================================
  useLayoutEffect(() => {
    window.addEventListener("resize", function updateSize() {
      setWindowWidth(window.innerWidth);
    });
    setWindowWidth(window.innerWidth);
    return () =>
      window.removeEventListener("resize", function updateSize() {
        setWindowWidth(window.innerWidth);
      });

      
  }, [])




  return (
    <main style={{ display: "unset" }}>
      {/* <PageBanner
        title="Best Homestays in india"
        img={images.Barlowscottage14}
        cols="col-lg-6"    <HotelFilter />
        nav
      /> */}
      <section className="bg py-3">
      {windowWidth < 992  ? (
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
        
        
      
      )
      :(
        <div className="container">
        <BannerTabs />
      </div>
      )}
      </section>

      <section className="padding40 hotel-listing bg-2 bg-img3">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12 col-md-3">
              <div className="left sticky-top">

                <HotelFilter  displayHide={windowWidth < 768 ? true:false} sortByData={sortBy} sethotels={sethotels} />


              </div>
            </div>
            <div className="col-12 col-md-9">
              <div className="title_header align-items-end witb-btn mb-3">
                <div>
                  <h2>
                    Best Properties in <span className="brown">india</span>
                  </h2>
                  <ul className="d-flex">
                    <li>
                      <Link to="/" className="text-dark">
                        Home&nbsp;/&nbsp;
                      </Link>
                    </li>
                    <li className="brown fw-semibold">
                      Best Properties in india
                    </li>
                  </ul>
                </div>
                {windowWidth > 768 && (
                <div className="mobilebottom">
                  <Select
                    classNamePrefix="sort-by "
                    options={options}
                    defaultValue={options[0]}
                    // value={{ label: sortBy, value: sortBy
                    //  }}
                    // defaultInputValue={sortBy}
                    autoFocus={false}
                    onChange={(e) => setSortBy(e.value)}
                    placeholder="Sort By"
                    theme={(theme) => ({
                      ...theme,
                      borderRadius: 5,
                      colors: {
                        ...theme.colors,
                        primary25: "#eeeeee",
                        primary: "#ddbe70",
                      },
                    })}
                  />
                </div>
                )}
                {/* <div className="d-flex gap-3">
              <button className="btn btn-brown mb-0 py-0 fs-4 rounded" onClick={()=>setShowFilter(true)}>
                  <GoSettings />
              </button>
              <HotelFilter showFilter={showFilter} setShowFilter={setShowFilter} />
            </div> */}
              </div>
              {!loading ? (
                <>
                  <div className="row gy-4">
                    {currentItems && currentItems?.length > 0 ? (
                      currentItems.map((hotel, index) => (
                        <div className="col-12 col-lg-4" key={index}>
                          <div className="places-box">
                            <div className="overflow-hidden image">
                              <Link to={`/property/${hotel.slug}`}>
                                <img
                                  src={generateImageUrl(hotel.mainImage)}
                                  alt=""
                                  className="w-100"
                                />
                              </Link>
                            </div>

                            <ul className="tags bg text-default">
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
                            {/* {hotel.roomAndAmenitiesServiceArr && (
                              <ul className="tags bg text-default">
                                {hotel.roomAndAmenitiesServiceArr &&
                                  hotel.roomAndAmenitiesServiceArr.map((rom, indexX) =>
                                    /^\d*\.?\d*$/.test(rom.no) ? (
                                      <li key={indexX}>
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

                            <div className="content">
                              <h4>
                                <Link to={`/property/${hotel.slug}`}>
                                  {hotel.name}
                                </Link>
                              </h4>
                              <p className="mb-2 small">
                                <ImLocation className="brown" />
                                {hotel?.locationObj?.name}
                              </p>

                              <div className="d-flex align-items-center gap-2 justify-content-between">
                                <div>
                                  
                                  <div className="price">
                                  <p className="text-default mb-0 small">
                                     From &nbsp;
                                    </p>
                                    <h5 className="brown">₹{hotel.price}</h5>
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
                      ))
                    ) : (
                      <div className="col-12 mt-5 text-center">
                        <h4>No Properties Found</h4>
                      </div>
                    )}
                  </div>
                  <ReactPaginate
                    breakLabel="..."
                    nextLabel="next >"
                    className="blog-pagination mt-5"
                    onPageChange={handlePageClick}
                    pageRangeDisplayed={5}
                    pageCount={pageCount}
                    previousLabel="< previous"
                    renderOnZeroPageCount={null}
                  />
                </>
              ) : (
                <div className="col-12 mt-5 text-center">
                  <img src={images.loading} />
                </div>
              )}
            </div>
          </div>
        </div>
      </section>


      {windowWidth < 768 && (
      <div className="mobile_responsive">
        <div className="container">
          <div className="row">
            <div className="col-6 border-right">
              <p onClick={() => handleShowrightsortbycanvas(true)}>
                {" "}
                <HiOutlineSortDescending /> Sort By{" "}
              </p>
            </div>
            <div className="col-6 padding10">
            <p onClick={()=>setFilter(!filter)}>
                <BiFilterAlt /> Filters{" "}
            </p>
            </div>
          
          </div>
        </div>
      </div>
      )}


        
      {/* <Offcanvas show={showrightcanvas} onHide={handleCloserightcanvas}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Filters</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body className="filterrightsidemodal">
        <HotelFilter sortByData={sortBy} sethotels={sethotels} />
        <div className="bntfixed">
            <div className="row align-items-center">
              <div className="col-6">
                <Link onClick={()=> setShowrightcanvas(false)}>Clear</Link>
              </div>
              <div className="col-6 text-end">
                <div className="aplybtn">
                  <Link className="btn btnfiltertab" onClick={()=> setShowrightcanvas(false)}>Apply</Link>
                </div>
              </div>
            </div>
          </div>
        </Offcanvas.Body>
      </Offcanvas> */}
      <div  className={`${filter?'show-filter':'hide-filter'}`}>
        <div className="container">
          <div className="row">
            <div className="col-lg-6">
              <div className="closebtnname" onClick={()=> setFilter(false)}><GrClose />  </div>
            </div>
          </div>
        </div>
      {/* <div  className={`show-filter`}> */}
      <HotelFilter sortByData={sortBy} sethotels={sethotels} />
        <div className="bntfixed">
            <div className="row align-items-center">
              <div className="col-6">
                {/* <Link onClick={()=> setFilter(false)}>Clear</Link> */}
              </div>
              <div className="col-6 text-end">
                <div className="aplybtn">
                  <Link className="btn btnfiltertab" onClick={()=> setFilter(false)}>Apply</Link>
                </div>
              </div>
            </div>
          </div>
      </div>


      <Offcanvas 
      show={showsortbyrightcanvas}
      onHide={handleCloserightsortbycanvas}
      placement="bottom"
      name="bottom"
      className="boottomsheetsortyby"
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Sort By</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body className="filterrightsidemodal">
       
        <div className="row">
            <div className="col-12">
              <form action="" className="borderbotmulclass">
              <ul>
                <li>
                  <div className="radiobtn-input">
                    <label>
                      <input type="radio" value="Relevant" checked={sortBy == 'Relevant'?true:false} onChange={(e)=>{setSortBy(e.target.value)}}   name="sortBy" className="pe2 radbtn" />
                      Relevant 
                    </label>
                  </div>
                </li>
                <li>
                <div className="radiobtn-input">
                <label>
                  <input type="radio" value="low"  checked={sortBy == 'low'?true:false}  name="sortBy"  onChange={(e)=>{setSortBy(e.target.value)}} className="pe2 radbtn" />
                  Price - Low to High
                </label>
              </div>
                </li>
                <li>
                  <div className="radiobtn-input">
                    <label>
                      <input type="radio" value="high" checked={sortBy == 'high'?true:false} name="sortBy"  className="pe2 radbtn" onChange={(e)=>{setSortBy(e.target.value)}} />
                      Price - High to Low
                    </label>
                  </div>
                </li>
              </ul>
              </form>
            </div>
          </div>
          <div className="bntfixed">
            <div className="row align-items-center">
              <div className="col-6">
                {/* <Link onClick={()=> setShowsortbyrightcanvas(false)}>Clear</Link> */}
              </div>
              <div className="col-6 text-end">
                <div className="aplybtn">
                  <Link className="btn btnfiltertab"  onClick={()=> setShowsortbyrightcanvas(false)}>Apply</Link>
                </div>
              </div>
            </div>
          </div>
        </Offcanvas.Body>
      </Offcanvas>











    
      {/* ------------------------------------------ sort by modal -------------------------------------------------- */}
      {/* ------------------------------------------ sort by modal -------------------------------------------------- */}

      <Modal
        show={sortBymodal}
        size="lg"
        onHide={() => setSortBymodal(false)}
        centered
        className="hotalfiltermobile testimonial-modal sortmodal"
      >
        <div className="row py-4">
          <div className="col-11 text-center">
            <h3>Sort By</h3>
          </div>
          <div className="col-1">
            <Modal.Header
              className="align-items-start border-0 pb-0"
              closeButton
            ></Modal.Header>
          </div>
        </div>

        <Modal.Body>
          <div className="row">
            <div className="col-12">
              <form action="" className="borderbotmulclass">
              <ul>
                <li>
                  <div className="radiobtn-input">
                    <label>
                      <input type="radio" value="Relevant" className="pe2 radbtn" />
                      Relevant
                    </label>
                  </div>
                </li>
                <li>
                <div className="radiobtn-input">
                <label>
                  <input type="radio" value="Price - Low to High"  className="pe2 radbtn" />
                  Price - Low to High
                </label>
              </div>
                </li>
                <li>
                  <div className="radiobtn-input">
                    <label>
                      <input type="radio" value="option1" className="pe2 radbtn" />
                      Price - High to Low
                    </label>
                  </div>
                </li>
              </ul>
              </form>
            </div>
          </div>
          <div className="bntfixed">
            <div className="row align-items-center">
              <div className="col-6">
                {/* <Link onClick={()=> setSortBymodal(false)}>Clear</Link> */}
              </div>
              <div className="col-6 text-end">
                <div className="aplybtn">
                  <Link className="btn btnfiltertab"  onClick={()=> setSortBymodal(false)}>Apply</Link>
                </div>
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
            <div className="col-12 col-md-6">
              {windowWidth < 992 && (
                <BannerTabs className="home-banner-tabs " />
              )}
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </main>
  );
}

export default Hotels;
