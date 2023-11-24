/*eslint-disabled*/
// eslint-disable-next-line @typescript-eslint/no-unused-expressions

import  { useState, useEffect } from "react";
import { Breadcrumb } from "react-bootstrap";
import { getParticipantList, getParticipantPoints } from "../../../utils/Api";
import DynamicTable from "../../table";

const ParticipantTable = ({passport}) => {

  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    getParticipantPoints(passport).then(res => {
      setLoading(false)
      if (res.code === 200) {
        setList(res?.data)
      }
    }).catch((error)=>{
      setLoading(false)
    })
  }, []);

  return (
    <div>
      {/* <Breadcrumb>
        <Breadcrumb.Item href="#"><span style={{ color: "#000" }}>Lists</span></Breadcrumb.Item>
        <Breadcrumb.Item active><h1 style={{ color: "#ef305e" }}>Participants</h1></Breadcrumb.Item>
      </Breadcrumb> */}
      {
        loading ? (
          <div className="loader-overly">
            <div className="loader" >
            </div>
          </div>
        ) : (
          <>
            {
              list && list.length > 0 ? <DynamicTable data={list} /> : "No Record Found!!"
            }
          </>
        )
      }
    </div>
  );
};

export default ParticipantTable;

