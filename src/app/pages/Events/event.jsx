import React, { useEffect, useState } from "react";
import { getUserLinks } from "../../../utils/Api";

const EventsForm = () => {
  const [iframe, setIframe] = useState([]);

  useEffect(() => {
    getlinkuser();
  }, []);

  const getlinkuser = () => {
    getUserLinks()
      .then((res) => {
        console.log("user link--------------", res);
        if (res.code == 200) {
          setIframe(res.data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  console.log("iframessssssssssssssss", iframe);

  return (
    <div className="px-5">
      <h1>Events</h1>
      {iframe?.length > 0
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
        : ""}
    </div>
  );
};

export default EventsForm;
