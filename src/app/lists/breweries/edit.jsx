import React from 'react'
import { editUser, getUserData } from '../../../utils/Api';
import { useNavigate, useParams } from 'react-router';

const Edit = () => {

  const [data, setData] = React.useState({ first_name: "", last_name: "", email: "" });
  const navigate = useNavigate()
  const id = useParams().id

  React.useEffect(() => {
    getUserData(id).then(res => {
      console.log(res)
      if (res.code == 200) {
        setData(res.result)
      }
    })
  }, [])


  const getEditData = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const EditValue = () => {
    editUser({...data, userId:id}).then(res => {
      console.log(res)
      if (res.code == 200) {
        navigate("/user-list")
      }
    })
  };
  return (
    <div>
      <div className='row d-flex justify-content-center'>
        <div className="text-start col-md-6 justify-content-center">
          <input
            type="text"

            placeholder="First Name"
            className="form-control mx-2 my-3 w-75"
            name="first_name"
            value={data.first_name}
            onChange={(e) => getEditData(e)}
          />
          <input
            type="text"
            placeholder="Last Name"
            className="form-control mx-2 my-3 w-75"
            name="last_name"
            value={data.last_name}
            onChange={(e) => getEditData(e)}
          />
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => EditValue()}
          >
            Save
          </button>
        </div>

      </div>
    </div>
  )
}

export default Edit