import React, { useEffect, useState } from "react";
import { AdminUserStatus, adminUserList, editUserLocation, getuserlist } from "../../utils/Api";
import DataTable from "react-data-table-component";
// import SortIcon from "@material-ui/icons/ArrowDownward";
import DataTableExtensions from "react-data-table-component-extensions";
import "react-data-table-component-extensions/dist/index.css";
import { toast } from 'react-toastify';
import Modal from 'react-bootstrap/Modal';
import { Button } from 'react-bootstrap'


const UserList = () => {

  const [show, setShow] = useState(false);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editdata, setEditdata] = useState({
    id:"",
    location :""
  })

  const handleClose = () => setShow(false);

  const getadminList = () => {
    setLoading(true);
    adminUserList()
      .then((res) => {
        setLoading(false);
        console.log("response-------$$$$$$$$$------------", res);
        if (res.code == 200) {
          const val = res.data;
          setData(val);
        }
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };

  useEffect(() => {
    getadminList();
  }, []);

  const handleStatus =(val, id)=>{
   AdminUserStatus(id,{status:val}).then((res)=>{
    console.log("responseeeeeeeeeee", res)
    if(res.code == 200){
      getadminList();
      toast.success(res.data, { position: "top-right", autoClose: 2000, theme: "colored" });

    }else{
      toast.error("Status does not updated", { position: "top-right", autoClose: 2000, theme: "colored" });
     
    }
   }).catch((error)=>{
    console.log(error)
   })
  }

  const handleEditLocation =(item)=>{
    console.log("itemmmmmmmmmmmmmmmmmmmmmmmmmmmmm", item)
    setShow(true)
    getuserlist(item.id).then((response)=>{
      console.log("responseeeeeeeeeeeeeee", response)
      if(response?.code == 200){
        setEditdata({
          id : item.id,
          location : response?.data?.location
        })
      }
    }).catch((error)=>{
      console.log(error)
    })
  }

  const handleLocation =(e)=>{
    console.log(e.target.value)
    setEditdata({
      ...editdata,
      [e.target.name] : e.target.value
    })
  }

  const handleChangeLocation=()=>{
   console.log("locationnnnnnnnnnnnnnnn", editdata)
   let id = editdata.id
   editUserLocation(id, {
    location : editdata.location
   }).then((res)=>{
    console.log("successss update location-------------", res)
    if(res?.code == 200){
      toast.success(res?.data, { position: "top-right", autoClose: 2000, theme: "colored" });
      setShow(false)
    }else{
      toast.error(res?.error, { position: "top-right", autoClose: 2000, theme: "colored" });
    }
   }).catch((error)=>{
    console.log(error)
   })
  }

  const columns = [
    {
      name: "Id",
      selector: "id",
      sortable: true,
    },
    {
      name: "First Name",
      selector: "first_name",
      sortable: true,
    },
    {
      name: "Last Name",
      selector: "last_name",
      sortable: true,
    },
    {
      name: "Email",
      selector: "email",
      sortable: true,
    },
    {
      name: "Action",
      selector: "status",
      sortable: true,
      cell: (d) =>
        d.status == true ? (
         <> 
         <i className="bi bi-pencil-square edit-btn" onClick={()=>handleEditLocation(d)}></i>
         <button className="activebtn" onClick={()=>handleStatus(false, d.id)}>Active</button> 
         
         </>
        ) : (
          <>
          <i className="bi bi-pencil-square edit-btn" onClick={()=>handleEditLocation(d)}></i>
          <button className="inactivebtn" onClick={()=>handleStatus(true , d.id)}>Inactive</button>
          </>
        )
        
    },
  ];

  const tableData = {
    columns,
    data,
  };

  return (
    <>
      <div>
        <h1>Admin Dashboard</h1>
        {loading ? (
          <div className="loader-overly">
            <div className="loader"></div>
          </div>
        ) : (
          <>
            <DataTableExtensions print={false} export={false} {...tableData}>
              <DataTable
                columns={columns}
                data={data}
                noHeader
                defaultSortField="id"
                //   sortIcon={<SortIcon />}
                defaultSortAsc={true}
                pagination
                highlightOnHover
                dense
              />
            </DataTableExtensions>
          </>
        )}
      </div>
      <Modal centered show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <div className="text-center">
            <h2>Edit Your Location</h2>
          </div>
        </Modal.Header>
        <Modal.Body>
          <h6 className="mt-3">Location Id</h6>
          <input type="text" name="location" className="form-control" value={editdata?.location} onChange={(e)=>handleLocation(e)} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button> 
          <Button variant="primary" onClick={()=>handleChangeLocation()}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default UserList;
