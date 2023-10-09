/*eslint-disabled*/
// eslint-disable-next-line @typescript-eslint/no-unused-expressions

import { useState, useEffect } from "react";
import { Breadcrumb, Modal } from "react-bootstrap";
import { getTrailList } from "../../../utils/Api";
import DynamicTable from "../../modules/table";
import { CheckSquareFill, XSquareFill } from "react-bootstrap-icons";

const Table = () => {

  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(false)
  const [moreView, setMoreView] = useState({ toggle: false, data: null })

  useEffect(() => {
    setLoading(true)
    getTrailList().then(res => {
      setLoading(false)
      if (res.code === 200) {
        setList(res?.data)
      }
    })
  }, []);

  return (
    <>
      <div>
        <Breadcrumb className="display-6 mb-4">
          <Breadcrumb.Item href="#"><span style={{ color: "#000" }}>Lists</span></Breadcrumb.Item>
          <Breadcrumb.Item active><span style={{ color: "#ef305e" }}>Trails</span></Breadcrumb.Item>
        </Breadcrumb>
        <div>
          {
            loading ? (
              <div className="loader-overly">
                <div className="loader" >
                </div>
              </div>
            ) : (
              <>
                {
                  list && list.length > 0 ? <DynamicTable data={list} moreView={(value) => { setMoreView(value) }} display={{ value: true, key: "breweries_completed" }} /> : "No Record Found!!"
                }
              </>
            )
          }
        </div>
      </div>
      <ModalView toggle={moreView.toggle} data={moreView.data} handler={() => setMoreView({ toggle: false, data: null })} />
    </>
  );
};

const ModalView = ({ toggle, handler, data }) => {

  return (
    <>
      <Modal show={toggle} size="lg" centered onHide={() => handler()}>
        <Modal.Header className="bg-danger" >
          <div className="d-grid">
            <h5 className="text-light">Trails</h5>
            <span className="text-light display-6">{data?.title || "N/A"}</span>
          </div>
          <button className="button-close" onClick={() => handler()}><span class="material-symbols-outlined">
            cancel
          </span></button>
        </Modal.Header>
        <Modal.Body>
          <div className="row my-5">
            <div className="col-md-3 d-grid col-lg-3 col-sm-12">
              <span className="fw-bold">TITLE</span>
            </div>
            <div className="col-md-8 col-lg-8 col-sm-12 d-grid">
              <span className="bg-secondary rounded ps-3 py-2">{data?.title || "N/A"}</span>
            </div>
          </div>
          <div className="row my-5">
            <div className="col-md-3 d-grid col-lg-3 col-sm-12">
              <span className="fw-bold">DESCRIPTION</span>
            </div>
            <div className="col-md-8 col-lg-8 col-sm-12 d-grid">
              <span className="bg-secondary rounded ps-3 py-2">{data?.brewery_name || "N/A"}</span>
            </div>
          </div>
          <div className="row my-5">
            <div className="col-md-3 d-grid col-lg-3 col-sm-12">
              <span className="fw-bold">TRAIL NAME</span>
            </div>
            <div className="col-md-8 col-lg-8 col-sm-12 d-grid">
              <span className="bg-secondary rounded ps-3 py-2">{data?.trail_name || "N/A"}</span>
            </div>
          </div>
          <div className="row my-5">
            <div className="col-md-3 d-grid col-lg-3 col-sm-12">
              <span className="fw-bold">TRAIL SEASON</span>
            </div>
            <div className="col-md-8 col-lg-8 col-sm-12 d-grid">
              <span className="bg-secondary rounded ps-3 py-2">{data?.trail_season || "N/A"}</span>
            </div>
          </div>
          <div className="row my-5">
            <div className="col-md-3 d-grid col-lg-3 col-sm-12">
              <span className="fw-bold">TRAIL YEAR</span>
            </div>
            <div className="col-md-8 col-lg-8 col-sm-12 d-grid">
              <span className="bg-secondary rounded ps-3 py-2">{data?.trail_year || "N/A"}</span>
            </div>
          </div>
          <div className="row my-5">
            <div className="col-md-3 col-lg-3 col-sm-12 d-grid">
              <span className="fw-bold">PARTICIPANT ID</span>
            </div>
            <div className="col-md-8 col-lg-8 col-sm-12 d-grid">
              <span className="bg-secondary rounded ps-3 py-2">{data?.participant_id || "N/A"}</span>
            </div>
          </div>
          <div className="row my-5">
            <div className="col-md-3 col-lg-3 col-sm-12 d-grid">
              <span className="fw-bold">MASTER ID</span>
            </div>
            <div className="col-md-8 col-lg-8 col-sm-12 d-grid">
              <span className="bg-secondary rounded ps-3 py-2">{data?.master_id || "N/A"}</span>
            </div>
          </div>
          <div className="row my-5">
            <div className="col-md-3 col-lg-3 col-sm-12 d-grid">
              <span className="fw-bold">STATUS</span>
            </div>
            <div className="col-md-8 col-lg-8 col-sm-12 d-grid">
              <span className="bg-secondary rounded ps-3 py-2">{data?.status || "N/A"}</span>
            </div>
          </div>
          <div className="row my-5">
            <div className="col-md-3 col-lg-3 col-sm-12 d-grid">
              <span className="fw-bold">TRAIL STATUS</span>
            </div>
            <div className="col-md-8 col-lg-8 col-sm-12 d-grid">
              <span className="bg-secondary rounded ps-3 py-2">{data?.trail_status || "N/A"}</span>
            </div>
          </div>
          <div className="row mt-5">
            <div className="col-md-12 col-lg-12 col-sm-12 d-grid">
              <span className="fw-bold">BREWERIES COMPLETED</span>
            </div>
          </div>
          <div className="row mb-5">
            {
              data?.breweries_completed !== undefined && data?.breweries_completed !== "" ? (
                <DynamicTable data={[data?.breweries_completed]} />
              ) : (
                <span className="bg-secondary rounded ps-3 py-2">NO RECORD FOUND!!</span>
              )
            }
          </div>
        </Modal.Body>
      </Modal>
    </>
  )
}


export default Table;
