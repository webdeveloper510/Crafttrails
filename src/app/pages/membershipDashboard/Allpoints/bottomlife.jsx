import React, { useEffect, useState } from "react";
import { adminMembershipData } from "../../../../utils/Api";
import Table from "react-bootstrap/Table";

const BottomLifetime = ({bottom}) => {
  const [loading, setLoading] = useState(false);
  // const [bottom , setBottom] = useState([])

  const [currentPage, setCurrentPage] = useState(1);
  const [pageLimit, setPageLimit] = useState(3);
  const [maxPage, setMaxPage] = useState(3);
  const [minPage, setMinPage] = useState(0);
  const recordPage = 20;
  const lastIndex = currentPage * recordPage;
  const firstIndex = lastIndex - recordPage;
  const data = bottom?.slice(firstIndex, lastIndex);
  const nPage = Math.ceil(bottom?.length / recordPage);
  const number = [...Array(nPage + 1)?.keys()]?.slice(1);

  const pageNumber = number.map((num, i) => {
    if (num < maxPage + 1 && num > minPage) {
      return (
        <>
          <li
            key={i}
            className={currentPage == num ? `active_btn ` : `unactive_btn`}
          >
            <button onClick={() => changePage(num)}>{num}</button>
          </li>
        </>
      );
    } else {
      return null;
    }
  });

  const handlePrePage = () => {
    if (currentPage !== 1) {
      setCurrentPage(currentPage - 1);
      if ((currentPage - 1) % pageLimit == 0) {
        setMaxPage(maxPage - pageLimit);
        setMinPage(minPage - pageLimit);
      }
    }
  };

  const handleNextPage = () => {
    if (currentPage !== nPage) {
      setCurrentPage(currentPage + 1);
      if (currentPage + 1 > maxPage) {
        setMaxPage(maxPage + pageLimit);
        setMinPage(minPage + pageLimit);
      }
    }
  };

  const changePage = (id) => {
    setCurrentPage(id);
  };

  let pageIncreament = null;
  if (data.length > maxPage) {
    pageIncreament = <li onClick={handleNextPage}>...</li>;
  }else{
    pageIncreament = ""
  }

  // const getlinkuser = () => {
  //   setLoading(true);
  //   adminMembershipData()
  //     .then((res) => {
  //       setLoading(false);
  //       console.log("Lifetime points--------------", res);
  //       if (res.code == 200) {
  //         setBottom(res.data?.[0]?.bottom_user_overall);
  //       }
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //       setLoading(false);
  //     });
  // };

  // useEffect(() => {
  //   getlinkuser();
  // }, []);
  return (
    <div>
      {
        loading ? 
        <div className="loader-overly">
        <div className="loader" >
        </div>
      </div>
      :
      <div className="px-5 py-5" style={{ width: "85%", margin: "auto" }}>
      <Table striped bordered hover responsive>
        <thead>
          <th
            colSpan={3}
            style={{
              border: "1px solid gray",
              textAlign: "center",
              padding: "15px 0px",
              fontSize: "20px",
              fontWeight: 600,
              color: "black",
            }}
          >
            Bottom User Overall
          </th>
          <tr style={{ border: "1px solid gray", textAlign: "center" }}>
            <th>Master Id</th>
            <th>Participant</th>
            <th>Points</th>
          </tr>
        </thead>
        {data?.length > 0
          ? data?.map((item, i) => {
              return (
                <tbody>
                  <tr
                    key={i}
                    style={{
                      border: "1px solid gray",
                      textAlign: "center",
                      background: "#98d0fb",
                    }}
                  >
                    <td>{item.master_id}</td>
                    <td>{item.participant}</td>
                    <td>{item.points}</td>
                  </tr>
                </tbody>
              );
            })
          : ""}
      </Table>

      {data?.length > 0 ? (
        <div
          className="pagination-outer"
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "end",
          }}
        >
          <div
            className="prev_btn"
            style={{
              display: "flex",
              flexDirection: "row",
              marginRight: "-25px",
            }}
          >
            <button onClick={() => handlePrePage()} className="prev_btn">Prev</button>
          </div>
          <div >
            <ul className="previous-page">
              {pageNumber}
              {/* <button className="dots_btn">{pageIncreament}</button> */}
            </ul>
          </div>
          <div style={{
              display: "flex",
              flexDirection: "row",
            }}>
            <button onClick={() => handleNextPage()} className="next_btn">Next</button>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
      }

     
    </div>
  );
};

export default BottomLifetime;
