import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

import { getTrailAnalytics } from "../../../utils/Api";

const PieChart = ({ className }) => {

    ChartJS.register(ArcElement, Tooltip, Legend);

    const [list, setList] = React.useState(null)

    React.useEffect(() => {
        getTrailAnalytics().then(res => {
            console.log("response+++++++++++", res)
            if (res.code === 200) {
                let data = res?.data?.breweries_percentage
                // console.log("Lets Shows" , data)
                // let data = [8.37, 21.2 , 5.55, 80.21, 100,  55.10, 30.40 , 63.24 , 16.67]

            const result1  = data.filter((data)=> {
                return data <= 16.67 && data >= 0
             })

             console.log(result1)
                
             const result2  = data.filter((data)=> {
                return data <=  33.33 && data > 16.67
             })
             console.log(result2)

             const result3  = data.filter((data)=> {
                return data <= 50 && data > 33.33
             })

             const result4  = data.filter((data)=> {
                return data <= 66.67&& data > 50 
             })

             const result5  = data.filter((data)=> {
                return data <= 83.33 && data > 66.67
             })

             const result6  = data.filter((data)=> {
                return data <= 100 && data > 83.33
             })

                let obj = {
                    labels: ["0% - 16.67%" , "16.67% - 33.33%"  , "33.33% - 50%" ,"50% - 66.67%" , "66.67% - 83.33%" , "83.33% - 100% " ],
                    datasets: [
                        {
                            label: 'completion',
                            data: [ result1.length, result2.length , result3.length,  result4.length , result5.length ,  result6.length ],
                            borderWidth: 1,
                            backgroundColor: [
                                "rgba(255, 99, 132, 0.5)",
                                "rgba(54, 162, 235, 0.5)",
                                "rgba(255, 206, 86, 0.5)",
                                "rgba(75, 192, 192, 0.5)",
                                "rgba(153, 102, 255, 0.5)",
                                "rgba(255, 159, 64, 0.5)"
                            ],
                            borderColor: [
                                "rgba(255, 99, 132, 1)",
                                "rgba(54, 162, 235, 1)",
                                "rgba(255, 206, 86, 1)",
                                "rgba(75, 192, 192, 1)",
                                "rgba(153, 102, 255, 1)",
                                "rgba(255, 159, 64, 1)"
                            ],
                            
                        },

                    ],
                }
                setList(obj)
            }
        })
    }, [])

    const options = {
        
        plugins : {
            legend: {
                display : true,
                position: 'left',
                
                maxHeight : 100 ,
                labels: {
                    font: {
                        size: 20,
                        textAlign : "left",
                    }
                }   
              }
        }
      };

   
    return (
        <div className={`card card-flush  align-items-center user_active  ${className}`} style={{boxShadow: "1px 1px 3px 1px #e1e1e1"}}>
            <h1 className="mt-4">User Completion</h1>
            {
                list !== null ? (
                    <>                    
                        <Pie 
                            options={options}
                            data={list}
                            className="charts_pie"
                        />
                    </>
                ) : ""
            }
        </div>
    )
}

export default PieChart