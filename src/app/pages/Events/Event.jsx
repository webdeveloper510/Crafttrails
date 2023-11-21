import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const EventsForm = () => {

  const params = useParams()
  console.log("paramssssssssssssssssssss", params.id)
  
  return (
    <div className="px-5">
      <iframe
                  src={`https://forms.fillout.com/t/gUSmhKpWZgus?id=${params.id}`}
                  style={{ width: "100%", height: "1000px", border: "none",}}
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
