import React from 'react';
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
      text: 'PSP Activities',
    },
  },
};

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July','August','September','October','November','December'];

export const data = {
  labels,
  datasets: [
    {
      label: 'Unified Payment',
      data: [0,0,0,0,0,0,0,0,],
      borderColor: 'rgb(255, 99, 132)',
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
    },
    {
      label: 'Visual ICT',
      data: [0,0,0,0,0,0,0,0,],
      borderColor: 'rgb(53, 162, 235)',
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
    },
    {
      label: 'Upper Link',
      data: [0,0,0,0,0,0,0,0,],
      borderColor: 'rgb(100, 162, 11)',
      backgroundColor: 'rgba(100, 162, 11, 0.5)',
    },
  ],
};

export function Lines() {
  return <Line options={options} data={data} />;
}
