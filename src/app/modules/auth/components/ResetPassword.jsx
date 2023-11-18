import { useState } from 'react'
import * as Yup from 'yup'
import clsx from 'clsx'
import { Link, useNavigate } from 'react-router-dom'
import { useFormik } from 'formik'
// import validate from '../../../pages/validations/FormValidations'
import { userResetPassword } from '../../../../utils/Api'
import { toast } from 'react-toastify';

const initialValues = {
  newPassword: '',
  confirmPassword:""
}


const passwordSchema = Yup.object().shape({
  newPassword: Yup.string()
    .min(6, "Minimum 3 symbols")
    .max(20, "Maximum 20 digit")
    .matches(/[0-9]/, 'Password requires a number')
    .matches(/[a-z]/, 'Password requires a lowercase letter')
    .matches(/[A-Z]/, 'Password requires an uppercase letter')
    .matches(/[^\w]/, 'Password requires a symbol')
    .required('Password is required'),
  confirmPassword: Yup.string()
    .min(3, 'Minimum 3 symbols')
    .max(50, 'Maximum 50 symbols')
    .required('Password confirmation is required')
    .oneOf([Yup.ref('newPassword')], "New Password and Confirm Password didn't match"),
})

export function NewPassword() {

  const url = new URL(window.location.href);
  const token = url?.search?.split("?token=")[1]
  console.log("tokennnnnnn", token, url)
  const [loading, setLoading] = useState(false)
  // const [hasErrors, setHasErrors] = useState(undefined)
  // const [otpStatus, setOtpStatus] = useState(false)
  // const [verifyOtpStatus, setVerifyOtpStatus] = useState(false)
  // const [passwordStatus, setPasswordStatus] = useState(false)
  // const [id, setId] = useState(0)
  // const [process, setProcess] = useState(0)
  const navigate = useNavigate()

  const formik = useFormik({
    initialValues,
    validationSchema: passwordSchema,
    onSubmit: (values) => {
      setLoading(true)
      // setHasErrors(undefined)
      userResetPassword({ password: values.newPassword ,token : token}).then(res => {
        // console.log("resssssssssssssss", res)
        setLoading(false)
        if (res?.status?.toLowerCase() === "ok") {
          navigate("/auth")
        }else{
          toast.error('Password does not change', { position: "top-right", autoClose: 2000, theme: "colored" });
        }
      }).catch((error)=>{
        console.log(error)
      })
    },
  })
 
 

  return (
    <div>
       <form
    className='form w-100 fv-plugins-bootstrap5 fv-plugins-framework'
    noValidate
    id='kt_login_password_reset_form'
    onSubmit={formik.handleSubmit}
  >
    <div className='text-center mb-10'>
      {/* begin::Title */}
      <h1 className='text-dark fw-bolder mb-3'>Reset Password ?</h1>
      {/* end::Title */}

      {/* begin::Link */}
      <div className='text-gray-500 fw-semibold fs-6'>
        Enter your new password.
      </div>
      {/* end::Link */}
    </div>

   
    <div className='position-relative mb-3'>
    <label className='form-label fw-bolder text-dark fs-6'>New Password</label>
          <input
            type='password'
            placeholder='New Password'
            autoComplete='off'
            {...formik.getFieldProps('newPassword')}
            className={clsx(
              'form-control bg-transparent',
              {
                'is-invalid': formik.touched.newPassword && formik.errors.newPassword,
              },
              {
                'is-valid': formik.touched.newPassword && !formik.errors.newPassword,
              }
            )}
          />
          {formik.touched.newPassword && formik.errors.newPassword && (
            <div className='fv-plugins-message-container'>
              <div className='fv-help-block'>
                <span role='alert'>{formik.errors.newPassword}</span>
              </div>
            </div>
          )}
        </div>
        <div className='fv-row mb-5'>
       <label className='form-label fw-bolder text-dark fs-6'>Confirm Password</label>
       <input
         type='password'
         placeholder='Password confirmation'
         autoComplete='off'
         {...formik.getFieldProps('confirmPassword')}
         className={clsx(
           'form-control bg-transparent',
           {
             'is-invalid': formik.touched.confirmPassword && formik.errors.confirmPassword,
           },
           {
             'is-valid': formik.touched.confirmPassword && !formik.errors.confirmPassword,
           }
         )}
       />
       {formik.touched.confirmPassword && formik.errors.confirmPassword && (
         <div className='fv-plugins-message-container'>
           <div className='fv-help-block'>
             <span role='alert'>{formik.errors.confirmPassword}</span>
           </div>
         </div>
       )}
     </div>
    {/* end::Form group */}

    {/* begin::Form group */}
    <div className='d-flex flex-wrap justify-content-center pb-lg-0'>
      <button type='submit' id='kt_password_reset_submit' className='btn btn-primary me-4'>
        <span className='indicator-label'>Submit</span>
        {loading && (
          <span className='indicator-progress'>
            Please wait...
            <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
          </span>
        )}
      </button>
      <Link to='/auth/login'>
        <button
          type='button'
          id='kt_login_password_reset_form_cancel_button'
          className='btn btn-light'
          disabled={formik.isSubmitting || !formik.isValid}
        >
          Cancel
        </button>
      </Link>{' '}
    </div>
    {/* end::Form group */}
  </form>
      
      
    </div>
  )
}



