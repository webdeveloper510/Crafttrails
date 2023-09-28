/*eslint-disabled*/
// eslint-disable-next-line @typescript-eslint/no-unused-expressions

import { useState, useEffect } from "react";
import { Breadcrumb } from "react-bootstrap";
import { getTrailList } from "../../../utils/Api";
import DynamicTable from "../../modules/table";

const Table = () => {

  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(false)

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
                list && list.length > 0 ? <DynamicTable data={list} /> : "No Record Found!!"
              }
            </>
          )
        }
      </div>
    </div>
  );
};

export default Table;
