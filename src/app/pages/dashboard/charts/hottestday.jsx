import React, { useEffect, useState } from "react";
import { getHottestDays } from "../../../../utils/Api";

const Hottestday = ({ className }) => {
  const [data, setData] = useState("");

  useEffect(() => {
    getHotestdays();
  }, []);

  const getHotestdays = () => {
    getHottestDays()
      .then((res) => {
        setData(res.data.hottest_day);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <>
   
    <div
      style={{ boxShadow: "1px 1px 3px 1px #e1e1e1" }}
      className="card card-flush user_active py-5 d-flex justify-content-center text-center mb-5 mb-xl-10 user_active"
    >
     <div>
         <div className=" display-5 d-flex justify-content-center">
        <p className="mb-0 text-danger"> {data} </p>
      </div>
      <div className="label mt-2 text-center">
        <h3>Hottest day of the week</h3>
      </div>
     </div>
    </div>
    </>

  );
};

export default Hottestday;
