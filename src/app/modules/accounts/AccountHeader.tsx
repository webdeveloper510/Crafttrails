/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { KTIcon, toAbsoluteUrl } from "../../../_metronic/helpers";
import { Link } from "react-router-dom";
import { Dropdown1 } from "../../../_metronic/partials";
import { useLocation } from "react-router";
import { useAuth } from "../auth";
import { getUserData } from "../../../utils/Api";

type Props = {
  first_name: string;
  last_name: string;
  phone_no: number;
  profile_image: any;
  email: string;
};
const AccountHeader: React.FC = () => {
  const [data, setData] = React.useState<Props>();
  const location = useLocation();

  const { auth } = useAuth();

  return (
    <div className="card mb-5 mb-xl-10">
      <div className="card-body pt-9 pb-0">
        <div className="d-flex flex-wrap flex-sm-nowrap mb-3">
          <div className="me-7 mb-4">
            <div className="symbol symbol-100px symbol-lg-160px symbol-fixed position-relative">
              <img
                src={toAbsoluteUrl("/media/avatars/300-1.jpg")}
                alt="Metronic"
              />

              <div className="position-absolute translate-middle bottom-0 start-100 mb-6 bg-success rounded-circle border border-4 border-white h-20px w-20px"></div>
            </div>
          </div>

          <div className="flex-grow-1">
            <div className="d-flex justify-content-between align-items-start flex-wrap mb-2">
              <div className="d-flex flex-column">
                <div className="d-flex align-items-center mb-2">
                  <a
                    href="#"
                    className="text-gray-800 text-hover-primary fs-2 fw-bolder me-1"
                  >
                    {auth?.firstname}
                  </a>
                  <a href="#">
                    <KTIcon iconName="verify" className="fs-1 text-primary" />
                  </a>
                </div>

                <div className="d-flex flex-wrap fw-bold fs-6 mb-4 pe-2">
                  <a
                    href="#"
                    className="d-flex align-items-center text-gray-400 text-hover-primary mb-2"
                  >
                    <KTIcon iconName="sms" className="fs-4 me-1" />
                    {auth?.email}
                  </a>
                </div>
              </div>
            </div>

            <div className="d-flex flex-wrap flex-stack"></div>
          </div>
        </div>

        <div className="d-flex overflow-auto h-55px">
          <ul className="nav nav-stretch nav-line-tabs nav-line-tabs-2x border-transparent fs-5 fw-bolder flex-nowrap">
            <li className="nav-item">
              <Link
                className={
                  `nav-link text-active-primary me-6 ` +
                  (location.pathname === "/crafted/account/overview" &&
                    "active")
                }
                to="/crafted/account/overview"
              >
                Overview
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={
                  `nav-link text-active-primary me-6 ` +
                  (location.pathname === "/crafted/account/settings" &&
                    "active")
                }
                to="/crafted/account/settings"
              >
                Settings
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export { AccountHeader };
