import React, { useEffect, useState } from "react";
import { BiTime } from "react-icons/bi";
import { FaUserCircle } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import { getBlogApi, getBlogBySlugApi } from "../service/home.service";
import { generateImageUrl } from "../service/url.service";
import { errorToast } from "../utils/toast";
import { images } from "./particle/Images";
import { Helmet } from "react-helmet";

function BlogDetail() {



  const [blogObj, setblogObj] = useState();
  const [blogArr, setblogArr] = useState();
  const [blogcategoryArr, setBlogcategoryArr] = useState([]);
  const params = useParams();

  const handleGetBlogBySlug = async (slug) => {
    try {
      let { data: res } = await getBlogBySlugApi(slug);
      if (res.data) {
        setblogObj(res.data);
      }

    } catch (error) {
      errorToast(error);
    }
  };


  const handlegetBlog = async () => {
    try {
      let { data: res } = await getBlogApi();

      if (res.data && res.data.length > 0) {
        setblogArr(res.data.filter((el) => el._id != blogObj?._id));
        setBlogcategoryArr(res.data.filter((el) => el.blogCategoryId == blogObj?.blogCategoryId && el._id != blogObj?._id));
      }
    } catch (error) {
      console.error(error);
      errorToast(error);
    }
  };
  useEffect(() => {
    if (params.slug) {
      handleGetBlogBySlug(params.slug);
      handlegetBlog();
    }
  }, [params]);

  useEffect(() => {
    if (blogObj?._id) {
      handlegetBlog();
    }
  }, [blogObj]);

  return (

    
    <main className="bg-img3" style={{display:'unset'}}>
      {
        blogObj?.title && (
          <Helmet>
          <title>{blogObj.title}</title>
          </Helmet>
        )
      }
          
      <section className="blog_section blog-detail-page padding40">
        <div className="row">
          <div className="col-12 col-md-8">
            <div className="blogcard shadow-none blog-detail">
              <div className="overflow-hidden image">
                  <img
                    src={generateImageUrl(blogObj?.image)}
                    alt=""
                    className="img-fluid"
                  />
              </div>
              <ul className="tags bg text-default">
                <li>
                  <FaUserCircle />
                  {blogObj?.author}
                </li>
                <li>
                  <BiTime />
                 {new Date(blogObj?.createdAt).toDateString()}
                </li>
              </ul>
              <div className="blog_content mt-3 pb-0">
                <h4 className="font-2 fw-bold">
                  <span className="text-dark">
                    {blogObj?.title}
                  </span>
                </h4>
                <p dangerouslySetInnerHTML={{
                      __html: blogObj?.description ,
                  }}></p>
             
              </div>
            </div>
          </div>
          <div className="col-12 col-md-4">
            <div className="right row gy-4 sticky-top">
              <div className="col-12">
                <form>
                  <div className="d-flex gap-3">
                    <input
                      type="email"
                      placeholder="Search Here"
                      className="form-control flex-1 rounded"
                    />
                  </div>
                </form>
              </div>
              <div className="col-12">
                <div className="outer">
                  <h5 className="font-2 fw-bold">Trending Blogs</h5>

                  {
     
                    blogArr && (
                      <div className="row gy-3">
                        {
                          blogArr && blogArr.filter((el,i)=>i<3).map((blog) => (
                            <div className="col-12">
                            <div className="trending-blog">
                              <Link  to={`/BlogDetail/${blog.slug}`}  className="img">
                                <img       src={generateImageUrl(blog.image)} alt="" />
                              </Link>
                              <div className="blogcard flex-1 shadow-none">
                                <p className="font-2 fw-bold mb-1">
                                  <Link  to={`/BlogDetail/${blog.slug}`}  className="text-dark">
                                  {blog.title}
                                  </Link>
                                </p>
                                <ul className="tags p-0 m-0 text-default">
                                  <li>
                                    <FaUserCircle />
                                    {blog.author}
                                  </li>
                                  <li>
                                    <BiTime />
                                    {new  Date(blog.createdAt).toDateString()}
                                  </li>
                                </ul>
                              </div>
                            </div>
                          </div>
                          ))
                        }
                 
                    
                    </div>
                    )
                  }
                
                </div>
              </div>
              <div className="col-12">
                <div className="outer">
                  <h5 className="font-2 fw-bold">Featured Video</h5>
                  <iframe
                    width="100%"
                    height="300"
                    src="https://www.youtube.com/embed/-zCwoIqRnmQ"
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    className="rounded-4"
                  ></iframe>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {
     
     blogcategoryArr && (
      <section className="blog-detail-page pb-40">
        <div className="title_header mb-4">
          <h2>Similar Blogs</h2>
        </div>
        <div className="row gy-4">
          {
               blogcategoryArr && blogcategoryArr.filter((el,i)=>i<2).map((blog) => (
                <div className="col-sm-6 col-md-6">
                <div className="home-blog">
                  <div className="overflow-hidden image">
                  <Link  to={`/BlogDetail/${blog.slug}`}  className="img-fluid">
                                <img       src={generateImageUrl(blog.image)} alt="" />
                              </Link>
                  </div>
                  <div className="content flex-1">
                    <h5 className="font-2 head">
                    <Link  to={`/BlogDetail/${blog.slug}`}  className="text-dark">
                                  {blog.title}
                                  </Link>
                    </h5>
                    <ul className="tags green">
                      <li>
                        <FaUserCircle />
                        {blog.author}
                      </li>
                      <li>
                        <BiTime />
                        {new  Date(blog.createdAt).toDateString()}
                      </li>
                    </ul>
                    <p>
                    <span dangerouslySetInnerHTML={{
                      __html: blog?.description.substr(0,250) ,
                  }}></span>
                      <Link to={`/BlogDetail/${blog.slug}`} >Read More</Link>
                    </p>
                  </div>
                </div>
              </div>

               ))}
       
        
        </div>
      </section>
     )}
    </main>
  );
}

export default BlogDetail;
