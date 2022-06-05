// import React from 'react';
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend,
// } from 'chart.js';
// import { Bar } from 'react-chartjs-2';
// import faker from 'faker';

// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend
// );

// export const options = {
//   plugins: {
//     title: {
//       display: true,
//       text: 'Beneficiaries payment distribution',
//     },
//   },
//   responsive: true,
//   scales: {
//     x: {
//       stacked: true,
//     },
//     y: {
//       stacked: true,
//     },
//   },
// };

// const labels = [ "abia",
// "adamawa",
// "akwa Ibom",
// "anambra",
// "bauchi",
// "bayelsa",
// "benue",
// "borno",
// "cross River",
// "delta",
// "ebonyi",
// "edo",
// "ekiti",
// "enugu",
// "abuja",
// "gombe",
// "imo",
// "jigawa",
// "kaduna",
// "kano",
// "katsina",
// "kebbi",
// "kogi",
// "kwara",
// "lagos",
// "nasarawa",
// "niger",
// "ogun",
// "ondo",
// "osun",
// "oyo",
// "plateau",
// "rivers",
// "sokoto",
// "taraba",
// "yobe",
// "zamfara"];

// export const data = {
//   labels,
//   datasets: [
//     {
//       label: 'beneficiaries',
//       data: labels.map(() => faker.datatype.number({ min: -0, max: 1000 })),
//       backgroundColor: 'rgb(255, 99, 132)',
//     },
//     {
//       label: 'payment',
//       data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
//       backgroundColor: 'rgb(75, 192, 192)',
//     },
//   ],
// };

// export function App() {
//   return <Bar options={options} data={data} />;
// }