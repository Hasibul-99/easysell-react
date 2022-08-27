import React, { useEffect, useState } from 'react'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import faker from 'faker';
import moment from 'moment';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);



export const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Chart.js Line Chart',
      },
    },
  };

export default function LineChart({payment}) {
    const [chartData, setChartData] =  useState();

    const margeData = (unique, context) => {
        let data = [];

        unique.forEach(uni => {
            let total = 0;
            payment.forEach(py => {
                if ( moment(py.paid_date, 'MM/DD/YYYY hh:mm:ss A').format("MMM") === uni) {
                    if (context === 'sell') total = total + py.paid;
                    if (context === 'due') total = total + py.due;
                }
            })

            data.push(total);
        });

        return data;
    };

    useEffect(() => {
        if (payment) {
            let unique= payment.map(py => moment(py.paid_date, 'MM/DD/YYYY hh:mm:ss A').format("MMM"));
            let labels = unique.filter((v, i, a) => a.indexOf(v) === i);
          
            setChartData({
                labels,
                datasets: [
                    {
                        label: 'Sell',
                        data: margeData(unique, 'sell'),
                        borderColor: 'rgb(255, 99, 132)',
                        backgroundColor: 'rgba(255, 99, 132, 0.5)',
                    },
                    {
                        label: 'Due Sell',
                        data:  margeData(unique, 'due'),
                        borderColor: 'rgb(53, 162, 235)',
                        backgroundColor: 'rgba(53, 162, 235, 0.5)',
                    },
                ],
            });
        }
    }, [payment]);

    return (
        <div>
            {
                chartData ? <Line options={options} data={chartData} /> : ''
            }
        </div>
    )
}
