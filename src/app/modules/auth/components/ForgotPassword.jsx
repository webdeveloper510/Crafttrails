import { useState } from 'react'
import * as Yup from 'yup'
import clsx from 'clsx'
import { Link, useNavigate } from 'react-router-dom'
import { useFormik } from 'formik'
import validate from '../../../pages/validations/FormValidations'
import { sendOTP, verifyOtp, forgotPassword } from '../../../../utils/Api'
import { toast } from 'react-toastify';

const initialValues = {
  email: '',
  otp: '',
  newPassword: '',
  confirmPassword: '',
}

const emailSchema = Yup.object().shape({
  email: Yup.string()
    .email('Wrong email format')
    .min(3, 'Minimum 3 symbols')
    .max(50, 'Maximum 50 symbols')
    .required('Email is required')
})

const otpSchema = Yup.object().shape({
  otp: Yup.string()
    .min(3, 'Minimum 4 symbols')
    .max(50, 'Maximum 50 symbols')
    .required('OTP is required')
})

const passwordSchema = Yup.object().shape({
  newPassword: Yup.string()
    .min(3, 'Minimum 3 symbols')
    .max(50, 'Maximum 50 symbols')
    .required('Password is required'),
  confirmPassword: Yup.string()
    .min(3, 'Minimum 3 symbols')
    .max(50, 'Maximum 50 symbols')
    .required('Password confirmation is required')
    .oneOf([Yup.ref('newPassword')], "New Password and Confirm Password didn't match"),
})

