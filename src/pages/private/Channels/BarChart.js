import React, { useEffect, useState } from 'react'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import faker from 'faker';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
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
      text: 'Product Sells Chart',
    },
  },
};

export default function BarChart({ strckData }) {
  const [chartData, setChartData] = useState();

  useEffect(() => {
    if (strckData) {
      let labels = [],
        stock = [];

      strckData.forEach(st => {
        labels.push(st.p_name);
        stock.push(st.in_stock);
      });


      setChartData({
        labels,
        datasets: [
          {
            label: '',
            data: stock,
            backgroundColor: 'rgba(53, 162, 235, 0.5)',
          },
        ],
      })
    }
  }, [strckData]);


  return (
    <div>
      {
        chartData ? <Bar options={options} data={chartData} /> : ''
      }
    </div>
  )
}
