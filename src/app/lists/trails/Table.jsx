/*eslint-disabled*/
// eslint-disable-next-line @typescript-eslint/no-unused-expressions

import { useState, useEffect } from "react";
import { Breadcrumb, Modal, Tab, Tabs } from "react-bootstrap";
import {
  getTrailExport,
  getTrailList,
  getuserProfile,
} from "../../../utils/Api";
import DynamicTable from "../../modules/table";
import { CheckSquareFill, XSquareFill } from "react-bootstrap-icons";
import Papa from "papaparse";

const Table = () => {
  const [list, setList] = useState([]);
  const [visited, setVisited] = useState([]);
  const [loading, setLoading] = useState(false);
  const [moreView, setMoreView] = useState({ toggle: false, data: null });
  const [data, setData] = useState("");
  const [csvData, setCsvData] = useState("");
  const [csv, setCsv] = useState(null);

  const getuserdata = () => {
    getuserProfile()
      .then((res) => {
        setData(res?.data?.[0]?.listexport);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    setLoading(true);
    getTrailList()
      .then((res) => {
        setLoading(false);
        if (res.code === 200) {
          setList(res?.data);
        }
      })
      .catch((error) => {
        setLoading(false);
      });
    getuserdata();
  }, []);

  const handleDownload = () => {
    const filename = "trail.csv";
    const modifiedData = list.map(({ title_submenu, ...rest }) => rest);
    const csv = Papa.unparse(modifiedData);
    const blob = new Blob([csv], { type: "text/csv" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };


  return (
    <>
      <div>
        <Breadcrumb className="display-6 mb-4">
          <Breadcrumb.Item href="#">
            <span style={{ color: "#000" }}>Lists</span>
          </Breadcrumb.Item>
          <Breadcrumb.Item active>
            <span style={{ color: "#ef305e" }}>Trails</span>
          </Breadcrumb.Item>
        </Breadcrumb>
        <div className="text-end me-5">
          {data == true ? (
            <button className="export-btn" onClick={handleDownload}>
              Export
            </button>
          ) : (
            ""
          )}
        </div>
        <div>
          {loading ? (
            <div className="loader-overly">
              <div className="loader"></div>
            </div>
          ) : (
            <>
              {/* <Tabs
                defaultActiveKey="visits-completed"
                id="fill-tab-example"
                className="mb-3"
                fill
              >
                <Tab eventKey="visits-completed" title="Visits Completed">
                  {list && list.length > 0 ? (
                    <DynamicTable
                      data={list}
                      moreView={(value) => {
                        setMoreView(value);
                      }}
                      display={{ value: true, key: "breweries_completed" }}
                    />
                  ) : (
                    "No Record Found!!"
                  )}
                </Tab>
                <Tab
                  eventKey="location-completed"
                  title="Locations Completed"
                ></Tab>
              </Tabs> */}
              {list && list.length > 0 ? (
                <DynamicTable
                  data={list}
                  moreView={(value) => {
                    setMoreView(value);
                  }}
                  display={{ value: true, key: "breweries_completed" }}
                />
              ) : (
                "No Record Found!!"
              )}
            </>
          )}
        </div>
      </div>
      <ModalView
        toggle={moreView.toggle}
        data={moreView.data}
        handler={() => setMoreView({ toggle: false, data: null })}
      />
    </>
  );
};

const ModalView = ({ toggle, handler, data }) => {
  return (
    <>
      <Modal show={toggle} size="lg" centered onHide={() => handler()}>
        <Modal.Header className="bg-danger">
          <div className="d-grid">
            <h5 className="text-light">Trails</h5>
            <span className="text-light display-6">{data?.title || "N/A"}</span>
          </div>
          <button className="button-close" onClick={() => handler()}>
            <span class="material-symbols-outlined">cancel</span>
          </button>
        </Modal.Header>
        <Modal.Body>
          <div style={{ marginLeft: "50px" }}>
            <div className="row my-5">
              <div className="col-md-3 d-grid col-lg-3 col-sm-12">
                <span className="fw-bold">TITLE</span>
              </div>
              <div className="col-md-8 col-lg-8 col-sm-12 d-grid ms-5">
                <span className="bg-secondary rounded ps-3 py-2">
                  {data?.title || "N/A"}
                </span>
              </div>
            </div>
            <div className="row my-5">
              <div className="col-md-3 d-grid col-lg-3 col-sm-12">
                <span className="fw-bold">DESCRIPTION</span>
              </div>
              <div className="col-md-8 col-lg-8 col-sm-12 d-grid ms-5">
                <span className="bg-secondary rounded ps-3 py-2">
                  {data?.brewery_name || "N/A"}
                </span>
              </div>
            </div>
            <div className="row my-5">
              <div className="col-md-3 d-grid col-lg-3 col-sm-12">
                <span className="fw-bold">TRAIL NAME</span>
              </div>
              <div className="col-md-8 col-lg-8 col-sm-12 d-grid ms-5">
                <span className="bg-secondary rounded ps-3 py-2">
                  {data?.trail_name || "N/A"}
                </span>
              </div>
            </div>
            <div className="row my-5">
              <div className="col-md-3 d-grid col-lg-3 col-sm-12">
                <span className="fw-bold">TRAIL SEASON</span>
              </div>
              <div className="col-md-8 col-lg-8 col-sm-12 d-grid ms-5">
                <span className="bg-secondary rounded ps-3 py-2">
                  {data?.trail_season || "N/A"}
                </span>
              </div>
            </div>
            <div className="row my-5">
              <div className="col-md-3 d-grid col-lg-3 col-sm-12">
                <span className="fw-bold">TRAIL YEAR</span>
              </div>
              <div className="col-md-8 col-lg-8 col-sm-12 d-grid ms-5">
                <span className="bg-secondary rounded ps-3 py-2">
                  {data?.trail_year || "N/A"}
                </span>
              </div>
            </div>
            <div className="row my-5">
              <div className="col-md-3 col-lg-3 col-sm-12 d-grid">
                <span className="fw-bold">PARTICIPANT ID</span>
              </div>
              <div className="col-md-8 col-lg-8 col-sm-12 d-grid ms-5">
                <span className="bg-secondary rounded ps-3 py-2">
                  {data?.participant_id || "N/A"}
                </span>
              </div>
            </div>
            <div className="row my-5">
              <div className="col-md-3 col-lg-3 col-sm-12 d-grid">
                <span className="fw-bold">MASTER ID</span>
              </div>
              <div className="col-md-8 col-lg-8 col-sm-12 d-grid ms-5">
                <span className="bg-secondary rounded ps-3 py-2">
                  {data?.master_id || "N/A"}
                </span>
              </div>
            </div>
            <div className="row my-5">
              <div className="col-md-3 col-lg-3 col-sm-12 d-grid">
                <span className="fw-bold">STATUS</span>
              </div>
              <div className="col-md-8 col-lg-8 col-sm-12 d-grid ms-5">
                <span className="bg-secondary rounded ps-3 py-2">
                  {data?.status || "N/A"}
                </span>
              </div>
            </div>
            <div className="row my-5">
              <div className="col-md-3 col-lg-3 col-sm-12 d-grid">
                <span className="fw-bold">TRAIL STATUS</span>
              </div>
              <div className="col-md-8 col-lg-8 col-sm-12 d-grid ms-5">
                <span className="bg-secondary rounded ps-3 py-2">
                  {data?.trail_status || "N/A"}
                </span>
              </div>
            </div>
          </div>
          <div className="row mt-5" style={{ marginLeft: "20px" }}>
            <div className="col-md-12 col-lg-12 col-sm-12 d-grid">
              <span className="fw-bold">BREWERIES COMPLETED</span>
            </div>
          </div>
          <div className="row mb-5">
            {data?.breweries_completed !== undefined &&
            data?.breweries_completed !== "" ? (
              <DynamicTable data={[data?.breweries_completed]} />
            ) : (
              <span className="bg-secondary rounded ps-3 py-2">
                NO RECORD FOUND!!
              </span>
            )}
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Table;
