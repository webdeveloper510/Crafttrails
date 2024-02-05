import React, { useEffect, useState } from "react";
import { adminMembershipData } from "../../../utils/Api";
import Table from "react-bootstrap/Table";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import Lifetime from "./Allpoints/Lifetime";
import Available from "./Allpoints/Available";
import AnnualPoint from "./Allpoints/Annual";
import MonthlyPoint from "./Allpoints/Monthly";
import BottomLifetime from "./Allpoints/bottomlife";
import BottomAnnualPoint from "./Allpoints/Bottomannual";
import BottomAvailable from "./Allpoints/Bottomavailble";
import BottomMonthly from "./Allpoints/Bottommonthly";

const Membershipdash = () => {

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [lifetime, setLifetime] = useState([]);
  const [bottom , setBottom] = useState([])
  const [annual , setAnnual] = useState([])
  const [bAnnual, setBAnnual] = useState([])
  const [available , setAvailable] = useState([])
  const [bottomAvailable, setBottomAvailable] = useState([])
  const [monthly , setMonthly] = useState([])
  const [bottmMonthly , setBottmMonthly] = useState([])

  const getlinkuser = () => {
    setLoading(true);
    adminMembershipData()
      .then((res) => {
        setLoading(false)
        // console.log("membership dashboard--------------", res);
        if(res.code == 200){
          setData(res.data?.[0]);
          setLifetime(res.data?.[0]?.top_user_overall);
          setBottom(res.data?.[0]?.bottom_user_overall);
          setAnnual(res.data?.[0]?.top_annual_points)
          setBAnnual(res.data?.[0]?.bottom_annual_points);
          setAvailable(res.data?.[0]?.top_points_earned)
          setBottomAvailable(res.data?.[0]?.bottom_points_earned);
          setMonthly(res.data?.[0]?.top_monthly_points)
          setBottmMonthly(res.data?.[0]?.bottom_monthly_points);
        }
      })
      .catch((error) => {
        console.log(error);
        setLoading(false)
      });
  };

  useEffect(() => {
    getlinkuser();
  }, []);

  return (
    <div>
      <div style={{ marginTop: "10px" }}>
      {loading ? (
        <div className="loader-overly">
          <div className="loader"></div>
        </div>
      ) : (
        <>
          <Tabs
        defaultActiveKey="top-user-overall"
        id="fill-tab-example"
        className="mb-3"
        fill
      >
        <Tab eventKey="top-user-overall" title="Lifetime Points">
          <Lifetime lifetime={lifetime}/>
          <BottomLifetime bottom={bottom}/>
        </Tab>
        <Tab eventKey="bottom-user-overall" title="Available Points">
          <Available available={available}/>
          <BottomAvailable bottomAvailable={bottomAvailable} />
        </Tab>
        <Tab eventKey="top-points-earned" title="Annual Points">
        <AnnualPoint annual={annual}/>
        <BottomAnnualPoint bAnnual={bAnnual}/>
        </Tab>
        <Tab eventKey="bottom-points-earned" title="Monthly Points">
          <MonthlyPoint monthly={monthly} />
          <BottomMonthly bottmMonthly={bottmMonthly} />
        </Tab>
       
      </Tabs>
        </>
      )}
     
      </div>
    </div>
  );
};

export default Membershipdash;
