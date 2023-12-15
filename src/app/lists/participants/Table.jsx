/*eslint-disabled*/
// eslint-disable-next-line @typescript-eslint/no-unused-expressions

import  { useState, useEffect } from "react";
import { Breadcrumb } from "react-bootstrap";
import { getParticipantExport, getParticipantList, getuserProfile } from "../../../utils/Api";
import DynamicTable from "../../modules/table";

const ParticipantTable = () => {

  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState("")

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
    getParticipantList().then(res => {
      setLoading(false)
      if (res.code === 200) {
        setList(res?.data)
      }
    }).catch((error)=>{
      setLoading(false)
    })
    getuserdata()
  }, []);

  const handleDownload = ()=>{
    getParticipantExport().then((res)=>{
      console.log("get trails export dataaaaaaaaaa", res)
      if(res.code == 200){
        const fileUrl = res?.file_url

        fetch(fileUrl)
          .then(response => response.blob())
          .then(blob => {
            const url = window.URL.createObjectURL(new Blob([blob]));
            const a = document.createElement('a');
            a.href = url;
            a.download = 'participant.csv'; // specify the name for the downloaded file
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);
          })
          .catch(error => console.error('Error downloading file:', error)); 
      }      
    }).catch((error)=>{
      console.log(error)
    })
  } 

  return (
    <div>
      <Breadcrumb className="display-6 mb-4">
        <Breadcrumb.Item href="#"><span style={{ color: "#000" }}>Lists</span></Breadcrumb.Item>
        <Breadcrumb.Item active><span style={{ color: "#ef305e" }}>Participants</span></Breadcrumb.Item>
      </Breadcrumb>
      <div className="text-end me-5">
         {
          data == true ?
          <button className="export-btn" onClick={handleDownload}>export</button>
          :""
         }
         </div>
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

