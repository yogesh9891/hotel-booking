import { useContext, useEffect, useMemo, useState } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import PagesToBeExempt from "../utils/PagesToBeExempt";
import { About } from "./About";
import Login from "./Auth/Login";
import Barlowscottage from "./Barlowscottage";
import BlogDetail from "./BlogDetail";
import Blogs from "./Blogs";
import CancellationPolicy from "./CancellationPolicy";
import Contact from "./Contact";
import Faq from "./Faq";
import Forpropertyowners from "./Forpropertyowners";
import Gallery from "./Gallery";
import Hilltopcottage from "./Hilltopcottage";
import Hotels from "./Hotels";
import Index from "./Index";
import Itinerary from "./Itinerary";
import Kingscottage from "./Kingscottage";
import Offers from "./Offers";
import Footer from "./particle/Footer";
import Header from "./particle/Header";
import PrivacyPolicy from "./PrivacyPolicy";
import PropertyListing from "./PropertyListing";
import PropertyListingForm from "./PropertyListingForm";
import Readerscottage from "./Readerscottage";
import Terms from "./Terms";
import Thistlehouse from "./Thistlehouse";
import Whitehill from "./Whitehill";
// import Blogs from "./Blogs";
// import BlogDetail from "./BlogDetail";
// import Hotels from "./Hotels";
// import Login from "./Auth/Login";
// import Contact from "./Contact";
// import Forpropertyowners from "./Forpropertyowners";
// import PropertyListing from "./PropertyListing";
// import Gallery from "./Gallery";
// import Offers from "./Offers";
// import Faq from "./Faq";
// import CancellationPolicy from "./CancellationPolicy";
// import PrivacyPolicy from "./PrivacyPolicy";
// import Terms from "./Terms";
import Checkout from "./Auth/Checkout";
import Testimonials from "./Testimonials";
import UserDashboard from "./UserDashboard";
import Error from "./Error";
import Booking from "./Booking";
import OldBlogDetail from "./OldBlogDetail";
import { AuthoriseContext, axiosApiInstance } from "../App";
import { getDecodedToken, getToken, refreshToken, removeToken, setToken } from "../service/user.service";
import axios from "axios";
import OrderComplete from "./OrderComplete";
import Payment from "./Payment";
// import Login from "./Aut h/Login";
export const Root = () => {
  const [hideHeader, setHideHeader] = useState(false);
  const [isAuthorized, setIsAuthorized] = useContext(AuthoriseContext);
  const navigate = useNavigate();


  const CheckIsAuthorised = async () => {
    let token = getToken();
    if (token) {
      setIsAuthorized(true);
    } else {
      setIsAuthorized(false);
    }
  };


  useEffect(() => {
    CheckIsAuthorised();
  }, [isAuthorized]);


  let location = useLocation();
  useEffect(() => {
    // console.log(location.pathname);
    if (
      PagesToBeExempt.some(
        (el) => el === location.pathname && location.pathname !== "/"
      )
    ) {
      setHideHeader(true);
    } else {
      setHideHeader(false);
    }

    // console.log(location, "hiuhi");
    // console.log(PagesToBeExempt, "PagesToBeExempt");
  }, [location]);


  useMemo(() => {
    let token = getToken();
    // console.log(token, "token");
    axiosApiInstance.interceptors.request.use(
      async (config) => {
        // console.log(token)
        if (token) {
          config.headers["authorization"] = "Bearer " + token;
        }
        // config.headers['Content-Type'] = 'application/json';
        return config;
      },
      (error) => {
        console.log(error);
        Promise.reject(error);
      }
    );
    axiosApiInstance.interceptors.response.use(
      (res) => {
        // Add configurations here
        return res;
      },
      async (err) => {
        // console.log("INterceptor error");
          let {config,response} = err;
          if(response && response.status == 401){
            if(!token){
              // errorToast("Please Login ")
              // navigate("/login")
            } 
              let decode = getDecodedToken();

                let refreshTokenResponse = await refreshToken(decode);
                if(refreshTokenResponse.data && refreshTokenResponse.data.success){
                    let refreshToken = refreshTokenResponse.data.token;
                    await  setToken(refreshToken);
                    await  new Promise(resolve => {
                      config.headers["authorization"] = "Bearer " + refreshToken;
                      // console.log(config,"configconfigconfig")
                        resolve(axios(config))
                      })
                }

              // console.log(refreshTokenResponse,"responseerror")
          }
        // logoutUser()

        return Promise.reject(err);
      }
    );
  }, [isAuthorized]);

  useEffect(() => {
    // console.log(hideHeader, "hideHeader");
  }, [hideHeader]);
  return (
    <>
      {!hideHeader && <Header />}
      <Routes>

        {
          isAuthorized == true && (
            <>
                    <Route path="/UserDashboard" element={<UserDashboard />}></Route>
                    <Route path="/Booking/:id" element={<Booking />}></Route>       
            </>
          )
        }
        <Route path="/" element={<Index />} />
        <Route path="/for-property-owners" element={<Forpropertyowners />} />
        <Route path="/about-us" element={<About />} />
        <Route path="/Itinerary" element={<Itinerary />} />
        <Route path="/Kingscottage" element={<Kingscottage />} />
        <Route path="/property/:slug" element={<Itinerary />} />
        <Route path="/Hilltopcottage" element={<Hilltopcottage />} />
        <Route path="/Barlowscottage" element={<Barlowscottage />} />
        <Route path="/Readerscottage" element={<Readerscottage />} />
        <Route path="/Thistlehouse" element={<Thistlehouse />} />
        <Route path="/Whitehill" element={<Whitehill />}></Route>
        <Route path="/Blogs" element={<Blogs />}></Route>
        {/* <Route path="/BlogDetail" element={<BlogDetail />}></Route> */}
        <Route path="/BlogDetail/:slug" element={<OldBlogDetail />}></Route>
        <Route path="/blog/:slug" element={<BlogDetail />}></Route>
        <Route path="/properties" element={<Hotels />}></Route>
        <Route path="/our-hotels" element={<Hotels />}></Route>
        <Route path="/location/:slug" element={<Hotels />}></Route>
        <Route path="/collection/:slug" element={<Hotels />}></Route>
        <Route path="/our-homestays" element={<Hotels />}></Route>
        <Route path="/PropertyListingForm" element={<PropertyListingForm />}></Route>
        <Route path="/PropertyListing" element={<PropertyListing />}></Route>
        <Route path="/Login" element={<Login />}></Route>
        <Route path="/Contact" element={<Contact />}></Route>
        <Route path="/Gallery" element={<Gallery />}></Route>
        <Route path="/Offers" element={<Offers />}></Route>
        <Route path="/Faq" element={<Faq />}></Route>
        <Route path="/Cancellation-Policy" element={<CancellationPolicy />}></Route>
        <Route path="/Terms" element={<Terms />}></Route>
        <Route path="/Privacy-Policy" element={<PrivacyPolicy />}></Route>
        <Route path="/Checkout" element={<Checkout />}></Route>
        <Route path="/Testimonials" element={<Testimonials />}></Route>
        <Route path="/OrderComplete/:id" element={<OrderComplete />}></Route>
        <Route path="/Payment/:id" element={<Payment />}></Route>

        <Route path="*" element={<Error />}></Route>
      </Routes>
      {!hideHeader && <Footer />}
    </>
  );
};
