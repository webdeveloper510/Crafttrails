import React from 'react'
import { getParticipantAge } from '../../../utils/Api'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

const Piechart2 = ({ className }) => {


    ChartJS.register(ArcElement, Tooltip, Legend);

    const [list, setList] = React.useState(null)

    React.useEffect(() => {
        getParticipantAge().then(res => {
            console.log("response------------------", res)
            if (res.code === 200) {
                let data = res?.data?.age
                // console.log("Lets Shows" , data)
                // let data = [8.37, 21.2 , 5.55, 80.21, 100,  55.10, 30.40 , 63.24 , 16.67]

            const result1  = data.filter((data)=> {
                return data <= 25 && data >= 21
             })

             console.log(result1)
                
             const result2  = data.filter((data)=> {
                return data <=  35 && data > 26
             })
             console.log(result2)

             const result3  = data.filter((data)=> {
                return data <= 45 && data > 36
             })

             const result4  = data.filter((data)=> {
                return data <= 55   && data > 46
             })

             const result5  = data.filter((data)=> {
                return data <= 65 && data > 56
             })

             const result6  = data.filter((data)=> {
                return data <= 100 && data > 66
             })

                let obj = {
                    labels: ["21 - 25" , "26 - 35"  , "36 - 45" ,"46 - 55" , "56 - 65" , "66 - 100" ],
                    datasets: [
                        {
                            label: 'completion',
                            data: [ result1.length, result2.length , result3.length,  result4.length , result5.length ,  result6.length ],
                            borderWidth: 1,
                            backgroundColor: [
                                "rgba(255, 99, 132, 0.2)",
                                "rgba(54, 162, 235, 0.2)",
                                "rgba(255, 206, 86, 0.2)",
                                "rgba(75, 192, 192, 0.2)",
                                "rgba(153, 102, 255, 0.2)",
                                "rgba(255, 159, 64, 0.2)"
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

    <div className={`card card-flush align-items-center  ${className}`} style={{boxShadow: "rgba(0, 0, 0, 0.25) 0px 0.0625em 0.0625em, rgba(0, 0, 0, 0.25) 0px 0.125em 0.5em, rgba(255, 255, 255, 0.1) 0px 0px 0px 1px inset"}}>
        <h1 className='mt-4'>User Age</h1>
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

export default Piechart2
