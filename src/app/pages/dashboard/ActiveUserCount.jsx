import { useEffect, useState } from "react";
import { getActiveUserCount, getActiveUserCountAdmin, getHottestDays, getHottestDaysAdmin } from "../../../utils/Api";


function ActiveUserCountBox({id}) {
  const [activeUserCount, setActiveUserCount] = useState(0);
  const [data, setData] = useState("");

  console.log("idssssssssssssssssssssssssssssss", id)
  useEffect(() => {
    if(id){
      getActiveUserCountAdmin(id).then((res) => {
        if (res.code === 200) {
          setActiveUserCount(res?.data?.active_count);
        }
      });
    }else{
      getActiveUserCount().then((res) => {
        if (res.code === 200) {
          setActiveUserCount(res?.data?.active_count);
        }
      });
    }
    
    getHotestdays();
  }, []);

  const getHotestdays = () => {
    if(id){
      getHottestDaysAdmin(id).then((res) => {
        console.log("ressssssssssssssssssssssssss", res);
        setData(res?.data?.hottest_day);
      })
      .catch((error) => {
        console.log(error);
      });
    }else{
      getHottestDays()
      .then((res) => {
        console.log("ressssssssssssssssssssssssss", res);
        setData(res?.data?.hottest_day);
      })
      .catch((error) => {
        console.log(error);
      });
    }     
  };

  return (
    <div
      style={{ boxShadow: "1px 1px 3px 1px #e1e1e1" }}
      className="card card-flush user_active d-flex mb-xl-10"
    >
      <div className="row">
        <div className="col-md-6">
        <div className="label mt-5 px-5 text-center">
        <h1 style={{fontWeight:500, marginBottom:"70px"}}>ACTIVE USERS</h1>
      </div>
          <div className="d-flex justify-content-center">
            <h1 className="mb-0 active-count" style={{color:"#624df7"}}> {activeUserCount} </h1>
          </div>
          <div className="label text-center">
            <h1 style={{fontWeight:700}}>Users</h1>
          </div>
        </div>
        <div className="col-md-6 px-5">
        <div className="label mt-5 px-5 text-center">
        <h1 style={{fontWeight:500, marginBottom:"70px",textTransform: "uppercase"}}>Busiest Day of the Week</h1>
      </div>
        <div className="d-flex justify-content-center">
        <h1 className="mb-0 text-danger week-day"> {data} </h1>
      </div>
        </div>
      </div>
    </div>
  );
}

export default ActiveUserCountBox;
