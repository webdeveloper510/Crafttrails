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
import {  getBreweryNameAdmin } from "../../utils/Api";

const Userdashboard = () => {
  const { id } = useParams();
  console.log("🚀 ~ Userdashboard ~ loction:", id);
  const [loyality, setLoyality] = useState("Loyalty");
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");


  const handlePoints = (name) => {
    setLoyality(name);
  };

  useEffect(() => {
    setLoading(true);
    getBreweryNameAdmin(id).then((res) => {
      setLoading(false)
      if (res.code === 200) {
        setName(res?.data?.bar_name);        
      }
    }).catch((error)=>{
      setLoading(false)
    })
  }, [loyality]);

  return (
    <>
    {loading ? (
        <div className="loader-overly">
          <div className="loader"></div>
        </div>
      ) : (
      <>
      <div>
        <h1 className="display-6 mb-5 pb-4 text-center">{name}</h1>
        <div className="text-center mb-5 pb-4">
          <button
            className="butns-dash"
            onClick={() => handlePoints("Loyalty")}
          >
            Loyalty
          </button>
          <button
            className="butns-dash"
            onClick={() => handlePoints("Birthday")}
          >
            Birthday
          </button>
          <button
            className="butns-dash"
            onClick={() => handlePoints("Special_Trail")}
          >
            Special Trail
          </button>
        </div>
      </div>
      <div className="row g-5 g-xl-10 mb-5 mb-xl-10">
        <div className="col-md-12 col-lg-12 col-xl-12 col-xxl-12 mb-md-5 mb-xl-10">
          <ActiveUserCountBox id={id} loyality={loyality}/>
        </div>
        <div className="col-md-6 col-lg-6 col-xl-6 col-xxl-6 mb-md-5 mb-xl-10">
          <PieChart id={id} loyality={loyality}/>
        </div>
        <div className="col-md-6 col-lg-6 col-xl-6 col-xxl-6 mb-md-5 mb-xl-10">
          <RegisterUser id={id} loyality={loyality}/>
        </div>
        <div className="col-md-6 col-lg-6 col-xl-6 col-xxl-6 mb-md-5 mb-xl-10">
          <Piechart2 id={id} loyality={loyality}/>
        </div>
        <div className="col-md-6 col-lg-6 col-xl-6 col-xxl-6 mb-md-5 mb-xl-10">
          <Usergender id={id} loyality={loyality}/>
        </div>
        <div className="col-md-6 col-lg-6 col-xl-6 col-xxl-6 mb-md-5 mb-xl-10">
          <WeeklyData id={id} loyality={loyality}/>
        </div>
        <div className="col-md-6 col-lg-6 col-xl-6 col-xxl-6 mb-md-5 mb-xl-10">
          <WeeklyGrowth id={id} loyality={loyality}/>
        </div>
        <div className="col-md-6 col-lg-6 col-xl-6 col-xxl-6 mb-md-5 mb-xl-10">
          <NetChanges id={id} loyality={loyality}/>
        </div>
        <div className="col-md-6 col-lg-6 col-xl-6 col-xxl-6 mb-md-5 mb-xl-10">
          <ParticipantCount id={id} loyality={loyality}/>
        </div>
      </div>
      </>
      )}
    </>
  );
};

export default Userdashboard;
