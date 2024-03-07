import Axios from "axios";
import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL


Axios.defaults.baseURL = API_URL


const local = JSON.parse(localStorage.getItem("app-serve-key"))

const axiosConfig = {
  headers: {
    "Authorization": `Token ${local?.jwtToken}`
  }
}

export const loginUser = async (data) => {
  const response = await axios.post("craft/login/", data).then(res => {
    return res?.data
  }).catch(err => {
    return err?.response?.data
  })
  return response
}
export const googleRegister = (data) => {
  const response = Axios.post(`/craft/googleregister/`, data).then(res => {
    return res?.data
  })
  return response
}

export const getUser = async (data) => {
  const response = await Axios.get(`/craft/userdata/${data}`).then(res => {
    return res?.data
  }).catch(err => {
    return err.response?.data
  })
  return response
}

export const registerUser = async (data) => {
  const response = await Axios.post("/craft/register/", data).then(res => {
    return res?.data
  }).catch(err => {
    return err.response?.data
  })
  return response
}

export const userForgotPassword = async (data) => {
  const response = await Axios.post("/api/password_reset/", data).then(res => {
    // console.log(res, "try")
    return res?.data
  }).catch(err => {
    return err.response?.data
  })
  return response
}

export const userResetPassword = async (data) => {
  const response = await Axios.post("/api/password_reset/confirm/", data).then(res => {
    return res?.data
  }).catch(err => {
    return err?.response?.data
  })
  return response
}

export const getuserProfile = () => {
  const response = Axios.get(`/craft/userprofile/`,{
    headers: {
      "Authorization": `Token ${localStorage.getItem("token")}`
    }
  }).then(res => {
    return res?.data
  })
  return response
}


export const getparticipantGender = (data) => {
  const response = Axios.get(`/craft/participant_gender/?trail_type=${data}`,{
    headers: {
      "Authorization": `Token ${localStorage.getItem("token")}`
    }
  }).then(res => {
    return res?.data
  })
  return response
}

export const edituserProfile = (id, data) => {
  const response = Axios.post(`/Admin/user/update/${id}`,data,{
    headers: {
      "Authorization": `Token ${localStorage.getItem("token")}`
    }
  }).then(res => {
    return res?.data
  })
  return response
}

export const getuserlist = (id) => {
  const response = Axios.get(`/Admin/user/edit/${id}`,{
    headers: {
      "Authorization": `Token ${localStorage.getItem("token")}`
    }
  }).then(res => {
    return res?.data
  })
  return response
}


export const editUserLocation = (id, data) => {
  const response = Axios.post(`/Admin/user/location/${id}`,data,{
    headers: {
      "Authorization": `Token ${localStorage.getItem("token")}`
    }
  }).then(res => {
    return res?.data
  })
  return response
}
export const createUser = (data) => {
  const response = Axios.post("/admins/create_user", data).then(res => {
    return res?.data
  })
  return response
}
export const editUser = (data) => {
  const response = Axios.put("/admins/edit_user_detail", data).then(res => {
    return res?.data
  })
  return response
}
export const deleteUser = (id) => {
  const response = Axios.delete(`/admins/delete_user/${id}`).then(res => {
    return res?.data
  })
  return response
}

export const getBreweriesList = async () => {
  const response = await Axios.get("/craft/breweries/list/", {
    headers: {
      "Authorization": `Token ${localStorage.getItem("token")}`
    }
  }).then(res => {
    return res?.data
  }).catch(err => {
    return err.response?.data
  })
  return response
}

 
export const getTrailList = async () => {
  const response = await Axios.get("/craft/trailcomp/list/", {
    headers: {
      "Authorization": `Token ${localStorage.getItem("token")}`
    }
  }).then(res => {
    return res?.data
  }).catch(err => {
    return err.response?.data
  })
  return response
}

export const getParticipantList = async () => {
  const response = await Axios.get("/craft/participants/list/", {
    headers: {
      "Authorization": `Token ${localStorage.getItem("token")}`
    }
  }).then(res => {
    return res?.data
  }).catch(err => {
    return err.response?.data
  })
  return response
}

export const getVisitList = async () => {
  const response = await Axios.get("/craft/visit/list/", {
    headers: {
      "Authorization": `Token ${localStorage.getItem("token")}`
    }
  }).then(res => {
    return res?.data
  }).catch(err => {
    return err.response?.data
  })
  return response
}

export const getPointList = async () => {
  const response = await Axios.get("/craft/participants/points/list/", {
    headers: {
      "Authorization": `Token ${localStorage.getItem("token")}`
    }
  }).then(res => {
    return res?.data
  }).catch(err => {
    return err.response?.data
  })
  return response
}