export function ForgotPassword() {
  const [loading, setLoading] = useState(false)
  const [hasErrors, setHasErrors] = useState(undefined)
  const [otpStatus, setOtpStatus] = useState(false)
  const [verifyOtpStatus, setVerifyOtpStatus] = useState(false)
  const [passwordStatus, setPasswordStatus] = useState(false)
  const [id, setId] = useState(0)
  const [process, setProcess] = useState(0)
  const navigate = useNavigate()
  const formik = useFormik({
    initialValues,
    validationSchema: emailSchema,
    onSubmit: (values, { setStatus, setSubmitting }) => {
      setLoading(true)
      setHasErrors(undefined)
      sendOTP({ email: values.email }).then(res => {
        if (res.code == 200) {
          setId(res.result.id)
          setProcess(1)
        }else if(res.code === 201){
          toast.error('Email id does not exist please check', { position: "top-right", autoClose: 2000, theme: "colored" });

        }
      })

      console.log(values.email)
    },
  })
  const otpFormik = useFormik({
    initialValues,
    validationSchema: otpSchema,
    onSubmit: (values, { setStatus, setSubmitting }) => {
      setLoading(true)
      setHasErrors(undefined)
      verifyOtp({ userId: id, otp: values.otp }).then(res => {
        if (res.code == 200) {
          setProcess(2)
        }else if(res.code === 201){
          toast.error(res.message, { position: "top-right", autoClose: 2000, theme: "colored" });

        }
      })
    },
  })
  const passFormik = useFormik({
    initialValues,
    validationSchema: passwordSchema,
    onSubmit: (values, { setStatus, setSubmitting }) => {
      setLoading(true)
      setHasErrors(undefined)
      forgotPassword({ userId: id, password: values.newPassword }).then(res => {
        if (res.code == 200) {
          navigate("/auth")
        }
      })
      // sendOTP({ email: values.email })
    },
  })

  return (
    <div>
      {process === 0 ? (
        <form
          className='form w-100 fv-plugins-bootstrap5 fv-plugins-framework'
          noValidate
          id='kt_login_password_reset_form'
          onSubmit={formik.handleSubmit}
        >
          <div className='text-center mb-10'>
            {/* begin::Title */}
            <h1 className='text-dark fw-bolder mb-3'>Forgot Password ?</h1>
            {/* end::Title */}

            {/* begin::Link */}
            <div className='text-gray-500 fw-semibold fs-6'>
              Enter your email to reset your password.
            </div>
            {/* end::Link */}
          </div>

          {/* begin::Title */}
          {hasErrors === true && (
            <div className='mb-lg-15 alert alert-danger'>
              <div className='alert-text font-weight-bold'>
                Sorry, looks like there are some errors detected, please try again.
              </div>
            </div>
          )}

          {hasErrors === false && (
            <div className='mb-10 bg-light-info p-8 rounded'>
              <div className='text-info'>Sent password reset. Please check your email</div>
            </div>
          )}
          {/* end::Title */}

          {/* begin::Form group */}
          <div className='fv-row mb-8'>
            <label className='form-label fw-bolder text-gray-900 fs-6'>Email</label>
            <input
              type='email'
              placeholder=''
              autoComplete='off'
              {...formik.getFieldProps('email')}
              className={clsx(
                'form-control bg-transparent',
                { 'is-invalid': formik.touched.email && formik.errors.email },
                {
                  'is-valid': formik.touched.email && !formik.errors.email,
                }
              )}
            />
            {formik.touched.email && formik.errors.email && (
              <div className='fv-plugins-message-container'>
                <div className='fv-help-block'>
                  <span role='alert'>{formik.errors.email}</span>
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
      ) : process === 1 ? (
        <form
          className='form w-100 fv-plugins-bootstrap5 fv-plugins-framework'
          noValidate
          id='kt_login_password_reset_form'
          onSubmit={otpFormik.handleSubmit}
        >
          <div className='text-center mb-10'>
            {/* begin::Title */}
            <h1 className='text-dark fw-bolder mb-3'>Forgot Password ?</h1>
            {/* end::Title */}

            {/* begin::Link */}
            <div className='text-gray-500 fw-semibold fs-6'>
              Enter verification OTP.
            </div>
            {/* end::Link */}
          </div>

          {/* begin::Title */}
          {hasErrors === true && (
            <div className='mb-lg-15 alert alert-danger'>
              <div className='alert-text font-weight-bold'>
                Sorry, looks like there are some errors detected, please try again.
              </div>
            </div>
          )}

          {hasErrors === false && (
            <div className='mb-10 bg-light-info p-8 rounded'>
              <div className='text-info'>Sent password reset. Please check your email</div>
            </div>
          )}
          {/* end::Title */}

          {/* begin::Form group */}
          <div className='fv-row mb-8'>
            <label className='form-label fw-bolder text-gray-900 fs-6'>Verification OTP</label>
            <input
              type='text'
              placeholder=''
              autoComplete='off'
              {...otpFormik.getFieldProps('otp')}
              className={clsx(
                'form-control bg-transparent',
                { 'is-invalid': otpFormik.touched.otp && otpFormik.errors.otp },
                {
                  'is-valid': otpFormik.touched.otp && !otpFormik.errors.otp,
                }
              )}
            />
            {otpFormik.touched.otp && otpFormik.errors.otp && (
              <div className='fv-plugins-message-container'>
                <div className='fv-help-block'>
                  <span role='alert'>{otpFormik.errors.otp}</span>
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
          </div>
          {/* end::Form group */}
        </form>
      ) : (
        <form
          className='form w-100 fv-plugins-bootstrap5 fv-plugins-framework'
          noValidate
          id='kt_login_password_reset_form'
          onSubmit={passFormik.handleSubmit}
        >
          <div className='text-center mb-10'>
            {/* begin::Title */}
            <h1 className='text-dark fw-bolder mb-3'>Forgot Password ?</h1>
            {/* end::Title */}

            {/* begin::Link */}
            <div className='text-gray-500 fw-semibold fs-6'>
              Enter New Password
            </div>
            {/* end::Link */}
          </div>

          {/* begin::Title */}
          {hasErrors === true && (
            <div className='mb-lg-15 alert alert-danger'>
              <div className='alert-text font-weight-bold'>
                Sorry, looks like there are some errors detected, please try again.
              </div>
            </div>
          )}

          {hasErrors === false && (
            <div className='mb-10 bg-light-info p-8 rounded'>
              <div className='text-info'>Sent password reset. Please check your email</div>
            </div>
          )}
          {/* end::Title */}

          {/* begin::Form group */}
          <div className='fv-row mb-8' data-kt-password-meter='true'>
            <div className='mb-1'>
              <label className='form-label fw-bolder text-dark fs-6'>New Password</label>
              <div className='position-relative mb-3'>
                <input
                  type='password'
                  placeholder='New Password'
                  autoComplete='off'
                  {...passFormik.getFieldProps('newPassword')}
                  className={clsx(
                    'form-control bg-transparent',
                    {
                      'is-invalid': passFormik.touched.newPassword && passFormik.errors.newPassword,
                    },
                    {
                      'is-valid': passFormik.touched.newPassword && !passFormik.errors.newPassword,
                    }
                  )}
                />
                {passFormik.touched.newPassword && passFormik.errors.newPassword && (
                  <div className='fv-plugins-message-container'>
                    <div className='fv-help-block'>
                      <span role='alert'>{passFormik.errors.newPassword}</span>
                    </div>
                  </div>
                )}
              </div>
              {/* begin::Meter */}
              <div
                className='d-flex align-items-center mb-3'
                data-kt-password-meter-control='highlight'
              >
                <div className='flex-grow-1 bg-secondary bg-active-success rounded h-5px me-2'></div>
                <div className='flex-grow-1 bg-secondary bg-active-success rounded h-5px me-2'></div>
                <div className='flex-grow-1 bg-secondary bg-active-success rounded h-5px me-2'></div>
                <div className='flex-grow-1 bg-secondary bg-active-success rounded h-5px'></div>
              </div>
              {/* end::Meter */}
            </div>
            <div className='text-muted'>
              Use 8 or more characters with a mix of letters, numbers & symbols.
            </div>
          </div>
          {/* end::Form group */}

          {/* begin::Form group Confirm password */}
          <div className='fv-row mb-5'>
            <label className='form-label fw-bolder text-dark fs-6'>Confirm Password</label>
            <input
              type='password'
              placeholder='Password confirmation'
              autoComplete='off'
              {...passFormik.getFieldProps('confirmPassword')}
              className={clsx(
                'form-control bg-transparent',
                {
                  'is-invalid': passFormik.touched.confirmPassword && passFormik.errors.confirmPassword,
                },
                {
                  'is-valid': passFormik.touched.confirmPassword && !passFormik.errors.confirmPassword,
                }
              )}
            />
            {passFormik.touched.confirmPassword && passFormik.errors.confirmPassword && (
              <div className='fv-plugins-message-container'>
                <div className='fv-help-block'>
                  <span role='alert'>{passFormik.errors.confirmPassword}</span>
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
          </div>
          {/* end::Form group */}
        </form>
      )}
    </div>
  )
}