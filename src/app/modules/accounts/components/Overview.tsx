/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { KTIcon } from "../../../../_metronic/helpers";
import {
  ChartsWidget1,
  ListsWidget5,
  TablesWidget1,
  TablesWidget5,
} from "../../../../_metronic/partials/widgets";
import { useAuth } from "../../auth";
import { getUserData, getuserProfile } from "../../../../utils/Api";
type Props = {
  first_name: string;
  last_name: string;
  phone_no: number;
  profile_image: any;
  email: string;
};

export function Overview() {
  const { auth } = useAuth();
  const [data, setData] = useState({
    first_name: "",
    last_name: "",
    email: "",
  });

  useEffect(() => {
    userProfileDetail();
  }, []);

  const userProfileDetail = () => {
    getuserProfile()
      .then((res) => {
        setData(res?.data?.[0]);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <div className="card mb-5 mb-xl-10" id="kt_profile_details_view">
        <div className="card-header cursor-pointer">
          <div className="card-title m-0">
            <h3 className="fw-bolder m-0">Profile Details</h3>
          </div>

          <Link
            to="/crafted/account/settings"
            className="btn btn-primary align-self-center"
          >
            Edit Profile
          </Link>
        </div>

        <div className="card-body p-9">
          <div className="row mb-7">
            <label className="col-lg-4 fw-bold text-muted">Full Name</label>

            <div className="col-lg-8">
              <span className="fw-bolder fs-6 text-dark">
                {data?.first_name} {data?.last_name}
              </span>
            </div>
          </div>

          <div className="row mb-7">
            <label className="col-lg-4 fw-bold text-muted">Email</label>

            <div className="col-lg-8">
              <a href="#" className="fw-bold fs-6 text-dark text-hover-primary">
                {auth?.email}
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
