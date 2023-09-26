/* eslint-disable react/jsx-no-target-blank */
/* eslint-disable jsx-a11y/anchor-is-valid */
import { useState, useEffect } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import clsx from 'clsx'
import { getUserByToken, registerUser } from '../../../../utils/Api'
import { Link, useNavigate } from 'react-router-dom'
import { PasswordMeterComponent } from '../../../../_metronic/assets/ts/components'
import { useAuth } from '../core/Auth'
import { toast } from 'react-toastify';

const initialValues = {
  first_name: '',
  last_name: '',
  email: '',
  password: '',
  confirmPassword: '',
  brewery: "",
  acceptTerms: false,
}

const registrationSchema = Yup.object().shape({
  first_name: Yup.string()
    .min(3, 'Minimum 3 symbols')
    .max(50, 'Maximum 50 symbols')
    .required('First name is required'),
  email: Yup.string()
    .email('Wrong email format')
    .min(3, 'Minimum 3 symbols')
    .max(50, 'Maximum 50 symbols')
    .required('Email is required'),
  last_name: Yup.string()
    .min(3, 'Minimum 3 symbols')
    .max(50, 'Maximum 50 symbols')
    .required('Last name is required'),
  password: Yup.string()
    .min(3, 'Minimum 3 symbols')
    .max(50, 'Maximum 50 symbols')
    .required('Password is required'),
  brewery: Yup.string()
    .min(3, 'Minimum 3 symbols')
    .max(50, 'Maximum 50 symbols')
    .required('Password is required'),
  confirmPassword: Yup.string()
    .min(3, 'Minimum 3 symbols')
    .max(50, 'Maximum 50 symbols')
    .required('Password confirmation is required')
    .oneOf([Yup.ref('password')], "Password and Confirm Password didn't match"),
  acceptTerms: Yup.bool().required('You must accept the terms and conditions'),
})

