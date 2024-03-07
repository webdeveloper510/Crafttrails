import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ActiveUserCountBox from "../../app/pages/dashboard/ActiveUserCount";
import PieChart from "../../app/pages/dashboard/userCompletion";
import RegisterUser from "../../app/pages/dashboard/charts/userregister";
import Piechart2 from "../../app/pages/dashboard/userAge";
import Usergender from "../../app/pages/dashboard/charts/Gender";
import WeeklyData from "../../app/pages/dashboard/charts/weekly";
import WeeklyGrowth from "../../app/pages/dashboard/charts/weeklyGrowth";
import NetChanges from "../../app/pages/dashboard/charts/netchange";
import ParticipantCount from "../../app/pages/dashboard/charts/participant";
import { getTrailsAdmin } from "../../utils/Api";

const Userdashboard = () => {
  const { id } = useParams();
  console.log("🚀 ~ Userdashboard ~ loction:", id);
  const [loyality, setLoyality] = useState("Loyalty")
  const [loading, setLoading] = useState(false);
  const [list, setList] = useState([]);


  const handlePoints=(name)=>{
    setLoading(true);
    setLoyality(name)
  }

  const location = window.location
  console.log("🚀 ~ Userdashboard ~ location:", location)

  useEffect(() => {
    // setLoading(true);
    getTrailsAdmin()
      .then((res) => {
        // setLoading(false);
        if (res.code === 200) {
          setList(res?.data);
        }
      })
      .catch((error) => {
        setLoading(false);
      });
  }, []);

  return (
    <>
      <div>
        <h1 className="display-6 mb-5 pb-4 text-center">User Dashboard</h1>
        <div className="text-center mb-5 pb-4">
              <button className="butns-dash" onClick={()=>handlePoints("Loyalty")}>Loyalty</button>
              <button className="butns-dash" onClick={()=>handlePoints("Birthday")}>Birthday</button>
              <button className="butns-dash" onClick={()=>handlePoints("Special_Trail")}>Special Trail</button>
            </div>
      </div>
      <div className="row g-5 g-xl-10 mb-5 mb-xl-10">
        <div className="col-md-12 col-lg-12 col-xl-12 col-xxl-12 mb-md-5 mb-xl-10">
          <ActiveUserCountBox id={id} />
        </div>
        <div className="col-md-6 col-lg-6 col-xl-6 col-xxl-6 mb-md-5 mb-xl-10">
          <PieChart id={id} />
        </div>
        <div className="col-md-6 col-lg-6 col-xl-6 col-xxl-6 mb-md-5 mb-xl-10">
          <RegisterUser id={id} />
        </div>
        <div className="col-md-6 col-lg-6 col-xl-6 col-xxl-6 mb-md-5 mb-xl-10">
          <Piechart2 id={id} />
        </div>
        <div className="col-md-6 col-lg-6 col-xl-6 col-xxl-6 mb-md-5 mb-xl-10">
          <Usergender id={id} />
        </div>
        <div className="col-md-6 col-lg-6 col-xl-6 col-xxl-6 mb-md-5 mb-xl-10">
          <WeeklyData id={id} />
        </div>
        <div className="col-md-6 col-lg-6 col-xl-6 col-xxl-6 mb-md-5 mb-xl-10">
          <WeeklyGrowth id={id} />
        </div>
        <div className="col-md-6 col-lg-6 col-xl-6 col-xxl-6 mb-md-5 mb-xl-10">
          <NetChanges id={id} />
        </div>
        <div className="col-md-6 col-lg-6 col-xl-6 col-xxl-6 mb-md-5 mb-xl-10">
          <ParticipantCount id={id} />
        </div>
      </div>
    </>
  );
};

export default Userdashboard;
