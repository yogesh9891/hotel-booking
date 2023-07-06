import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { images } from '../particle/Images'
import { RiMapPinRangeFill} from "react-icons/ri";
import { HiOutlineCheckCircle} from "react-icons/hi";
import { BsFillArrowRightCircleFill} from "react-icons/bs";
import { AiOutlinePlus} from "react-icons/ai";
import Form from 'react-bootstrap/Form';
import { SearchContext } from '../../App';
import { addLocalSearch, getLocalSearch } from '../../service/localStorage';
import { getHotelByIdApi, getRoomById, getRoomsAvailablesApi } from '../../service/hotel.service';
import { errorToast, successToast } from '../../utils/toast';
import moment from 'moment';
import { generateImageUrl } from '../../service/url.service';
import { getToken, getUserById } from '../../service/user.service';
import Select from 'react-select'
import { createGuestOrder, createOrder, orderCallback } from '../../service/order.service';
import { calculateGstOnAmount } from '../../utils/helpers';
import { ApplyCouponApi } from '../../service/home.service';

const Checkout = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [searchObj, setSearchObj] = useContext(SearchContext);
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
  const [adult, setAdult] = useState(1);
  const [child, setChild] = useState(0);
  const [extraadult, setextraAdult] = useState(0);
  const [extrachild, setextraChild] = useState(0);
  const [hotelId, sethotelId] = useState("");
  const [totalNight, setTotalNight] = useState(0);
  const [hotelObj, setHotelObj] = useState("");
  const [roomObj, setRoomObj] = useState("");
  const [roomId, setRoomId] = useState("");
  const [name, setName] = useState("");
  const [bookingTotal, setbookingTotal] = useState(0);
  const [discount, setDiscount] = useState({});
  const [subtotalPrice, setsubtotalPrice] = useState(0);
  const [tax, settax] = useState(0);
  const [roomArr, setRoomArr] = useState([]);
  const [extraArr, setExtraArr] = useState([]);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [code, setCode] = useState("");
  const [gst, setGst] = useState({
    tax: 0,
    amount: 0,
  });
  const [grandTotal, setGrandTotal] = useState(0);
  const [price, setprice] = useState(0);
  const [userObj, setUserObj] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [adultArr, setadultArr] = useState();

  const [paymentMethod, setPaymentMethod] = useState("Razorpay");

  const guestoptions = [
    { value: "adult", label: "Adult" },
    { value: "child", label: "Child" },
  ];
  const [childArr, setchildArr] = useState([]);
  useEffect(() => {
    console.log(searchObj, "searchObjsearchObjsearchObjsearchObj");

    if (searchObj && searchObj?.hotelId) {
      if (
        new Date(searchObj.startDate).getTime() <
        new Date(
          new Date().getFullYear(),
          new Date().getMonth(),
          new Date().getDate()
        ).getTime()
      ) {
        // removeLocalSearch();
        return 0;
      }

      setStartDate(new Date(searchObj.startDate));
      setEndDate(new Date(searchObj.endDate));

      let d1 = new Date(searchObj.startDate);
      let d2 = new Date(searchObj.endDate);

      let diff = d2.getTime() - d1.getTime();

      let daydiff = diff / (1000 * 60 * 60 * 24);
      setTotalNight(daydiff);
      setAdult(searchObj.adult);
      setChild(searchObj.child);
      sethotelId(searchObj.hotelId);
      if (searchObj?.roomId) {
        setRoomId(searchObj.roomId);
      }
    } else {
      let cart = getLocalSearch();
      console.log(cart, "searchObjsearchObjsearchObjsearchObj");

      if (cart && cart?.hotelId) {
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

        setStartDate(new Date(cart.startDate));
        setEndDate(new Date(cart.endDate));

        let d1 = new Date(cart.startDate);
        let d2 = new Date(cart.endDate);

        let diff = d2.getTime() - d1.getTime();

        let daydiff = diff / (1000 * 60 * 60 * 24);
        setTotalNight(daydiff);
        setAdult(cart.adult);
        setChild(cart.child);
        sethotelId(cart.hotelId);
        if (cart?.roomId) {
          setRoomId(cart.roomId);
        }
      }
    }
  }, [searchObj]);

  const handleGetProfileData = async () => {
    try {
      let { data: res } = await getUserById();
      if (res.data) {
        setUserObj(res.data);
        setEmail(res.data?.email);
        setMobile(res.data?.phone);
      }
      // console.log(res, "getUserById")
    } catch (err) {}
  };

  const handleMultipleAdultAdd = () => {
    let totalGuest = adult + child;
    if (totalGuest == adultArr?.length) {
      errorToast("You Cannot Add More Guest ");
      return 0;
    }
    if(adultArr?.length && adultArr?.length > 0){
      setadultArr([
        ...adultArr,
        {
          firstName: "",
          lastName: "",
          guesttype: "adult",
        },
      ]);
    } else {
      setadultArr([
        {
          firstName: "",
          lastName: "",
          guesttype: "adult",
        },
      ]);
    }
 
  };
  const handleMultipleAdultRemove = (ind) => {
    setadultArr([...adultArr.filter((el, index) => index != ind)]);
  };
  const handleSetMultipleAdultFirstName = (value, index) => {
    let tempArr = adultArr;

    console.log(adult, "sdfafd");
    tempArr[index].firstName = value;
    setadultArr([...tempArr]);
  };

  const handleSetMultipleAdultLastName = (value, index) => {
    let tempArr = adultArr;
    tempArr[index].lastName = value;
    setadultArr([...tempArr]);
  };

  const handleSetMultipleAdultType = (value, index) => {
    console.log(value, "valuevalue");
    let tempArr = adultArr;
    tempArr[index].guesttype = value;
    setadultArr([...tempArr]);
  };

  const handleGetHotelById = async (id) => {
    try {
      let { data: res } = await getHotelByIdApi(id);
      if (res.data) {
        setHotelObj(res.data);
        if (roomId == "") {
          console.log(roomId, "roomIdroomId");
          setName(res.data.name);
        }
      }
    } catch (error) {
      errorToast(error);
    }
  };

  const handleGetRoomById = async (id) => {
    try {
      let { data: res } = await getRoomById(id);
      if (res.data) {
        setRoomObj(res.data);
        setName(res.data.name);
      }
    } catch (error) {
      errorToast(error);
    }
  };

  useEffect(() => {
    if (hotelId) {
      handleGetHotelById(hotelId);
      handleGetProfileData();
      getAvailibilty();
    }
  }, [hotelId]);

  useEffect(() => {
    if (roomId && roomId != "0") {
      handleGetRoomById(roomId);
      getAvailibilty();
    }
  }, [roomId]);

  const getAvailibilty = async (source) => {
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
      query += `&isAvailable=true`;
      if (roomId) {
        query += `&roomId=${roomId}`;
      } else {
        query += `&roomId=0`;
      }
      query += `&calendar=true`;
      let { data: res } = await getRoomsAvailablesApi(query, source);
      if (res.data && res.data?.length > 0) {
        setprice(res.price);
        setRoomArr(res.data);
        setExtraArr(res.extra);
        setextraAdult(res.extra[0].extaAdult)
        setextraChild(res.extra[1].extaChild)
        setbookingTotal(res.price);
        setsubtotalPrice(res.price);


      
      } else {
      }
    } catch (error) {
      errorToast(error);
    }
  };

  // const calculatetax = (amount) => {
  //   let belowGst = 12;
  //   let aoveGst = 18;
  //   let tax = 12;
  //   if(amount >= 7500){

  //   } else {

  //   }

  // }

  useEffect(() => {
   if(subtotalPrice > 0){
    let gstObj = calculateGstOnAmount(subtotalPrice);
    if(gstObj) {
      setGst(gstObj);
      setGrandTotal(parseInt(gstObj?.amount) +  parseInt(subtotalPrice))
    }
   }
  }, [subtotalPrice])
  

  const handleOrder = async () => {
    let nameRegex = /^[a-zA-Z]{2,40}$/;
    if (!firstName) {
      errorToast("Please fill First Name");
      return 0;
    }
    if (!lastName) {
      errorToast("Please fill Last Name");
      return 0;
    }
    const emailregex =
      /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    if (!email || !emailregex.test(email)) {
      errorToast("Email is Invaild");
      return 0;
    }
    if (!mobile || mobile.length != 10) {
      errorToast("Mobile is Invaild");
      return 0;
    }
  
    if (
      adultArr?.length > 0 &&
      adultArr &&
      adultArr.some((el) => el.firstName == "" || !nameRegex.test(el.firstName))
    ) {
      errorToast(
        "Please fill all the fields in Guest Information (First Name)"
      );
      return;
    }
    if (
      adultArr?.length > 0 &&
      adultArr &&
      adultArr.some((el) => el.lastName == "" || !nameRegex.test(el.lastName))
    ) {
      errorToast("Please fill all the fields in Guest Information (Last Name)");
      return;
    }
    let userId = userObj ? userObj?._id : "";

    let obj = {
      userId,
      email,
      mobile,
      name: firstName +" " +lastName,
      guestArr: adultArr,
      hotelId,
      roomId: roomId ? roomId : "0",
      subtotalPrice,
      discount,
      grandTotal,
      startDate,
      endDate,
      gst,
      adult,
      child,
      startDate,
      endDate,
      nights: totalNight,
      paymentMethod,
    };
    handleCheckout(obj);
  };

  const handleCheckout = async (obj) => {
    try {
      let res = "";
      res = await handlecreateGuestOrder(obj);

      if (res?.data?.success) {
        if (paymentMethod == "phonepe") {
          console.log(res?.data?.data, "asasdfafsasdfs");
          if (res?.data?.data && res?.data?.data.instrumentResponse) {
            let instrumentResponse = res?.data?.data?.instrumentResponse;
            if (instrumentResponse?.redirectInfo) {
              window.location.href = instrumentResponse?.redirectInfo.url;
              return 0;
            }
          }
          errorToast(
            "`Phonepe is not working.Please Try Some another Payment Method"
          );
          return 0;
        } else {
          displayRazorpay(res.data.data, res.data.orderId);
        }
      } else {
        errorToast(res);
      }
    } catch (error) {
      // console.error(error);
      errorToast(error);
    }
  };

  const handlecreateGuestOrder = async (obj) => {
    try {
      // console.log(obj,"obj124123")
      const res = await createGuestOrder(obj);
      return res;
    } catch (error) {
      // console.error(error);
      errorToast(error);
    }

  }
  const handleApplyCoupon = async () => {
    try {

      if(`${code}` == ''){
        errorToast("Please Fill Code ")
        return
      }

      let obj = {
        discountCode:code,
        amount :price
      }

      let { data: res } = await ApplyCouponApi(obj)
      // console.log(res, "cart")
      if (res.data) {
      // console.log(res.data, "cart")
        if(res.data){
          setDiscount({
            code:res.data?.discountCode,
            amount:res.data?.amount,
            discoutAmount:res.data?.discoutAmount,
          })
          setsubtotalPrice(res.data?.discoutAmount);
          localStorage.setItem('cart-discount', JSON.stringify({
            code:res.data?.discountCode,
            amount:res.data?.amount,
            discoutAmount:res.data?.discoutAmount,
          }))

        } else {
          setDiscount(null)
          localStorage.setItem('cart-discount', null)
        }
        if (res.message) {
          successToast(res.message)
        }
      
        return
    }
   
  } catch (err) {
    errorToast(err)
  }
  }

  function loadScript(src) {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  }
  async function displayRazorpay(obj, orderId) {
    //  console.log(obj,"obj, =-=", orderId,"-=-= orderId")
    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );

    if (!res) {
      alert("Razorpay SDK failed to load. Are you online?");
      return;
    }

    const options = {
      key: "rzp_live_lNmAu9zX0OX2eZ", // Enter the Key ID generated from the Dashboard
      // key: "rzp_test_jOl57g4TNamtFW", // Enter the Key ID generated from the Dashboard
      amount: obj.amount,
      currency: obj.currency,
      name: "SundaysForever",
      description: "Booking",
      // image: { logo },
      order_id: obj.id,
      handler: async function (response) {
        const data = {
          orderCreationId: obj.id,
          razorpayPaymentId: response.razorpay_payment_id,
          razorpayOrderId: response.razorpay_order_id,
          razorpaySignature: response.razorpay_signature,
        };

        const serialize = function (obj) {
          var str = [];
          for (var p in obj)
            if (obj.hasOwnProperty(p)) {
              str.push(
                encodeURIComponent(p) + "=" + encodeURIComponent(obj[p])
              );
            }
          return str.join("&");
        };
        setLoading(true);
        let { data: res } = await orderCallback(serialize(obj), orderId);
        if (res) {
          successToast(res.message);
          setSearchObj({
            location: "All",
            collection: "",
            type: "",
            startDate: "",
            endDate: "",
            name: "All",
          });
          setLoading(false);

          addLocalSearch("");
          navigate(`/OrderComplete/${res.orderId}`);
        }
      },

      theme: {
        color: "#ddbe70",
      },
    };
    // console.log(options,"opt2ions----")
    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  }
  return (
    <main>
      <div className="checktoupagemain mt-5">
        <div className="container-fluid">
          <div className="row reviwheading">
            <h2>Review Your Booking</h2>
            <p>INFORMATION</p>
          </div>
          <div className="row gx-5">
            <div className="col-lg-8">
              <div className="row gx-0 boxcehckout mb-20">
                <div className="col-lg-4">
                  <div className="imgchedkoutleft">
                    <img
                      src={generateImageUrl(hotelObj?.mainImage)}
                      alt=""
                      className="img-fluid"
                    />
                  </div>
                </div>
                <div className="col-lg-8">
                  <div className="content_cartcekcgout">
                    <Link
                      to="#"
                      className="btn btn-brown no-hover brown-bg text-white btn-sm"
                    >
                      {hotelObj?.hotelType}
                    </Link>
                    <h2>{hotelObj?.name}</h2>
                    <p>
                      <RiMapPinRangeFill /> {hotelObj?.locationObj?.name}
                    </p>
                    <div className="detailschekinout">
                      <div className="checkinsection">
                        <p>CHECK IN</p>
                        <h5>{moment(startDate).format("DD MMMM  YYYY")}</h5>
                        {/* <p>Saturday, 3 PM</p> */}
                      </div>
                      <div className="checkinmidelsection">
                        <p>{totalNight} Night</p>
                      </div>
                      <div className="checkoutsection">
                        <p>CHECK OUT</p>
                        <h5>{moment(endDate).format("DD MMMM  YYYY")}</h5>
                        {/* <p>Sunday, 12 PM</p> */}
                      </div>
                    </div>
                    <div className="listnighchekout">
                      <ul>
                        <li>{totalNight} Night</li>
                        <li>{adult} Adult </li>
                        {child > 0 && <li>{child} Child </li>}

                        {/* <li>1 Room</li> */}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              {/* <div className='roomtwinsection shadwocheckout mb-20'>
                        <div className='row'>
                            <div className='col-lg-12'>
                            </div>
                            <div className='col-lg-12'>
                                <h2>Deluxe Twin Room</h2>
                                <p className='adtule'>2 Adults</p>

                                <div className='inforoome'>
                                    <ul>
                                        <li>Free Breakfast</li>
                                        <li>Flexible rate BB DSB2C</li>
                                        <li><HiOutlineCheckCircle />  Free Cancellation till 4 hrs before check in <span> Cancellation policy details </span></li>
                                    </ul>
                                    <div className='refundlistinfo'>
                                        <ul>
                                            <li>Now</li>
                                            <li className='lineuder'>100% Refund</li>
                                            <li>18 Feb 2022</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                  </div> */}
              <div className="hotal_card mb-20">
                <div className="card">
                  <h5 className="card-header">Important information</h5>
                  <div className="card-body hotalrules">
                    {hotelObj &&
                      hotelObj?.propertyRules &&
                      hotelObj?.propertyRules?.length > 0 &&
                      hotelObj?.propertyRules.map((rule) => (
                        <>
                          {" "}
                          <h6 className="card-title">{rule.heading}</h6>
                          {rule?.rulesArr && rule?.rulesArr?.length > 0 && (
                            <ul>
                              {rule?.rulesArr.map((ru) => (
                                <li>{ru.name}</li>
                              ))}
                            </ul>
                          )}
                        </>
                      ))}
                  </div>
                </div>
              </div>
              <div className="hotal_card mb-20">
                <div className="card">
                  <h5 className="card-header">Guest Details</h5>
                  <div className="card-body">
                    <div className="row label_text">
                    <div className="col-lg-6 col-sm-6">
                        <div className="mb-3">
                                    <label>First Name </label>
                                    <div className="input-group">
                                      <input
                                        type="text"
                                        className="form-control"
                                        placeholder="First Name "
                                        value={firstName}
                                        onChange={(e) =>
                                       setFirstName(e.target.value)
                                        }
                                      />
                                    </div>
                                  </div>
                      </div>
                      <div className="col-lg-6 col-sm-6">
                      <div className="mb-3">
                                <label>Last Name </label>
                                <input
                                  type="text"
                                  className="form-control input-group"
                                  placeholder="Last Name "
                                  value={lastName}
                                  onChange={(e) =>
                                    setLastName(e.target.value)
                                  }
                                />
                              </div>
                      </div>
                      <div className="col-lg-6 col-sm-6">
                        <div className="mb-3">
                          <label>Mobile Number </label>
                          <div className="input-group">
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Mobile Number"
                              value={mobile}
                              onChange={(e) => setMobile(e.target.value)}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-6 col-sm-6">
                        <div className="mb-3 ">
                          <label>Email Address </label>
                          <input
                            type="text"
                            className="form-control input-group"
                            placeholder="Email Address"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-lg-6">
                        Adult Information {adultArr?.length}
                      </div>
                      <div className="col-lg-6 text-end">
                        <p
                          onClick={() => handleMultipleAdultAdd()}
                          className="btn btn-brown no-hover brown-bg text-white btn-sm"
                        >
                          {" "}
                          <AiOutlinePlus /> Adult{" "}
                        </p>
                      </div>
                    </div>

                    {adultArr &&
                      adultArr.map((guest, inde) => (
                        <>
                          <div className="row label_text">
                            <div className="col-lg-4 col-sm-4 col-md-4">
                              <div className="mb-3">
                                <label>Guest </label>
                                <Select
                                  options={guestoptions}
                                  defaultValue={guestoptions[0]}
                                  value={guestoptions.find(
                                    (el) => el.value == guest.guesttype
                                  )}
                                  onChange={(e) =>
                                    handleSetMultipleAdultType(e.value, inde)
                                  }
                                />
                              </div>
                            </div>
                            <div className="col-lg-4 col-sm-4 col-md-4">
                              <div className="mb-3">
                                <label>First Name </label>
                                <div className="input-group">
                                  <input
                                    type="text"
                                    className="form-control"
                                    placeholder="First Name "
                                    value={guest.firstName}
                                    onChange={(e) =>
                                      handleSetMultipleAdultFirstName(
                                        e.target.value,
                                        inde
                                      )
                                    }
                                  />
                                </div>
                              </div>
                            </div>
                            <div className="col-lg-4 col-sm-4 col-md-4">
                              <div className="mb-3">
                                <label>Last Name </label>
                                <input
                                  type="text"
                                  className="form-control input-group"
                                  placeholder="Last Name "
                                  value={guest.lastName}
                                  onChange={(e) =>
                                    handleSetMultipleAdultLastName(
                                      e.target.value,
                                      inde
                                    )
                                  }
                                />
                              </div>
                            </div>
                          </div>
                        </>
                      ))}

                    <div className="row label_text">
                      {/* <div className='col-lg-12'>
                                <p className='d-flex align-items-center text-black'> <Form.Check type="checkbox" className='me-1' /> Enter GST Details <span className='textsmall'> (Optional) </span></p>
                            </div> */}
                      {userObj == "" && (
                        <>
                          <div className="col-lg-12 text-center">
                            <p>
                              Login to prefill traveller details and get access
                              to secret deals
                            </p>
                          </div>
                          <div className="col-lg-12 text-center">
                            <button className="btn btn-brown no-hover brown-bg text-white btn-lg">
                              Login
                            </button>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </div>
                </div>
                </div>
                <div className='col-lg-4'>
                <div className='hotal_card'>
                  <div className="card  mb-20">
                    <h5 className="card-header">Your Reservation</h5>
                    <div className="card-body">
                        {
                          roomArr && roomArr?.length > 0 && roomArr.map((rom) => (
                        <div className='resevation_secrion d-flex justify-content-between align-items-center'>
                                <h6>{moment(rom.availableDate).format('DD MMMM YYYY')} </h6>

                              {/* <div className='leftrromdtails'>
                                <h6>{moment(rom.availableDate).format('DD MMMM YYYY')} : ₹  {rom.price}</h6>
                            </div>  */}
                          <div className='pricerromd'>
                                 <h6> ₹  {rom.price}</h6>
                             </div>
                          
                        </div>

                            ))
                        }
                        {
                           extraadult > 0 && (
                          <>

                              <div className='resevation_secrion d-flex justify-content-between align-items-center'>

                           Extra Adult:₹2000*{totalNight} nights*{extraadult} adult
                          <div className='pricerromd'>
                            <h6>₹ {
                            extraArr && extraArr[0]?.extra
                          }
                          </h6>
                             </div>
                          
                        </div>

                        {
                          child > 0 && (
                             <div className='resevation_secrion d-flex justify-content-between align-items-center'>

                         Child  :₹1200*{totalNight} nights*{child} child
                          <div className='pricerromd'>
                            <h6>₹ {
                            parseInt(totalNight)*parseInt(child)*1200
                          }
                          </h6>
                             </div>
                          
                        </div>
                            )
                        }
                       

                        </>

                            )
                        }
                        
                       {
                          extrachild > 0 && (

                              <div className='resevation_secrion d-flex justify-content-between align-items-center'>

                           Extra Child:₹ 1200*{totalNight} nights*{extrachild} child
                          <div className='pricerromd'>
                         <h6>₹ {
                            extraArr && extraArr[1]?.extra
                          }
                          </h6>
                             </div>
                          
                        </div>
                            )
                        }
                        
                        {/* <div className='resevation_secrion d-flex justify-content-between align-items-center'>
                           
                                                        <div className='leftrromdtails'>
                                <h4>{name}</h4>
                                <h6>{adult} Adults, {child > 0 ? child + ' Children ,':' Child'} {totalNight} Night</h6>
                            </div>
                            <div className='pricerrom'>
                                <p>₹ {price}</p>
                            </div>
                        </div>*/}
                       
                        <hr />
                      
                        <div className='btn_pay text-center mt-3'>
                        <ul className="info">
                      
                    
                    { discount && discount?.amount > 0 && (
                      <div className="discount-a d-flex justify-content-between align-items-center mt-3">
                        <p className="discountext">Discounts</p>
                        <p className="gren_price">- ₹ {discount?.amount}</p>
                      </div>
                    )}

                    <div className="discount-a d-flex justify-content-between align-items-center mt-3">
                      <p>Sub total</p>
                      <p>₹ {subtotalPrice}</p>
                    </div>
                    {gst.tax > 0 && (
                      <div className="discount-a d-flex justify-content-between align-items-center mt-3">
                        <p>Tax ( {gst.tax}% )</p>
                        <p className="texttex">₹ {gst.amount}</p>
                      </div>
                    )}
                    {grandTotal > 0 && (
                      <div className="discount-a totalnt d-flex justify-content-between align-items-center mt-3">
                        <h6>Total</h6>
                        <h6>₹ {grandTotal}</h6>
                      </div>
                    )}

                    <div className="btn_pay text-center mt-3">
                      <ul className="info paymentphonepay">
                        <li className="my-2">
                          <div className="form-check">
                            <label className="pointer">
                              <input
                                className="form-check-input"
                                type="radio"
                                name="payment-method"
                                onClick={() => setPaymentMethod("phonepe")}
                                checked={paymentMethod == "phonepe"}
                              />

                              <img src={images.phonepe_logo} width="100px" />
                            </label>
                          </div>
                        </li>
                        <li className="my-2">
                          <div className="form-check">
                            <label className="form-check-label">
                              <input
                                className="form-check-input"
                                type="radio"
                                name="payment-method"
                                onClick={() => setPaymentMethod("Razorpay")}
                                checked={paymentMethod == "Razorpay"}
                              />

                              <img src={images.razorpay_logo} width="100px" />
                            </label>
                          </div>
                        </li>
                      </ul>
                      {loading == true ? (
                        <button type="button" className="btn btn-pay">
                          Please Wait
                        </button>
                      ) : (
                        <button
                          type="button"
                          onClick={() => {
                            handleOrder();
                          }}
                          className="btn btn-pay"
                        >
                          Pay & Confirm Reservation
                        </button>
                      )}
                    </div>
                  </ul>
                  </div>
                 
                  
                  <div className='coupondode  mb-20'>
                    <h3>Apply Coupon {}</h3>
                    <div className='coponboxechk d-flex'>
                        {/* <div className='copuonchkec me-4'>
                            <input type="radio" checked />
                        </div> */}
                        <div className='bordercopn_number'>
                            {/* <div className='inpoutborder'>
                            <h5>DEALOFTHEDAYCB</h5>
                            <p>Cashback of INR 594 will be credited to your card within 3 days of booking</p>
                            <h6>Deal expires in: <span> 17h : 53m : 14s </span></h6>
                            </div>
                            <div className='giftxardbrd'>
                                <p>Gift cards may be applied in next step</p>
                            </div> */}
                            <div className='input-group couponentercode'>
                                <input type="text" className='form-control' placeholder='Have a coupon code' value={code} onChange={(e)=>setCode(e.target.value)} />
                                <BsFillArrowRightCircleFill className='iarrowicon'  onClick={()=>handleApplyCoupon()} />
                            </div>
                        </div>
                    </div>

                  </div>

              <div className="hotal_card">
                <div className="card">
                  <h5 className="card-header">Why SignUp or Login</h5>
                  <div className="card-body list-check">
                    <ul>
                      <li>
                        <HiOutlineCheckCircle /> Get access to Secret Deals
                      </li>
                      <li>
                        <HiOutlineCheckCircle /> Book Faster - we’ll save &
                        pre-enter your details
                      </li>
                      <li>
                        <HiOutlineCheckCircle /> Manage your bookings from one
                        place
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
      </div>
      
    </main>
  );
};

export default Checkout;
