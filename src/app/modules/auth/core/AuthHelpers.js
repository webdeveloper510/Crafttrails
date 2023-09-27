// import {AuthModel} from './_models'

const AUTH_LOCAL_STORAGE_KEY = 'app-serve-key'
const getAuth = () => {
  if (!localStorage) {
    return
  }

  const lsValue  = localStorage.getItem(AUTH_LOCAL_STORAGE_KEY)
  if (!lsValue) {
    return
  }

  try {
    const auth = JSON.parse(lsValue)
    if (auth) {
      return auth
    }
  } catch (error) {
  }
}

const setAuth = (auth) => {
  if (!localStorage) {
    return
  }

  try {
    const lsValue = JSON.stringify(auth)
    localStorage.setItem(AUTH_LOCAL_STORAGE_KEY, lsValue)
  } catch (error) {
  }
}

const removeAuth = () => {
  if (!localStorage) {
    return
  }

  try {
    localStorage.removeItem(AUTH_LOCAL_STORAGE_KEY)
  } catch (error) {
  }
}

// export function setupAxios(axios) {
//   axios.defaults.headers.Accept = 'application/json'
//   axios.interceptors.request.use(
//     (config: {headers: Authorization }) => {
//       const auth = getAuth()
//       if (auth && auth.api_token) {
//         config.headers.Authorization = `Bearer ${auth.api_token}`
//       }

//       return config
//     },
//     (err: any) => Promise.reject(err)
//   )
// }

export {getAuth, setAuth, removeAuth, AUTH_LOCAL_STORAGE_KEY}
