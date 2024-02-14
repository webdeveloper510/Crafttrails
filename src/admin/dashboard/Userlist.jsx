import React, { useEffect, useState } from "react";
import {
  AdminUserStatus,
  Adminlistexport,
  Adminlistshow,
  adminUserList,
  deletUser,
  editUserLocation,
  getuserlist,
} from "../../utils/Api";
import DataTable from "react-data-table-component";
// import SortIcon from "@material-ui/icons/ArrowDownward";
import DataTableExtensions from "react-data-table-component-extensions";
import "react-data-table-component-extensions/dist/index.css";
import { toast } from "react-toastify";
import Modal from "react-bootstrap/Modal";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const UserList = () => {
  const navigate = useNavigate();
  const [delet, setDelet] = useState(false);
  const [show, setShow] = useState(false);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editdata, setEditdata] = useState({
    id: "",
    location: "",
  });

  const handleClose = () => setShow(false);

  const handleDelClose = () => {
    setDelet(false);
    console.log(delet);
  };

  const handleDeletUser = (id) => {
    console.log("delet id", id);
    deletUser(id)
      .then((res) => {
        console.log("resssssssss delet success", res);
        if (res.code == 200) {
          toast.success(res?.message, {
            position: "top-right",
            autoClose: 2000,
            theme: "colored",
          });
          getadminList();
          setDelet(false);
        } else {
          toast.error(res?.error, {
            position: "top-right",
            autoClose: 2000,
            theme: "colored",
          });
          setDelet(false);
        }
        getadminList();
      })
      .catch((error) => {
        console.log(error);
      });
  };

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

  const handleStatus = (val, id) => {
    AdminUserStatus(id, { status: val })
      .then((res) => {
        console.log("responseeeeeeeeeee", res);
        if (res.code == 200) {
          getadminList();
          toast.success(res.data, {
            position: "top-right",
            autoClose: 2000,
            theme: "colored",
          });
        } else {
          toast.error("Status does not updated", {
            position: "top-right",
            autoClose: 2000,
            theme: "colored",
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleEditLocation = (item) => {
    console.log("itemmmmmmmmmmmmmmmmmmmmmmmmmmmmm", item);
    setShow(true);
    getuserlist(item.id)
      .then((response) => {
        console.log("responseeeeeeeeeeeeeee", response);
        if (response?.code == 200) {
          setEditdata({
            id: item.id,
            location: response?.data?.location,
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleLocation = (e) => {
    console.log(e.target.value);
    setEditdata({
      ...editdata,
      [e.target.name]: e.target.value,
    });
  };

  const handleChangeLocation = () => {
    console.log("locationnnnnnnnnnnnnnnn", editdata);
    let id = editdata.id;
    editUserLocation(id, {
      location: editdata.location,
    })
      .then((res) => {
        console.log("successss update location-------------", res);
        if (res?.code == 200) {
          toast.success(res?.data, {
            position: "top-right",
            autoClose: 2000,
            theme: "colored",
          });
          setShow(false);
        } else {
          toast.error(res?.error, {
            position: "top-right",
            autoClose: 2000,
            theme: "colored",
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleShowData = (item) => {
    console.log("itemssssssss", item);
    navigate(`/overall-points/${item.brewery}`);
    localStorage.setItem("user-email", item.email)
  };

  const handledelete = (item) => {
    console.log("delete item---------", item.id);
    setDelet(item.id);
  };

  const handleListShow =(val, id)=>{
    Adminlistshow(id, { listshow : val })
    .then((res) => {
      console.log("responseeeeeeeeeee", res);
      if (res.code == 200) {
        getadminList();
        toast.success(res.data, {
          position: "top-right",
          autoClose: 2000,
          theme: "colored",
        });
      } else {
        toast.error("Status does not updated", {
          position: "top-right",
          autoClose: 2000,
          theme: "colored",
        });
      }
    })
    .catch((error) => {
      console.log(error);
    });
  }

  const handleListExport =(val , id)=>{
    console.log(id, val)
    Adminlistexport(id, { listexport : val })
    .then((res) => {
      console.log("responseeeeeeeeeee", res);
      if (res.code == 200) {
        getadminList();
        toast.success(res.data, {
          position: "top-right",
          autoClose: 2000,
          theme: "colored",
        });
      } else {
        toast.error(res.error, {
          position: "top-right",
          autoClose: 2000,
          theme: "colored",
        });
      }
    })
    .catch((error) => {
      console.log(error);
    });
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
      name: "Status",
      selector: "status",
      sortable: true,
      cell: (d) =>
        d.status == true ? (
          <>
            <button
              className="activebtn"
              onClick={() => handleStatus(false, d.id)}
            >
              Active
            </button>
          </>
        ) : (
          <>
            <button
              className="inactivebtn"
              onClick={() => handleStatus(true, d.id)}
            >
              Inactive
            </button>
          </>
        ),
    },
    {
      name: "Action",
      cell: (d) => (
        <>
          <i
            className="bi bi-pencil-square edit-btn"
            onClick={() => handleEditLocation(d)}
          ></i>
          <i
            className="bi bi-trash-fill delete-btn"
            onClick={() => handledelete(d)}
          ></i>
        </>
      ),
    },
    {
      name: "Overall Points",
      cell: (d) => (
        <i
          className="bi bi-eye-fill ms-5 eye-btn"
          style={{ marginLeft: "10px" }}
          onClick={() => handleShowData(d)}
        ></i>
      ),
    },
    {
      name: "List Show",
      selector: "listshow",
      sortable: true,
      cell: (d) =>
        d.listshow == true ? (
          <>
            <i
              class="bi bi-toggle2-on"
              style={{
                color: "green",
                fontSize: "25px",
                marginLeft: "10px",
                cursor: "pointer",
              }}
              onClick={() => handleListShow(false, d.id)}
            ></i>
          </>
        ) : (
          <>
            <i
              class="bi bi-toggle2-off"
              style={{
                color: "red",
                fontSize: "25px",
                marginLeft: "10px",
                cursor: "pointer",
              }}
              onClick={() => handleListShow(true, d.id)}
            ></i>
          </>
        ),
    },
    {
      name: "List Export",
      selector: "listexport",
      sortable: true,
      cell: (d) =>
        d.listexport == true ? (
          <>
            <i
              class="bi bi-toggle2-on"
              style={{
                color: "green",
                fontSize: "25px",
                marginLeft: "10px",
                cursor: "pointer",
              }}
              onClick={() => handleListExport(false, d.id)}
            ></i>
          </>
        ) : (
          <>
            <i
              class="bi bi-toggle2-off"
              style={{
                color: "red",
                fontSize: "25px",
                marginLeft: "10px",
                cursor: "pointer",
              }}
              onClick={() => handleListExport(true, d.id)}
            ></i>
          </>
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
        <h1>User List</h1>
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
                paginationPerPage={50}
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
          <input
            type="text"
            name="location"
            className="form-control"
            value={editdata?.location}
            onChange={(e) => handleLocation(e)}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={() => handleChangeLocation()}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal centered show={delet} onHide={handleDelClose}>
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body className="text-center">
          <h2 style={{ color: "black" }} className="mt-3">
            Are You Sure
          </h2>
          <h6 className="my-4">You want to delete this User</h6>
          <Button
            variant="primary"
            className="mx-2 my-3"
            onClick={() => handleDeletUser(delet)}
          >
            Delete
          </Button>
          <Button
            variant="secondary"
            className="mx-2 my-3"
            onClick={handleDelClose}
          >
            Cancel
          </Button>
        </Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal>
    </>
  );
};

export default UserList;
