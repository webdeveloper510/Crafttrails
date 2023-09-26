/*eslint-disabled*/
// eslint-disable-next-line @typescript-eslint/no-unused-expressions

import React, { useState, useEffect } from "react";
// import { createUser } from "../../modules/apps/user-management/users-list/core/_requests";
import { Modal, Table } from "react-bootstrap";
import { createUser, deleteUser, getUserData, editUser, getTrailList, getParticipantList } from "../../../utils/Api";
import { toast } from 'react-toastify';

const ParticipantTable = () => {

  const [data, setData] = useState({ first_name: "", last_name: "", email: "" });
  const [list, setList] = useState([]);
  const [addModal, setAddModal] = useState(false)
  const [delModal, setDelModal] = useState(false)
  const [delId, setDelID] = useState('')
  const [toggle, setToggle] = useState(false)
  const [editMode, setEditMode] = useState(false)
  useEffect(() => {
    getParticipantList().then(res => {
      console.log(res)
      if (res.code === 200) {
        setList(res?.data)
      }

      // setList(arr)
    })
    setToggle(false)
  }, [addModal, toggle]);

  const addUser = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const saveData = () => {
    createUser(data).then(res => {
      if (res.code === 200) {
        toast.success('User Add Successfully', { position: "top-right", autoClose: 2000, theme: "colored" });
        setAddModal(false)
        setData({ first_name: "", last_name: "", email: "" });
      } else if (res.code === 201) {
        toast.error(res.message, { position: "top-right", autoClose: 2000, theme: "colored" });

      }
    })
    // console.log(data);
  };

  const handleEdit = (id) => {
    console.log('id', id)
    getUserData(id).then(res => {
      console.log(res)
      if (res.code === 200) {
        // setData(res.result)
        setData({ ...data, first_name: res.result.first_name, last_name: res.result.last_name, email: res.result.email, userId: res.result.id });
        setEditMode(true)
        setAddModal(true)

      } else if (res.code === 201) {
        toast.error(res.message, { position: "top-right", autoClose: 2000, theme: "colored" });

      }
    })
  }

  const setModalClose = () => {
    setAddModal(false)
    setEditMode(false)
    setData({ first_name: "", last_name: "", email: "" });

  }

  const UpdateUser = () => {
    editUser(data).then(res => {
      console.log(res)
      if (res.code === 200) {
        setEditMode(false)
        setModalClose()
        toast.success('User Update Successfully', { position: "top-right", autoClose: 2000, theme: "colored" });
      } else if (res.code === 201) {
        toast.error(res.message, { position: "top-right", autoClose: 2000, theme: "colored" });

      }
    })
  }

  const handleAddUser = () => {
    setAddModal(true);
    setEditMode(false)
    setData({ first_name: "", last_name: "", email: "" });

  }
  const handleDelete = () => {
    console.log('handleDelete', delId)
    deleteUser(delId).then(res => {
      console.log(res)
      if (res.code === 200) {
        toast.success('User Delete Successfully', { position: "top-right", autoClose: 2000, theme: "colored" });
        setToggle(true)
        setDelModal(false)
      } else if (res.code === 201) {
        setDelModal(false)
        toast.error(res.message, { position: "top-right", autoClose: 2000, theme: "colored" });

      }
    })

  }

  const FormatedDate = (val) => {
    let d = new Date(val)
    let date = d.getDate() + "-" + d.getMonth() + "-" + d.getFullYear()
    return date
  }

  return (
    <div>
      {/* <div className="text-end mb-3 mt-5">
        <button
          type="button"
          className="btn btn-primary"
          onClick={() => handleAddUser()}
        >
          Add Record
        </button>
      </div> */}

      <Modal show={addModal} onHide={() => setAddModal(false)}>
        <div className="modal-header">
          <h5 className="modal-title" id="exampleModalLabel">
            {editMode ? 'Edit User' : 'Add User'}
          </h5>
          <button
            type="button"
            className="btn-close"
            onClick={() => setModalClose(false)}
          ></button>
        </div>
        <div className="modal-body text-start">
          <input
            type="text"
            placeholder="First Name"
            className="form-control mx-2 my-3"
            name="first_name"
            autoComplete="off"
            value={data.first_name}
            onChange={(e) => addUser(e)}
          />
          <input
            type="text"
            placeholder="Last Name"
            className="form-control mx-2 my-3"
            name="last_name"
            autoComplete="off"
            value={data.last_name}
            onChange={(e) => addUser(e)}
          />
          {editMode ? '' : (<input
            type="text"
            placeholder="email"
            className="form-control mx-2 my-3"
            name="email"
            autoComplete="off"
            value={data.email}
            onChange={(e) => addUser(e)}
          />)}

        </div>
        <div className="modal-footer">

          {editMode ?

            <button
              type="button"
              className="btn btn-primary"
              data-bs-dismiss="modal"
              onClick={() => UpdateUser()}
            >
              Update
            </button>
            :
            <button
              type="button"
              className="btn btn-primary"
              data-bs-dismiss="modal"
              onClick={() => saveData()}
            >
              Add
            </button>
          }

        </div>
      </Modal>

      <Modal show={delModal} onHide={() => setDelModal(false)}>
        <div className="modal-header">
          <h5 className="modal-title" id="exampleModalLabel">
            Delete User
          </h5>
          <button
            type="button"
            className="btn-close"
            onClick={() => setDelModal(false)}
          ></button>
        </div>
        <div className="modal-body text-start">

          Are You Sure ? You want to delete this user

        </div>
        <div className="modal-footer">


          <button
            type="button"
            className="btn btn-primary"
            data-bs-dismiss="modal"
            onClick={() => handleDelete()}
          >
            Yes
          </button>
          <button
            type="button"
            className="btn btn-danger"
            data-bs-dismiss="modal"
            onClick={() => setDelModal(false)}
          >
            No
          </button>

        </div>
      </Modal>
      <div className="table-responsive">
        <Table className="table text-center">
          <thead className="table-dark ">
            <tr>
              <th>Sno.</th>
              <th>Title</th>
              <th>RFID Tag</th>
              <th>Full Name</th>
              <th>Email ID</th>
              <th style={{ width: '100px' }}>Date Of Birth </th>
              <th style={{ width: '80px' }}>Master ID</th>
              <th>Phone Number</th>
              <th>Address</th>
              <th colSpan="2">Action</th>
            </tr>
          </thead>
          <tbody>
            {list && list.length > 0 ?
              list.map((item, i) => {
                return (
                  <tr key={i}>
                    <td>{i + 1}</td>
                    <td>{item.title}</td>
                    <td>{item.rfid_tag ? item.rfid_tag : "N/A"}</td>
                    <td>{item.full_name ? item.full_name : "N/A"}</td>
                    <td>{item.email ? item.email : "N/A"}</td>
                    <td>{item.date_of_birth ? FormatedDate(item.date_of_birth) : "N/A"}</td>
                    <td>{item.master_id ? item.master_id : "N/A"}</td>
                    <td>{item.phone_number ? item.phone_number : "N/A"}</td>
                    <td>{item.address ? item.address : "N/A"}</td>
                    <td className="text-end">
                      <button
                        type="button"
                        className="btn btn-primary fs-6 bi bi-pen py-2 px-3"
                      // onClick={()=>handleEdit(item.id)}
                      >

                      </button>
                    </td>
                    <td className="text-start">
                      <button
                        type="button"
                        // onClick={()=> {setDelModal(true); setDelID(item.id)}}
                        className="btn btn-danger bi bi-trash fs-6 py-2 px-3"
                      >
                      </button>
                    </td>
                  </tr>
                );
              })
              : ""}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default ParticipantTable;

