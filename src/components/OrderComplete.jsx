import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

function OrderComplete() {
  const params = useParams();

  const [orderId, setOrderId] = useState("");

  useEffect(() => {
  if(params.id){
    setOrderId(params.id)
  }
  }, [])
  
  return (

    <main>
      <section className="ptb-50 order-complete">
        <div className="container">
          <div className="row text-center my-5">
            <div className="col-12 col-md-8 col-lg-6 mx-auto">
              <h2>
                Your Booking has been received
                <span className="emoji" role="img">
                  🥳
                </span>
              </h2>
              {/* <img src={images.party} alt="" className="mt-4 mb-5" /> */}
              <h5>Thank you for your Booking!</h5>
              <p className=" my-5">
                Your Booking ID is&nbsp;:&nbsp;
                <span className="green fw-semibold">{orderId}</span>
              </p>
              <p>
                You will receive a booking confirmation email on registerd Email Id.
              </p>
              
            </div>
          </div>
        </div>
      </section>

    </main>
  );
}

export default OrderComplete;
