import {
  // FC,
  useState,
  useEffect,
  createContext,
  useContext,
  useRef,
  // Dispatch,
  // SetStateAction,
} from 'react'
import { LayoutSplashScreen } from '../../../../_metronic/layout/core'
// import {AuthModel, UserModel} from './_models'
import * as authHelper from './AuthHelpers'
import { edituserProfile, getuserProfile } from '../../../../utils/Api'
// import {WithChildren} from '../../../../_metronic/helpers'

// type AuthContextProps = {
//   auth: AuthModel | undefined
//   saveAuth: (auth: AuthModel | undefined) => void
//   currentUser: UserModel | undefined
//   setCurrentUser: Dispatch<SetStateAction<UserModel | undefined>>
//   logout: () => void
// }
// import { toast } from 'react-toastify';

const initAuthContextPropsState = {
  auth: authHelper.getAuth(),
  saveAuth: () => { },
  currentUser: undefined,
  setCurrentUser: () => { },
  logout: () => { },
}

const AuthContext = createContext(initAuthContextPropsState)

const useAuth = () => {
  return useContext(AuthContext)
}

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(authHelper.getAuth())
  const [currentUser, setCurrentUser] = useState()
  const saveAuth = (auth) => {
    setAuth(auth)
    if (auth) {
      authHelper.setAuth(auth)
    } else {
      authHelper.removeAuth()
    }
  }

  const logout = () => {
    // toast.success('Logout Successfully', {position: "top-right", autoClose: 2000, theme: "colored"});

    saveAuth(undefined)
    setCurrentUser(undefined)
  }

  return (
    <AuthContext.Provider value={{ auth, saveAuth, currentUser, setCurrentUser, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

const AuthInit = ({ children }) => {
  const { auth, logout, setCurrentUser } = useAuth()
  // console.log("Auth Init================>",auth, logout )
  const didRequest = useRef(false)
  const [showSplashScreen, setShowSplashScreen] = useState(true)
  // We should request user by authToken (IN OUR EXAMPLE IT'S API_TOKEN) before rendering the application
  useEffect(() => {
    const requestUser = (apiToken) => {
      try {
        if (!didRequest.current) {
          const { data } = getuserProfile(apiToken)
          if (data) {
            setCurrentUser(data)
          }
        }
      } catch (error) {
        if (!didRequest.current) {
          logout()
        }
      } finally {
        setShowSplashScreen(false)
      }

      return () => (didRequest.current = true)
    }

    if (auth && auth.jwtToken) {
      requestUser(auth.jwtToken)
    } else {
      logout()
      setShowSplashScreen(false)
    }
    // eslint-disable-next-line
  }, [])

  return showSplashScreen ? <LayoutSplashScreen /> : <>{children}</>
}

export { AuthProvider, AuthInit, useAuth }