export const getActiveUserCount = async (data) => {
  console.log("data-----", data)
  const response = await Axios.get(`/craft/active_user/?trail_type=${data}`, {
    headers: {
      "Authorization": `Token ${localStorage.getItem("token")}`
    }
  }).then(res => {
    return res?.data
  })
  return response
}

export const getTrailAnalytics = async (data) => {
  const response = await Axios.get(`/craft/trail_analytics/?trail_type=${data}`, {
    headers: {
      "Authorization": `Token ${localStorage.getItem("token")}`
    }
  }).then(res => {
    return res?.data
  })
  return response
}


export const getBreweryName = async () => {
  const response = await Axios.get("/craft/breweries_name/", {
    headers: {
      "Authorization": `Token ${localStorage.getItem("token")}`
    }
  }).then(res => {
    return res?.data
  })
  return response
}

export const getBreweryNameAdmin = async (id) => {
  const response = await Axios.get(`/craft/breweries/list/${id}`,{
    headers: {
      "Authorization": `Token ${localStorage.getItem("token")}`
    }
  }).then(res => {
    return res?.data
  })
  return response
}
export const getParticipantAge = async (data) => {
  const response = await Axios.get(`/craft/participant_age/?trail_type=${data}`, {
    headers: {
      "Authorization": `Token ${localStorage.getItem("token")}`
    }
  }).then(res => {
    return res?.data
  })
  return response
}

export const getUserCount = async (data) => {
  const response = await Axios.get(`/craft/usercount/?trail_type=${data}`, {
    headers: {
      "Authorization": `Token ${localStorage.getItem("token")}`
    }
  }).then(res => {
    return res?.data
  })
  return response
}

export const getWeeklyGrowth = async () => {
  const response = await Axios.get("/craft/weeklygrowth/", {
    headers: {
      "Authorization": `Token ${localStorage.getItem("token")}`
    }
  }).then(res => {
    return res?.data
  })
  return response
}

export const getNetChanges = async () => {
  const response = await Axios.get("/craft/netchanges/", {
    headers: {
      "Authorization": `Token ${localStorage.getItem("token")}`
    }
  }).then(res => {
    return res?.data
  })
  return response
}

export const getWeeklyData = async (data) => {
  const response = await Axios.get(`/craft/weekly/?trail_type=${data}`, {
    headers: {
      "Authorization": `Token ${localStorage.getItem("token")}`
    }
  }).then(res => {
    return res?.data
  })
  return response
}

export const participantCount = async (data) => {
  const response = await Axios.get(`/craft/participants/count/?trail_type=${data}`, {
    headers: {
      "Authorization": `Token ${localStorage.getItem("token")}`
    }
  }).then(res => {
    return res?.data
  })
  return response
}

export const getUserLinks = async () => {
  const response = await Axios.get("/craft/user/links/", {
    headers: {
      "Authorization": `Token ${localStorage.getItem("token")}`
    }
  }).then(res => {
    return res?.data
  })
  return response
}


export const getHottestDays = async () => {
  const response = await Axios.get(`/craft/hottest/days/`, {
    headers: {
      "Authorization": `Token ${localStorage.getItem("token")}`
    }
  }).then(res => {
    return res?.data
  })
  return response
}

export const adminUserList = async () => {
  const response = await Axios.get("/Admin/user/list/", {
    headers: {
      "Authorization": `Token ${localStorage.getItem("token")}`
    }
  }).then(res => {
    return res?.data
  })
  return response
}

export const adminMembershipData = async () => {
  const response = await Axios.get("/craft/membership/data/", {
    headers: {
      "Authorization": `Token ${localStorage.getItem("token")}`
    }
  }).then(res => {
    return res?.data
  })
  return response
}


export const AdminUserStatus = (id,data) => {
  const response = Axios.post(`/Admin/user/status/${id}`, data,{
    headers: {
      "Authorization": `Token ${localStorage.getItem("token")}`
    }
  }).then(res => {
    return res?.data
  })
  return response
}

export const Adminlistshow = (id,data) => {
  const response = Axios.post(`/Admin/user/listshow/${id}`, data,{
    headers: {
      "Authorization": `Token ${localStorage.getItem("token")}`
    }
  }).then(res => {
    return res?.data
  })
  return response
}


export const Adminlistexport = (id,data) => {
  const response = Axios.post(`/Admin/user/listexport/${id}`, data,{
    headers: {
      "Authorization": `Token ${localStorage.getItem("token")}`
    }
  }).then(res => {
    return res?.data
  })
  return response
}

