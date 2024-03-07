import React from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

import { getTrailAnalytics, getTrailAnalyticsAdmin } from "../../../utils/Api";

const PieChart = ({ className, id,loyality }) => {

    ChartJS.register(ArcElement, Tooltip, Legend);

    const [list, setList] = React.useState(null)

    React.useEffect(() => {
       if(id){
        getTrailAnalyticsAdmin(id).then(res => {
            if (res.code === 200) {
                let data = res?.data?.breweries_percentage
            const result1  = data?.filter((data)=> {
                return data <= 16.67 && data >= 0
             })
                
             const result2  = data?.filter((data)=> {
                return data <=  33.33 && data > 16.67
             })

             const result3  = data?.filter((data)=> {
                return data <= 50 && data > 33.33
             })

             const result4  = data?.filter((data)=> {
                return data <= 66.67&& data > 50 
             })

             const result5  = data?.filter((data)=> {
                return data <= 83.33 && data > 66.67
             })

             const result6  = data?.filter((data)=> {
                return data <= 100 && data > 83.33
             })

                let obj = {
                    labels: ["0% - 16.67%" , "16.67% - 33.33%"  , "33.33% - 50%" ,"50% - 66.67%" , "66.67% - 83.33%" , "83.33% - 100% " ],
                    datasets: [
                        {
                            label: 'completion',
                            data: [ result1?.length, result2?.length , result3?.length,  result4?.length , result5?.length ,  result6?.length ],
                            borderWidth: 1,
                            backgroundColor: [
                                "rgba(255, 99, 132, 0.9)",
                                "rgba(54, 162, 235, 0.9)",
                                "rgba(255, 206, 86, 0.9)",
                                "rgba(75, 192, 192, 0.9)",
                                "rgba(153, 102, 255, 0.9)",
                                "rgba(255, 159, 64, 0.9)"
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
       }else{
        getTrailAnalytics(loyality).then(res => {
            if (res.code === 200) {
                let data = res?.data?.breweries_percentage
                
            const result1  = data?.filter((data)=> {
                return data <= 16.67 && data >= 0
             })

             const result2  = data?.filter((data)=> {
                return data <=  33.33 && data > 16.67
             })
             const result3  = data?.filter((data)=> {
                return data <= 50 && data > 33.33
             })

             const result4  = data?.filter((data)=> {
                return data <= 66.67&& data > 50 
             })

             const result5  = data?.filter((data)=> {
                return data <= 83.33 && data > 66.67
             })

             const result6  = data?.filter((data)=> {
                return data <= 100 && data > 83.33
             })

                let obj = {
                    labels: ["0% - 16.67%" , "16.67% - 33.33%"  , "33.33% - 50%" ,"50% - 66.67%" , "66.67% - 83.33%" , "83.33% - 100% " ],
                    datasets: [
                        {
                            label: 'completion',
                            data: [ result1?.length, result2?.length , result3?.length,  result4?.length , result5?.length ,  result6?.length ],
                            borderWidth: 1,
                            backgroundColor: [
                                "rgba(255, 99, 132, 0.9)",
                                "rgba(54, 162, 235, 0.9)",
                                "rgba(255, 206, 86, 0.9)",
                                "rgba(75, 192, 192, 0.9)",
                                "rgba(153, 102, 255, 0.9)",
                                "rgba(255, 159, 64, 0.9)"
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
       }
    }, [loyality])

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
        <div className={`card card-flush  align-items-center user_active  ${className}`} style={{boxShadow: "1px 1px 3px 1px #e1e1e1"}}>
            <h1 className="mt-4">Completion Rate</h1>
            <div className="mt-5">
            {
                list !== null ? (
                    <>                    
                        <Bar 
                            options={options}
                            data={list}
                            className="horizontal_bars"
                        />
                    </>
                ) : ""
            }
            </div>
        </div>
    )
}

export default PieChart