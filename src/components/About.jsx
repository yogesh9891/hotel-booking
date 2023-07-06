import React, { useEffect, useState } from "react";
import { FaHandshake, FaHome, FaLeaf } from "react-icons/fa";
import { images } from "./particle/Images";
import PageBanner from "./particle/PageBanner";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper";
import { Link, useLocation, useSearchParams } from "react-router-dom";
import NewsLetter from "./particle/NewsLetter";

export const About = () => {
  const location = useLocation();
  let [searchParams, setSearchParams] = useSearchParams();
  useEffect(() => {
    if (location.search != "") {
      window.scrollTo(
        0,
        document.getElementById(searchParams.get("scrollTo")).offsetTop
      );
    }
  }, [location]);


  const locationSlider = {
    0: {
      slidesPerView: 1,
    },
    576: {
      slidesPerView: 3,
    },
    992: {
      slidesPerView: 5,
    },
    1200: {
      slidesPerView: 4,
    },
    1400: {
      slidesPerView: 4,
    },
  };
  return (
    <main>
      <PageBanner
        title="About Us"
        img={images.Barlowscottage14}
        cols="col-lg-6"
        nav
      />

      <section className="about-company padding40">
        <div className="container">
          <div className="row gx-lg-5 align-items-center">
            <div className="col-12 col-lg-6">
              <div className="left">
                <div className="title_header">
                  <p className="mb-0 fw-semibold text-dark">
                    Welcome to our company
                  </p>
                  <h1 className="fw-semibold brown">Our Story</h1>
                </div>
                <p>
                  At{" "}
                  <span className="brown fw-semibold">
                    SUNDAYS FOREVER STAYS
                  </span>
                  , we aim to create India’s most trusted and desirable brand of
                  Boutique Vacation Homes & Hotels.
                </p>
                <p>
                  We want our guests to get addicted to our hospitality and
                  service. The Sundays Forever reviews speak for themselves.
                  With an overwhelmingly high rate of return guests, we believe
                  in the age-old philosophy of ‘Atithi Devo Bhava’ : Guest is
                  God !
                </p>
                <p>
                  <span className="brown fw-semibold">
                    SUNDAYS FOREVER DESIGNS
                  </span>
                  , is our inhouse full-service interior design studio that does
                  magical makeovers for every budget. What started off as a
                  boutique design studio focusing on vacation homes, now has a
                  vast portfolio which includes homes, offices, schools, hotels,
                  heritage properties and much more.
                </p>
                <img
                  src={images.Barlowscottage15}
                  alt=""
                  className="w-100 img-cover"
                />
              </div>
            </div>
            <div className="col-12 col-lg-6">
              <div className="right">
                <img
                  src={images.abuottopimg2}
                  alt=""
                  className="h-100 w-100 img-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="why-us pb-40">
        <div className="container">
          <div className="title_header text-center mb-5">
            <p className="mb-0 fw-semibold brown">
              Top reasons to choose our homestay
            </p>
            <h2>Why choose us</h2>
          </div>
          <div className="row gx-0">
            <div className="col-12 col-md-4">
              <div className="box">
                <div className="icon green">
                  <FaLeaf />
                </div>
                <h4 className="font-2">Live Amidst Nature</h4>
                <p>
                  Feel and experience nature in its fullest glory to refresh
                  yourself.
                </p>
              </div>
            </div>
            <div className="col-12 col-md-4">
              <div className="box">
                <div className="icon green">
                  <FaHome />
                </div>
                <h4 className="font-2">Heritage Homestay</h4>
                <p>
                  Experience the charm of Kerala heritage that have been
                  preserved throughout the ages.
                </p>
              </div>
            </div>
            <div className="col-12 col-md-4">
              <div className="box border-0">
                <div className="icon green">
                  <FaHandshake />
                </div>
                <h4 className="font-2">Family Friendly</h4>
                <p>
                  The calm and comfortable environment will make your family
                  feel at home.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="padding40 our-director">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-12 col-lg-4">
              <div className="left text-center">
                <img src={images.founder} alt="" />
              </div>
            </div>
            <div className="col-12 col-lg-8">
              <div className="right">
                <img
                  src={images.favicon}
                  width="40"
                  alt=""
                  className="favicon img-contain h-auto mb-1"
                />
                <div className="title_header">
                  <h2 className="fw-semibold">Meet Our Founder</h2>
                </div>
                <p>
                  Priyanka has held multiple leadership roles: CEO Forbes India,
                  President Marketing at Network18, Chief Revenue & Marketing
                  Officer for the NDTV Group. Priyanka’s strength comes from her
                  vast marketing and leadership experience of over 22 years.
                </p>
                <p>
                  Priyanka was schooled at the Welham Girls’ School in Dehradun.
                  A student of Economics, she did her Advanced Management from
                  the Harvard Business School, Boston.
                </p>
                <p className="brown fw-semibold">- Priyanka Kaul, Founder</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="padding40" id="sf_design">
        <div className="container text-center">
          <div className="title_header text-center mb-4">
            <h2>
              Sundays Forever <span className="brown">Designs</span>
            </h2>
          </div>
          <p>
            We make homes that make you love them for their style and warmth.
          </p>
          <p>
            SF Designs is a full-service design studio that helps you create
            classic, luxurious spaces unburdened by steep prices. We are a
            one-stop shop that designs magical makeovers for all budgets, from
            concept to completion.
          </p>
          <p>If you are looking for a makeover …</p>
          <p>
            Write to us at :{" "}
            <a href="mailto:contact@sundaysforever.com" className="brown">
              contact@sundaysforever.com
            </a>
          </p>
          <div className="row">
            <div className="col-12 col-md-6">
              <img
                src={images.Barlowscottage14}
                className="w-100 img-cover"
                height="300"
                alt=""
              />
            </div>
            <div className="col-12 col-md-6">
              <img
                src={images.Barlowscottage18}
                className="w-100 img-cover"
                height="300"
                alt=""
              />
            </div>
          </div>
        </div>
      </section>

      <section className="pb-40">
        <div className="container">
          <div className="title_header text-center mb-4">
            <p className="mb-0 fw-semibold brown">Meet Our Team</p>
            <h2>Our Team</h2>
          </div>
          <Swiper
            spaceBetween={10}
            slidesPerView={4}
            modules={[Autoplay]}
            autoplay={{ disableOnInteraction: false }}
            speed={2000}
            breakpoints={locationSlider}
          >
            <SwiperSlide>
              <div className="our-team">
                <img src={images.founder} alt="" />
                <h5 className="mb-0">Priyanka Kaul</h5>
                <p className="mb-0 fw-semibold small brown">
                  Founder & CEO 
                </p>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="our-team">
                <img src={images.nitin} alt="" />
                <h5 className="mb-0">Nitin Bhambani</h5>
                <p className="mb-0 fw-semibold small brown">
                Co-Founder & CFO 
                </p>
              </div>
            </SwiperSlide>
            {/* <SwiperSlide>
              <div className="our-team">
                <img src={images.team3} alt="" />
                <h5 className="mb-0">Rajiv Chopra</h5>
                <p className="mb-0 fw-semibold small brown">
                  Director, Operations 
                </p>
              </div>
            </SwiperSlide> */}
            <SwiperSlide>
              <div className="our-team">
                <img src={images.team9} alt="" />
                <h5 className="mb-0">Edna Saraswat</h5>
                <p className="mb-0 fw-semibold small brown">
                Sr Manager Sales & Reservations 
                </p>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="our-team">
                <img src={images.team10} alt="" />
                <h5 className="mb-0">Akash Peter</h5>
                <p className="mb-0 fw-semibold small brown">
                Sr Manager, Operations 
                </p>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="our-team">
                <img src={images.team7} alt="" />
                <h5 className="mb-0">Ayushi Rai</h5>
                <p className="mb-0 fw-semibold small brown">
                Manager, Business Development & Interior Designer, Fay Designs 
                </p>
              </div>
            </SwiperSlide>
     
            <SwiperSlide>
              <div className="our-team">
                <img src={images.team5} alt="" />
                <h5 className="mb-0">Sandesh Panwar</h5>
                <p className="mb-0 fw-semibold small brown">
                  Manager, Operations 
                </p>
              </div>
            </SwiperSlide>
        
            <SwiperSlide>
              <div className="our-team">
                <img src={images.team12} alt="" />
                <h5 className="mb-0">Mujeeb ur Rehman</h5>
                <p className="mb-0 fw-semibold small brown">
                Financial Controller 
                </p>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="our-team">
                <img src={images.avatar_male} alt="" />
                <h5 className="mb-0">Ajay Tiwari</h5>
                <p className="mb-0 fw-semibold small brown">
                  Manager, Finance 
                </p>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="our-team">
                <img src={images.avatar_male} alt="" />
                <h5 className="mb-0">Devesh </h5>
                <p className="mb-0 fw-semibold small brown">
                Senior Consultant, Technology & Digital Marketing 
                </p>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="our-team">
                <img src={images.avatar_female} alt="" />
                <h5 className="mb-0">Vandana</h5>
                <p className="mb-0 fw-semibold small brown">
                Senior Consultant, Design, Technology & Digital Marketing 
                </p>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="our-team">
                <img src={images.avatar_male} alt="" />
                <h5 className="mb-0">Ishwinder Singh</h5>
                <p className="mb-0 fw-semibold small brown">
                Consultant, Business Development 
                </p>
              </div>
            </SwiperSlide>
          </Swiper>
        </div>
      </section>

      {/* <section className="pb-40">
        <div className="container">
          <div className="title_header text-center mb-5">
            <h2>
              Our <span className="brown">Journey</span>
            </h2>
          </div>
          <div className="row gy-4 align-items-center journey-row">
            <div className="col-12 col-md-6">
              <div className="journey-left our-journey">
                <h1 className="num brown">2023</h1>
                <h4>The Company Born</h4>
                <p>
                  Hyperlink InfoSystem was born in the year 2011 The company has
                  been kick-started by one great man Harnil Oza with the
                  exceptional passion & long vision.
                </p>
              </div>
            </div>
            <div className="col-12 col-md-6">
              <div className="journey-right our-journey">
                <h1 className="num brown">2022</h1>
                <h4>The Company Born</h4>
                <p>
                  Hyperlink InfoSystem was born in the year 2011 The company has
                  been kick-started by one great man Harnil Oza with the
                  exceptional passion & long vision.
                </p>
              </div>
            </div>
            <div className="col-12 col-md-6">
              <div className="journey-left our-journey">
                <h1 className="num brown">2021</h1>
                <h4>The Company Born</h4>
                <p>
                  Hyperlink InfoSystem was born in the year 2011 The company has
                  been kick-started by one great man Harnil Oza with the
                  exceptional passion & long vision.
                </p>
              </div>
            </div>
            <div className="col-12 col-md-6">
              <div className="journey-right our-journey">
                <h1 className="num brown">2020</h1>
                <h4>The Company Born</h4>
                <p>
                  Hyperlink InfoSystem was born in the year 2011 The company has
                  been kick-started by one great man Harnil Oza with the
                  exceptional passion & long vision.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section> */}

      <NewsLetter />
    </main>
  );
};
