import React, { useEffect, useState } from "react";
import { BiTime } from "react-icons/bi";
import { BsSearch } from "react-icons/bs";
import { FaUserCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import { getBlogApi, getBlogCategoryApi } from "../service/home.service";
import { generateImageUrl } from "../service/url.service";
import { errorToast } from "../utils/toast";
import { images } from "./particle/Images";
import PageBanner from "./particle/PageBanner";

function Blogs() {
  const [tabs, setTabs] = useState([
    { name: "All", active: true, tab: 1 },
    { name: "Travel tips", active: false, tab: 2 },
    { name: "Local culture", active: false, tab: 3 },
    { name: "Sustainable Travel", active: false, tab: 4 },
    { name: "Travel Inspiration", active: false, tab: 5 },
    { name: "Local Cuisine", active: false, tab: 6 },
    { name: "Guest Experiences", active: false, tab: 7},
    { name: "Luxury Travel", active: false, tab: 8 },
    { name: "Adventure Activities", active: false, tab: 9 },
    { name: "Nature & Wildlife     ", active: false, tab: 10 },
    { name: "Festivals and Celebrations ", active: false, tab: 11 },
    { name: "History & Heritage Sites", active: false, tab: 12 },
    { name: "Company News", active: false, tab: 13 },
    { name: "Destination guides & Itineraries", active: false, tab: 14 },
  ]);


  const [blogArr, setblogArr] = useState([]);
  const [displayBlogArr, setdsipayblogArr] = useState([]);
  const [blogCategoryArr, setblogCategoryArr] = useState([]);

  const tabClick = (i) => {
    const temp = blogCategoryArr.map((item, index) => {
      i === index ? (item.active = true) : (item.active = false);
      return item;
    });

    
    setTabs([...temp]);

    let locationName = blogCategoryArr[i]._id;
    console.log(locationName,"locationNamelocationNamelocationName")
    if(locationName){
  
    let tempArr = blogArr.filter(
      (el) => el.blogCategoryId == locationName
    );

    setdsipayblogArr(tempArr)
    } else {
      setdsipayblogArr(blogArr)
    }

  };



    const handlegetBlog = async () => {
    try {
      let { data: res } = await getBlogApi();
      if (res.data) {
        setblogArr(res.data);
        setdsipayblogArr(res.data)
      }
    } catch (error) {
      console.error(error);
      errorToast(error);
    }
  };

  const handlegetBlogcategory = async () => {
    try {
      let { data: res } = await getBlogCategoryApi();
      if (res.data) {
        let arr = [];

        if (res.data && res.data.length > 0) {
          arr = [
            { label: "All", name: "All", active: true },
            ...res.data.map((el) => ({ ...el, active: false })),
          ];
        }
        setblogCategoryArr(arr);
      }
    } catch (error) {
      console.error(error);
      errorToast(error);
    }
  };


  useEffect(() => {

    handlegetBlog();
    handlegetBlogcategory();
  }, []);

  return (
    <main>
      <PageBanner
        title="Blogs"
        img={images.Barlowscottage14}
        cols="col-lg-5"
        nav
      >
        <form>
          <div className="form-control with-icon mt-3">
            <input
              type="search"
              className="border-0 bg-transparent w-100"
              placeholder="Search blogs here!!!"
            />
            <BsSearch className="brown" />
          </div>
        </form>
      </PageBanner>

      <section className="blog_section padding40 bg-img">
        <div className="container">
          <ul className="blog-filters mb-4">
            {blogCategoryArr &&  blogCategoryArr.map((item, i) => {
              return (
                <li
                  key={i}
                  className={`${item.active ? "active" : ""}`}
                  onClick={() => tabClick(i)}
                >
                  {item.name}
                </li>
              );
            })}
          </ul>
         
                <div className="row gy-4 mt-5" >

{displayBlogArr &&
              displayBlogArr.map((blog) => (  <div className="col-lg-4 col-sm-6 col-md-6">
              <div className="blogcard">
                <div className="overflow-hidden">
                <Link to={`/BlogDetail/${blog.slug}`}>
                        <img
                          src={generateImageUrl(blog.image)}
                          alt=""
                          className="img-fluid"
                        />
                      </Link>
                </div>
                <ul className="tags bg text-default">
                  <li>
                    <FaUserCircle />
                    {blog.author}
                  </li>
                  <li>
                    <BiTime />
                    {new Date(blog.createdAt).toDateString()}
                  </li>
                </ul>
                <div className="blog_content">
                  <h5 className="font-2 head">
                  <Link to={`/BlogDetail/${blog.slug}`}>
                          {blog.title}
                        </Link>
                  </h5>
                  <p
                          dangerouslySetInnerHTML={{
                            __html: blog.description
                              ? blog.description.substring(0, 200)
                              : "",
                          }}
                        ></p>
                </div>
              </div>
            </div> ))}
                
                 
             </div>
       
        </div>
      </section>
    </main>
  );
}

export default Blogs;
