import React, { useEffect, useState } from 'react';
import CityWeatherCard from './CityWeatherCard';
import Charts from './Charts';
import { getWeatherSummary, checkAlertThreshold } from '../services/weatherAPI';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const WeatherDashboard = () => {
  const [weatherData, setWeatherData] = useState([]);
  const [tempThreshold, setTempThreshold] = useState(35);
  const cities = ["delhi", "mumbai", "chennai", "bangalore", "kolkata", "hyderabad"];

  useEffect(() => {
    const fetchData = async () => {
      const date = new Date().toISOString().split("T")[0];
      const data = await Promise.all(cities.map(city => getWeatherSummary(city, date)));
      setWeatherData(data.filter(Boolean));
    };

    const fetchThreshold = async () => {
      const threshold = await checkAlertThreshold();
      setTempThreshold(threshold);
    };

    fetchData();
    fetchThreshold();

    const interval = setInterval(fetchData, 5 * 60 * 1000); // 5-minute interval
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    weatherData.forEach(data => {
      if (data && data.temp > tempThreshold) {
        toast.warning(`Alert: ${data.city} temperature is above ${tempThreshold}°C`);
      }
    });
  }, [weatherData, tempThreshold]);

  return (
    <div className="weather-dashboard">
      <ToastContainer />
      <h1>Weather Monitoring System</h1>

      {weatherData.length > 0 ? (
        <div className="city-cards">
          {weatherData.map((data, index) => (
            data ? <CityWeatherCard key={index} data={data} /> : null
          ))}
        </div>
      ) : (
        <p>Loading weather data...</p>
      )}

      <Charts weatherData={weatherData} />
    </div>
  );
};

export default WeatherDashboard;
