import React from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { getWeeklyData } from "../../../../utils/Api";

const WeeklyData = ({ className }) => {
  ChartJS.register(ArcElement, Tooltip, Legend);

  const [list, setList] = React.useState(null);
  const [labelData, setLableData] = React.useState([
    {
      label: "",
      bgcolor: "",
      borderclr: "",
      borderwidth: "",
      changes: "",
    },
  ])


  React.useEffect(() => {
    getWeeklyData().then((res) => {
      console.log("response+++++++++++", res);
      if (res.code === 200) {
        // let data = res?.data[0].week41;
        let newdata = res?.data
        for (let i = 0; i < newdata.length; i++) {
            const object = newdata[i];
            const key = Object.keys(object)[0]; // Get the key
            const value = object[key]; // Get the value
            let obj = {
                labels: [
                  key
                ],
                datasets: [
                  {
                    label: "Net Changes",
                    data: [
                        value
                    ],
                    borderWidth: 1,
                    backgroundColor: [
                      "rgba(255, 99, 132, 0.8)",
                      "rgba(54, 162, 235, 0.8)",
                      "rgba(255, 206, 86, 0.8)",
                      "rgba(75, 192, 192, 0.8)",
                      "rgba(153, 102, 255, 0.8)",
                      "rgba(255, 159, 64, 0.8)",
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
              changes: obj.datasets[0].data,
            },
          ]);
        setList(obj);
            console.log(`Key: ${key}, Value: ${value}`);
        }
        // let obj = {
        //   labels: [
        //     [ "Net Changes", "a", "b"],
        //   ],
        //   datasets: [
        //     {
        //       label: "Net Changes",
        //       data: [
        //         data, "45", "33"
        //       ],
        //       borderWidth: 1,
        //       backgroundColor: [
        //         "rgba(255, 99, 132, 0.6)",
        //         "rgba(54, 162, 235, 0.6)",
        //         "rgba(255, 206, 86, 0.6)",
        //         "rgba(75, 192, 192, 0.6)",
        //         "rgba(153, 102, 255, 0.6)",
        //         "rgba(255, 159, 64, 0.6)",
        //       ],
        //       borderColor: [
        //         "rgba(255, 99, 132, 1)",
        //         "rgba(54, 162, 235, 1)",
        //         "rgba(255, 206, 86, 1)",
        //         "rgba(75, 192, 192, 1)",
        //         "rgba(153, 102, 255, 1)",
        //         "rgba(255, 159, 64, 1)",
        //       ],
        //     },
        //   ],
        // };
        // setLableData([
        //     {
        //       label: obj.labels,
        //       bgcolor: obj.datasets[0].backgroundColor,
        //       borderclr: obj.datasets[0].borderColor,
        //       borderwidth: obj.datasets[0].borderWidth,
        //       changes: obj.datasets[0].data,
        //     },
        //   ]);
        // setList(obj);
      }
    });
  }, []);

  const options = {
    plugins: {
      legend: {
        display: false,
        position: "left",

        maxHeight: 100,
        labels: {
          font: {
            size: 20,
            textAlign: "left",
          },
        },
      },
    },
  };

  return (
    <div
      className={`card card-flush user_active align-items-center  ${className}`}
      style={{ boxShadow: "1px 1px 3px 1px #e1e1e1" }}
    >
      <h1 className="mt-4">Weekly</h1>
      <div className="row pe-5 p-5 mt-5">
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
                      margin: "8px 8px 20px 0px",
                      textAlign: "center",
                    }}
                  ></div>
                  <div
                    style={{ margin: "8px 10px 8px 0px", whiteSpace: "nowrap" }}
                  >
                    {label}
                  </div>
                  <div style={{ margin: "8px 10px 8px 20px" }}>
                    <h4>{labelData[0].changes[index]}</h4>
                  </div>
                </div>
              ))
            : ""}
        </div>
        <div className="col-md-8">
          {list !== null ? (
            <>
              <Line
                options={options}
                data={list}
                className="charts_doughnut"
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

export default WeeklyData;
