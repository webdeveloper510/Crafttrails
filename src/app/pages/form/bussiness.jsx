import React, { useEffect, useState } from "react";
import { getBreweryForm, getuserProfile } from "../../../utils/Api";

const Business = () => {

    const [data, setData] = useState(null)
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://server.fillout.com/embed/v1/";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  useEffect(()=>{
    getProfileData()
  },[])

  const getProfileData =()=>{
    getuserProfile().then((res)=>{

        if(res?.code == 200){
          const id = res?.data?.[0]?.brewery
          getBreweryForm(id).then((res)=>{
            setData(res?.data?.title_submenu?.updatebussiness)
          }).catch((error)=>{
            console.log(error)
          })
        }
    }).catch((error)=>{
        console.log(error)
    })
  }

  return (
    <>
      <div>
        {/* <div
            style={{ width: "100%", height: "500px" }}
            data-fillout-id="pFVZsBqprCus"
            data-fillout-embed-type="standard"
            data-fillout-inherit-parameters
            data-fillout-dynamic-resize
            id="formm"
          ></div>          */}
        <iframe
          src={data}
          width="100%"
          height="1700"
        ></iframe>
      </div>
     
    </>
  );
};

export default Business;
