/*eslint-disabled*/
// eslint-disable-next-line @typescript-eslint/no-unused-expressions

import React, { useState, useEffect } from "react";
// import { createUser } from "../../modules/apps/user-management/users-list/core/_requests";
import {  Modal } from "react-bootstrap";
import { createUser, deleteUser, getUserList, getUserData, editUser } from "../../../utils/Api";
import { toast } from 'react-toastify';

const Table = () => {
  
  const [data, setData] = useState({first_name: "", last_name: "",email: ""});                    
  const [list, setList] = useState([]);
  const [addModal, setAddModal] = useState(false)
  const [delModal, setDelModal] = useState(false)
  const [delId, setDelID] = useState('')
  const [toggle, setToggle] = useState(false)
  const [editMode, setEditMode] = useState(false)
  useEffect(() => {
    getUserList().then(res => {
      console.log(res)
      const arr = res.result.filter((item) => {
        return item.status === 1

      })
      setList(arr)
    })
    setToggle(false)
  }, [addModal, toggle]);

  const addUser = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const saveData = () => {
    createUser(data).then(res => {
      if (res.code === 200) {
        toast.success('User Add Successfully', {position: "top-right", autoClose: 2000, theme: "colored"});
        setAddModal(false)
        setData({ first_name: "", last_name: "", email: "" });
      }else if(res.code === 201){
        toast.error(res.message, {position: "top-right", autoClose: 2000, theme: "colored"});

      }
    })
    // console.log(data);
  };

  const handleEdit = (id) =>{
    console.log('id', id)
    getUserData(id).then(res => {
      console.log(res)
      if (res.code === 200) {
        // setData(res.result)
        setData({ ...data, first_name: res.result.first_name, last_name: res.result.last_name, email: res.result.email, userId: res.result.id});
        setEditMode(true)
        setAddModal(true)

      }else if (res.code === 201){
        toast.error(res.message, {position: "top-right", autoClose: 2000, theme: "colored"});

      }
    })
  }

  const setModalClose = () =>{
    setAddModal(false)
    setEditMode(false)
    setData({ first_name: "", last_name: "", email: "" });

  }

  const UpdateUser = () =>{
    editUser(data).then(res => {
      console.log(res)
      if (res.code === 200) {
        setEditMode(false)
        setModalClose()
        toast.success('User Update Successfully', {position: "top-right", autoClose: 2000, theme: "colored"});
      }else if(res.code === 201){
        toast.error(res.message, {position: "top-right", autoClose: 2000, theme: "colored"});

      }
    })
  }

const handleAddUser = ()=>{
    setAddModal(true);
    setEditMode(false)
    setData({ first_name: "", last_name: "", email: "" });

}
  const handleDelete = () =>{
    console.log('handleDelete', delId)
    deleteUser(delId).then(res => {
      console.log(res)
      if (res.code === 200) {
        toast.success('User Delete Successfully', {position: "top-right", autoClose: 2000, theme: "colored"});
        setToggle(true)
        setDelModal(false)
      }else if(res.code === 201){
        setDelModal(false)
        toast.error(res.message, {position: "top-right", autoClose: 2000, theme: "colored"});

      }
    })

  }

  return (
    <div>
      <div className="text-end mb-3 mt-5">
        <button
          type="button"
          className="btn btn-primary"
          onClick={() => handleAddUser()}
        >
          Add User
        </button>
      </div>

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
      <div>
        <table className="table text-center">
          <thead className="table-dark ">
            <tr>
              <th>Sr No</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th colSpan="2">Action</th>
            </tr>
          </thead>
          <tbody>
            {list && list.length > 0 ?
              list.map((item, i) => {
                return (
                  <tr key={i}>
                    <td>{i + 1}</td>
                    <td>{item.first_name}</td>
                    <td>{item.last_name}</td>
                    <td>{item.email}</td>
                    <td> 
                      {/* <Link className='btn-login btn btn-primary' to={`/edit-user/${item.id}`} >
                        Edit
                      </Link> */}
                      <button type="button" className="btn btn-primary" onClick={()=>handleEdit(item.id)}>
                        Edit
                      </button>
                    </td>
                    <td>
                      <button
                        type="button"
                        // onClick={() => deleteItem(item.id)}
                        onClick={()=> {setDelModal(true); setDelID(item.id)}}
                        // onClick={() => {setDelModal(true), setDelID(item.id)}}
                        className="btn btn-danger"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })
              : ""}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;

