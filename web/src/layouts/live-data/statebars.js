import React from 'react';
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

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  plugins: {
    title: {
      display: true,
      text: 'Payment by States',
    },
  },
  responsive: true,
  scales: {
    x: {
      stacked: true,
    },
    y: {
      stacked: true,
    },
  },
};

const labels = [ 
  "abia",
  "adamawa",
  "akwa Ibom",
  "anambra",
  "bauchi",
  "bayelsa",
  "benue",
  "borno",
  "cross River",
  "delta",
  "ebonyi",
  "edo",
  "ekiti",
  "enugu",
  "abuja",
  "gombe",
  "imo",
  "jigawa",
  "kaduna",
  "kano",
  "katsina",
  "kebbi",
  "kogi",
  "kwara",
  "lagos",
  "nasarawa",
  "niger",
  "ogun",
  "ondo",
  "osun",
  "oyo",
  "plateau",
  "rivers",
  "sokoto",
  "taraba",
  "yobe",
  "zamfara"];

export const data = {
  labels,
  datasets: [
    {
      label: 'Total disbursment',
      data: [20,30,50,20,30,50,20,30,50,20,30,50,20,30,50,20,30,50,20,30,50,20,30,50,20,30,50,20,30,50,20,30,50,20,30,50,20,30,50,20,30,50,20,30,50,20,30,50,56],
      backgroundColor: 'rgb(255, 99, 132)',
    },
    {
      label: 'Total payment',
      data: [20,30,50,20,30,50,20,30,50,20,30,50,20,30,50,20,30,50,20,30,50,20,30,50,20,30,50,20,30,50,20,30,50,20,30,50,20,30,50,20,30,50,20,30,50,20,30,50,56],
      backgroundColor: 'rgb(75, 192, 192)',
    },
  
  ],
};

export function StateBars() {
  return <Bar options={options} data={data} />;
}