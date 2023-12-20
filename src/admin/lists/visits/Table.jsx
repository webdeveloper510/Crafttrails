/*eslint-disabled*/
// eslint-disable-next-line @typescript-eslint/no-unused-expressions

import { useState, useEffect } from "react";
import { Breadcrumb } from "react-bootstrap";
import {  getVisitListadmin } from "../../../utils/Api";
import DynamicTable from "../../table";
import Papa from "papaparse";



const VisitsTable = ({passport}) => {

  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    getVisitListadmin(passport).then(res => {
      setLoading(false)
      if (res.code === 200) {
        setList(res?.data)
      }
    }).catch((error)=>{
      setLoading(false)
    })
  }, []);

  const handleDownload = () => {
    const filename = "trail.csv"
    const modifiedData = list.map(({ title_submenu, ...rest }) => rest);
    const csv = Papa.unparse(modifiedData);
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
        <Breadcrumb.Item active><h1 style={{ color: "#ef305e" }}>Visits</h1></Breadcrumb.Item>
      </Breadcrumb> */}
      <div>
        {
          loading ? (
            <div className="loader-overly">
              <div className="loader" >
              </div>
            </div>
          ) : (
            <>
           
              {
                list && list.length > 0 ? 
                <>
                 <div className="text-end me-5">
                    <button className="export-btn" onClick={handleDownload}>
                      Export
                    </button>
                  </div>
                <DynamicTable data={list} /> 
                </>
                : "No Record Found!!"
              }
            </>
          )
        }
      </div>
    </div>
  );
};

export default VisitsTable;

