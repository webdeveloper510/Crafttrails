import React, { useEffect, useState } from "react";
import { adminMembershipData } from "../../../utils/Api";
import Table from "react-bootstrap/Table";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import Lifetime from "./Allpoints/Lifetime";
import Available from "./Allpoints/Available";
import AnnualPoint from "./Allpoints/Annual";
import MonthlyPoint from "./Allpoints/Monthly";

const Membershipdash = () => {

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const getlinkuser = () => {
    setLoading(true);
    adminMembershipData()
      .then((res) => {
        setLoading(false)
        // console.log("membership dashboard--------------", res);
        if(res.code == 200){
          setData(res.data?.[0]);
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
          <Lifetime/>
        {/* <div className="px-5 py-5" style={{width:"85%", margin:"auto"}}>
            <Table striped bordered hover responsive>
              <thead>
                <th
                  colSpan={3}
                  style={{
                    border: "1px solid gray",
                    textAlign: "center",
                    padding: "15px 0px",
                    fontSize: "20px",
                    fontWeight:600,
                    color:"black"
                  }}
                >
                  Top User Overall
                </th>
                <tr style={{ border: "1px solid gray", textAlign: "center" }}>
                  <th>Master Id</th>
                  <th>Participant</th>
                  <th>Point</th>
                </tr>
              </thead>
              {data?.top_user_overall?.length > 0
                ? data?.top_user_overall?.map((item, i) => {
                    return (
                      <tbody>
                        <tr
                          key={i}
                          style={{
                            border: "1px solid gray",
                            textAlign: "center",
                            background: "#98d0fb"
                          }}
                        >
                          <td>{item.master_id}</td>
                          <td>{item.participant}</td>
                          <td>{item.points}</td>
                        </tr>
                      </tbody>
                    );
                  })
                : ""}
            </Table>
          </div> */}
        </Tab>
        <Tab eventKey="bottom-user-overall" title="Available Point">
          <Available/>
        {/* <div className="px-5 py-5" style={{width:"85%", margin:"auto"}}>
            <Table striped bordered hover>
              <thead>
                <th
                  colSpan={3}
                  style={{
                    border: "1px solid gray",
                    textAlign: "center",
                    padding: "15px 0px",
                    fontSize: "20px",
                    fontWeight:600,
                    color:"black"
                  }}
                >
                  Bottom User Overall
                </th>
                <tr style={{ border: "1px solid gray", textAlign: "center" }}>
                  <th>Master Id</th>
                  <th>Participant</th>
                  <th>Point</th>
                </tr>
              </thead>
              {data?.bottom_user_overall?.length > 0
                ? data?.bottom_user_overall?.map((item, i) => {
                    return (
                      <tbody>
                        <tr
                          key={i}
                          style={{
                            border: "1px solid gray",
                            textAlign: "center",
                            background: "#98d0fb"
                          }}
                        >
                          <td>{item.master_id}</td>
                          <td>{item.participant}</td>
                          <td>{item.points}</td>
                        </tr>
                      </tbody>
                    );
                  })
                : ""}
            </Table>
          </div> */}
        </Tab>
        <Tab eventKey="top-points-earned" title="Annual Points">
        <AnnualPoint/>
        {/* <div className="px-5 py-5" style={{width:"85%", margin:"auto"}}>
            <Table striped bordered hover>
              <thead>
                <th
                  colSpan={3}
                  style={{
                    border: "1px solid gray",
                    textAlign: "center",
                    padding: "15px 0px",
                    fontSize: "20px",
                    fontWeight:600,
                    color:"black"
                  }}
                >
                  Top Points Earned
                </th>
                <tr style={{ border: "1px solid gray", textAlign: "center" }}>
                  <th>Master Id</th>
                  <th>Participant</th>
                  <th>Point</th>
                </tr>
              </thead>
              {data?.top_points_earned?.length > 0
                ? data?.top_points_earned?.map((item, i) => {
                    return (
                      <tbody>
                        <tr
                          key={i}
                          style={{
                            border: "1px solid gray",
                            textAlign: "center",
                            background: "#98d0fb"
                          }}
                        >
                          <td>{item.master_id}</td>
                          <td>{item.participant}</td>
                          <td>{item.points}</td>
                        </tr>
                      </tbody>
                    );
                  })
                : ""}
            </Table>
          </div> */}
        </Tab>
        <Tab eventKey="bottom-points-earned" title="Monthly Points">
          <MonthlyPoint/>
        {/* <div className="px-5 py-5" style={{width:"85%", margin:"auto"}}>
            <Table striped bordered hover>
              <thead>
                <th
                  colSpan={3}
                  style={{
                    border: "1px solid gray",
                    textAlign: "center",
                    padding: "15px 0px",
                    fontSize: "20px",
                    fontWeight:600,
                    color:"black"
                  }}
                >
                  Bottom Points Earned
                </th>
                <tr style={{ border: "1px solid gray", textAlign: "center" }}>
                  <th>Master Id</th>
                  <th>Participant</th>
                  <th>Point</th>
                </tr>
              </thead>
              {data?.bottom_points_earned?.length > 0
                ? data?.bottom_points_earned?.map((item, i) => {
                    return (
                      <tbody>
                        <tr
                          key={i}
                          style={{
                            border: "1px solid gray",
                            textAlign: "center",
                            background: "#98d0fb"
                          }}
                        >
                          <td>{item.master_id}</td>
                          <td>{item.participant}</td>
                          <td>{item.points}</td>
                        </tr>
                      </tbody>
                    );
                  })
                : ""}
            </Table>
          </div> */}
        </Tab>
       
      </Tabs>
           {/* <div className="row">
           <div className="col-md-6 px-5 py-5">
            <Table striped bordered hover responsive>
              <thead>
                <th
                  colSpan={3}
                  style={{
                    border: "1px solid gray",
                    textAlign: "center",
                    padding: "15px 0px",
                    fontSize: "20px",
                    fontWeight:600,
                    color:"gray"
                  }}
                >
                  Top User Overall
                </th>
                <tr style={{ border: "1px solid gray", textAlign: "center" }}>
                  <th>Master Id</th>
                  <th>Participant</th>
                  <th>Point</th>
                </tr>
              </thead>
              {data?.top_user_overall?.length > 0
                ? data?.top_user_overall?.map((item, i) => {
                    return (
                      <tbody>
                        <tr
                          key={i}
                          style={{
                            border: "1px solid gray",
                            textAlign: "center",
                            background: "#98d0fb"
                          }}
                        >
                          <td>{item.master_id}</td>
                          <td>{item.participant}</td>
                          <td>{item.points}</td>
                        </tr>
                      </tbody>
                    );
                  })
                : ""}
            </Table>
          </div>
          <div className="col-md-6 px-5 py-5">
            <Table striped bordered hover>
              <thead>
                <th
                  colSpan={3}
                  style={{
                    border: "1px solid gray",
                    textAlign: "center",
                    padding: "15px 0px",
                    fontSize: "20px",
                    fontWeight:600,
                    color:"gray"
                  }}
                >
                  Bottom User Overall
                </th>
                <tr style={{ border: "1px solid gray", textAlign: "center" }}>
                  <th>Master Id</th>
                  <th>Participant</th>
                  <th>Point</th>
                </tr>
              </thead>
              {data?.bottom_user_overall?.length > 0
                ? data?.bottom_user_overall?.map((item, i) => {
                    return (
                      <tbody>
                        <tr
                          key={i}
                          style={{
                            border: "1px solid gray",
                            textAlign: "center",
                            background: "#98d0fb"
                          }}
                        >
                          <td>{item.master_id}</td>
                          <td>{item.participant}</td>
                          <td>{item.points}</td>
                        </tr>
                      </tbody>
                    );
                  })
                : ""}
            </Table>
          </div>
          <div className="col-md-6 px-5 py-5">
            <Table striped bordered hover>
              <thead>
                <th
                  colSpan={3}
                  style={{
                    border: "1px solid gray",
                    textAlign: "center",
                    padding: "15px 0px",
                    fontSize: "20px",
                    fontWeight:600,
                    color:"gray"
                  }}
                >
                  Top Points Earned
                </th>
                <tr style={{ border: "1px solid gray", textAlign: "center" }}>
                  <th>Master Id</th>
                  <th>Participant</th>
                  <th>Point</th>
                </tr>
              </thead>
              {data?.top_points_earned?.length > 0
                ? data?.top_points_earned?.map((item, i) => {
                    return (
                      <tbody>
                        <tr
                          key={i}
                          style={{
                            border: "1px solid gray",
                            textAlign: "center",
                            background: "#98d0fb"
                          }}
                        >
                          <td>{item.master_id}</td>
                          <td>{item.participant}</td>
                          <td>{item.points}</td>
                        </tr>
                      </tbody>
                    );
                  })
                : ""}
            </Table>
          </div>
          <div className="col-md-6 px-5 py-5">
            <Table striped bordered hover>
              <thead>
                <th
                  colSpan={3}
                  style={{
                    border: "1px solid gray",
                    textAlign: "center",
                    padding: "15px 0px",
                    fontSize: "20px",
                    fontWeight:600,
                    color:"gray"
                  }}
                >
                  Bottom Points Earned
                </th>
                <tr style={{ border: "1px solid gray", textAlign: "center" }}>
                  <th>Master Id</th>
                  <th>Participant</th>
                  <th>Point</th>
                </tr>
              </thead>
              {data?.bottom_points_earned?.length > 0
                ? data?.bottom_points_earned?.map((item, i) => {
                    return (
                      <tbody>
                        <tr
                          key={i}
                          style={{
                            border: "1px solid gray",
                            textAlign: "center",
                            background: "#98d0fb"
                          }}
                        >
                          <td>{item.master_id}</td>
                          <td>{item.participant}</td>
                          <td>{item.points}</td>
                        </tr>
                      </tbody>
                    );
                  })
                : ""}
            </Table>
          </div>
        </div> */}
        </>
      )}
     
      </div>
    </div>
  );
};

export default Membershipdash;
