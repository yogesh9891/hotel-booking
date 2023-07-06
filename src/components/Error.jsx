import React from "react";
import { Link } from "react-router-dom";
import { images } from "./particle/Images";

function Error() {
  return (
    <main>
      <section className="error-page pt-40 pb-40 bg-img" style={{backgroundSize:'auto'}}>
        <div className="container text-center">
          <div>
            <img src={images.error} alt="" className="img-fluid img-contain" />
            <p className="text-dark col-12 col-lg-4 mx-auto fw-semibold my-4">
              Page doesn't exist or some other error occured. Go to our Home
              page or go back to Previous page
            </p>
          </div>
          <div>
            <Link to="/" className="btn btn-brown px-4 py-3">
              Back To Home
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Error;
