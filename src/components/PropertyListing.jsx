import React from "react";
import { images } from "./particle/Images";
import PageBanner from "./particle/PageBanner";
import Accordion from "react-bootstrap/Accordion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper";
import porpety_img from "../assets/img/bad_img.jpg";
import { Link } from "react-router-dom";
import NewsLetter from "./particle/NewsLetter";

function PropertyListing() {
  return (
    <main className="border-top pt-4 bg-img">
      <PageBanner
        title="Why you should list your property with Sunday Forever"
        text="Are you a property owner? List your vacation home with Sunday Forever, the world’s most exciting luxury villa rental website, and you’ll enjoy a raft of exclusive benefits."
        img={images.Barlowscottage17}
        cols="col-lg-6"
        className="listing-banner hiddenp hideps-5 mobilsmalltext"
      >
        <Link
          to="/PropertyListingForm"
          className="btn btn-brown btn-lg rounded btn-smallmobile"
        >
          List Your Property
        </Link>
      </PageBanner>

      <section className="padding40">
        <div className="container">
          <div className="row">
            <div className="col-12 col-md-4">
              <div className="text-center">
                <h1 className="green fw-semibold">50+</h1>
                <p className="mb-0">Handpic Hotels and Homes Styles</p>
              </div>
            </div>
            <div className="col-12 col-md-4">
              <div className="text-center">
                <h1 className="green fw-semibold">1000+</h1>
                <p className="mb-0">
                Happy Guest
                </p>
              </div>
            </div>
            <div className="col-12 col-md-4">
              <div className="text-center">
                <h1 className="green fw-semibold">45%</h1>
                <p className="mb-0">Net Margin to Villa Owner</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="pb-40 listing-about">
        <div className="container">
          <div className="row align-items-center justify-content-center">
            <div className="col-12 col-md-5">
              <div className="box">
                <img
                  src={images.Barlowscottage1}
                  alt=""
                  className="w-100 img-cover rounded-3"
                />
              </div>
            </div>
            <div className="col-12 col-md-5">
              <div className="box">
                <ul className="list-circle">
                  <li>
                    We know luxury. We know hospitality. And we know how to
                    combine the two to create unique experiences for travelers
                    and homeowners alike.
                  </li>
                  <li>
                    Only the best homes make it onto our list. We handpick every
                    home after stringently checking if it matches our high
                    standards. The ones that become SF homes are beautiful,
                    luxurious and impeccable, owned by business leaders,
                    celebrities and HNIs.
                  </li>
                  <li>
                    Join our network to turn your villa into a low-maintenance,
                    high-revenue, unique destination for the discerning
                    traveler.
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="pb-40">
        <div className="container">
          <div className="row">
            <div className="col-12 col-lg-3">
              <div className="listing-benefits bg">
                <h6>Effortless Maintenance</h6>
                <p className="mb-0">
                  The time and energy you spend on maintaining and servicing
                  your home will reduce. Considerably. We’ll oversee everything
                  with an eagle eye.
                </p>
              </div>
            </div>
            <div className="col-12 col-lg-3">
              <div className="listing-benefits bg">
                <h6>No Cost And 4X Revenue</h6>
                <p className="mb-0">
                  The money you spend on upkeep drops to zero, and by hosting
                  guests you’ll earn 4 times that amount in regular revenue.
                </p>
              </div>
            </div>
            <div className="col-12 col-lg-3">
              <div className="listing-benefits bg">
                <h6>Hassle-Free Hosting</h6>
                <p className="mb-0">
                  Letting guests into your home is now effortless, with the
                  SF team managing everything from customer management to
                  property management.
                </p>
              </div>
            </div>
            <div className="col-12 col-lg-3">
              <div className="listing-benefits bg">
                <h6>Exclusive Access</h6>
                <p className="mb-0">
                  Our network of SF homes across the country is yours to
                  explore. Travel luxe in our unique homes with special owner
                  discounts.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* <section className="padding40 bg mb-40">
        <div className="container">
          <div className="title_header mb-4">
            <h2>How We Deliver Our Core Promises</h2>
          </div>
          <ul className="list-benefits row justify-content-between">
            <li className="box col-auto text-center">
              <div className="icon mb-3">
                <img src={images.promise1} alt="" />
              </div>
              <p className="mb-0 text-dark fw-semibold">Simple Management Contract</p>
            </li>
            <li className="box col-auto text-center">
              <div className="icon mb-3">
                <img src={images.promise2} alt="" />
              </div>
              <p className="mb-0 text-dark fw-semibold">Technology First</p>
            </li>
            <li className="box col-auto text-center">
              <div className="icon mb-3">
                <img src={images.promise3} alt="" />
              </div>
              <p className="mb-0 text-dark fw-semibold">Quality Audits</p>
            </li>
            <li className="box col-auto text-center">
              <div className="icon mb-3">
                <img src={images.promise4} alt="" />
              </div>
              <p className="mb-0 text-dark fw-semibold">Training. Training. Training</p>
            </li>
            <li className="box col-auto text-center">
              <div className="icon mb-3">
                <img src={images.promise5} alt="" />
              </div>
              <p className="mb-0 text-dark fw-semibold">Operations & Maintenance</p>
            </li>
          </ul>
        </div>
      </section> */}

      <section className="pb-40">
        <div className="container">
          <div className="title_header mb-4">
            <h2>Our Core Proposition To Our Home Owners</h2>
          </div>
          <div className="row gy-4">
            <div className="col-12">
              <div className="home-blog listing-boxes">
                <div className="overflow-hidden image">
                  <img
                    src={images.Barlowscottage1}
                    alt=""
                    className="img-fluid"
                  />
                </div>
                <div className="content flex-1">
                  <h5 className="head">Maintain It</h5>
                  <h6>Keeping your home at 100%</h6>
                  <p>
                    We’ll help you ensure that your home’s maintenance needs, as
                    well as the day to day management with vendors and staff is
                    done on the clock, without any hassles.
                  </p>
                  <h6>Protecting you and your home</h6>
                  <p>
                    Your home is our home. We’ll ensure that we’ll guard it (and
                    you) against any damages caused by guests.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-12">
              <div className="home-blog listing-boxes reverse">
                <div className="overflow-hidden image">
                  <img
                    src={images.Barlowscottage11}
                    alt=""
                    className="img-fluid"
                  />
                </div>
                <div className="content flex-1">
                  <h5 className="head">Monitor It</h5>
                  <h6>End-to-end solutions</h6>
                  <p>
                    From incoming enquiries to booking coordination to guest
                    experiences to staff training and oversight, we’ve created a
                    seamless process to handle all customer and staffing
                    logistics.
                  </p>
                  <h6>Finding the right guests</h6>
                  <p>
                    We seek and find travelers and guests with tastes that match
                    yours. Every SF guest is a patron of the good life, and
                    is verified by us.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-12">
              <div className="home-blog listing-boxes">
                <div className="overflow-hidden image">
                  <img
                    src={images.Barlowscottage13}
                    alt=""
                    className="img-fluid"
                  />
                </div>
                <div className="content flex-1">
                  <h5 className="head">Market It</h5>
                  <h6>Making your home a destination</h6>
                  <p>
                    We market every SF home across different platforms to
                    reach an audience far and wide and reach those travelers who
                    are looking to make memories in your home.
                  </p>
                  <h6>Finding your guests</h6>
                  <p>
                    By listing your home on our site as well as other platforms
                    like Airbnb, GoIbibo, Agoda and Booking.com, we find you the
                    guests and optimise your home’s hosting schedule.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-12">
              <div className="home-blog listing-boxes reverse">
                <div className="overflow-hidden image">
                  <img
                    src={images.Barlowscottage18}
                    alt=""
                    className="img-fluid"
                  />
                </div>
                <div className="content flex-1">
                  <h5 className="head">Monetise It</h5>
                  <h6>Increase the value</h6>
                  <p>
                    Through design consultations and interior upgrades, we guide
                    you in getting the maximum value from your home.
                  </p>
                  <h6>Monetising your mansion</h6>
                  <p>
                    Through all our operations, your home goes from a prized
                    asset and place of comfort to a steady stream of passive
                    income.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="pb-40">
        <div className="container">
          <div className="title_header mb-4">
            <h2>Frequently asked questions</h2>
          </div>
          <Accordion defaultActiveKey="0" flush>
            <Accordion.Item eventKey="0">
              <Accordion.Header>Are You Worried About Your</Accordion.Header>
              <Accordion.Body>
                <ul className="list-circle">
                  <li>Your villa being idle for a long period of time?</li>
                  <li>Poor maintenance & upkeep of your villa?</li>
                  <li>
                    Never-ending troubles and expenses of owning your villa?
                  </li>
                  <li>Possible hassles of renting your villa to strangers?</li>
                  <li>The kind of people spending time in your villa?</li>
                </ul>
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="1">
              <Accordion.Header>Would You Like To Be Proud Of</Accordion.Header>
              <Accordion.Body>
                <ul className="list-circle">
                  <li>
                    Your villa being a part of India’s finest network of
                    vacation villas, estates
                  </li>
                  <li>
                    Hosting discerning families and marquee Guests in your villa
                  </li>
                  <li>
                    Your villa being recognized by celebrated travel/ lifestyle
                    publications and travellers
                  </li>
                  <li>Your villa getting the attention it deserves</li>
                  <li>
                    Being part of a curated community of like-minded, high
                    profile Home Owners
                  </li>
                </ul>
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="2">
              <Accordion.Header>While Being Happy About..</Accordion.Header>
              <Accordion.Body>
                <ul className="list-circle">
                  <li>
                    Your villa being made ‘guest ready’ from styling, hiring,
                    training and onboarding the home
                  </li>
                  <li>Your villa being maintained in a Mint Fresh condition</li>
                  <li>Your villa becoming an earning member of the family</li>
                  <li>35% plus Net Margins to you</li>
                  <li>Transparent Billing and Revenue Statements</li>
                  <li>On -time payouts</li>
                  <li>Revenue optimisation to meet seasons, trends</li>
                </ul>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </div>
      </section>

      <NewsLetter />
    </main>
  );
}

export default PropertyListing;
