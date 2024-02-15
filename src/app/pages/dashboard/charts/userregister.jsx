import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Bar, Pie } from "react-chartjs-2";
import { getUserCount, getUserCountAdmin } from "../../../../utils/Api";

const RegisterUser = ({ className, id }) => {
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
    getUserCountAdmin(id).then((res) => {
      if (res.code === 200) {
        let register = res?.data?.register_user;
        let unregister = res?.data.unregister_user;

        let obj = {
          labels: ["Register", "Unregister"],
          datasets: [
            {
              label: "User",
              data: [register, unregister],
              borderWidth: 1,
              backgroundColor: [
                "rgba(255, 99, 132, 0.5)",
                "rgba(54, 162, 235, 0.5)",
                "rgba(255, 206, 86, 0.5)",
                "rgba(75, 192, 192, 0.5)",
                "rgba(153, 102, 255, 0.5)",
                "rgba(255, 159, 64, 0.5)",
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
        setList(obj);
        setLableData([
          {
            label: obj.labels,
            bgcolor: obj.datasets[0].backgroundColor,
            borderclr: obj.datasets[0].borderColor,
            borderwidth: obj.datasets[0].borderWidth,
            age: obj.datasets[0].data,
          },
        ]);
      }
    });
   }else{
    getUserCount().then((res) => {
      if (res.code === 200) {
        let register = res?.data?.register_user;
        let unregister = res?.data.unregister_user;

        let obj = {
          labels: ["Register", "Unregister"],
          datasets: [
            {
              label: "User",
              data: [register, unregister],
              borderWidth: 1,
              backgroundColor: [
                "rgba(255, 99, 132, 0.5)",
                "rgba(54, 162, 235, 0.5)",
                "rgba(255, 206, 86, 0.5)",
                "rgba(75, 192, 192, 0.5)",
                "rgba(153, 102, 255, 0.5)",
                "rgba(255, 159, 64, 0.5)",
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
        setList(obj);
        setLableData([
          {
            label: obj.labels,
            bgcolor: obj.datasets[0].backgroundColor,
            borderclr: obj.datasets[0].borderColor,
            borderwidth: obj.datasets[0].borderWidth,
            age: obj.datasets[0].data,
          },
        ]);
      }
    });
   }
  }, []);

  const options = {
    indexAxis: 'y',
    plugins : {
        legend: {
            display : false,
            position: 'left',
            
            maxHeight : 100 ,
            labels: {
                font: {
                    size: 18,
                    textAlign : "left",
                }
            }   
          }
    }
  };

  return (
    <div
      className={`card card-flush user_active align-items-center  ${className}`}
      style={{ boxShadow: "1px 1px 3px 1px #e1e1e1" }}
    >
      <h1 className="mt-4">Registered/Unregistered</h1>
      <div className="">
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
      {list !== null ? (
        <>
          <Bar options={options} data={list} className="horizontal_bar" />
        </>
      ) : (
        ""
      )}
    </div>
  );
};

export default RegisterUser;
