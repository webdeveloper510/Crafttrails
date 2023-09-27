/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import { KTIcon, toAbsoluteUrl } from '../../../_metronic/helpers'
import { Link, useLocation } from 'react-router-dom'
import { Dropdown1 } from '../../../_metronic/partials'
import { useAuth } from '../auth'
import { getUserData, editUser, getUserByToken } from '../../../utils/Api'
import { Button, Modal } from "react-bootstrap";
import { toast } from 'react-toastify';


const ProfileHeader = () => {
  const { auth, saveAuth, setCurrentUser } = useAuth()
  const [profile, setProfile] = React.useState({ first_name: "", last_name: "", email: "", profile_image: "" });
  const [profileModal, setProfilModal] = React.useState(false)
  const [profileData, setProfilData] = React.useState([]);


  const handleFileChange = (event) => {
    if (event.target.files && event.target.files.length > 0) {
      setProfilData(event.target.files[0]);
    }
  };

  const handleProfile = async () => {
    if (profileData) {
      const formData = new FormData();
      formData.append('profile_image', profileData);
      formData.append('userId', auth.id);

      editUser(formData).then((res) => {
        setProfilModal(false)
        saveAuth(res.result)
        getUserByToken(res.result.jwtToken).then(res => {
          setCurrentUser(res)
        })
      }).catch((err) => {
      })

    }
  }
  React.useEffect(() => {
    if (auth) {
      getUserData(auth.id).then((res) => {
        setProfile(res.result)
      }).catch((err) => {
      })
    }

  }, [profileModal])
  const location = useLocation()

  return (
    <div className='card mb-5 mb-xl-10'>
      <div className='card-body pt-9 pb-0'>
        <div className='d-flex flex-wrap flex-sm-nowrap mb-3'>
          {/* //Profile Modal */}
          <Modal show={profileModal} onHide={() => setProfilModal(false)}>
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Update Profile
              </h5>
              <button
                type="button"
                className="btn-close"
                onClick={() => setProfilModal(false)}
              ></button>
            </div>
            <div className="modal-body text-start">
              <input
                type="file"
                placeholder="First Name"
                className="form-control mx-2 my-3"
                name="first_name"
                autoComplete="off"
                // value={data.first_name}
                onChange={handleFileChange}
              />



            </div>
            <div className="modal-footer">

              <button
                type="button"
                className="btn btn-primary"
                data-bs-dismiss="modal"
                onClick={() => handleProfile()}
              >
                Update
              </button>



            </div>
          </Modal>
          <div className='me-7 mb-4'>
            <div className='symbol symbol-100px symbol-lg-160px symbol-fixed position-relative'
              style={{ cursor: 'pointer' }} onClick={() => setProfilModal(true)}>
              {/* {
                profile?.profile_image?.includes("https") ?
                  <img src={`${profile?.profile_image}`} alt='Metornic' /> :
                  <img src={`${process.env.REACT_APP_API_URL}/uploads/profile/${profile?.profile_image}`} alt='Metornic' />
              } */}
              <img src={toAbsoluteUrl('/media/avatars/300-1.jpg')} alt='Metronic' />
              <div className='position-absolute translate-middle bottom-0 start-100 mb-6 bg-success rounded-circle border border-4 border-white h-20px w-20px'></div>
            </div>
          </div>

          <div className='flex-grow-1'>
            <div className='d-flex justify-content-between align-items-start flex-wrap mb-2'>
              <div className='d-flex flex-column'>
                <div className='d-flex align-items-center mb-2'>
                  <a href='#' className='text-gray-800 text-hover-primary fs-2 fw-bolder me-1'>
                    {profile && profile.first_name + ' ' + profile.last_name}
                  </a>
                  <a href='#'>
                    <KTIcon iconName='verify' className='fs-1 text-primary' />
                  </a>
                </div>

                <div className='d-flex flex-wrap fw-bold fs-6 mb-4 pe-2'>
                  {/* <a
                    href='#'
                    className='d-flex align-items-center text-gray-400 text-hover-primary me-5 mb-2'
                  >
                    <KTIcon iconName='profile-circle' className='fs-4 me-1' />
                    Developer
                  </a>
                  <a
                    href='#'
                    className='d-flex align-items-center text-gray-400 text-hover-primary me-5 mb-2'
                  >
                    <KTIcon iconName='geolocation' className='fs-4 me-1' />
                    SF, Bay Area
                  </a> */}
                  <a
                    href='#'
                    className='d-flex align-items-center text-gray-400 text-hover-primary mb-2'
                  >
                    <KTIcon iconName='sms' className='fs-4 me-1' />
                    {profile && profile.email}
                  </a>
                </div>
              </div>

              <div className='d-flex my-4'>
                <a href='#' className='btn btn-sm btn-light me-2' id='kt_user_follow_button'>
                  <KTIcon iconName='check' className='fs-3 d-none' />

                  <span className='indicator-label'>Follow</span>
                  <span className='indicator-progress'>
                    Please wait...
                    <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
                  </span>
                </a>
                <a
                  href='#'
                  className='btn btn-sm btn-primary me-3'
                  data-bs-toggle='modal'
                  data-bs-target='#kt_modal_offer_a_deal'
                >
                  Hire Me
                </a>
                <div className='me-0'>
                  <button
                    className='btn btn-sm btn-icon btn-bg-light btn-active-color-primary'
                    data-kt-menu-trigger='click'
                    data-kt-menu-placement='bottom-end'
                    data-kt-menu-flip='top-end'
                  >
                    <i className='bi bi-three-dots fs-3'></i>
                  </button>
                  <Dropdown1 />
                </div>
              </div>
            </div>

            <div className='d-flex flex-wrap flex-stack'>
              <div className='d-flex flex-column flex-grow-1 pe-8'>
                <div className='d-flex flex-wrap'>
                  <div className='border border-gray-300 border-dashed rounded min-w-125px py-3 px-4 me-6 mb-3'>
                    <div className='d-flex align-items-center'>
                      <KTIcon iconName='arrow-up' className='fs-3 text-success me-2' />
                      <div className='fs-2 fw-bolder'>4500$</div>
                    </div>

                    <div className='fw-bold fs-6 text-gray-400'>Earnings</div>
                  </div>

                  <div className='border border-gray-300 border-dashed rounded min-w-125px py-3 px-4 me-6 mb-3'>
                    <div className='d-flex align-items-center'>
                      <KTIcon iconName='arrow-down' className='fs-3 text-danger me-2' />
                      <div className='fs-2 fw-bolder'>75</div>
                    </div>

                    <div className='fw-bold fs-6 text-gray-400'>Projects</div>
                  </div>

                  <div className='border border-gray-300 border-dashed rounded min-w-125px py-3 px-4 me-6 mb-3'>
                    <div className='d-flex align-items-center'>
                      <KTIcon iconName='arrow-up' className='fs-3 text-success me-2' />
                      <div className='fs-2 fw-bolder'>60%</div>
                    </div>

                    <div className='fw-bold fs-6 text-gray-400'>Success Rate</div>
                  </div>
                </div>
              </div>

              <div className='d-flex align-items-center w-200px w-sm-300px flex-column mt-3'>
                <div className='d-flex justify-content-between w-100 mt-auto mb-2'>
                  <span className='fw-bold fs-6 text-gray-400'>Profile Compleation</span>
                  <span className='fw-bolder fs-6'>50%</span>
                </div>
                <div className='h-5px mx-3 w-100 bg-light mb-3'>
                  <div
                    className='bg-success rounded h-5px'
                    role='progressbar'
                    style={{ width: '50%' }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className='d-flex overflow-auto h-55px'>
          <ul className='nav nav-stretch nav-line-tabs nav-line-tabs-2x border-transparent fs-5 fw-bolder flex-nowrap'>
            <li className='nav-item'>
              <Link
                className={
                  `nav-link text-active-primary me-6 ` +
                  (location.pathname === '/crafted/pages/profile/overview' && 'active')
                }
                to='/crafted/pages/profile/overview'
              >
                Overview
              </Link>
            </li>
            <li className='nav-item'>
              <Link
                className={
                  `nav-link text-active-primary me-6 ` +
                  (location.pathname === '/crafted/pages/profile/projects' && 'active')
                }
                to='/crafted/pages/profile/projects'
              >
                Projects
              </Link>
            </li>
            <li className='nav-item'>
              <Link
                className={
                  `nav-link text-active-primary me-6 ` +
                  (location.pathname === '/crafted/pages/profile/campaigns' && 'active')
                }
                to='/crafted/pages/profile/campaigns'
              >
                Campaigns
              </Link>
            </li>
            <li className='nav-item'>
              <Link
                className={
                  `nav-link text-active-primary me-6 ` +
                  (location.pathname === '/crafted/pages/profile/documents' && 'active')
                }
                to='/crafted/pages/profile/documents'
              >
                Documents
              </Link>
            </li>
            <li className='nav-item'>
              <Link
                className={
                  `nav-link text-active-primary me-6 ` +
                  (location.pathname === '/crafted/pages/profile/connections' && 'active')
                }
                to='/crafted/pages/profile/connections'
              >
                Connections
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export { ProfileHeader }
