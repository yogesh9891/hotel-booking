import React, { useState } from "react";
import { useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade, Navigation, Pagination } from "swiper";
import { images } from "../particle/Images";
import { Link, useNavigate } from "react-router-dom";
import { loginApi, registerUserApi, setToken } from "../../service/user.service";
import { errorToast, successToast } from "../../utils/toast";
import { first } from "lodash";
import { Button } from "react-bootstrap";

function Login() {

  const navgation = useNavigate();



  const [steps, setSteps] = useState({
    type: "customer",
    isLogin: true,
  });

const [firstName, setFirstName] = useState("");
const [lastName, setLastName] = useState("");
const [email, setEmail] = useState("");
const [password, setPaswword] = useState("");
const [confirmPassword, setConfirmPassword] = useState("");
const [phone, setPhone] = useState("");


const handleLogin = async () => {

  try {

    const emailregex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    if(!email || !emailregex.test(email)){
      errorToast("Email is Invaild");
      return 0 ;
    }

    if(!password ||  password.length < 8){
      errorToast("Password is Invaild");
      return 0 ;
    }

      
    let obj ={
      email,
      password
    }
  let {data:res} = await loginApi(obj) ;
  if(res.success){
    successToast(res.message)
    setToken(res.token);
    window.location.href= "/UserDashboard"
  }

  } catch (error) {
    errorToast(error);
      console.error(error)
  } 

}

const handleRegister = async () => {
  
  try {
  let nameRegex = /^[a-zA-Z]{2,40}$/;

      if(!firstName || !nameRegex.test(firstName)){
        errorToast("First Name is Invaild");
        return 0 ;
      }

      if( !lastName ||  !nameRegex.test(lastName)){
        errorToast("Last Name is Invaild");
        return 0 ;
      }

      const emailregex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
      if(!email || !emailregex.test(email)){
        errorToast("Email is Invaild");
        return 0 ;
      }
      if(!phone ||  phone.length != 10){
        errorToast("Phone is Invaild");
        return 0 ;
      }

      if(!password ||  password.length < 8){
        errorToast("Password is Invaild");
        return 0 ;
      }

      if(!password || password != confirmPassword){
        errorToast("Confirm Password mismatch");
        return 0 ;
      }
      
      let obj ={
        firstName,
        lastName,
        email,
        phone,
        password
      }

  let {data:res} = await registerUserApi(obj) ;

  if(res.success){
    successToast(res.message);
    setSteps({
      type: "customer",
      isLogin: true,
   })
  }
} catch (error) {
    console.error(error)
    errorToast(error);
}
}


  return (
    <main>
      <section className="login-page bg-img" style={{ backgroundSize: "auto" }}>
        <div className="row mobile_reverse align-items-center">
          <div className="col-12 col-md-6">
            <div className="left">
              <Swiper
                slidesPerView={1}
                speed={2000}
                loop
                modules={[Autoplay, EffectFade]}
                effect="fade"
                autoplay={{ disableOnInteraction: false }}
              >
                <SwiperSlide>
                  <img src={images.Barlowscottage13} alt="" />
                </SwiperSlide>
                <SwiperSlide>
                  <img src={images.Barlowscottage14} alt="" />
                </SwiperSlide>
                <SwiperSlide>
                  <img src={images.Barlowscottage12} alt="" />
                </SwiperSlide>
              </Swiper>
            </div>
          </div>
          <div className="col-12 col-md-6">
            <div className="right">
              <div className="text-center mb-5">
                <Link to="/" className="main_logo">
                  <img src={images.logo} alt="" className="img-fluid" />
                </Link>
              </div>
              {steps.type === "customer" && steps.isLogin ? (
                <div className="inner">
                  <h4 className="fw-bold">LogIn as Customer</h4>
                  <p className="text-dark">
                    Don't have an account with us?{" "}
                    <span
                      className="brown fw-semibold pointer"
                      onClick={() =>
                        setSteps({ type: "customer", isLogin: false })
                      }
                    >
                      Register
                    </span>{" "}
                    to start booking your properties for a new adventure
                  </p>
                  <p className="text-dark">
                    If you are Home Owner?{" "}
                    <span
                      className="brown fw-semibold pointer"
                      onClick={() =>
                        setSteps({ type: "vender", isLogin: true })
                      }
                    >
                      LogIn as Home Owner
                    </span>{" "}
                    to set up the new property under that account.
                  </p>
                  <div className="row gy-3">
                    <div className="col-12">
                      <input
                        type="email"
                        placeholder="Your Email"
                        className="form-control"
                        value={email}
                        onChange={(e)=>setEmail(e.target.value)}
                      />
                    </div>
                    <div className="col-12">
                      <input
                        type="password"
                        placeholder="Your Password"
                        className="form-control"
                        value={password}
                        onChange={(e)=>setPaswword(e.target.value)}
                      />
                    </div>
                  </div>
                  <Button type="button" onClick={()=>handleLogin()} className="btn btn-brown w-100 rounded-0 no-hover brown-bg text-white mt-3 py-2">
                    Submit
                  </Button>
                </div>
              ) : steps.type === "customer" && !steps.isLogin ? (
                <div className="inner">
                  <h4 className="fw-bold">Register as Customer</h4>
                  <p className="text-dark">
                    Have an existing account with us?{" "}
                    <span
                      className="brown fw-semibold pointer"
                      onClick={() =>
                        setSteps({ type: "customer", isLogin: true })
                      }
                    >
                      LogIn
                    </span>{" "}
                    to set up the new property under that account.
                  </p>
                  <p className="text-dark">
                    Don't want to use your existing account? Use a different
                    email address below to create a new account. Please don't
                    use a shared email address.
                  </p>
                  <div className="row gy-3">
                    <div className="col-12 col-md-6">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="First Name"
                        value={firstName}
                        onChange={(e)=>setFirstName(e.target.value)}
                      />
                    </div>
                    <div className="col-12 col-md-6">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Last Name"
                        value={lastName}
                        onChange={(e)=>setLastName(e.target.value)}
                      />
                    </div>
                    <div className="col-12">
                      <div className="d-flex align-items-center gap-3">
                        {/* <select
                          className="form-select w-25"
                          placeholder="State"
                          aria-label="Default select example"
                        >
                          <option selected>+91</option>
                          <option value="1">One</option>
                          <option value="2">Two</option>
                          <option value="3">Three</option>
                        </select> */}
                        <input
                          type="text"
                          className="form-control flex-1"
                          placeholder="Phone no."
                          value={phone}
                          onChange={(e)=>setPhone(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="col-12">
                      <input
                        type="email"
                        className="form-control"
                        placeholder="Email"
                        value={email}
                        onChange={(e)=>setEmail(e.target.value)}
                      />
                    </div>
                    <div className="col-12">
                      <input
                        type="password"
                        className="form-control"
                        placeholder="Password"
                        value={password}
                        onChange={(e)=>setPaswword(e.target.value)}
                      />
                    </div>
                    <div className="col-12">
                      <input
                        type="password"
                        className="form-control"
                        placeholder="Comfirm Password"
                        value={confirmPassword}
                        onChange={(e)=>setConfirmPassword(e.target.value)}
                      />
                    </div>
                  </div>
                  <button type="button" onClick={()=>handleRegister()} className="btn btn-brown w-100 rounded-0 no-hover brown-bg text-white mt-3 py-2">
                    Submit
                  </button>
                </div>
              ) : steps.type === "vender" && steps.isLogin ? (
                <div className="inner">
                  <h4 className="fw-bold">Login as Home Owner</h4>
                  <p className="text-dark">
                    If you are customer?{" "}
                    <span
                      className="brown fw-semibold pointer"
                      onClick={() =>
                        setSteps({ type: "customer", isLogin: true })
                      }
                    >
                      LogIn as customer
                    </span>{" "}
                    to book your property under that account.
                  </p>
                  <p className="text-dark">
                    Check your email to get login credentials. Contact{" "}
                    <a
                      href="mailto:Contact@sundaysforever.com"
                      className="brown fw-semibold"
                      target='_blank'
                    >
                      Admin
                    </a>{" "}
                    if you haven't received any credentials
                  </p>
                  <div className="row gy-3">
                    <div className="col-12">
                      <input
                        type="email"
                        placeholder="Your Email"
                        className="form-control"
                      />
                    </div>
                    <div className="col-12">
                      <input
                        type="password"
                        placeholder="Your Password"
                        className="form-control"
                      />
                    </div>
                  </div>
                  <button className="btn btn-brown w-100 rounded-0 no-hover brown-bg text-white mt-3 py-2">
                    Submit
                  </button>
                </div>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Login;
