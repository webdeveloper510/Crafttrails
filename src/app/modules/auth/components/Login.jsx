/* eslint-disable jsx-a11y/anchor-is-valid */
import { useEffect, useState } from "react";
import * as Yup from "yup";
import clsx from "clsx";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { loginUser } from "../../../../utils/Api";
import { useAuth } from "../core/Auth";
import { toast } from "react-toastify";
import { GoogleLogin } from 'react-google-login';
import { gapi } from 'gapi-script'



const loginSchema = Yup.object().shape({
  email: Yup.string()
    .email("Wrong email format")
    .min(3, "Minimum 3 symbols")
    .max(50, "Maximum 50 symbols")
    .required("Email is required"),
  password: Yup.string()
    .min(3, "Minimum 3 symbols")
    .max(50, "Maximum 50 symbols")
    .required("Password is required"),
});

const initialValues = {
  email: "",
  password: "",
};



export function Login() {

  useEffect(() => {
    const clientId="235457712935-129v9b02c4e0a6okdhqasdm3u06sfr8j.apps.googleusercontent.com"
    function start() {
      gapi.client.init({
        clientId: clientId,
        scope: "email",
      });
    }
    gapi.load("client:auth2", start);
  });


  const [loading, setLoading] = useState(false);
  const { saveAuth, setCurrentUser } = useAuth();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues,
    validationSchema: loginSchema,
    onSubmit: async (values) => {
      loginUser(values).then((res) => {
        setLoading(false);
        console.log("login dataaaaaaaaaaa", res);
        if (res?.code === 200) {
          // toast.success(res.success , { position: "top-right", autoClose: 2000, theme: "colored" });
          // saveAuth({ firstname: res.data.firstname, lastname: res.data.lastname, email: res.data.email, jwtToken: res.token })
          localStorage.setItem("token", res.token);
          localStorage.setItem("approved", res.data.approved);
          const approved = res.data.approved;
          const status = res.data.status;
          localStorage.setItem("status", status);
          if (status == true) {
            navigate("/admin-dashboard");
            saveAuth({
              firstname: res.data.firstname,
              lastname: res.data.lastname,
              email: res.data.email,
              jwtToken: res.token,
            });
            setCurrentUser({
              firstname: res.data.firstname,
              lastname: res.data.lastname,
              email: res.data.email,
              jwtToken: res.token,
            });
          } else if (approved == false) {
            toast.error("ADMIN NEED TO APPROVE YOUR PROFILE", {
              position: "top-right",
              autoClose: 2000,
              theme: "colored",
            });
          } else {
            toast.success(res.success, {
              position: "top-right",
              autoClose: 2000,
              theme: "colored",
            });
            saveAuth({
              firstname: res.data.firstname,
              lastname: res.data.lastname,
              email: res.data.email,
              jwtToken: res.token,
            });
            setCurrentUser({
              firstname: res.data.firstname,
              lastname: res.data.lastname,
              email: res.data.email,
              jwtToken: res.token,
            });
          }

          // getUserByToken(res.token).then(res => {
          //   console.log(res)
          //   setCurrentUser(res)
          //   setLoading(false)
          // })
        } else if (res?.code === 400) {
          toast.error(res?.error, {
            position: "top-right",
            autoClose: 2000,
            theme: "colored",
          });
          setLoading(false);
        }
      });
    },
  });

  const responseGoogle = (response) => {
    console.log(response);
    if(response.tokenID != null){
      localStorage.setItem("token", response.tokenId);
      saveAuth({
        firstname: response.wt.Ad,
        lastname: response.wt.rV,
        email: response.wt.cu,
        jwtToken: response.tokenId,
      });
      setCurrentUser({
        firstname: response.wt.Ad,
        lastname: response.wt.rV,
        email: response.wt.cu,
        jwtToken: response.tokenId,
      });
    }else{
      localStorage.setItem("token", response.tokenId);
      saveAuth({
        firstname: response.wt.Ad,
        lastname: response.wt.rV,
        email: response.wt.cu,
        jwtToken: response.tokenId,
      });
      setCurrentUser({
        firstname: response.wt.Ad,
        lastname: response.wt.rV,
        email: response.wt.cu,
        jwtToken: response.tokenId,
      });
    }
  };

  return (
    <form
      className="form w-100"
      onSubmit={formik.handleSubmit}
      noValidate
      encType="multipart/form-data"
      autoComplete="off"
      id="kt_login_signin_form"
    >
      <div className="text-center mb-11">
        <h1 className="text-dark fw-bolder mb-3">Sign In</h1>
      </div>
      {formik.status ? (
        <div className="mb-lg-15 alert alert-danger">
          <div className="alert-text font-weight-bold">{formik.status}</div>
        </div>
      ) : (
        <></>
      )}
      <div className="fv-row mb-8">
        <label className="form-label fs-6 fw-bolder text-dark">Email</label>
        <input
          placeholder="Email"
          {...formik.getFieldProps("email")}
          className={clsx(
            "form-control bg-transparent",
            { "is-invalid": formik.touched.email && formik.errors.email },
            {
              "is-valid": formik.touched.email && !formik.errors.email,
            }
          )}
          type="email"
          name="email"
          autoComplete="off"
        />
        {formik.touched.email && formik.errors.email && (
          <div className="fv-plugins-message-container">
            <span role="alert">{formik.errors.email}</span>
          </div>
        )}
      </div>
      <div className="fv-row mb-3">
        <label className="form-label fw-bolder text-dark fs-6 mb-0">
          Password
        </label>
        <input
          type="password"
          placeholder="Password"
          autoComplete="new-password"
          {...formik.getFieldProps("password")}
          className={clsx(
            "form-control bg-transparent",
            {
              "is-invalid": formik.touched.password && formik.errors.password,
            },
            {
              "is-valid": formik.touched.password && !formik.errors.password,
            }
          )}
        />
        {formik.touched.password && formik.errors.password && (
          <div className="fv-plugins-message-container">
            <div className="fv-help-block">
              <span role="alert">{formik.errors.password}</span>
            </div>
          </div>
        )}
      </div>
      <div className="d-flex flex-stack flex-wrap gap-3 fs-base fw-semibold mb-8">
        <div />
        <Link to="/auth/forgot-password" className="link-primary">
          Forgot Password ?
        </Link>
      </div>
      <div className="d-grid mb-10">
        <button
          type="submit"
          id="kt_sign_in_submit"
          className="btn btn-primary"
        >
          {!loading && <span className="indicator-label">Continue</span>}
          {loading && (
            <span className="indicator-progress" style={{ display: "block" }}>
              Please wait...
              <span className="spinner-border spinner-border-sm align-middle ms-2"></span>
            </span>
          )}
        </button>
       <div className="goole-sign">
       <GoogleLogin
      //  clientId="58539030741-kqmphtqku95b08pkk9i18kpbfh8go8dd.apps.googleusercontent.com"
        clientId='235457712935-129v9b02c4e0a6okdhqasdm3u06sfr8j.apps.googleusercontent.com'
        buttonText="Login with Google"
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
        cookiePolicy={'single_host_origin'}
        className="google-login"
        redirectUri="https://trailmetrics.cctrails.com/"
      />
       </div>

      </div>
      <div className="text-gray-500 text-center fw-semibold fs-6">
        Not a Member yet?
        <Link to="/auth/registration" className="ms-2 link-primary">
          Sign up
        </Link>
      </div>
    </form>
  );
}
