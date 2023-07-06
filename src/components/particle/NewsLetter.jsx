import React from "react";
import { Link } from "react-router-dom";

function NewsLetter() {
  return (
    <section className="home-banner newsletter-2 mb-40">
      <div className="container">
        <div className="row align-items-center gx-lg-5">
          <div className="col-12 col-md-5">
            <h2 className="font-2 fw-bold">
              SF Loyalty Club : Member Benefits
            </h2>
            <p className="text-white">
              Sign up to the weekly travel newsletter for the latest posts, city
              guides, and the useful travel tips and secrets.
            </p>
          </div>
          <div className="col-12 col-md-7">
            <form>
              <div className="d-flex gap-3">
                <input
                  type="email"
                  placeholder="Your Email"
                  className="form-control flex-1 rounded shadow-none"
                />
                <Link to="#" className="btn btn-brown rounded">
                  Discover More
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default NewsLetter;
