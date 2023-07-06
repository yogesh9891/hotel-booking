import React, { useEffect, useState } from "react";
import { createContext } from "react";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import {Helmet} from "react-helmet";
import "./assets/css/main.css";
import 'react-toastify/dist/ReactToastify.css';
import ScrollTop from "./components/particle/ScrollTop";
import { Root } from "./components/Root";
import { getSeoBySlugApi } from "./service/home.service";
import { generateImageUrl } from "./service/url.service";
import axios from "axios";
export let SearchContext = createContext();
export let AuthoriseContext = createContext();
export const axiosApiInstance = axios.create();

function App() {
  const [searchObj, setSearchObj] = useState({});
  const [seoObj, setSeoObj] = useState(null);
  const [isAuthorized, setIsAuthorized] = useState(false);

  const getSeoByUrl = async (url) => {

    try {
      let{data:res} = await getSeoBySlugApi(url);
      if(res.data){
        setSeoObj(res.data)
      }
    } catch (error) {
        console.error(error)      
    }

  }
  
  useEffect(() => {
  let currenctUrl = window.location.href;
  getSeoByUrl(currenctUrl)
  }, [])
  

  return (
    <>
      <BrowserRouter>
        <AuthoriseContext.Provider value={[isAuthorized, setIsAuthorized]}>
        <SearchContext.Provider value={[searchObj, setSearchObj]}>
          <ScrollTop />
        <Toaster />
        {
          seoObj && seoObj?._id ?(
            <Helmet>
            <title>{seoObj.title}</title>
            <meta
              name="description"
              content={`${seoObj.description}`}
            />
            <link rel="canonical" href={`${window.location.href}`} />
             <meta
              name="keywords"
              content={`${seoObj.keywords}`}
            />{
              seoObj.imageUrl && (
              <meta property="og:image" content={`${generateImageUrl(seoObj.imageUrl)}`} />
              )
            }
            <meta property="og:title"    content={`${seoObj.title}`} />
            <meta property="og:site_name" content="Sundays Forever"/>
            <meta property="og:url" content={`${window.location.href}`}/>
            <meta property="og:description"   content={`${seoObj.description}`} />
            <meta property="og:type" content="website"/>
           </Helmet>
          ) : (
            <Helmet>
              <title>Sundays Forever - Best Homestays of India</title>
               <link rel="canonical" href={`${window.location.href}`} />
               
            </Helmet> 
          )
}
           
          <Root />
        </SearchContext.Provider>
        </AuthoriseContext.Provider>
      </BrowserRouter>
    </>
  );
}

export default App;
