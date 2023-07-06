import React, { useState } from "react";
import { FaLocationArrow, FaPhoneAlt } from "react-icons/fa";
import { GoMailRead } from "react-icons/go";
import { images } from "./particle/Images";
import PageBanner from "./particle/PageBanner";
import {  postContactEnquiry} from "../service/home.service";
import { errorToast } from "../utils/toast";
function Contact() {

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [title, setTitle] = useState("")
    const [phone, setphone] = useState("")
    const [message, setmessage] = useState("")
    
    const handleSubmit = async () => {
        try {


            if (name == "") {
                errorToast("Name is mandatory")
                return
              }
              else if (email == "") {
                errorToast("Email is mandatory")
                return
              }
              else if (phone == "") {
                errorToast("Phone is mandatory")
                return
              }
              else if (phone.length != 10) {
                errorToast("Invalid Phone number")
                return
              }
              else if (title == "") {
                errorToast("Subject is mandatory")
                return
              }
              else if (message == "") {
                errorToast("Message is mandatory")
                return
              }

              let obj ={
                name,
                phone,
                email,
                message,
                title
              }
    
          let { data: res } = await postContactEnquiry(obj);
          if (res.message) {
            errorToast(res.message)
            setName("")
            setEmail("")
            setphone("")
            setTitle("")
            setmessage("")
          }
        } catch (error) {
          console.error(error);
          errorToast(error);
        }
      };
    
  return (
    <main>
      <PageBanner
        title="Contact Us"
        img={images.Barlowscottage14}
        cols="col-lg-6"
        nav
      />

      <section className="contact-info pt-40 mb-40">
        <div className="container">
          <ul className="row">
            <li className="col-12 col-md-4">
              <div className="box">
                <div className="icon">
                  <FaLocationArrow />
                </div>
                <h4 className="font-2">Location</h4>
                <p className="mb-0">
                Sundays Forever Stays Private Limited
House no-4 Mussoorie Dhanaulti Road, Village Nali Kala
Dehradun- 248001 Uttarakhand
                </p>
              </div>
            </li>
            <li className="col-12 col-md-4">
              <div className="box">
                <div className="icon">
                  <FaPhoneAlt />
                </div>
                <h4 className="font-2">Phone us</h4>
                <p className="mb-0"><a href="tel:9354163074"> +91 9354163074 </a></p>
                <p className="mb-0"><a href="tel:9315614643"> +91 9315614643 </a></p>
                <p className="mb-0"><a href="tel:8197955637"> +91 8197955637 </a></p>
              </div>
            </li>
            <li className="col-12 col-md-4">
              <div className="box">
                <div className="icon">
                  <GoMailRead />
                </div>
                <h4 className="font-2">Email us</h4>
                <p className="mb-0"> Contact@sundaysforever.com</p>
               
              </div>
            </li>
          </ul>
        </div>
      </section>

      <section className="padding40 contact-form pattern3">
        <div className="container">
          <div className="row">
            <div className="col-12 col-lg-6">
              <div className="map h-100">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d13758.737218340993!2d78.1797653!3d30.4450501!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3908dbd53b72d123%3A0xd69c0a45ac899a7a!2sSundays%20Forever%20Kings%20Cottage!5e0!3m2!1sen!2sin!4v1676029277232!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: "0" }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </div>
            <div className="col-12 col-lg-6">
              <div className="title_header mb-3">
                <h2 className="brown">Have any questions?</h2>
                <p>
                  Call us to book a meetup or send us emails to request for
                  service consultation.
                </p>
              </div>
              <form className="form row gy-2">
                <div className="col-12 col-md-6">
                  <label className="fw-semibold font-2">Name</label>
                  <input type="text" className="form-control"  value={name} onChange={(e) => setName(e.target.value)} />
                </div>
                <div className="col-12 col-md-6">
                  <label className="fw-semibold font-2">Email</label>
                  <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className="col-12 col-md-6">
                  <label className="fw-semibold font-2">Phone</label>
                  <input type="text" className="form-control" value={phone} onChange={(e) => setphone(e.target.value)} />
                </div>
                <div className="col-12 col-md-6">
                  <label className="fw-semibold font-2">Subject</label>
                  <input type="text" className="form-control" value={title} onChange={(e) => setTitle(e.target.value)} />
                </div>
                <div className="col-12">
                  <label className="fw-semibold font-2">Message</label>
                  <textarea className="form-control" rows="5" value={message} onChange={(e) => setmessage(e.target.value)}></textarea>
                </div>
                <div className="col-12">
                  <button type="button" className="btn btn-brown rounded-0 no-hover brown-bg text-white mt-3 py-2 px-4" onClick={()=>handleSubmit()}>
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Contact;
