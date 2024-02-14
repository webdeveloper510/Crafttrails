import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut, Pie } from "react-chartjs-2";
import { getparticipantGender, getparticipantGenderAdmin } from "../../../../utils/Api";

const Usergender = ({ className, id }) => {
  ChartJS.register(ArcElement, Tooltip, Legend);

  const [list, setList] = React.useState(null);
  const [labelData, setLableData] = React.useState([
    {
      label: "",
      bgcolor: "",
      borderclr: "",
      borderwidth: "",
      age: "",
    },
  ]);

  React.useEffect(() => {
  if(id){
    getparticipantGenderAdmin(id).then((res) => {
      // console.log("response------------------", res);
      if (res.code === 200) {
        let data = res?.data?.gender;
        let gender = res?.data

        let obj = {
          labels: [
            "Male",
            "Female",
            "Trans-gender",
            "Non-binary",
            "Not-Filled",
            "Prefer Not to Say"
          ],
          datasets: [
            {
              label: "Age",
              data: [
                gender.male, gender.female ,gender.transgender, gender.nonbinary, gender.notmentioned, gender.prefernot],
              borderWidth: 1,
              backgroundColor: [
                "rgba(255, 99, 132, 0.6)",
                "rgba(54, 162, 235, 0.6)",
                "rgba(255, 206, 86, 0.6)",
                "rgba(75, 192, 192, 0.6)",
                "#fff",
                "rgba(255, 159, 64, 0.6)",
              ],
              borderColor: [
                "rgba(255, 99, 132, 1)",
                "rgba(54, 162, 235, 1)",
                "rgba(255, 206, 86, 1)",
                "rgba(75, 192, 192, 1)",
                "#bdb9b9",
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
            age: obj.datasets[0].data,
          },
        ]);
        setList(obj);
      }
    });
  }else{
    getparticipantGender().then((res) => {
      // console.log("response------------------", res);
      if (res.code === 200) {
        let data = res?.data?.gender;
        let gender = res?.data
        let obj = {
          labels: [
            "Male",
            "Female",
            "Trans-gender",
            "Non-binary",
            "Not-Filled",
            "Prefer Not to Say"
          ],
          datasets: [
            {
              label: "Age",
              data: [
                gender.male, gender.female ,gender.transgender, gender.nonbinary, gender.notmentioned, gender.prefernot],
              borderWidth: 1,
              backgroundColor: [
                "rgba(255, 99, 132, 0.6)",
                "rgba(54, 162, 235, 0.6)",
                "rgba(255, 206, 86, 0.6)",
                "rgba(75, 192, 192, 0.6)",
                "#fff",
                "rgba(255, 159, 64, 0.6)",
              ],
              borderColor: [
                "rgba(255, 99, 132, 1)",
                "rgba(54, 162, 235, 1)",
                "rgba(255, 206, 86, 1)",
                "rgba(75, 192, 192, 1)",
                "#bdb9b9",
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
            age: obj.datasets[0].data,
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
      className={`card card-flush user_active1 align-items-center p-1 ${className}`}
      style={{ boxShadow: "1px 1px 3px 1px #e1e1e1" }}
    >
      <h1 className="mt-5">Gender</h1>
      <div className="row user-age">
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
                      margin: "8px 8px 10px 0px",
                      textAlign: "center",
                    }}
                  ></div>
                  <div
                    style={{ margin: "8px 10px 8px 0px", whiteSpace: "nowrap" }}
                  >
                    {label} :
                  </div>
                  <div style={{ margin: "8px 10px 8px 20px" }}>
                    {labelData[0].age[index]}
                  </div>
                </div>
              ))
            : ""}
        </div>
        <div className="col-md-8 doughnut-chart" >
          {list !== null ? (
            <>
              <Doughnut
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

export default Usergender;
