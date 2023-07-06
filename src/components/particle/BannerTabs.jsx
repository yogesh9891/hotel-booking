import React, { useContext, useEffect, useRef } from "react";
import { useState } from "react";
import { BsSearch } from "react-icons/bs";
import { ImLocation } from "react-icons/im";
import DatePicker from "react-datepicker";
import Quantity from "./Quantity";
import { getAllLocationApi } from "../../service/home.service";
import { errorToast } from "../../utils/toast";
import { addLocalQuery, addLocalSearch, getLocalSearch, removeLocalSearch } from "../../service/localStorage";
import { Link, useNavigate } from "react-router-dom";
import moment from "moment";
import { SearchContext } from "../../App";

function  BannerTabs({className }) {
  const [startDate, setStartDate] = useState(new Date (new Date().getFullYear(),new Date().getMonth(),new Date().getDate()));
  const [endDate, setEndDate] = useState(new Date (new Date().getFullYear(),new Date().getMonth(),new Date().getDate()));
  const [showLocation, setShowLocation] = useState(false);
  const [showGuest, setShowGuest] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [adult, setAdult] = useState(1);
  const [child, setChild] = useState(0);
  const [location, setLocation] = useState("All");
  const [locationText, setLocationText] = useState("All");
  const [locationArr, setlocationArr] = useState([]);
  const [searchlocationArr, setsearchlocationArr] = useState([]);
  const [searchObj, setSearchObj] = useContext(SearchContext)
  let mindate = new Date();
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
const navigate = useNavigate()
  const handleSearch = () => {

    if(!locationText || locationText == "" ){
      setLocationText("All")
    }
     if(startDate == ""){
      errorToast("Please Select Check In")
      return
    }

    if(endDate == ""){
      errorToast("Please Select Check Out")
      return
    }

    if(new Date(endDate).getTime() <= new Date(startDate).getTime()){
      errorToast("Please Select Valid date")
      return
    }


    let hotelSearch = {
      location:locationText ,
      startDate,
      endDate,
      adult,
      child
    }

    let loca  = locationArr.find((el =>  `${el.name}`.toLowerCase()== `${locationText}`.toLowerCase() ))
    let query = `location=${loca?._id}&startDate=${moment(new Date(startDate)).format('YYYY-MM-DD')}&endDate=${moment(new Date(endDate)).format('YYYY-MM-DD')}&adult=${adult}&child=${child}`
    hotelSearch.query = query;
    hotelSearch.location = loca?.slug?loca?.slug:'All';
    hotelSearch.name = loca?.name?loca?.name:'All';
    setSearchObj(hotelSearch)
    console.log(hotelSearch,"hotelSearchhotelSearchhotelSearch")
    addLocalSearch(hotelSearch);

    addLocalQuery(query)
    navigate("/properties")

  }



  useEffect(()=> {
    console.log(searchObj, "searchObj21",searchObj?.location)
    setLocationText(searchObj?.name)
  }, [searchObj.location])
  useEffect(()=> {
    console.log(locationText, "searchObj21")
  }, [locationText])
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

  const handlelocation = async () => {
    try {
      let { data: res } = await getAllLocationApi(`status=APPROVED`);
      if (res.data) {
        setlocationArr(res.data);
      }
    } catch (error) {
      console.error(error);
      errorToast(error);
    }
  };


  const handleGetLocalData = () => {
    let data = getLocalSearch();

    console.log(data,"datadata")
    if(data && data?.location){
        setLocationText(data?.name)
        console.log(new Date(data.startDate),"data.startDate",new Date(
          new Date().getFullYear(),
          new Date().getMonth(),
          new Date().getDate()
        ))
        if(new Date(data.startDate).getTime() < new Date(
          new Date().getFullYear(),
          new Date().getMonth(),
          new Date().getDate()
        ).getTime()){
          // removeLocalSearch();
          return 0
        }
        setStartDate(new Date(data.startDate))
        setEndDate(new Date(data.endDate))
        setAdult(data.adult)
        setChild(data.child)
    }
  }

  useEffect(() => {
    handlelocation();
    handleGetLocalData();
  },[])


  const  handleSearchLocation = (search) => {
    setShowLocation(true)
    setLocationText(search)

    const regexp = new RegExp(`^${search}`, 'i');
    let tempArr = locationArr.filter((el =>  regexp.test(`${el.name}`.toLowerCase()) == true ))
    // console.log(tempArr,"tempArrtempArr")
    setsearchlocationArr([...tempArr])

  }


  const  handlesetSearch = (location) => { 

    setLocationText(location?.name)
    // console.log(locationText,"search",location)
    setLocation(location)
    setShowLocation(false)
  }
  const pickerRef = useRef(null)
  const pickerRef1 = useRef(null)

  useEffect(() => {
      if ( 
        windowWidth < 992   && pickerRef.current !== null) {
        pickerRef.current.input.readOnly = true;
      }
      if ( 
        windowWidth < 992   && pickerRef1.current !== null) {
          pickerRef1.current.input.readOnly = true;
      }
  }, [windowWidth, pickerRef,pickerRef1]);

  return (
    <form className={`banner-tabs ${className ? className : ""}`}>
      <div className="outer-inner">
      {windowWidth < 992 &&  locationArr &&  (
        <h2>Book Your Stay</h2>

      )}
     
        <ul className="box row gx-lg-5">
          <li
            className="inner col-md-3 position-relative"
            // onFocus={() => setShowLocation(true)}
            // onBlur={() => setShowLocation(false)}
          >
            <label>Location</label>
            <div
              className="form-control with-icon gap-2"
              // onClick={() => setShowLocation(!showLocation)}
            >
              <BsSearch />
              {
                <input
                  type="text"
                  className="w-100 border-0 bg-transparent"
                  placeholder="Where to next?"
                  value={locationText}
                  readOnly
                  onClick={()=>setShowLocation(true)}
                />
              }
            
            </div>
            {showLocation  && (
               <div className="custum-dropdown location-dropdown">
               <p className="text-muted">Popular cities</p>
                 {
                   locationArr && locationArr?.length > 0 ? ( <ul className="list">
                     
                     <li onClick={() =>handlesetSearch({name:'All'})} style={{cursor:"pointer"}}>
                         <div className="icon">
                           <ImLocation />
                         </div>
                         <div>
                           <p className="text-dark">All</p>
                           {/* <p className="text-muted">
                           Mumbai, India
                           </p> */}
                         </div>
                       </li>
                     {
                       locationArr && locationArr.map((loca) => (
                         <li onClick={() =>handlesetSearch(loca)} style={{cursor:"pointer"}}>
                         <div className="icon">
                           <ImLocation />
                         </div>
                         <div>
                           <p className="text-dark">{loca?.name}</p>
                           {/* <p className="text-muted">
                             Chhatrapati Shivaji International Airport
                           </p> */}
                         </div>
                       </li>
                       ))
                     }
                 
              
                 </ul>) : (
                   <ul className="list">
 
                      <li>
                         <div className="icon">
                           <ImLocation />
                         </div>
                         <div>
                           <p className="text-dark">No City Found</p>
                           {/* <p className="text-muted">
                           Mumbai, India
                           </p> */}
                         </div>
                       </li>
                       </ul>
 
                 )
                 }
              
             </div>
            )
            
            
            }
          </li>
          <li className="inner col-md-3">
            <label>Check In</label>
            <div className="form-control date-picker-input">
              <DatePicker
                className="hidden1"
                closeOnScroll={(e) => e.target === document}
                selected={startDate}
                minDate={mindate}
                onChange={(date) => setStartDate(date)}
                dateFormat="dd MMM yyyy"
                ref={pickerRef1}
              />
            </div>
          </li>
          <li className="inner col-md-3">
            <label>Check Out</label>
            <div className="form-control date-picker-input">
              <DatePicker
                  minDate={startDate}
                className="hidden1"
                closeOnScroll={(e) => e.target === document}
                selected={endDate}
                onChange={(date) => setEndDate(date)}
                dateFormat="dd MMM yyyy"
                ref={pickerRef}
              />
            </div>
          </li>
          <li className="inner col-md-3">
            <label>Guests</label>
            <div className="position-relative">
              <div onClick={() => setShowGuest(!showGuest)} style={{cursor:'pointer'}}>
                <input
                  type="text"
                  className="form-control bg-white"
                  readOnly
                  placeholder="Guest"
                  value={`Adult ${adult}  and Child ${child}`}
                  style={{cursor:'pointer'}}
                     
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
                        <span onClick={decrementQuantity} className='bg'>-</span>
                        <span>{adult}</span>
                        <span onClick={incrementQuantity} className='bg'>+</span>
                      </div>
                    </li>
                    <li>
                      <div>
                        <p className="fw-semibold mb-0">Children</p>
                        <p className="small mb-0">6-11</p>
                      </div>
                      <div className="quantity-box">
                        <span onClick={decrementChildQuantity} className='bg'>-</span>
                        <span>{child}</span>
                        <span onClick={incrementChildQuantity} className='bg'>+</span>
                      </div>
                    </li>
                   
                  </ul>
                  <Link className="btn btn-brown rounded btn-doneselece"  onClick={() => setShowGuest(!showGuest)}>Done</Link>
                </div>
              )}
            </div>
          </li>
        </ul>
        <button
          type="button"
          className="btn btn-brown no-hover brown-bg text-white flex-1 mobile100"

          onClick={() => handleSearch()}
        >
          Search
        </button>
      </div>
    </form>
  );
}




export default BannerTabs;
