import React, { useEffect, useState } from "react";
import { AdminUserStatus, adminUserList } from "../../utils/Api";
import DataTable from "react-data-table-component";
// import SortIcon from "@material-ui/icons/ArrowDownward";
import DataTableExtensions from "react-data-table-component-extensions";
import "react-data-table-component-extensions/dist/index.css";
import { toast } from 'react-toastify';


const UserList = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

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
          <button className="active" onClick={()=>handleStatus(false, d.id)}>Active</button>
        ) : (
          <button className="inactive" onClick={()=>handleStatus(true , d.id)}>Inactive</button>
        ),
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
    </>
  );
};

export default UserList;
