import React, { useEffect, useState } from "react";
import { Accordion } from "react-bootstrap";
import { MdContentCopy } from "react-icons/md";
import { RiCoupon3Fill } from "react-icons/ri";
import { getFaqApi } from "../service/home.service";
import { errorToast } from "../utils/toast";
import { images } from "./particle/Images";

function Faq() {
  const [faqArr, setfaqArr] = useState([]);
  const handleFaqs = async () => {
    try {
      let { data: res } = await getFaqApi();
      if (res.data) {
        setfaqArr(res.data);
      }
    } catch (error) {
      console.error(error);
      errorToast(error);
    }
  };

  useEffect(() => {
    handleFaqs();
  }, []);

  return (
    <main className="border-top pt-5 bg-img3">
      <section className="pb-40 faq-page">
        <div className="container">
          <div className="title_header text-center col-12 col-lg-10 mx-auto mb-5">
            <h2 className="mb-3">
              Frequently Asked
              <span className="brown"> Questions</span>
            </h2>
            <p>
              Simplifying your search for information. Get quick and accurate
              answers with our comprehensive FAQ section
            </p>
          </div>
          <Accordion defaultActiveKey="0" flush>
            {faqArr &&
              faqArr.map((faq, index) => (
                <Accordion.Item eventKey={`${index}`} key={index}>
                  <Accordion.Header>{faq.question}</Accordion.Header>
                  <Accordion.Body>
                    <p>{faq.answer}</p>
                  </Accordion.Body>
                </Accordion.Item>
              ))}

            {/* <Accordion.Item eventKey="1">
              <Accordion.Header>
                Where can you find Sundays Forever? 
              </Accordion.Header>
              <Accordion.Body>
                <p>
                  At Sundays Forever, we believe that everyone deserves a
                  beautiful and comfortable stay, no matter where they go.
                  That's why we've expanded our services to some of the most
                  breathtaking cities in India. If you're planning a trip to
                  Mussoorie, Bhimtal, Goa, Dehradun, Shimla, Chail, Jaipur, or
                  Ajmer, then you can count on us to provide you with the best
                  possible stay. Whether you're looking for a cozy room or a
                  luxurious suite, we have you covered. So, why wait? Book your
                  stay with Sundays Forever today and experience the beauty of
                  these cities like never before!
                </p>
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="3">
              <Accordion.Header>
                How can I book a stay at Sundays Forever?
              </Accordion.Header>
              <Accordion.Body>
                <p>
                  Guests can book a stay at Sundays Forever through the
                  company's website or by contacting the reservations team
                  directly. On the website, guests can browse available
                  properties, view property details and photos, and book a stay
                  online. The reservations team is also available to assist with
                  any questions and to help guests find the perfect property for
                  their needs.
                </p>
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="4">
              <Accordion.Header>
                What is the cancellation policy for Sundays Forever?
              </Accordion.Header>
              <Accordion.Body>
                <p>
                  The cancellation policy for Sundays Forever can vary depending
                  on the specific property and the time of year. It is important
                  to review the cancellation policy before booking a stay to
                  understand the terms and conditions. In general, Sundays
                  Forever may offer a flexible cancellation policy that allows
                  guests to make changes or cancel their reservations without
                  penalty, provided that they give adequate notice.
                </p>
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="5">
              <Accordion.Header>
                Does Sundays Forever offer any special deals or promotions?
              </Accordion.Header>
              <Accordion.Body>
                <p>
                  Yes, Sundays Forever may offer special deals and promotions
                  from time to time. These may include discounts on stays,
                  special packages, or promotions for early bookings. Guests can
                  stay informed about current promotions by signing up for the
                  company's email newsletter, following Sundays Forever on
                  social media, or by visiting the company's website.
                </p>
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="6">
              <Accordion.Header>
                Is there a minimum stay requirement at Sundays Forever?
              </Accordion.Header>
              <Accordion.Body>
                <p>
                  There may be a minimum stay requirement at Sundays Forever,
                  depending on the specific property and the time of year. The
                  minimum stay requirement can vary, so it is important to
                  review the requirements before booking a stay. In some cases,
                  Sundays Forever may have a two-night minimum stay requirement,
                  while in other cases, there may be longer minimum stays
                  required for holiday periods or peak travel times.
                </p>
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="7">
              <Accordion.Header>
                Are there any age restrictions for booking a stay at Sundays
                Forever?
              </Accordion.Header>
              <Accordion.Body>
                <p>
                  The age restrictions for booking a stay at Sundays Forever can
                  vary depending on the specific property. Some properties may
                  have age restrictions for guests, such as minimum or maximum
                  ages for booking, while others may not have any restrictions.
                  It is important to review the age restrictions before booking
                  a stay to ensure that the guests meet the requirements.
                </p>
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="8">
              <Accordion.Header>
                What amenities are available at Sundays Forever properties?
              </Accordion.Header>
              <Accordion.Body>
                <p>
                  Sundays Forever properties offer a range of amenities to
                  ensure that guests have a comfortable and enjoyable stay.
                  These may include, but are not limited to, Wi-Fi, air
                  conditioning, cable or satellite TV, kitchens or kitchenettes,
                  and on-site dining options. In addition, Sundays Forever
                  properties may also offer additional amenities such as outdoor
                  pools, fitness centers, and spa services.
                </p>
              </Accordion.Body>
            </Accordion.Item> */}
          </Accordion>
        </div>
      </section>
    </main>
  );
}

export default Faq;