export const getTrailExport = async () => {
  const response = await Axios.get("/craft/trail/export/", {
    headers: {
      "Authorization": `Token ${localStorage.getItem("token")}`
    }
  }).then(res => {
    return res?.data
  })
  return response
}

export const getParticipantExport = async () => {
  const response = await Axios.get("/craft/participant/export/", {
    headers: {
      "Authorization": `Token ${localStorage.getItem("token")}`
    }
  }).then(res => {
    return res?.data
  })
  return response
}

export const getHistoricTrails = async () => {
  const response = await Axios.get("/craft/historic/trails/", {
    headers: {
      "Authorization": `Token ${localStorage.getItem("token")}`
    }
  }).then(res => {
    return res?.data
  })
  return response
}

export const getHistoricParticipant = async (id) => {
  const response = await Axios.get(`/craft/historic/participant/${id}`, {
    headers: {
      "Authorization": `Token ${localStorage.getItem("token")}`
    }
  }).then(res => {
    return res?.data
  })
  return response
}



export const searchPassport = ( data) => {
  const response = Axios.post(`/craft/passport/name/`,data,{
    headers: {
      "Authorization": `Token ${localStorage.getItem("token")}`
    }
  }).then(res => {
    return res?.data
  })
  return response
}

export const getBreweryForm = async (id) => {
  return await Axios.get(`/craft/breweries/list/${id}`, {
    headers: {
      "Authorization": `Token ${localStorage.getItem("token")}`
    },
  })
    .then((res) => {
      return res?.data;
    })
    .catch((error) => {
      // console.log("Participant list", error);
    });
};

export const getActiveUserCountAdmin = async (id, data) => {
  console.log("id--data--", id , data)
  const response = await Axios.get(`/craft/active_user/${id}?trail_type=${data}`, {
    headers: {
      "Authorization": `Token ${localStorage.getItem("token")}`
    }
  }).then(res => {
    return res?.data
  })
  return response
}
export const getHottestDaysAdmin = async (id) => {
  const response = await Axios.get(`/craft/hottest/days/${id}`, {
    headers: {
      "Authorization": `Token ${localStorage.getItem("token")}`
    }
  }).then(res => {
    return res?.data
  })
  return response
}
export const getTrailAnalyticsAdmin = async (id, data) => {
  const response = await Axios.get(`/craft/trail_analytics/${id}?trail_type=${data}`, {
    headers: {
      "Authorization": `Token ${localStorage.getItem("token")}`
    }
  }).then(res => {
    return res?.data
  })
  return response
}
export const getUserCountAdmin = async (id, data) => {
  const response = await Axios.get(`/craft/usercount/${id}?trail_type=${data}`, {
    headers: {
      "Authorization": `Token ${localStorage.getItem("token")}`
    }
  }).then(res => {
    return res?.data
  })
  return response
}
export const getParticipantAgeadmin = async (id,data) => {
  const response = await Axios.get(`/craft/participant_age/${id}?trail_type=${data}`, {
    headers: {
      "Authorization": `Token ${localStorage.getItem("token")}`
    }
  }).then(res => {
    return res?.data
  })
  return response
}
export const getparticipantGenderAdmin = (id,data) => {
  const response = Axios.get(`/craft/participant_gender/${id}?trail_type=${data}`,{
    headers: {
      "Authorization": `Token ${localStorage.getItem("token")}`
    }
  }).then(res => {
    return res?.data
  })
  return response
}
export const getWeeklyDataAdmin = async (email, data) => {
  const response = await Axios.get(`/craft/weekly/${email}?trail_type=${data}`, {
    headers: {
      "Authorization": `Token ${localStorage.getItem("token")}`
    }
  }).then(res => {
    return res?.data
  })
  return response
}
export const getWeeklyGrowthAdmin = async (email) => {
  const response = await Axios.get(`/craft/weeklygrowth/${email}`, {
    headers: {
      "Authorization": `Token ${localStorage.getItem("token")}`
    }
  }).then(res => {
    return res?.data
  })
  return response
}

export const getNetChangesAdmin = async (email) => {
  const response = await Axios.get(`/craft/netchanges/${email}`, {
    headers: {
      "Authorization": `Token ${localStorage.getItem("token")}`
    }
  }).then(res => {
    return res?.data
  })
  return response
}
export const participantCountAdmin = async (id, data) => {
  const response = await Axios.get(`/craft/participants/count/${id}?trail_type=${data}`, {
    headers: {
      "Authorization": `Token ${localStorage.getItem("token")}`
    }
  }).then(res => {
    return res?.data
  })
  return response
}