// {process === 0 ? (
//   <form
//     className='form w-100 fv-plugins-bootstrap5 fv-plugins-framework'
//     noValidate
//     id='kt_login_password_reset_form'
//     onSubmit={formik.handleSubmit}
//   >
//     <div className='text-center mb-10'>
//       {/* begin::Title */}
//       <h1 className='text-dark fw-bolder mb-3'>Reset Password ?</h1>
//       {/* end::Title */}

//       {/* begin::Link */}
//       <div className='text-gray-500 fw-semibold fs-6'>
//         Enter your new password.
//       </div>
//       {/* end::Link */}
//     </div>

//     {/* begin::Title */}
//     {/* {hasErrors === true && (
//       <div className='mb-lg-15 alert alert-danger'>
//         <div className='alert-text font-weight-bold'>
//           Sorry, looks like there are some errors detected, please try again.
//         </div>
//       </div>
//     )} */}

//     {/* {hasErrors === false && (
//       <div className='mb-10 bg-light-info p-8 rounded'>
//         <div className='text-info'>Sent password reset. Please check your email</div>
//       </div>
//     )} */}
//     {/* end::Title */}

//     {/* begin::Form group */}
//     <div className='position-relative mb-3'>
//           <input
//             type='password'
//             placeholder='New Password'
//             autoComplete='off'
//             {...formik.getFieldProps('newPassword')}
//             className={clsx(
//               'form-control bg-transparent',
//               {
//                 'is-invalid': formik.touched.newPassword && formik.errors.newPassword,
//               },
//               {
//                 'is-valid': formik.touched.newPassword && !formik.errors.newPassword,
//               }
//             )}
//           />
//           {formik.touched.newPassword && formik.errors.newPassword && (
//             <div className='fv-plugins-message-container'>
//               <div className='fv-help-block'>
//                 <span role='alert'>{formik.errors.newPassword}</span>
//               </div>
//             </div>
//           )}
//         </div>
//     {/* end::Form group */}

//     {/* begin::Form group */}
//     <div className='d-flex flex-wrap justify-content-center pb-lg-0'>
//       <button type='submit' id='kt_password_reset_submit' className='btn btn-primary me-4'>
//         <span className='indicator-label'>Submit</span>
//         {loading && (
//           <span className='indicator-progress'>
//             Please wait...
//             <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
//           </span>
//         )}
//       </button>
//       <Link to='/auth/login'>
//         <button
//           type='button'
//           id='kt_login_password_reset_form_cancel_button'
//           className='btn btn-light'
//           disabled={formik.isSubmitting || !formik.isValid}
//         >
//           Cancel
//         </button>
//       </Link>{' '}
//     </div>
//     {/* end::Form group */}
//   </form>
// ) : process === 1 ? (
//   <form
//     className='form w-100 fv-plugins-bootstrap5 fv-plugins-framework'
//     noValidate
//     id='kt_login_password_reset_form'
//     onSubmit={formik.handleSubmit}
//   >
//     <div className='text-center mb-10'>
//       {/* begin::Title */}
//       <h1 className='text-dark fw-bolder mb-3'>Forgot Password ?</h1>
//       {/* end::Title */}

//       {/* begin::Link */}
//       <div className='text-gray-500 fw-semibold fs-6'>
//         Enter verification OTP.
//       </div>
//       {/* end::Link */}
//     </div>

//     {/* begin::Title */}
//     {hasErrors === true && (
//       <div className='mb-lg-15 alert alert-danger'>
//         <div className='alert-text font-weight-bold'>
//           Sorry, looks like there are some errors detected, please try again.
//         </div>
//       </div>
//     )}

//     {hasErrors === false && (
//       <div className='mb-10 bg-light-info p-8 rounded'>
//         <div className='text-info'>Sent password reset. Please check your email</div>
//       </div>
//     )}
//     {/* end::Title */}

//     {/* begin::Form group */}
//     {/* <div className='fv-row mb-8'>
//       <label className='form-label fw-bolder text-gray-900 fs-6'>Verification OTP</label>
//       <input
//         type='text'
//         placeholder=''
//         autoComplete='off'
//         {...otpFormik.getFieldProps('otp')}
//         className={clsx(
//           'form-control bg-transparent',
//           { 'is-invalid': otpFormik.touched.otp && otpFormik.errors.otp },
//           {
//             'is-valid': otpFormik.touched.otp && !otpFormik.errors.otp,
//           }
//         )}
//       />
//       {otpFormik.touched.otp && otpFormik.errors.otp && (
//         <div className='fv-plugins-message-container'>
//           <div className='fv-help-block'>
//             <span role='alert'>{otpFormik.errors.otp}</span>
//           </div>
//         </div>
//       )}
//     </div> */}
//     {/* end::Form group */}

