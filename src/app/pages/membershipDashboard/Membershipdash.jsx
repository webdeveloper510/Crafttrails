import React, { useEffect, useState } from "react";
import { adminMembershipData } from "../../../utils/Api";

const Membershipdash = () => {
  const [data, setData] = useState([]);

  const getlinkuser = () => {
    adminMembershipData()
      .then((res) => {
        console.log("user link--------------", res);
        setData(res.data);
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
      <h1>Membership Dashboard</h1>
      <div>
        {/* <table className="table">
          <thead>
            <tr className="border-bottom">
              <th scope="col">#</th>
              <th scope="col">First</th>
              <th scope="col">Last</th>
              <th scope="col">Handle</th>
            </tr>
          </thead>
          {data?.length > 0
            ? data?.map((item, i) => {
                return (
                  <tbody>
                    <tr className="border-bottom" key={i}>
                      <th scope="row">{item.bottom_points_earned.participant}</th>
                      <td>Mark</td>
                      <td>Otto</td>
                      <td>@mdo</td>
                    </tr>
                  </tbody>
                );
              })
            : ""}
        </table> */}
      </div>
    </div>
  );
};

export default Membershipdash;
