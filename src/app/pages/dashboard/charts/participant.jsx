import React from "react";
import { Doughnut, Line } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { participantCount, participantCountAdmin } from "../../../../utils/Api";

const ParticipantCount = ({ className , id, loyality }) => {
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
  if(id){
    participantCountAdmin(id,loyality).then((res) => {
      if (res.code === 200) {
        let data = res?.data?.paricipant_count;
        let obj = {
          labels: ["Participant"],
          datasets: [
            {
              label: "Participant",
              data: [data],
              borderWidth: 1,
              backgroundColor: [
                "rgba(54, 162, 235, 0.6)",
                "rgba(255, 99, 132, 0.6)",
                "rgba(255, 206, 86, 0.6)",
                "rgba(75, 192, 192, 0.6)",
                "rgba(153, 102, 255, 0.6)",
                "rgba(255, 159, 64, 0.6)",
              ],
              borderColor: [
                "rgba(54, 162, 235, 1)",
                "rgba(255, 99, 132, 1)",
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
    participantCount(loyality).then((res) => {
      if (res.code === 200) {
        let data = res?.data?.paricipant_count;
        let obj = {
          labels: ["Participant"],
          datasets: [
            {
              label: "Participant",
              data: [data],
              borderWidth: 1,
              backgroundColor: [
                "rgba(54, 162, 235, 0.6)",
                "rgba(255, 99, 132, 0.6)",
                "rgba(255, 206, 86, 0.6)",
                "rgba(75, 192, 192, 0.6)",
                "rgba(153, 102, 255, 0.6)",
                "rgba(255, 159, 64, 0.6)",
              ],
              borderColor: [
                "rgba(54, 162, 235, 1)",
                "rgba(255, 99, 132, 1)",
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
      <h1 className="mt-4">Participant Count</h1>
      <p className="explaination">Count of Participants Starting the Trail at Your Brewery</p>
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
                  <div style={{ margin: "5px 10px 8px 0px" }}>
                    <h3> {labelData[0].growth[index]}</h3>
                  </div>
                </div>
              ))
            : ""}
        </div>
      <div className="">
       
        <div
          className=""
          style={{ display: "flex", justifyContent: "end" }}
        >
          {list !== null ? (
            <>
              <Line
                options={options}
                data={list}
                className="charts_doughnut1"
              />
            </>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
};

export default ParticipantCount;
