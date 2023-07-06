import React, { useState } from "react";
import { useEffect, useLayoutEffect } from "react";
import {
  BsFillInfoCircleFill,
  BsFillInfoSquareFill,
  BsSearch,
  BsTrash,
} from "react-icons/bs";
import { ImLocation } from "react-icons/im";
import { Await, Link, useNavigate } from "react-router-dom";
import { images } from "./particle/Images";
import PageBanner from "./particle/PageBanner";
import { Calendar } from "react-date-range";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import Popover from "react-bootstrap/Popover";
import { getAmenityCategory } from "../service/hotel.service";
import { errorToast, successToast } from "../utils/toast";
import { indianStatesArr } from "../utils/Constant";
import { BsPlus } from "react-icons/bs";
import FileUpload from "../utils/FileUpload";
import MultiFileUpload from "../utils/MultiFileUpload";
import { generateImageUrl } from "../service/url.service";
import { postPropertyEnquiry } from "../service/home.service";

function PropertyListingForm() {
  const navigate = useNavigate();
  const [steps, setSteps] = useState(0);
  const [totalSteps, setTotalSteps] = useState([
    "Basics",
    "Location",
    "Facilities",
    "Rooms",
    "Photos",
    "Profile",
  ]);
  // const [steps, setsteps] = useState(1);
  const [showLocation, setShowLocation] = useState(false);
  const [locationArr, setLocationArr] = useState([]);
  const [amentiesCategoryArr, setamentiesCategoryArr] = useState([]);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

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


const handleStepForm = () => {


if(steps == 0){
  if(name == ""){
    errorToast("Please Enter Your Property Name");
    return 0
  }
  if(hotelType == ""){
    errorToast("Please Enter Your Property Type");
    return 0
  }
  if(description == ""){
    errorToast("Please Enter Your Property Description");
    return 0
  }
}
if(steps == 1){
  if(address == ""){
    errorToast("Please Enter Your Property Full Address");
    return 0
  }
  if(propertyState == ""){
    errorToast("Please Enter Your Property State ");
    return 0
  }
  if(city == ""){
    errorToast("Please Enter Your Property City");
    return 0
  }

  // if(pincode == ""){
  //   errorToast("Please Enter Your Property ZIP / Postal code");
  //   return 0
  // }

  // if(longitude == ""){
  //   errorToast("Please Enter Your Property Longitude");
  //   return 0
  // }

  // if(latitude == ""){
  //   errorToast("Please Enter Your Property Latitude");
  //   return 0
  // }
}

if(steps == 2){
  if (
      amenitiesArr.length > 0 &&
      amenitiesArr &&
      amenitiesArr.some((el) => el.amenityCategoryId == "")
    ) {
      errorToast("Please select atleat one amentity.");
      return 0
    }
}


if(steps == 3){
  if(people == ""){
    errorToast("Please Enter Your Property Accommodation");
    return 0
  }

  if(bathroom == ""){
    errorToast("Please Enter Your Property Bathroom");
    return 0
  }
  if(price == ""){
    errorToast("Please Enter Your Property Price");
    return 0
  }

  if (!roomsArr.length > 0 || !roomsArr) {
      errorToast("Please add Rooms.");
      return;
    }
    if (
      roomsArr.length > 0 &&
      roomsArr &&
      roomsArr.some((el) => el.name == "")
    ) {
      errorToast(
        "Please fill Room name field for all the Rooms in the Room section."
      );
      return;
    }

    if (
      roomsArr.length > 0 &&
      roomsArr &&
      roomsArr.some((el) => el.size == "")
    ) {
      errorToast(
        "Please fill Room size field for all the Rooms in the Room section."
      );
      return;
    }

    if (
      roomsArr.length > 0 &&
      roomsArr &&
      roomsArr.some((el) => el.description == "")
    ) {
      errorToast(
        "Please fill Room description field for all the Rooms in the Room section."
      );
      return;
    }

    if (
      roomsArr.length > 0 &&
      roomsArr &&
      roomsArr.some((el) => el.image == "")
    ) {
      errorToast(
        "Please fill Room image field for all the Rooms in the Room section."
      );
      return;
    }
}

if(steps == 4){

  if(mainImage == ""){
    errorToast("Please Enter Your Property Main Image");
    return 0
  }
    if (!imagesArr || imagesArr.length == 0 ) {
    errorToast("Please Atleast one Image.");
    return;
  }

  if (
    imagesArr.length > 0 &&
    imagesArr &&
    imagesArr.some((el) => el.imageUrl == "")
  ) {
    errorToast(
      "Please fill image field for  the Image section."
    );
    return;
  }
}

if(steps == 5){

  if(fname == ""){
    errorToast("Please Enter Your First Name");
    return 0
  }

  if(lname == ""){
    errorToast("Please Enter Your Last Name");
    return 0
  }

  if(phone == ""){
    errorToast("Please Enter Your Mobile Number");
    return 0
  }
  if(phone.length != 10){
    errorToast("Please Enter Your Valid Mobile Number");
    return 0
  }

  if(email == ""){
    errorToast("Please Enter Your Email");
    return 0
  }

  if(fullAddress == ""){
    errorToast("Please Enter Your Address");
    return 0
  }

  if(paymentRecevied == ""){
    errorToast("Please Enter Your Payment Recevied");
    return 0
  }

  let obj = {
    name,
    description,
    mainImage,
    price,
    hotelType,
    address,
    propertyState,city,pincode,longitude,latitude,people,bathroom,extraPrice,meal,
    imagesArr,
    fname,
    lname,
    phone,email,
    fullAddress,
    paymentRecevied,
    amenitiesArr: amenitiesArr
      .filter((ele) => ele.checked == true)
      .map((ele) => {
        let obj2 = {
          amenityCategoryId: ele._id,
          amenityCategoryName: ele.name,
          amenityArr: ele.amenityArr
            .filter((elm) => elm.checked == true)
            .map((elm) => {
              return {
                amenityId: elm._id,
                amenityName: elm.name,
                amenityImage: elm.image,
              };
            }),
        };
        return obj2;
      }),
    roomsArr,
}
handleSumbit(obj)

}

setSteps(i => i+1);

}
const handleSumbit = async (formData) => {


try {
  let {data:res }= await postPropertyEnquiry(formData);
  if(res.message){
    successToast(res.message)
    navigate("/PropertyListing")
  } 
} catch (error) {
  errorToast(error)

}

}

  useEffect(() => {
    if (amentiesCategoryArr && amentiesCategoryArr.length > 0) {
      setDisplayAmenityCategoryArr(
        amentiesCategoryArr.map((el) => {
          let obj = {
            ...el,
            checked: false,
          };
          return obj;
        })
      );
        setamenitiesArr(
         [
              ...amentiesCategoryArr.map((el) => {
                let obj = {
                  ...el,
                  checked: false,
                };
                return obj;
              }),
            ]
          
        )
    }
  }, [amentiesCategoryArr]);
  const [amenitiesArr, setamenitiesArr] = useState([]);
  const [name, setName] = useState("");
  const [hotelType, setHotelType] = useState("");
  const [address, setAddress] = useState("");
  const [description, setDescription] = useState("");
  const [displayAmenityCategoryArr, setDisplayAmenityCategoryArr] = useState();
  const [propertyState, setPropertyState] = useState("");
  const [city, setCity] = useState("");
  const [pincode, setPincode] = useState("");
  const [longitude, setLongitude] = useState("");
  const [latitude, setLatitude] = useState("");
  const [mainImage, setmainImage] = useState("");
  const [people, setPeople] = useState("");
  const [bathroom, setBathroom] = useState("");
  const [price, setPrice] = useState("");
  const [extraPrice, setExtraPrice] = useState('');
const [meal, setMeal] = useState("");
const [fname, setFname] = useState("");
const [lname, setLname] = useState("");
const [email, setEmail] = useState("");
const [phone, setPhone] = useState("");
const [fullAddress, setFullAddress] = useState("");
const [paymentRecevied, setPaymentRecevied] = useState("");

  const [imagesArr, setImagesArr] = useState([{
    imageUrl:""
  }]);
  const [roomsArr, setroomsArr] = useState([{
    name:"",
    image:"",
    size:"",
    description:""
  }]);

  const handleRoomsAdd = () => {
    setroomsArr([...roomsArr,{
      name:"",
      image:"",
      description:""
    }]);
  };
  const handleRoomsRemove = (index) => {
      setroomsArr([
        ...roomsArr.filter((el, indexxxx) => indexxxx != index),
      ]);
  };

  const handleSetRoomImage = (index, value) => {
    let tempArr = roomsArr;
    tempArr[index].image = value;
    setroomsArr([...tempArr]);
  };
  const handleSetRoomName = (value, index) => {
    let tempArr = roomsArr;
    tempArr[index].name = value;
    setroomsArr([...tempArr]);
  };

  const handleSetRoomArea = (value, index) => {
    let tempArr = roomsArr;
    tempArr[index].size = value;
    setroomsArr([...tempArr]);
  };
 
    const handleSetRoomDescritpion = (value, index) => {
      let tempArr = roomsArr;
      tempArr[index].description = value;
      setroomsArr([...tempArr]);
    };
  
  const handleSetMultipleImages = (value, index) => {

    console.log(value,"valuevaluevaluevalue")

    if(value && value.length > 0){
      let tempArr = imagesArr;
      let tempImageArr =  value.map((img) => ({imageUrl:img.base64}))
      const children = tempArr.concat(tempImageArr);
      setImagesArr([...children]);
    } else {
      let tempArr = imagesArr;
      tempArr[index].imageUrl = value;
      setImagesArr([...tempArr]);
    }

  };

  const handleMultipleImagesRemove = (index) => {
    setImagesArr([
      ...imagesArr.filter((el, indexxxx) => indexxxx != index),
    ]);
};
  // useEffect(() => {
  //   const total = 5;
  //   let temp = [];
  //   for (let i = 0; i < total; i++) {
  //     temp.push(i);
  //   }
  //   setTotalSteps([...temp]);
  // }, []);

  const handleGetAmenityCategory = async () => {
    try {
      let { data: res } = await getAmenityCategory();
      if (res.data) {
        setamentiesCategoryArr(res.data);
      }
    } catch (error) {
      errorToast(error);
    }
  };

  useEffect(() => {
    handleGetAmenityCategory();
  }, []);

  useEffect(() => {
    console.log(steps, "current step", totalSteps[totalSteps.length - 1]);
  }, [steps]);
  const AmenitiesComponent = ({ amenitiesArr, upliftAmenity }) => {

    const [amenityLocalArr, setAmenityLocalArr] = useState(amenitiesArr);
    const handleAmenityCategoryCheck = (index, value) => {
      let tempArr = amenityLocalArr.map((el, i) => {
        if (index == i) {
          el.checked = value;
        }
        return el;
      });
      setAmenityLocalArr([...tempArr]);
      upliftAmenity(tempArr);
    };
  
    const handleAmenityCheck = (parentId, childId, value) => {
      let tempArr = amenityLocalArr.map((el, i) => {
        if (el._id == parentId) {
          let tempInnerArr = el.amenityArr.map((elm) => {
            if (elm._id == childId) {
              elm.checked = value;
            }
            return { ...elm };
          });
          el.amenityArr = [...tempInnerArr];
        }
        return { ...el };
      });
      setAmenityLocalArr([...tempArr]);
      upliftAmenity(tempArr);
    };
  
    useEffect(() => {
      setAmenityLocalArr(amenitiesArr);
    }, [amenitiesArr]);
  
    return (
      <>
        {amenityLocalArr &&
          amenityLocalArr.length > 0 &&
          amenityLocalArr.map((elx, indexXX) => {
  
         
            return (
              <div key={indexXX} className="col-12 mb-3">
                <div>
                  <input
                    name="first_name"
                    type="checkbox"
                    required=""
                    id={`${indexXX}AmenityCategory${elx._id}`}
                    checked={elx.checked ? elx.checked : false}
                    onChange={(e) =>
                      handleAmenityCategoryCheck(indexXX, !elx.checked)
                    }
                  />
                   <span className="mb-3 small text-dark fw-semibold"
                    htmlFor={`${indexXX}AmenityCategory${elx._id}`}
                    style={{ paddingLeft: 15 }}
                  >
                    {elx.name}
                  </span>
                </div>
                {elx.checked &&
                  elx.amenityArr &&
                  elx.amenityArr.length > 0 &&
                  elx.amenityArr.map((elm, indexXXX) => {
                    return (
                      <div  key={indexXXX} className="form-check form-check-inline">
                      <label>
                      <input
                            name="first_name"
                            className="form-check-input"
                            type="checkbox"
                            required=""
                            id={`${indexXXX}Amenity${elm._id}`}
                            checked={elm.checked ? elm.checked : false}
                            onChange={(e) =>
                              handleAmenityCheck(elx._id, elm._id, !elm.checked)
                            }
                          />
                         <span
                            htmlFor={`${indexXXX}Amenity${elm._id}`}
                            style={{ paddingLeft: 15 }}
                          >
                            {elm.name}
                          </span>
                      </label>
                    </div>
                    
                    );
                  })}
              </div>
            );
          })}
      </>
    );
  };
  return (
    <main className="pt-4">
      <PageBanner
        title="Why you should list your property with Sunday Forever"
        text="Are you a property owner? List your vacation home with Sunday Forever, the world’s most exciting luxury villa rental website, and you’ll enjoy a raft of exclusive benefits."
        img={images.Barlowscottage17}
        cols="col-lg-6"
        className="listing-banner hiddenp"
      />

      <section className="property-listing-steps pt-40 bg-img3">
        <div className="traveller"></div>
        <div className="container">
          <div className="property-listing-inner">
            {/* <div className="text-center">
              <Link to="/" className="main_logo">
                <img src={images.logo} alt="" className="img-fluid" />
              </Link>
            </div> */}

            {windowWidth > 992 && locationArr && (
              <ul className="timeline mt-0">
                {totalSteps.map((item, i) => {
                  return (
                    <li
                      key={i}
                      className={`${
                        steps === i
                          ? "half"
                          : steps > i
                          ? "full"
                          : steps < i
                          ? "empty"
                          : ""
                      }`}
                      // onClick={() => setSteps(i)}
                    >
                      <div className="dot"></div>
                      <div className="empty-line"></div>
                      {steps === i && (
                        <div className="half-filled">
                          <img src={images.man} alt="" />
                          <div className="half-line"></div>
                        </div>
                      )}
                      {steps > i && <div className="full-filled"></div>}
                      <p className="mb-0">{item}</p>
                    </li>
                  );
                })}
              </ul>
            )}

            <div className="outer-inner">
              {steps === 0 ? (
                <div className="inner bg-white col-12 col-md-12 col-lg-8 mx-auto">
                  <h5>Basics</h5>
                  <div className="row gy-3">
                    <div className="col-12 col-md-6">
                      <label>Property Name  <span className="text-danger">*</span></label>
                      <div className="position-relative">
                        <input type="text" className="form-control pe-5" value={name} onChange={(e)=>setName(e.target.value)} />
                        <OverlayTrigger
                          placement="top"
                          overlay={
                            <Popover>
                              <Popover.Body>
                                Make it count, and make it sound inviting! Don’t
                                worry, we’ll generate other languages using a
                                standard translation temelxplate.
                              </Popover.Body>
                            </Popover>
                          }
                        >
                          <div className="green pointer fs-5 position-absolute top-0 end-0 h-100 mx-3 d-flex align-items-center">
                            <BsFillInfoCircleFill />
                          </div>
                        </OverlayTrigger>
                      </div>
                    </div>
                    <div className="col-12 col-md-6">
                      <label>Property Type <span className="text-danger">*</span></label>
                      <select
                        className="form-select"
                        placeholder="Is it a home stay?"
                        aria-label="Default select example"
                        value={hotelType} onChange={(e)=>setHotelType(e.target.value)} 
                      >
                        <option value="">Please Property Type </option>
                        <option value="Hotels">Hotels</option>
                        <option value="Home Stays">Home Stays</option>
                      </select>
                    </div>
                    {/* <div className="col-12 col-md-6">
                      <label>Check-in hour</label>
                      <div className="position-relative">
                        <input type="time" className="form-control pe-5" />
                        <OverlayTrigger
                          placement="top"
                          overlay={
                            <Popover>
                              <Popover.Body>
                                When can guests check in?
                              </Popover.Body>
                            </Popover>
                          }
                        >
                          <div className="green pointer fs-5 position-absolute top-0 end-0 h-100 mx-3 d-flex align-items-center">
                            <BsFillInfoCircleFill />
                          </div>
                        </OverlayTrigger>
                      </div>
                    </div>
                    <div className="col-12 col-md-6">
                      <label>Check-Out hour</label>
                      <div className="position-relative">
                        <input type="time" className="form-control pe-5" />
                        <OverlayTrigger
                          placement="top"
                          overlay={
                            <Popover>
                              <Popover.Body>
                                What time will guests have to check out by?
                              </Popover.Body>
                            </Popover>
                          }
                        >
                          <div className="green pointer fs-5 position-absolute top-0 end-0 h-100 mx-3 d-flex align-items-center">
                            <BsFillInfoCircleFill />
                          </div>
                        </OverlayTrigger>
                      </div>
                    </div> */}
                    <div className="col-12">
                      <label>Property Description<span className="text-danger">*</span></label>
                      <div className="position-relative">
                        <textarea
                          rows="4"
                          className="form-control pe-5"
                            value={description} onChange={(e)=>setDescription(e.target.value)} 

                        ></textarea>
                        <OverlayTrigger
                          placement="top"
                          overlay={
                            <Popover>
                              <Popover.Body>
                                Why should a traveler choose to stay at your
                                property?
                              </Popover.Body>
                            </Popover>
                          }
                        >
                          <div className="green pointer fs-5 position-absolute top-0 end-0 h-100 mx-3 d-flex align-items-center">
                            <BsFillInfoCircleFill />
                          </div>
                        </OverlayTrigger>
                      </div>
                    </div>
                    <div className="col-12">
                      <p className="mb-0">
                        Check out our{" "}
                        <Link
                          to="/Cancellation-Policy"
                          className="text-info fw-semibold"
                        >
                          Cancellation policy
                        </Link>
                      </p>
                    </div>
                  </div>
                </div>
              ) : steps === 1 ? (
                <div className="inner bg-white col-12 col-md-5 col-lg-8 mx-auto">
                  <h5>Location</h5>
                  <p className="small">
                    Guests will only receive your exact address once they’ve
                    confirmed a booking.
                  </p>
                  <div className="row gy-3">
                    <div className="col-12 col-md-12">
                      <label>Full Address<span className="text-danger">*</span></label>
                      <textarea className="form-control" rows={5} placeholder="Enter Your Full Address"   value={address} onChange={(e)=>setAddress(e.target.value)} ></textarea>
                    </div>
                  
                 
                    <div className="col-12 col-md-6">
                      <label>State / Province</label>
                      <select className="form-select"   value={propertyState} onChange={(e)=>setPropertyState(e.target.value)}  >
                        <option value="">Please Select State</option>
                      {
                      indianStatesArr.map((el) => <option value={el.name}> {el.name}</option>)
                      }
                      </select>
                   
                  
                    </div>
                    <div className="col-12  col-md-6">
                      <label>City<span className="text-danger">*</span></label>
                      <input type="text" className="form-control" placeholder="Enter your city"   value={city} onChange={(e)=>setCity(e.target.value)}  />
                    </div>
                    <div className="col-12 col-md-6">
                      <label>ZIP / Postal code (optional)</label>
                      <input type="text" maxLength="6" className="form-control" placeholder="Enter your pincode"   value={pincode} onChange={(e)=>setPincode(e.target.value)}  />
                    </div>
                    {/* <div className="col-12 row">
                      <p className="text-dark fw-semibold mb-0">Map location (Coordinates)</p>
                      <p className="small">
                        Guests will only receive your exact address once they’ve
                        confirmed a booking.
                      </p>

                      <div className="col-12 col-md-6">
                      <label>Longitude</label>
                      <input type="text"  className="form-control" placeholder="Enter Your Property  Longitude"   value={longitude} onChange={(e)=>setLongitude(e.target.value)}  />
                    </div>
                    <div className="col-12 col-md-6">
                      <label>Latitude</label>
                      <input type="text"  className="form-control" placeholder="Enter Your Property  Latitude"   value={latitude} onChange={(e)=>setLatitude(e.target.value)} />
                    </div>
                     
                    </div> */}
                  </div>
                </div>
              ) : steps === 2 ? (
                <div className="inner bg-white col-12 col-md-5 col-lg-8 mx-auto amenities">
                  <h5 className="mb-3">
                    What’s unique and wonderful about your property?
                  </h5>
                  <p className="small">
                    Every room and home is unique. Tell us why yours stands out.
                  </p>
                  <div className="row gy-3">
                  <AmenitiesComponent
                      upliftAmenity={(value) => setamenitiesArr(value)}
                      amenitiesArr={[...amenitiesArr]}
                    />
                 
                  </div>
                </div>
              ) : steps === 3 ? (
                <div className="inner bg-white col-12 col-md-5 col-lg-8 mx-auto">
                  <h5 className="mb-3">Rooms and details</h5>
                  <p className="small">
                    You only need to create one room type at this stage.
                    Additional room types can then be added through our
                    extranet.
                  </p>
                  <div className="row gy-3 inlineblocknonemobile">
                  <div className="col-12 col-md-6">
                      <label>Accommodates<span className="text-danger">*</span></label>
                      <div className="position-relative">
                        <input type="text" placeholder="Enter number of people" className="form-control pe-5"   value={people} onChange={(e)=>setPeople(e.target.value)}/>
                        <OverlayTrigger
                          placement="top"
                          overlay={
                            <Popover>
                              <Popover.Body>
                                The maximum number of people who can sleep
                                comfortably given the total bed space and sofas.
                              </Popover.Body>
                            </Popover>
                          }
                        >
                          <div className="green pointer fs-5 position-absolute top-0 end-0 h-100 mx-3 d-flex align-items-center">
                            <BsFillInfoCircleFill />
                          </div>
                        </OverlayTrigger>
                      </div>
                    </div>
                    <div className="col-12 col-md-6">
                      <label>Bathrooms <span className="text-danger">*</span></label>
                      <div className="position-relative">
                        <input type="text" className="form-control pe-5" placeholder="Enter number of bathroom"  value={bathroom} onChange={(e)=>setBathroom(e.target.value)} />
                        <OverlayTrigger
                          placement="top"
                          overlay={
                            <Popover>
                              <Popover.Body>
                                Count only bathrooms on your property, not
                                shared or common bathrooms in your building or
                                complex.
                              </Popover.Body>
                            </Popover>
                          }
                        >
                          <div className="green pointer fs-5 position-absolute top-0 end-0 h-100 mx-3 d-flex align-items-center">
                            <BsFillInfoCircleFill />
                          </div>
                        </OverlayTrigger>
                      </div>
                    </div>
                    <div className="col-12 col-md-6">
                      <label>
                        What is the minimum price per night? (in INR)
                      </label>
                      <input type="text" className="form-control"  placeholder="Enter price"  value={price} onChange={(e)=>setPrice(e.target.value)} />
                    </div>
                    <div className="col-12 col-md-6">
                      <label>Extra guest (in INR)</label>
                      <div className="position-relative">
                        <input type="text" className="form-control pe-5"  value={extraPrice} onChange={(e)=>setExtraPrice(e.target.value)} />
                        <OverlayTrigger
                          placement="top"
                          overlay={
                            <Popover>
                              <Popover.Body>
                                After more than 1 guest(s), charge 0INR per
                                person, per night.
                              </Popover.Body>
                            </Popover>
                          }
                        >
                          <div className="green pointer fs-5 position-absolute top-0 end-0 h-100 mx-3 d-flex align-items-center">
                            <BsFillInfoCircleFill />
                          </div>
                        </OverlayTrigger>
                      </div>
                    </div>
                    <div className="col-12 col-md-6">
                      <label>Meal Included</label>
                        <input type="text" className="form-control pe-5"  placeholder="Enter Meal like breakfast, lunch, dinnner etc."  value={meal} onChange={(e)=>setMeal(e.target.value)} />
                        
                    </div>
                    <div className="col-md-12">
                       <p className="mb-0 small text-dark fw-semibold">
                          Room Section <i className="btn btn-green  rounded ms-2" onClick={()=>handleRoomsAdd()} > <BsPlus /></i> 
                      </p>
                    </div>
                    <div className="col-md-12  ">
                      {
                        roomsArr && roomsArr.map((el,index1) => (
                    <span key={index1} className="row">
                       <div className="col-md-12">
                       <p className="mb-0 small text-dark fw-semibold">Room {index1+1}   {  index1 > 0   &&  (<i className="btn btn-danger btn-sm rounded ms-2" onClick={()=>handleRoomsRemove(index1)} > <BsTrash /></i>) }  </p>
                       </div>
                    <div className="col-12 col-md-6">
                      <label>Room name <span className="text-danger">*</span></label>
                     <input type="text" placeholder="Enter Room name"  className="form-control"    value={el.name}
                            onChange={(e) =>
                              handleSetRoomName(e.target.value, index1)
                            }/>
                    </div>
                    <div className="col-12 col-md-6">
                      <label>Room Image <span className="text-danger">*</span></label>
                      <FileUpload   onFileChange={(val) =>
                                        handleSetRoomImage(index1, val)
                                      } />
                             {el.image && `${el.image}`.includes("base64") && (
                     <img src={el.image} width="100px" height="100px" />
                )}
                    </div>
                    <div className="col-12 col-md-6">
                      <label>Room size <span className="text-danger">*</span></label>
                     <input type="text"  placeholder="Enter Room size"   className="form-control"    value={el.size}
                            onChange={(e) =>
                              handleSetRoomArea(e.target.value, index1)
                            }/>
                            
                    </div>
                    <div className="col-12 col-md-6">
                      <label>Room Description <span className="text-danger">*</span></label>
                      <textarea className="form-control" rows={2}  placeholder="Enter Room Description"   value={el.description}
                            onChange={(e) =>
                              handleSetRoomDescritpion(e.target.value, index1)
                            }></textarea>
                    </div>
                    
                  
                    </span>
                        ))
                      }
                  
                      </div>
                  
                    {/* <div className="col-12 col-md-6">
                      <label>Optional services</label>
                      <input type="text" className="form-control" />
                    </div>
                    <div className="col-12 col-md-6">
                      <label>Outdoor facilities</label>
                      <input type="text" className="form-control" />
                    </div>
                    <div className="col-12 col-md-3">
                      <p className="mb-0 small text-dark fw-semibold">
                        Smoking Allowed
                      </p>
                      <div className="form-check form-check-inline">
                        <label>
                          <input className="form-check-input" type="radio" />
                          Yes
                        </label>
                      </div>
                      <div className="form-check form-check-inline">
                        <label>
                          <input className="form-check-input" type="radio" /> No
                        </label>
                      </div>
                    </div>
                    <div className="col-12 col-md-3">
                      <p className="mb-0 small text-dark fw-semibold">
                        Pets Allowed
                      </p>
                      <div className="form-check form-check-inline">
                        <label>
                          <input className="form-check-input" type="radio" />
                          Yes
                        </label>
                      </div>
                      <div className="form-check form-check-inline">
                        <label>
                          <input className="form-check-input" type="radio" /> No
                        </label>
                      </div>
                    </div>
                    <div className="col-12 col-md-3">
                      <p className="mb-0 small text-dark fw-semibold">
                        Party Allowed
                      </p>
                      <div className="form-check form-check-inline">
                        <label>
                          <input className="form-check-input" type="radio" />
                          Yes
                        </label>
                      </div>
                      <div className="form-check form-check-inline">
                        <label>
                          <input className="form-check-input" type="radio" /> No
                        </label>
                      </div>
                    </div>
                    <div className="col-12 col-md-3">
                      <p className="mb-0 small text-dark fw-semibold">
                        Children Allowed
                      </p>
                      <div className="form-check form-check-inline">
                        <label>
                          <input className="form-check-input" type="radio" />
                          Yes
                        </label>
                      </div>
                      <div className="form-check form-check-inline">
                        <label>
                          <input className="form-check-input" type="radio" /> No
                        </label>
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="col-12">
                        <label>Other Rules</label>
                        <textarea rows="4" className="form-control"></textarea>
                      </div>
                    </div> */}
                  </div>
                </div>
              ) : steps === 4 ? (
                <div className="inner bg-white col-12 col-md-5 col-lg-8 mx-auto">
                  <h5 className="mb-3">Show them what they’re missing.</h5>
                  <p className="small">
                    Pictures matter to travelers. Upload as many high-quality
                    images as you have. You can add more later. Want some tips
                    on how to upload quality photos that generate more bookings?
                  </p>
                  <div className="row gy-3">
                    <div className="col-12">
                      <label>Property Main Photo <span className="text-danger">*</span></label>
                      <div className="position-relative">
                      <FileUpload onFileChange={(val) => setmainImage(val)} />
                        <OverlayTrigger
                          placement="top"
                          overlay={
                            <Popover>
                              <Popover.Body>
                                The building's exterior, parking space(s),
                                entrance, and any available facilities
                              </Popover.Body>
                            </Popover>
                          }
                        >
                          <div className="green pointer fs-5 position-absolute top-0 end-0 h-100 mx-3 d-flex align-items-center">
                            <BsFillInfoCircleFill />
                          </div>
                        </OverlayTrigger>
                        {mainImage && `${mainImage}`.includes("base64") && (
                     <img src={mainImage} width="100px" height="100px" />
                )}
                      </div>
                    </div>
                    <div className="col-12">
                      <label>Property Photos <span className="text-danger">*</span></label>
                      <div className="position-relative">
                      <MultiFileUpload
                                onFileChange={(val) =>
                                  handleSetMultipleImages(val,0)
                                }
                              />
                        <OverlayTrigger
                          placement="top"
                          overlay={
                            <Popover>
                              <Popover.Body>
                                The unit’s bedroom(s), bathrooms, kitchen, and
                                dining/living areas
                              </Popover.Body>
                            </Popover>
                          }
                        >
                          <div className="green pointer fs-5 position-absolute top-0 end-0 h-100 mx-3 d-flex align-items-center">
                            <BsFillInfoCircleFill />
                          </div>
                        </OverlayTrigger>
                 
                      </div>
                    </div>
                    <div className="row ">
                  {imagesArr &&
                    imagesArr.length > 0 &&
                    imagesArr.map((el, index) => {
                      return (
                        <>
                          <div className="col-md-2">
                            {el.imageUrl !="" &&
                            `${el.imageUrl}`.includes("base64") ? (
                              <img
                                src={el.imageUrl}
                                width="100px"
                                height="100px"
                                alt="no Image"
                              />
                            ) : (
                              <img
                                src={generateImageUrl(el.imageUrl)}
                                width="100px"
                                height="100px"
                                alt="no Image"
                              />
                            )}
                           <button type="button" className="btn btn-sm btn-danger btn-absolute "   onClick={() => handleMultipleImagesRemove(index)} >
                                <i className="fa fa-close"></i>
                            </button> 
                          </div>
                     
                        </>
                      );
                    })}

                     
                </div>
                  </div>
                </div>
              ) : steps === 5 ? (
                <div className="inner bg-white col-12 col-md-5 col-lg-8 mx-auto">
                  <h5 className="mb-3">Account details</h5>
                  <p className="small">
                    Please provide your full legal name here for your contract
                    with Agoda. If additional information is needed to list your
                    property, we will contact you.
                  </p>
                  <div className="row gy-3">
                    <div className="col-12 col-md-6">
                      <label>First name <span className="text-danger">*</span></label>
                      <input type="text" className="form-control"   placeholder="Enter your first name" value={fname} onChange={(e)=>setFname(e.target.value)} />
                    </div>
                    <div className="col-12 col-md-6">
                      <label>Last name <span className="text-danger">*</span></label>
                      <input type="text" className="form-control" placeholder="Enter your last name"   value={lname} onChange={(e)=>setLname(e.target.value)} />
                    </div>
                   
                    <div className="col-12 col-md-6">
                      <label>Mobile number <span className="text-danger">*</span></label>
                      <input type="text" className="form-control"  placeholder="Enter your mobile number"   value={phone} onChange={(e)=>setPhone(e.target.value)}/>
                    </div>
                    <div className="col-12 col-md-6">
                      <label>Email <span className="text-danger">*</span></label>
                      <input type="email" className="form-control pe-5" placeholder="Enter your email"   value={email} onChange={(e)=>setEmail(e.target.value)}/>
                    </div>
                    <div className="col-12">
                      <label>Your Address <span className="text-danger">*</span></label>
                      <textarea rows="4" className="form-control" placeholder="Enter your full address"  value={fullAddress} onChange={(e)=>setFullAddress(e.target.value)}></textarea>
                    </div>
                    <div className="col-12">
                      <h6 className="fw-semibold mb-4">
                        How would you like to receive your payment? <span className="text-danger">*</span>
                      </h6>
                      <input type="text" placeholder="Enter Payment recevied" className="form-control pe-5"  value={paymentRecevied} onChange={(e)=>setPaymentRecevied(e.target.value)} />

                      {/* <div className="form-check">
                        <label className="align-items-start">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="paymentOption"
                          />
                          <div className="flex-1">
                            <span className="text-dark fw-semibold fs-6">
                              E card
                            </span>
                            <p>
                              Physical card with chip. Self-manage booking
                              transactions by collecting payment for multiple
                              bookings in one go, no need to charge the VCC for
                              each booking individually.
                            </p>
                          </div>
                        </label>
                      </div> */}
                      {/* <div className="form-check">
                        <label className="align-items-start">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="paymentOption"
                          />
                          <div className="flex-1">
                            <span className="text-dark fw-semibold fs-6">
                              Direct deposit to bank
                            </span>
                            <p>
                              We will send your payments directly to your bank
                              account after the customer departed, 30 days
                              credit.
                            </p>
                          </div>
                        </label>
                      </div>
                      <div className="form-check">
                        <label className="align-items-start">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="paymentOption"
                          />
                          <div className="flex-1">
                            <span className="text-dark fw-semibold fs-6">
                              COD
                            </span>
                            <p>
                              Physical card with chip. Self-manage booking
                              transactions by collecting payment for multiple
                              bookings in one go, no need to charge the VCC for
                              each booking individually.
                            </p>
                          </div>
                        </label>
                      </div>
                      <div className="form-check">
                        <label className="align-items-start">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="paymentOption"
                          />
                          <div className="flex-1">
                            <span className="text-dark fw-semibold fs-6">
                              UPI
                            </span>
                            <p>
                              Physical card with chip. Self-manage booking
                              transactions by collecting payment for multiple
                              bookings in one go, no need to charge the VCC for
                              each booking individually.
                            </p>
                          </div>
                        </label>
                      </div> */}
                    </div>
                  </div>
                </div>
              ) : (
                ""
              )}
            </div>
            <div className="bottom-btns">
              <button
                className={`btn btn-green-outline btn-lg rounded ${
                  steps > 0 ? "" : "invisible"
                }`}
                onClick={() => setSteps((i) => i - 1)}
              >
                Back
              </button>
             
                <button className="btn btn-green btn-lg rounded"   onClick={() =>handleStepForm()}  >{steps < 5 ? "Next" : "Submit"}</button>
          
            </div>
          </div>
        </div>
      </section>
    </main>
  );



  
}

export default PropertyListingForm;
