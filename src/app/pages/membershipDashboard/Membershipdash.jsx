import React, { useEffect, useState } from "react";
import { adminMembershipData } from "../../../utils/Api";
import Table from "react-bootstrap/Table";

const Membershipdash = () => {

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const getlinkuser = () => {
    setLoading(true);
    adminMembershipData()
      .then((res) => {
        setLoading(false)
        console.log("user link--------------", res);
        if(res.code == 200){
          setData(res.data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getlinkuser();
  }, []);

  return (
    <div>
      <div style={{ marginTop: "40px" }}>
      {loading ? (
        <div className="loader-overly">
          <div className="loader"></div>
        </div>
      ) : (
        <>
           <div className="row">
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
              {data?.length > 0
                ? data?.map((item, i) => {
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
                          <td>{item.top_user_overall.master_id}</td>
                          <td>{item.top_user_overall.participant}</td>
                          <td>{item.top_user_overall.points}</td>
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
              {data?.length > 0
                ? data?.map((item, i) => {
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
                          <td>{item.bottom_user_overall.master_id}</td>
                          <td>{item.bottom_user_overall.participant}</td>
                          <td>{item.bottom_user_overall.points}</td>
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
              {data?.length > 0
                ? data?.map((item, i) => {
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
                          <td>{item.top_points_earned.master_id}</td>
                          <td>{item.top_points_earned.participant}</td>
                          <td>{item.top_points_earned.points}</td>
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
              {data?.length > 0
                ? data?.map((item, i) => {
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
                          <td>{item.bottom_points_earned.master_id}</td>
                          <td>{item.bottom_points_earned.participant}</td>
                          <td>{item.bottom_points_earned.points}</td>
                        </tr>
                      </tbody>
                    );
                  })
                : ""}
            </Table>
          </div>
        </div>
        </>
      )}
     
      </div>
    </div>
  );
};

export default Membershipdash;