export const getUserData = (id) => {
  const response = Axios.get(`/admins/get_user_detail/${id}`).then(res => {
    return res?.data
  })
  return response
}

export const getUserByToken = async (token) => {
  const response = await Axios.get(`/admins/token_verification`, {
    headers: {
      "x-access-token": token
    }
  }).then(res => {
    if (res?.data.code == 200) {
      return res?.data
    }
  }).catch((error)=>{
    return error.response
  })
  return response
}


export const deletUser = async(id) => {
  const response = await Axios.delete(`/craft/delete_user/${id}`, {
    headers: {
      "Authorization": `Token ${localStorage.getItem("token")}`
    },
  }).then(res => {
    return res?.data
  }).catch(err => {
    return err.response.data
  })
  return response
};
export const requestPassword = async (token) => {
  const response = await Axios.post(`/admins/token_verification`, {
    headers: {
      "x-access-token": token
    }
  }).then(res => {
    if (res?.data.code == 200) {
      return res?.data.result
    }
  })
  return response
}
// for admin
export const getBreweryAdmin = async (id) => {
  return await Axios.get(`/craft/breweries/list/${id}`, {
    headers: {
      "Authorization": `Token ${localStorage.getItem("token")}`
    },
  })
    .then((res) => {
      return res?.data;
    })
    .catch((error) => {
      // console.log("Participant list", error);
    });
};

export const getTrailsAdmin = async (id) => {
  return await Axios.get(`/craft/trail/list/${id}`, {
    headers: {
      "Authorization": `Token ${localStorage.getItem("token")}`
    },
  })
    .then((res) => {
      return res?.data;
    })
    .catch((error) => {
      // console.log("Participant list", error);
    });
};
export const getVisitListadmin = async (id) => {
  return await Axios.get(`/craft/visit/list/${id}`, {
    headers: {
      "Authorization": `Token ${localStorage.getItem("token")}`
    },
  })
    .then((res) => {
      return res?.data;
    })
    .catch((error) => {
      // console.log("Participant list", error);
    });
};

export const getParticipantPoints = async (id) => {
  return await Axios.get(`/craft/participants/list/${id}`, {
    headers: {
      "Authorization": `Token ${localStorage.getItem("token")}`
    },
  })
    .then((res) => {
      return res?.data;
    })
    .catch((error) => {
      // console.log("Participant list", error);
    });
};

export const getParticipantPointsAdmin = async (id) => {
  return await Axios.get(`/craft/participants/points/list/${id}`, {
    headers: {
      "Authorization": `Token ${localStorage.getItem("token")}`
    },
  })
    .then((res) => {
      return res?.data;
    })
    .catch((error) => {
      // console.log("Participant list", error);
    });
};


export const sendOTP = (data) => {
  const response = Axios.put("/users/send_otp", data).then(res => {
    return res?.data
  })
  return response
}


export const verifyOtp = (data) => {
  const response = Axios.put("/users/verify_otp", data).then(res => {
    return res?.data
  })
  return response
}


export const forgotPassword = (data) => {
  const response = Axios.put("/users/forgot_password", data).then(res => {
    return res?.data
  })
  return response
}


export const getprofileImage = async (token) => {
  const response = await Axios.get("https://graph.microsoft.com/v1.0/me/photo/$value", {
    headers: {
      "Authorization": `Bearer ${token}`
    }
  }).then((res) => {
    return new Blob([res?.data])
  }).then((data) => {
    var reader = new FileReader();
    reader.onload = function () {
      var b64 = reader.result

      return b64
    }
    reader.readAsDataURL(data)
  })
  return response
}


// participant/birthday/

export const getparticipantBirthday = () => {
  const response = Axios.get(`/craft/participant/birthday/`,{
    headers: {
      "Authorization": `Token ${localStorage.getItem("token")}`
    }
  }).then(res => {
    return res?.data
  })
  return response
}
// participant/loyality_points/
export const getLoyalityPoints = () => {
  const response = Axios.get(`/craft/participant/loyality_points/`,{
    headers: {
      "Authorization": `Token ${localStorage.getItem("token")}`
    }
  }).then(res => {
    return res?.data
  })
  return response
}
// historic/trails/
export const getSpecialTrails = () => {
  const response = Axios.get(`/craft/historic/trails/`,{
    headers: {
      "Authorization": `Token ${localStorage.getItem("token")}`
    }
  }).then(res => {
    return res?.data
  })
  return response
}