import Axios from "axios";

const API_URL = process.env.REACT_APP_API_URL
console.log(API_URL)

Axios.defaults.baseURL = API_URL
const local = JSON.parse(localStorage.getItem("app-serve-key"))

const axiosConfig = {
  headers: {
    "Authorization": `Token ${local?.jwtToken}`
  }
}

export const loginUser = async (data) => {
  const response = await Axios.post("/craft/login/", data).then(res => {
    return res.data
  }).catch(err => {
    return err
  })
  return response
}

export const registerUser = async (data) => {
  const response = await Axios.post("/craft/register/", data).then(res => {
    return res.data
  }).catch(err => {
    return err
  })
  return response
}

export const createUser = (data) => {
  const response = Axios.post("/admins/create_user", data).then(res => {
    return res.data
  })
  return response
}
export const editUser = (data) => {
  const response = Axios.put("/admins/edit_user_detail", data).then(res => {
    return res.data
  })
  return response
}
export const deleteUser = (id) => {
  const response = Axios.delete(`/admins/delete_user/${id}`).then(res => {
    return res.data
  })
  return response
}

export const getBreweriesList = () => {
  const response = Axios.get("/craft/breweries/list/", axiosConfig).then(res => {
    return res.data
  }).catch(err => {
    return err
  })
  return response
}

export const getTrailList = () => {
  const response = Axios.get("/craft/trail/list/", axiosConfig).then(res => {
    return res.data
  }).catch(err => {
    return err
  })
  return response
}

export const getParticipantList = () => {
  const response = Axios.get("/craft/participants/list/", axiosConfig).then(res => {
    return res.data
  }).catch(err => {
    return err
  })
  return response
}

export const getUserData = (id) => {
  const response = Axios.get(`/admins/get_user_detail/${id}`).then(res => {
    return res.data
  })
  return response
}

export const getUserByToken = async (token) => {
  const response = await Axios.get(`/admins/token_verification`, {
    headers: {
      "x-access-token": token
    }
  }).then(res => {
    console.log(res)
    if (res.data.code == 200) {
      return res.data.result
    }
  })
  return response
}

export const requestPassword = async (token) => {
  const response = await Axios.post(`/admins/token_verification`, {
    headers: {
      "x-access-token": token
    }
  }).then(res => {
    if (res.data.code == 200) {
      return res.data.result
    }
  })
  return response
}

// Send Otp
export const sendOTP = (data) => {
  const response = Axios.put("/users/send_otp", data).then(res => {
    return res.data
  })
  return response
}

//Verify OTP
export const verifyOtp = (data) => {
  const response = Axios.put("/users/verify_otp", data).then(res => {
    return res.data
  })
  return response
}

//Forget Password
export const forgotPassword = (data) => {
  const response = Axios.put("/users/forgot_password", data).then(res => {
    return res.data
  })
  return response
}


export const getprofileImage = async (token) => {
  const response = await Axios.get("https://graph.microsoft.com/v1.0/me/photo/$value", {
    headers: {
      "Authorization": `Bearer ${token}`
    }
  }).then((res) => {
    //  window.open(`${res.data}`)


    // console.log(res)
    return new Blob([res.data])
  }).then((data) => {
    var reader = new FileReader();
    reader.onload = function () {
      var b64 = reader.result
      console.log("This is base64", b64)
      // window.open(b64)

      return b64
    }
    reader.readAsDataURL(data)
    console.log(data)
  })
  return response
}





