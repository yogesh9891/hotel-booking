import React, { useState } from "react";
import { images } from "./particle/Images";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { getGalleryApi } from "../service/home.service";
import { generateImageUrl } from "../service/url.service";
import { errorToast } from "../utils/toast";
function Gallery() {

  const [galleryArr1, setgalleryArr1] = useState([]);
  const [galleryArr2, setgalleryArr2] = useState([]);
  const [galleryArr3, setgalleryArr3] = useState([]);
  const handlegetGallery = async (query) => {
    try {
      let { data: res } = await getGalleryApi(query);

      if (res.data) {
        setgalleryArr1(res.data.filter((el,i) => i%3 ===0));
        setgalleryArr2(res.data.filter((el,i) => i%3 ===1));
        setgalleryArr3(res.data.filter((el,i) => i%3 ===2));
      }
    } catch (error) {
      console.error(error);
      errorToast(error);
    }
  };


  useEffect(() => {
    handlegetGallery();
  }, []);
  return (
    <main className="pt-5 bg-img5">
      <section className="pb-40 experience-gallery-2">
        <div className="container-fluid">
          <div className="row justify-content-center">
            <div className="col-12 col-md-10 col-xxl-10">
              <div className="title_header text-center col-12 col-lg-10 mx-auto mb-5">
                <h2 className="mb-3">
                  The Sundays Forever <span className="brown">Experience</span>{" "}
                  is more than a vacation !
                </h2>
                <p>
                  We are a collection of handpicked homes and hotels. We have
                  added our flawless brand of hospitality and turned them into
                  boutique stays that you will fall in love with.
                </p>
                <p>
                  At SF we bring together the warmth, comfort, good food and
                  high standard of service, associated with the best hotels. All
                  our properties are pet friendly.
                </p>
                <h6 className="fw-semibold">You will get addicted to us !</h6>
              </div>
              <div className="row">
              <div className="col-12 col-xl-4">
                {
                  galleryArr1 && galleryArr1.map((gallery) => (
                
                    <div className="box">
                      <img
                        src={generateImageUrl(gallery.imageUrl)}
                        className="w-100 img-cover"
                        alt=""
                      />
                      <div className="content">
                      <h4>{gallery.name}</h4>
                        <p>
                        {gallery.description}
                        </p>
                      </div>
                    </div>
                    // <div className="box">
                    //   <img
                    //     src={images.Barlowscottage11}
                    //     className="w-100 img-cover"
                    //     alt=""
                    //   />
                    //   <div className="content">
                    //     <h4>Title</h4>
                    //     <p>
                    //       Lorem ipsum dolor, sit amet consectetur adipisicing
                    //       elit. Corporis, fugiat iusto.
                    //     </p>
                    //   </div>
                    // </div>
                    // <div className="box">
                    //   <img
                    //     src={images.Barlowscottage15}
                    //     className="w-100 img-cover"
                    //     alt=""
                    //   />
                    //   <div className="content">
                    //     <h4>Title</h4>
                    //     <p>
                    //       Lorem ipsum dolor, sit amet consectetur adipisicing
                    //       elit. Corporis, fugiat iusto.
                    //     </p>
                    //   </div>
                    // </div>
                 
                  ))
                }
              </div>
              <div className="col-12 col-xl-4">
                {
                  galleryArr2 && galleryArr2.map((gallery) => (
                
                    <div className="box">
                      <img
                        src={generateImageUrl(gallery.imageUrl)}
                        className="w-100 img-cover"
                        alt=""
                      />
                      <div className="content">
                      <h4>{gallery.name}</h4>
                        <p>
                        {gallery.description}
                        </p>
                      </div>
                    </div>
                    // <div className="box">
                    //   <img
                    //     src={images.Barlowscottage11}
                    //     className="w-100 img-cover"
                    //     alt=""
                    //   />
                    //   <div className="content">
                    //     <h4>Title</h4>
                    //     <p>
                    //       Lorem ipsum dolor, sit amet consectetur adipisicing
                    //       elit. Corporis, fugiat iusto.
                    //     </p>
                    //   </div>
                    // </div>
                    // <div className="box">
                    //   <img
                    //     src={images.Barlowscottage15}
                    //     className="w-100 img-cover"
                    //     alt=""
                    //   />
                    //   <div className="content">
                    //     <h4>Title</h4>
                    //     <p>
                    //       Lorem ipsum dolor, sit amet consectetur adipisicing
                    //       elit. Corporis, fugiat iusto.
                    //     </p>
                    //   </div>
                    // </div>
                 
                  ))
                }
              </div>
              <div className="col-12 col-xl-4">
                {
                  galleryArr3 && galleryArr3.map((gallery) => (
                
                    <div className="box">
                      <img
                       src={generateImageUrl(gallery.imageUrl)}
                        className="w-100 img-cover"
                        alt=""
                      />
                      <div className="content">
                        <h4>{gallery.name}</h4>
                        <p>
                        {gallery.description}
                        </p>
                      </div>
                    </div>
                    // <div className="box">
                    //   <img
                    //     src={images.Barlowscottage11}
                    //     className="w-100 img-cover"
                    //     alt=""
                    //   />
                    //   <div className="content">
                    //     <h4>Title</h4>
                    //     <p>
                    //       Lorem ipsum dolor, sit amet consectetur adipisicing
                    //       elit. Corporis, fugiat iusto.
                    //     </p>
                    //   </div>
                    // </div>
                    // <div className="box">
                    //   <img
                    //     src={images.Barlowscottage15}
                    //     className="w-100 img-cover"
                    //     alt=""
                    //   />
                    //   <div className="content">
                    //     <h4>Title</h4>
                    //     <p>
                    //       Lorem ipsum dolor, sit amet consectetur adipisicing
                    //       elit. Corporis, fugiat iusto.
                    //     </p>
                    //   </div>
                    // </div>
                 
                  ))
                }
              </div>
                {/* <div className="col-12 col-xl-4">
                  <div className="box">
                    <img
                      src={images.Barlowscottage19}
                      className="w-100 img-cover"
                      alt=""
                    />
                    <div className="content">
                      <h4>Title</h4>
                      <p>
                        Lorem ipsum dolor, sit amet consectetur adipisicing
                        elit. Corporis, fugiat iusto.
                      </p>
                    </div>
                  </div>
                  <div className="box">
                    <img
                      src={images.Barlowscottage10}
                      className="w-100 img-cover"
                      alt=""
                    />
                    <div className="content">
                      <h4>Title</h4>
                      <p>
                        Lorem ipsum dolor, sit amet consectetur adipisicing
                        elit. Corporis, fugiat iusto.
                      </p>
                    </div>
                  </div>
                  <div className="box">
                    <img
                      src={images.Barlowscottage21}
                      className="w-100 img-cover"
                      alt=""
                    />
                    <div className="content">
                      <h4>Title</h4>
                      <p>
                        Lorem ipsum dolor, sit amet consectetur adipisicing
                        elit. Corporis, fugiat iusto.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-12 col-xl-4">
                  <div className="box">
                    <img
                      src={images.Barlowscottage12}
                      className="w-100 img-cover"
                      alt=""
                    />
                    <div className="content">
                      <h4>Title</h4>
                      <p>
                        Lorem ipsum dolor, sit amet consectetur adipisicing
                        elit. Corporis, fugiat iusto.
                      </p>
                    </div>
                  </div>
                  <div className="box">
                    <img
                      src={images.Barlowscottage23}
                      className="w-100 img-cover"
                      alt=""
                    />
                    <div className="content">
                      <h4>Title</h4>
                      <p>
                        Lorem ipsum dolor, sit amet consectetur adipisicing
                        elit. Corporis, fugiat iusto.
                      </p>
                    </div>
                  </div>
                  <div className="box">
                    <img
                      src={images.Barlowscottage9}
                      className="w-100 img-cover"
                      alt=""
                    />
                    <div className="content">
                      <h4>Title</h4>
                      <p>
                        Lorem ipsum dolor, sit amet consectetur adipisicing
                        elit. Corporis, fugiat iusto.
                      </p>
                    </div>
                  </div>
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Gallery;