export function Registration() {
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const formik = useFormik({
    initialValues,
    validationSchema: registrationSchema,
    onSubmit: (values) => {
      setLoading(true)
      registerUser({ first_name: values.first_name, last_name: values.last_name, brewery: values.brewery, email: values.email, password: values.password }).then(res => {
        setLoading(false)
        if (res.code === 200) {
          toast.success("Account created!! Please login.", { position: "top-right", autoClose: 2000, theme: "colored" });
          navigate("/login")
        } else if (res.code === 400) {
          toast.error(res.error, { position: "top-right", autoClose: 2000, theme: "colored" });
        }
      })
    },
  })

  useEffect(() => {
    PasswordMeterComponent.bootstrap()
  }, [])

  return (
    <form
      className='form w-100 fv-plugins-bootstrap5 fv-plugins-framework'
      noValidate
      id='kt_login_signup_form'
      onSubmit={formik.handleSubmit}
    >
      <div className='text-center mb-11'>
        <h1 className='text-dark fw-bolder mb-3'>Sign Up</h1>
      </div>
      {formik.status && (
        <div className='mb-lg-15 alert alert-danger'>
          <div className='alert-text font-weight-bold'>{formik.status}</div>
        </div>
      )}
      <div className='fv-row mb-8'>
        <label className='form-label fw-bolder text-dark fs-6'>First Name</label>
        <input
          placeholder='First name'
          type='text'
          autoComplete='off'
          {...formik.getFieldProps('first_name')}
          className={clsx(
            'form-control bg-transparent',
            {
              'is-invalid': formik.touched.first_name && formik.errors.first_name,
            },
            {
              'is-valid': formik.touched.first_name && !formik.errors.first_name,
            }
          )}
        />
        {formik.touched.first_name && formik.errors.first_name && (
          <div className='fv-plugins-message-container'>
            <div className='fv-help-block'>
              <span role='alert'>{formik.errors.first_name}</span>
            </div>
          </div>
        )}
      </div>
      <div className='fv-row mb-8'>
        <label className='form-label fw-bolder text-dark fs-6'>Last Name</label>
        <input
          placeholder='Last name'
          type='text'
          autoComplete='off'
          {...formik.getFieldProps('last_name')}
          className={clsx(
            'form-control bg-transparent',
            {
              'is-invalid': formik.touched.last_name && formik.errors.last_name,
            },
            {
              'is-valid': formik.touched.last_name && !formik.errors.last_name,
            }
          )}
        />
        {formik.touched.last_name && formik.errors.last_name && (
          <div className='fv-plugins-message-container'>
            <div className='fv-help-block'>
              <span role='alert'>{formik.errors.last_name}</span>
            </div>
          </div>
        )}
      </div>
      <div className='fv-row mb-8'>
        <label className='form-label fw-bolder text-dark fs-6'>Email</label>
        <input
          placeholder='Email'
          type='email'
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
      <div className='fv-row mb-8' data-kt-password-meter='true'>
        <div className='mb-1'>
          <label className='form-label fw-bolder text-dark fs-6'>Password</label>
          <div className='position-relative mb-3'>
            <input
              type='password'
              placeholder='Password'
              autoComplete='new-password'
              {...formik.getFieldProps('password')}
              className={clsx(
                'form-control bg-transparent',
                {
                  'is-invalid': formik.touched.password && formik.errors.password,
                },
                {
                  'is-valid': formik.touched.password && !formik.errors.password,
                }
              )}
            />
            {formik.touched.password && formik.errors.password && (
              <div className='fv-plugins-message-container'>
                <div className='fv-help-block'>
                  <span role='alert'>{formik.errors.password}</span>
                </div>
              </div>
            )}
          </div>
          <div
            className='d-flex align-items-center mb-3'
            data-kt-password-meter-control='highlight'
          >
            <div className='flex-grow-1 bg-secondary bg-active-success rounded h-5px me-2'></div>
            <div className='flex-grow-1 bg-secondary bg-active-success rounded h-5px me-2'></div>
            <div className='flex-grow-1 bg-secondary bg-active-success rounded h-5px me-2'></div>
            <div className='flex-grow-1 bg-secondary bg-active-success rounded h-5px'></div>
          </div>
        </div>
        <div className='text-muted'>
          Use 8 or more characters with a mix of letters, numbers & symbols.
        </div>
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
      <div className='fv-row mb-5'>
        <label className='form-label fw-bolder text-dark fs-6'>Brewery or Distillery ID</label>
        <input
          type='text'
          placeholder='Enter Brewery or Distillery ID'
          autoComplete='off'
          {...formik.getFieldProps('brewery')}
          className={clsx(
            'form-control bg-transparent',
            {
              'is-invalid': formik.touched.brewery && formik.errors.brewery,
            },
            {
              'is-valid': formik.touched.brewery && !formik.errors.brewery,
            }
          )}
        />
        {formik.touched.brewery && formik.errors.brewery && (
          <div className='fv-plugins-message-container'>
            <div className='fv-help-block'>
              <span role='alert'>{formik.errors.brewery}</span>
            </div>
          </div>
        )}
      </div>
      <div className='fv-row mb-8'>
        <label className='form-check form-check-inline' htmlFor='kt_login_toc_agree'>
          <input
            className='form-check-input'
            type='checkbox'
            id='kt_login_toc_agree'
            {...formik.getFieldProps('acceptTerms')}
          />
          <span>
            I Accept the{' '}
            <a
              href='https://keenthemes.com/metronic/?page=faq'
              target='_blank'
              className='ms-1 link-primary'
            >
              Terms
            </a>
            .
          </span>
        </label>
        {formik.touched.acceptTerms && formik.errors.acceptTerms && (
          <div className='fv-plugins-message-container'>
            <div className='fv-help-block'>
              <span role='alert'>{formik.errors.acceptTerms}</span>
            </div>
          </div>
        )}
      </div>
      <div className='text-center'>
        <button
          type='submit'
          id='kt_sign_up_submit'
          className='btn btn-lg btn-primary w-100 mb-5'
          disabled={!formik.values.acceptTerms}
        >
          {!loading && <span className='indicator-label'>Submit</span>}
          {loading && (
            <span className='indicator-progress' style={{ display: 'block' }}>
              Please wait...{' '}
              <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
            </span>
          )}
        </button>
        <Link to='/auth/login'>
          <button
            type='button'
            id='kt_login_signup_form_cancel_button'
            className='btn btn-lg btn-light-primary w-100 mb-5'
          >
            Cancel
          </button>
        </Link>
      </div>
    </form>
  )
}
