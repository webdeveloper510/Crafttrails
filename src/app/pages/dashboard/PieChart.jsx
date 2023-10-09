import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

import { getTrailAnalytics } from "../../../utils/Api";

const PieChart = ({ className }) => {

    ChartJS.register(ArcElement, Tooltip, Legend);

    const [list, setList] = React.useState(null)

    React.useEffect(() => {
        getTrailAnalytics().then(res => {
            if (res.code === 200) {
                let data = res?.data?.breweries_percentage
                let obj = {
                    labels: ["Breweries completed"],
                    datasets: [
                        {
                            label: 'completion',
                            data: [...data, 60],
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

    return (
        <div className={`card card-flush ${className}`}>
            {
                list !== null ? (
                    <>
                        <Pie
                            data={list}
                        />
                    </>
                ) : ""
            }
        </div>
    )
}

export default PieChart