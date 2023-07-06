import React, { useContext, useEffect, useState } from "react";
import Select from "react-select";
import RangeSlider from "react-range-slider-input";
import Offcanvas from "react-bootstrap/Offcanvas";
import { getAllLocationApi, getAmenityApi, getCollectionApi } from "../service/home.service";
import { errorToast } from "../utils/toast";
import { getAllHotelApi } from "../service/hotel.service";
import { useLocation, useParams, useSearchParams } from "react-router-dom";
import axios from "axios";
import { addLocalSearch, getLocalQuery, getLocalSearch } from "../service/localStorage";
import { SearchContext } from "../App";

function HotelFilter({ sethotels, sortByData ,displayHide}) {
  const [sortBy, setSortBy] = useState("");
  const [locationArr, setlocationArr] = useState([]);
  const [locationAllArr, setlocationAllArr] = useState([]);
  const [collectionAllArr, setcollectionAllArr] = useState([]);
  const [collectionArr, setcollectionArr] = useState([]);
  const [amentityArr, setamentityArr] = useState([]);
  const [hotelHomeStays, setHotelHomeStays] = useState(false);
  const [min, setmin] = useState(1000);
  const [max, setmax] = useState(250000);
  const [searchObj, setSearchObj] = useContext(SearchContext)
  const [clearFilter, setclearFilter] = useState(false);
  const [hotelsSelected, setHotelsSelected] = useState([
    {
    name:"Hotels",
    checked:false,
    },
    {
      name:"Home Stays",
      checked:false,
      },
  ]);

  const [searchParams] = useSearchParams();
  const { search } = useLocation();

  const handlegetCollection = async (source) => {
    try {
      let { data: res } = await getCollectionApi(null,source);
      if (res.data) {
        // console.log(searchObj, "searchObj")
        setcollectionAllArr(res.data.map(el => {
          let obj ={ ...el, checked: false };
          if(searchObj?.collection == el.slug){
             obj.checked = true
           }
           else {
             obj.checked = false
           }
           return obj
         }));
      }
    } catch (error) {
      // console.error(error);
      errorToast(error);
    }
  };

  

  const handlelocation = async (source) => {
    try {
      let { data: res } = await getAllLocationApi(`status=APPROVED`,source);
      if (res.data) {
        // console.log(searchObj, "searchObj1")
        setlocationAllArr(res.data.map(el => {
         let obj ={ ...el, checked: false };
         if(searchObj?.location == el.slug){
            obj.checked = true
          }
          else {
            obj.checked = false
          }
          return obj
        }));
      }
    } catch (error) {
      // console.error(error);
      errorToast(error);
    }
  };

  const handleAmentity = async () => {
    try {
      let { data: res } = await getAmenityApi();
      if (res.data) {
        setamentityArr(res.data.map(el => ({ ...el, checked: false })));
      }
    } catch (error) {
      // console.error(error);
      errorToast(error);
    }
  };

  const handlegetHotel = async (source) => {
    try {

      let query = getLocalQuery();
      let tempAmentityArr = amentityArr.filter(el => el?.checked);
      let tempLocationArr = locationAllArr.filter(el => el?.checked).map((el) => ({_id:el?._id,name:el?.name}));
      let tempCollectionArr = collectionAllArr.filter(el => el?.checked).map((el) => ({_id:el?._id,name:el?.name}));
      let temprppertyType = hotelsSelected.filter(el => el?.checked);
console.log(tempLocationArr,"tempLocationArr")
      if (min && max) {
        query += `&min=${min}&max=${max}`
      }

      if (tempLocationArr && tempLocationArr?.length > 0) {
        query += `&locationArr=${encodeURIComponent(JSON.stringify(tempLocationArr))}`
      }
      // if (hotelHomeStays && hotelHomeStays.length > 0) {
      //   query = `${query}&propertyType=${hotelHomeStays}`
      // }

      if (tempCollectionArr && tempCollectionArr?.length > 0) {
        query += `&collectionArr=${encodeURIComponent(JSON.stringify(tempCollectionArr))}`
      }

      if (temprppertyType && temprppertyType?.length > 0) {
        query += `&propertyType=${encodeURIComponent(JSON.stringify(temprppertyType))}`
      }

      // if (sbd) {
      //   query = `${query}&sortBy=${encodeURIComponent(sbd)}`
      // }

      // if (hotelsSelected && hotelsSelected.length > 0) {
        
      //   query = `${query}&propertyType=${encodeURIComponent(hotelsSelected)}`
      // }

      
      // if(sortByData) {

      // // // console.log(sortByData,"sortByDatasortByDatasortByData11")

      //   query += `&sortByPrice=${sortByData}`;
      // }
      query += `&order=asc`;

        // &collectionArr=${encodeURIComponent(JSON.stringify(tempCollectionArr))}&propertyType=${encodeURIComponent(JSON.stringify(temprppertyType))}`
        // // query = `${query}&amenityArr=${encodeURIComponent(JSON.stringify(tempAmentityArr))}&locationArr=${encodeURIComponent(JSON.stringify(tempLocationArr))}&collectionArr=${encodeURIComponent(JSON.stringify(tempCollectionArr))}&propertyType=${encodeURIComponent(JSON.stringify(temprppertyType))}`
        // // console.log(query,"queryqueryqueryqueryquery")


      let { data: res } = await getAllHotelApi(query,source);
      if (res.data) {
        // // console.log(res.data,"dfdf")
        sethotels(res.data);
      }
    } catch (error) {
      // console.error(error);
      errorToast(error);
    }
  };



useEffect(()=> {

  console.log(searchObj,"searchObjsearchObj",hotelsSelected)

  if(locationAllArr && locationAllArr.length > 0){
    let tempArr = locationAllArr
    tempArr = tempArr.map(el => {
      let obj ={...el, checked:false}
      if(searchObj?.location == el.slug){
        obj.checked = true
      }
      else {
        obj.checked = false
      }
      return obj
    })
    setlocationAllArr([...tempArr])
  console.log(tempArr,"tempArrtempArr")

    // setlocationArr([...tempArr])
  }
  if(collectionAllArr && collectionAllArr.length > 0){
    let tempArr = collectionAllArr
    tempArr = tempArr.map(el => {
      let obj ={...el, checked:false}
      // console.log(searchObj?.collection == el.name, "as", searchObj?.collection ,el.name)
      if(searchObj?.collection == el.slug){
        obj.checked = true
      }
      else {
        obj.checked = false
      }
      return obj
    })
    setcollectionAllArr(tempArr)
  }

  if(hotelsSelected && hotelsSelected.length > 0 && searchObj?.type){
    console.log(hotelsSelected,"ddd",searchObj)

  let hotelsSelectedArr = hotelsSelected.map(el => {
        if(el.name == searchObj.type){
          el.checked = true
        }
        else{
          el.checked = false
        }
        return el;
  })

  // console.log(hotelsSelectedArr,"hotelsSelectedArrhotelsSelectedArr")
  setHotelsSelected([...hotelsSelectedArr])

}



}, [searchObj])





useEffect(() => {
  let type = searchParams.get('type');

  let hotelAtt = hotelsSelected.map((el) =>{
    if(`${el.name}`.trim().toLowerCase() ==  `${type}`.trim().toLowerCase()){
      el.checked = true
     } else {
      el.checked = false

     }
     return el;
   })
    //  setHotelsSelected([...hotelAtt]);
  
}, [searchParams])



  const [category, setcategory] = useState([]);
  const [amenities, setamenities] = useState([]);

  const options = [
    { value: "popular", label: "Popular" },
    { value: "Date, new to old", label: "Date, new to old" },
    { value: "Date, old to new", label: "Date, old to new" },
    { value: "Price, low to high", label: "Price, low to high" },
    { value: "Price, high to low", label: "Price, high to low" },
  ];

  const ActiveTab = (e, i) => {
    const temp = category.map((el, index) => {
      if (i === index) {
        if (e.target.checked) {
          el.active = true;
        } else {
          el.active = false;
        }
      } else {
        el.active = el.active;
      }
      return el;
    });
    setcategory([...temp]);
    const temp2 = amenities.map((el, index) => {
      if (i === index) {
        if (e.target.checked) {
          el.active = true;
        } else {
          el.active = false;
        }
      } else {
        el.active = el.active;
      }
      return el;
    });
    setcategory([...temp]);
    setamenities([...temp2]);
  };


  useEffect(() => {

 
    let source = axios.CancelToken.source();
    handlegetHotel(source)
    return function () {
      source.cancel();
  };
  }, [min,max,locationAllArr,collectionAllArr,hotelsSelected]);




  useEffect(() => {

    let source = axios.CancelToken.source();

   

    handlegetCollection(source);
    handlelocation(source);
    return function () {
      source.cancel();
  };
   
    // handleAmentity();
  }, []);


  const handleClear = () => {
    let hotelAtt = hotelsSelected.map((el,i) =>{
     
        el.checked = false
      
      return el;
     })
  setHotelsSelected([...hotelAtt]);
  let tempArr = [...collectionAllArr]
  tempArr = tempArr.map((el,i) =>{
    el.checked = false
    return el;
   })
  setcollectionAllArr([...tempArr]);
  let temp2Arr = locationAllArr
  temp2Arr = tempArr.map(el => {
    el.checked = false
    return el;
  })
  setlocationAllArr([...temp2Arr])
  }
  const handleCheckLocation = (index,value) => {

    // // console.log(locationArr,"chcl",value)

    let tempArr = [...locationAllArr]
    // if(tempArr?.length == 0) {
    //   tempArr.push(row)
    // } else {
    //   if(tempArr.some(el =>el._id == row._id)){
    //      tempArr = tempArr.filter(el =>el._id != row._id);
    //   } else  {
    //       tempArr.push(row)
    //   }
     
    // }

     tempArr = tempArr.map((el,i) =>{
      if(index === i){
        el.checked = value
      }
      return el;
     })
    setlocationAllArr([...tempArr]);
    setlocationArr([...tempArr]);
  }


  const handleCheckAmenity = (index) => {
    let tempArr = amentityArr
    tempArr[index].checked = !tempArr[index].checked
    setamentityArr([...tempArr]);
  }
  const handleCheckCollection = (index, value) => {

    let tempArr = [...collectionAllArr]
    tempArr = tempArr.map((el,i) =>{
      if(index === i){
        el.checked = value
      }
      return el;
     })
    setcollectionAllArr([...tempArr]);
  }
  
  const handleHotelType = (index, value) => {
    let tempArr = [...hotelsSelected];
    // tempArr[index].checked = !tempArr[index].checked
    // // console.log(tempArr,"tempArrtempArrcollectionArrcollectionArr")

      let hotelAtt = hotelsSelected.map((el,i) =>{
        if(index === i){
          el.checked = value
        }
        else{
          el.checked = false
        }
        return el;
       })

       console.log(hotelAtt,"hotelAtthotelAtthotelAtt")
    setHotelsSelected([...hotelAtt]);
  }

  const handlePrice = (data) => {

    if(data && data?.length > 0){
  
      setmin(data[0])
      setmax(data[1])
    }
  }
  
  if(displayHide){
    return <></>
  }
  return (
    <div className="shopfilters">
      <p className="fw-semibold brown mb-0">Filters</p>
      <div className="shopfilters-box">
        <p className="shopfilters-title">Price</p>
        <div className="d-flex justify-content-between gap-2 mb-3">
        <p className="brown small mb-0 fw-semibold">
            {min}
          </p>
          <p className="brown small mb-0 fw-semibold">
          {max}
          </p>
        </div>
        <RangeSlider
          className="price-filter"
          onInput={(data) => handlePrice(data)}
          min={1000}
          step={1000}
          max={50000}
          defaultValue={[1000, 50000]}
          rangeSlideDisabled={true}
        />
      </div>
      <div className="shopfilters-box">
        <p className="shopfilters-title">Location</p>
        {
          locationAllArr && (
            <ul className="shopfilters-list">
              {
                locationAllArr && locationAllArr?.length  > 0 && locationAllArr.map((el, index) =>{
                  return (
                    <li key={index}>
                    <label className="shopfilters-list-title">
                      <input type="checkbox" onChange={(e) => handleCheckLocation(index,!el?.checked)}
                       checked={el?.checked} /> {el?.name}
                    </label>
                  </li>
                )
              })
              }
            </ul>
          )
        }

      </div>
      <div className="shopfilters-box">
        <p className="shopfilters-title">Collection</p>
        <ul className="shopfilters-list">
          {
            collectionAllArr && collectionAllArr.map((collection, index) =>
            (
              <li key={index}>
                <label className="shopfilters-list-title">
                  <input type="checkbox"  checked={collection?.checked} onChange={() => handleCheckCollection(index,!collection?.checked)} /> {collection.name}
                </label>
              </li>
            ))
          }

        </ul>
      </div>
      {/* <div className="shopfilters-box">
        <p className="shopfilters-title">Amenities</p>
        <ul className="shopfilters-list">

          {amentityArr && amentityArr.map((amenity, index) =>
          (
            <li key={index}>
              <label className="shopfilters-list-title">
                <input type="checkbox" onChange={() => handleCheckAmenity(index)} checked={amenity.checked} /> {amenity.name}
              </label>
            </li>
          ))
          }
        </ul>
      </div> */}
      <div className="shopfilters-box">
        <p className="shopfilters-title">Property type</p>
        <ul className="shopfilters-list">
          {
            hotelsSelected && hotelsSelected.map((type,index) =>(
              <li key={index}>
              <label className="shopfilters-list-title">
                <input type="checkbox"  onClick={(e) => handleHotelType(index,!type?.checked)} checked={type?.checked}   /> {type.name}
              </label>
            </li>
            ) )
          }
        
         
        </ul>
      </div>
    </div>
  );
}

export default HotelFilter;
