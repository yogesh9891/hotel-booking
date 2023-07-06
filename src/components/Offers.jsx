import React, { useEffect, useState } from "react";
import { MdContentCopy } from "react-icons/md";
import { RiCoupon3Fill } from "react-icons/ri";
import { getOfferApi } from "../service/home.service";
import { errorToast } from "../utils/toast";
import { images } from "./particle/Images";

function Offers() {


  const [offerArr, setofferArr] = useState([]);

  const handleOffers = async (query) => {
    try {
      let { data: res } = await getOfferApi(query);
      if (res.data) {
        setofferArr(res.data);
      }
    } catch (error) {
      console.error(error);
      errorToast(error);
    }
  };
  const [copied, setCopied] = useState(false);

  const copyToClipboard = (text) => {
    const textarea = document.createElement("textarea");
    textarea.value = text;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand("copy");
    document.body.removeChild(textarea);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 500);
  };

  useEffect(() => {
    handleOffers('active=true');
  }, []);

  return (
    <main className="border-top pt-5 bg-img3">
      <section className="pb-40">
        <div className="container">
          <div className="title_header text-center col-12 col-lg-10 mx-auto mb-4">
            <h2 className="mb-3">
              SF top offers{" "}
              <span className="brown">
                for you <RiCoupon3Fill />
              </span>
            </h2>
            <p>
              Escape to comfort, without breaking the bank. Discover amazing
              deals on home stays with our exclusive coupons.
            </p>
            <h6 className="fw-semibold">You will get addicted to us !</h6>
            <h6
                  className={`fw-semibold brown ${
                    copied ? "visible" : "invisible"
                  }`}
                >
                  Text Copied
                </h6>
          </div>
          <div className="row gy-4 home-coupons">
          {offerArr &&
              offerArr.map((offer) => (
                <div className="col-6 col-md-4">
                  <div className="box">
                    <p className="code"      onClick={() => copyToClipboard(offer.discountCode)}>
                      {offer.discountCode}&nbsp;
                      <MdContentCopy />
                    </p>
                    <p className="off">
                      {offer.type == "PERCENTAGE" ? (
                        <>
                          <span>{offer.value}%</span> off*
                        </>
                      ) : (
                        <>
                          <span>{offer.value}</span> off*
                        </>
                      )}
                    </p>
                    <p className="desp">{offer.description}</p>
                    <p className="small">*T&C Apply</p>
                  </div>
                </div>
              ))}
            {/* <div className="col-12 col-md-4">
              <div className="box h-100">
                <p className="code">
                  NEWGEM&nbsp;
                  <MdContentCopy />
                </p>
                <p className="off">
                  <span>40%</span> off*
                </p>
                <p className="desp">
                  Get FLAT 40% Off! Introductory Offer Ends Soon...
                </p>
                <p className="small">*T&C Apply</p>
              </div>
            </div> */}
        
          </div>
        </div>
      </section>
    </main>
  );
}

export default Offers;
