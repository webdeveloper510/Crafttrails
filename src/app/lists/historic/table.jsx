/*eslint-disabled*/
// eslint-disable-next-line @typescript-eslint/no-unused-expressions
import  { useState, useEffect } from "react";
import { Breadcrumb } from "react-bootstrap";
import { getHistoricParticipant, getParticipantExport, getParticipantList, getuserProfile } from "../../../utils/Api";
import DynamicTable from "../../modules/table";
import Papa from "papaparse";


const HistoricTable = () => {

  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState("")
  const url = window?.location?.pathname?.split("/")?.[3]?.replaceAll("%20", " ")
  console.log("location urllllllllllllllllllll", url)

  const getuserdata =()=>{
    getuserProfile().then((res)=>{
      console.log("res user profile data====", res)
      setData(res?.data?.[0]?.listexport)
    }).catch((error)=>{
      console.log(error)
    })
  }

  useEffect(() => {
    setLoading(true)
    console.log("getHistoricParticipanttttttttttttttttttttt", url)

    getHistoricParticipant(url).then(res => {
        console.log("getHistoricParticipanttttttttttttttttttttt", res?.data)
      setLoading(false)
      if (res.code === 200) {
        setList(res?.data)
      }
    }).catch((error)=>{
      setLoading(false)
    })
    getuserdata()
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
      <Breadcrumb className="display-6 mb-4">
        <Breadcrumb.Item href="#"><span style={{ color: "#000" }}>Lists</span></Breadcrumb.Item>
        <Breadcrumb.Item active><span style={{ color: "#ef305e" }}>Participants {url ? url : ""}</span></Breadcrumb.Item>
      </Breadcrumb>
      {/* <div className="text-end me-5">
         {
          data == true ?
          <button className="export-btn" onClick={handleDownload}>Export</button>
          :""
         }
         </div> */}
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

export default HistoricTable;