//     {/* begin::Form group */}
//     <div className='d-flex flex-wrap justify-content-center pb-lg-0'>
//       <button type='submit' id='kt_password_reset_submit' className='btn btn-primary me-4'>
//         <span className='indicator-label'>Submit</span>
//         {loading && (
//           <span className='indicator-progress'>
//             Please wait...
//             <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
//           </span>
//         )}
//       </button>
//     </div>
//     {/* end::Form group */}
//   </form>
// ) : (
//   <form
//     className='form w-100 fv-plugins-bootstrap5 fv-plugins-framework'
//     noValidate
//     id='kt_login_password_reset_form'
//     onSubmit={passFormik.handleSubmit}
//   >
//     <div className='text-center mb-10'>
//       {/* begin::Title */}
//       <h1 className='text-dark fw-bolder mb-3'>Forgot Password ?</h1>
//       {/* end::Title */}

//       {/* begin::Link */}
//       <div className='text-gray-500 fw-semibold fs-6'>
//         Enter New Password
//       </div>
//       {/* end::Link */}
//     </div>

//     {/* begin::Title */}
//     {hasErrors === true && (
//       <div className='mb-lg-15 alert alert-danger'>
//         <div className='alert-text font-weight-bold'>
//           Sorry, looks like there are some errors detected, please try again.
//         </div>
//       </div>
//     )}

//     {hasErrors === false && (
//       <div className='mb-10 bg-light-info p-8 rounded'>
//         <div className='text-info'>Sent password reset. Please check your email</div>
//       </div>
//     )}
//     {/* end::Title */}

//     {/* begin::Form group */}
//     <div className='fv-row mb-8' data-kt-password-meter='true'>
//       <div className='mb-1'>
//         <label className='form-label fw-bolder text-dark fs-6'>New Password</label>
//         <div className='position-relative mb-3'>
//           <input
//             type='password'
//             placeholder='New Password'
//             autoComplete='off'
//             {...formik.getFieldProps('newPassword')}
//             className={clsx(
//               'form-control bg-transparent',
//               {
//                 'is-invalid': formik.touched.newPassword && formik.errors.newPassword,
//               },
//               {
//                 'is-valid': formik.touched.newPassword && !formik.errors.newPassword,
//               }
//             )}
//           />
//           {formik.touched.newPassword && formik.errors.newPassword && (
//             <div className='fv-plugins-message-container'>
//               <div className='fv-help-block'>
//                 <span role='alert'>{formik.errors.newPassword}</span>
//               </div>
//             </div>
//           )}
//         </div>
//         {/* begin::Meter */}
//         <div
//           className='d-flex align-items-center mb-3'
//           data-kt-password-meter-control='highlight'
//         >
//           <div className='flex-grow-1 bg-secondary bg-active-success rounded h-5px me-2'></div>
//           <div className='flex-grow-1 bg-secondary bg-active-success rounded h-5px me-2'></div>
//           <div className='flex-grow-1 bg-secondary bg-active-success rounded h-5px me-2'></div>
//           <div className='flex-grow-1 bg-secondary bg-active-success rounded h-5px'></div>
//         </div>
//         {/* end::Meter */}
//       </div>
//       <div className='text-muted'>
//         Use 8 or more characters with a mix of letters, numbers & symbols.
//       </div>
//     </div>
//     {/* end::Form group */}

//     {/* begin::Form group Confirm password */}
//     <div className='fv-row mb-5'>
//       <label className='form-label fw-bolder text-dark fs-6'>Confirm Password</label>
//       <input
//         type='password'
//         placeholder='Password confirmation'
//         autoComplete='off'
//         {...passFormik.getFieldProps('confirmPassword')}
//         className={clsx(
//           'form-control bg-transparent',
//           {
//             'is-invalid': passFormik.touched.confirmPassword && passFormik.errors.confirmPassword,
//           },
//           {
//             'is-valid': passFormik.touched.confirmPassword && !passFormik.errors.confirmPassword,
//           }
//         )}
//       />
//       {passFormik.touched.confirmPassword && passFormik.errors.confirmPassword && (
//         <div className='fv-plugins-message-container'>
//           <div className='fv-help-block'>
//             <span role='alert'>{passFormik.errors.confirmPassword}</span>
//           </div>
//         </div>
//       )}
//     </div>
//     {/* end::Form group */}

//     {/* begin::Form group */}
//     <div className='d-flex flex-wrap justify-content-center pb-lg-0'>
//       <button type='submit' id='kt_password_reset_submit' className='btn btn-primary me-4'>
//         <span className='indicator-label'>Submit</span>
//         {loading && (
//           <span className='indicator-progress'>
//             Please wait...
//             <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
//           </span>
//         )}
//       </button>
//     </div>
//     {/* end::Form group */}
//   </form>
// )
// }