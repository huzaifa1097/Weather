import React, { useEffect } from 'react';
import { Line } from 'react-chartjs-2';
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

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const Charts = ({ weatherData }) => {
  useEffect(() => {
    // Register any necessary setup if required, especially when data updates
  }, [weatherData]);

  const data = {
    labels: weatherData.map((data) => data.city),
    datasets: [
      {
        label: 'Temperature (°C)',
        data: weatherData.map((data) => data.temp),
        fill: false,
        backgroundColor: 'rgb(75, 192, 192)',
        borderColor: 'rgba(75, 192, 192, 0.2)',
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Temperature Trends',
      },
    },
  };

  return (
    <div className="charts">
      <h2>Temperature Trends</h2>
      <Line data={data} options={options} />
    </div>
  );
};

export default Charts;
