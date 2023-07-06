import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { getTestimonialApi } from "../service/home.service";
import { generateImageUrl } from "../service/url.service";
import { errorToast } from "../utils/toast";
import { images } from "./particle/Images";

function Testimonials() {
  const [testimnialArr, settestimnialArr] = useState([]);
  const handlegetTestimonial = async (query) => {
    try {
      let { data: res } = await getTestimonialApi(query);
      console.log(res.data, "handlegetTestimonial");
      if (res.data) {
        settestimnialArr(res.data);
      }
    } catch (error) {
      console.error(error);
      errorToast(error);
    }
  };

  useEffect(() => {
    handlegetTestimonial();
  }, []);

  return (
    <main className="pt-5 bg-img5">
      <section className="pb-40 mb-40 home-testimonial testimonial-page">
        <div className="container-fluid">
          <div className="title_header text-center col-12 col-lg-10 mx-auto mb-5">
            <h2 className="mb-3">
              Guest <span className="brown">Testimonials </span>
            </h2>
            <p>
              Escape to comfort, without breaking the bank. Discover amazing
              deals on home stays with our exclusive coupons.
            </p>
            <h6 className="fw-semibold">You will get addicted to us !</h6>
          </div>
          <div className="row gy-4">
            {testimnialArr &&
              testimnialArr.map((testimonial, i) => (
                <div className="col-12 col-md-4" key={i}>
                  <div className={`box bg`}>
                    <div>
                      <div className="overflow-hidden image">
                        <Link to="/BlogDetail">
                        {
                        testimonial.imageUrl !="" ? (  <img
                          src={generateImageUrl(testimonial.imageUrl)}
                          alt=""
                          className="img-fluid"
                        />) : (  <img
                          src={images.logo}
                          alt=""
                          className="img-fluid"
                        />)
                      }
                        </Link>
                      </div>
                      <div className="desp">
                        <p>{testimonial.comment}</p>
                      </div>
                    </div>
                    </div>
                    </div>
                  ))}
          
          </div>
        </div>
      </section>
    </main>
  );
}

export default Testimonials;
