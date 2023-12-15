import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut, Pie } from "react-chartjs-2";
import { getparticipantGender } from "../../../../utils/Api";

const Usergender = ({ className }) => {
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
    getparticipantGender().then((res) => {
      // console.log("response------------------", res);
      if (res.code === 200) {
        let data = res?.data?.gender;
        let gender = res?.data

        // console.log("Lets Shows" , data)
        // let data = [8.37, 21.2 , 5.55, 80.21, 100,  55.10, 30.40 , 63.24 , 16.67]

        // const result1 = data.filter((data) => {
        //   return data <= 25 && data >= 21;
        // });

        // // console.log(result1);

        // const result2 = data.filter((data) => {
        //   return data <= 35 && data > 26;
        // });
        // // console.log(result2);

        // const result3 = data.filter((data) => {
        //   return data <= 45 && data > 36;
        // });

        // const result4 = data.filter((data) => {
        //   return data <= 55 && data > 46;
        // });

        // const result5 = data.filter((data) => {
        //   return data <= 65 && data > 56;
        // });

        // const result6 = data.filter((data) => {
        //   return data <= 100 && data > 66;
        // });

        let obj = {
          labels: [
            "Male",
            "Female",
            "Trans-gender",
            "Non-binary",
            "Not-Filled"
          ],
          datasets: [
            {
              label: "Age",
              data: [
                gender.male, gender.female ,gender.transgender, gender.nonbinary, gender.notmentioned],
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
            age: obj.datasets[0].data,
          },
        ]);
        setList(obj);
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
      className={`card card-flush user_active align-items-center p-5  ${className}`}
      style={{ boxShadow: "1px 1px 3px 1px #e1e1e1" }}
    >
      <h1 className="mt-4">Participants Gender</h1>
      <div className="row py-5 px-5 line_chart">
        <div className="col-md-4 px-2 mt-5">
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
                    {label}
                  </div>
                  <div style={{ margin: "8px 10px 8px 20px" }}>
                    {labelData[0].age[index]}
                  </div>
                </div>
              ))
            : ""}
        </div>
        <div className="col-md-8 mt-5 px-2" style={{display:"flex", justifyContent:"end"}}>
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
