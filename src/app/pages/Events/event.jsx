import React, { useEffect, useState } from "react";
import { getUserLinks } from "../../../utils/Api";
import { useParams } from "react-router-dom";

const EventsForm = () => {

  // const [iframe, setIframe] = useState([]);
  const params = useParams()
  console.log("paramssssssssssssssssssss", params.id)
  

  // useEffect(() => {
  //   getlinkuser();
  // }, []);

  // const getlinkuser = () => {
  //   getUserLinks()
  //     .then((res) => {
  //       console.log("user link--------------", res);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // };


  return (
    <div className="px-5">
      <h1>Events</h1>
      <iframe
                  src={`https://forms.fillout.com/t/gUSmhKpWZgus?id=${params.id}`}
                  style={{ width: "100%", height: "500px", border: "none" }}
                ></iframe>
      {/* {iframe?.length > 0
        ? iframe?.map((item,i) => {
            return (
              <div className="my-5" key={i} style={{ width: "90%", margin:"auto" }}>
                <iframe
                  src={item}
                  style={{ width: "100%", height: "500px", border: "none" }}
                ></iframe>
              </div>
            );
          })
        : ""} */}
    </div>
  );
};

export default EventsForm;
