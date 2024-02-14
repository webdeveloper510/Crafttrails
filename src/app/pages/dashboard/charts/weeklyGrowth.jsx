import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { getWeeklyGrowth, getWeeklyGrowthAdmin } from "../../../../utils/Api";

const WeeklyGrowth = ({ className , id }) => {
  ChartJS.register(ArcElement, Tooltip, Legend);

  const [list, setList] = React.useState(null);
  const [labelData, setLableData] = React.useState([
    {
      label: "",
      bgcolor: "",
      borderclr: "",
      borderwidth: "",
      growth: "",
    },
  ]);

  React.useEffect(() => {
    const email = localStorage.getItem("user-email")
    console.log("local storage emailllllllllllllllllll", email)
   if(id){
    getWeeklyGrowthAdmin(email).then((res) => {
      if (res.code === 200) {
        let data = res?.data?.growth;
        let obj = {
          labels: [
            "weekly growth",
          ],
          datasets: [
            {
              label: "weekly growth",
              data: [
                data
              ],
              borderWidth: 1,
              backgroundColor: [
                "rgba(255, 99, 132, 0.6)",
                "rgba(54, 162, 235, 0.6)",
                "rgba(255, 206, 86, 0.6)",
                "rgba(75, 192, 192, 0.6)",
                "rgba(153, 102, 255, 0.6)",
                "rgba(255, 159, 64, 0.6)",
              ],
              borderColor: [
                "rgba(255, 99, 132, 1)",
                "rgba(54, 162, 235, 1)",
                "rgba(255, 206, 86, 1)",
                "rgba(75, 192, 192, 1)",
                "rgba(153, 102, 255, 1)",
                "rgba(255, 159, 64, 1)",
              ],
            },
          ],
        };
        setLableData([
            {
              label: obj.labels,
              bgcolor: obj.datasets[0].backgroundColor,
              borderclr: obj.datasets[0].borderColor,
              borderwidth: obj.datasets[0].borderWidth,
              growth: obj.datasets[0].data,
            },
          ]);
        setList(obj);
      }
    });
   }else{
    getWeeklyGrowth().then((res) => {
      // console.log("response+++++++++++", res);
      if (res.code === 200) {
        let data = res?.data?.growth;
        let obj = {
          labels: [
            "weekly growth",
          ],
          datasets: [
            {
              label: "weekly growth",
              data: [
                data
              ],
              borderWidth: 1,
              backgroundColor: [
                "rgba(255, 99, 132, 0.6)",
                "rgba(54, 162, 235, 0.6)",
                "rgba(255, 206, 86, 0.6)",
                "rgba(75, 192, 192, 0.6)",
                "rgba(153, 102, 255, 0.6)",
                "rgba(255, 159, 64, 0.6)",
              ],
              borderColor: [
                "rgba(255, 99, 132, 1)",
                "rgba(54, 162, 235, 1)",
                "rgba(255, 206, 86, 1)",
                "rgba(75, 192, 192, 1)",
                "rgba(153, 102, 255, 1)",
                "rgba(255, 159, 64, 1)",
              ],
            },
          ],
        };
        setLableData([
            {
              label: obj.labels,
              bgcolor: obj.datasets[0].backgroundColor,
              borderclr: obj.datasets[0].borderColor,
              borderwidth: obj.datasets[0].borderWidth,
              growth: obj.datasets[0].data,
            },
          ]);
        setList(obj);
      }
    });
   }
  }, []);

  const options = {
    plugins: {
      legend: {
        display: false,
        position: "left",

       
      },
    },
  };

  return (
    <div
      className={`card card-flush user_active align-items-center  ${className}`}
      style={{ boxShadow: "1px 1px 3px 1px #e1e1e1" }}
    >
      <h1 className="mt-4">Weekly Growth</h1>
      <p className="explaination">Growth percentage of new participant</p>
      <div className="row  py-5 px-5">
      <div className="col-md-4 mt-5">
          {labelData[0].label.length > 0
            ? labelData[0].label.map((label, index) => (
                <div className="d-flex">
                  <div
                    key={index}
                    style={{
                      backgroundColor: labelData[0].bgcolor[index],
                      border: `${labelData[0].borderwidth}px solid ${labelData[0].borderclr[index]}`,
                      padding: "5px",
                      margin: "10px 8px 22px 0px",
                      textAlign: "center",
                    }}
                  ></div>
                  <h3
                    style={{ margin: "5px 10px 5px 0px", whiteSpace: "nowrap" }}
                  >
                    {label}-
                  </h3>
                  <div  style={{ margin: "5px 10px 8px 0px" }}>
                   <h3> {labelData[0].growth[index]?.toFixed(2)}</h3>
                  </div>
                </div>
              ))
            : ""}
        </div>
        <div className="col-md-8" style={{display:"flex", justifyContent:"end"}}>
    {list !== null ? (
        <>
          <Doughnut options={options} data={list} className="charts_doughnut" />
        </>
      ) : (
        ""
      )}
    </div>
      </div>
    </div>
  );
};

export default WeeklyGrowth;
