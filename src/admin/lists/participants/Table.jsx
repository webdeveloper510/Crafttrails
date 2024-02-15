/*eslint-disabled*/
// eslint-disable-next-line @typescript-eslint/no-unused-expressions

import { useState, useEffect } from "react";
import { Breadcrumb } from "react-bootstrap";
import { getParticipantList, getParticipantPoints } from "../../../utils/Api";
import DynamicTable from "../../table";
import Papa from "papaparse";


const ParticipantTable = ({ passport }) => {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getParticipantPoints(passport)
      .then((res) => {
        setLoading(false);
        if (res.code === 200) {
          setList(res?.data);
        }
      })
      .catch((error) => {
        setLoading(false);
      });
  }, []);

  const handleDownload = () => {    
    const newdata = list.map(({ title_submenu, phone_number, ...rest }) => ({
      ...rest,
      phone_number: phone_number && phone_number.length > 0 ? phone_number[0].phone_number : '',
    }));
    const filename = "trail.csv"
    const csv = Papa.unparse(newdata);
    const blob = new Blob([csv], { type: 'text/csv' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  

  return (
    <div>
      {/* <Breadcrumb>
        <Breadcrumb.Item href="#"><span style={{ color: "#000" }}>Lists</span></Breadcrumb.Item>
        <Breadcrumb.Item active><h1 style={{ color: "#ef305e" }}>Participants</h1></Breadcrumb.Item>
      </Breadcrumb> */}

      {loading ? (
        <div className="loader-overly">
          <div className="loader"></div>
        </div>
      ) : (
        <>
          {list && list.length > 0 ? (
            <>
              <div className="text-end me-5">
                <button className="export-btn" onClick={handleDownload}>Export</button>
              </div>
              <DynamicTable data={list} />
            </>
          ) : (
            "No Record Found!!"
          )}
        </>
      )}
    </div>
  );
};

export default ParticipantTable;
