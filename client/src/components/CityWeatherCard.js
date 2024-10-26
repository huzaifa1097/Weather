import React from 'react';

const CityWeatherCard = ({ data }) => {
    console.log("Data" ,data)
  if (!data) return null;

  const { city,avg_temp, dominant_condition, max_temp } = data;
  return (
    <div className="city-weather-card">
      <h2>{city}</h2>
      <p>Temperature: {avg_temp.toFixed(1)}°C</p>
      <p>Feels Like: {max_temp.toFixed(1)}°C</p>
      <p>Condition: {dominant_condition}</p>
    </div>
  );
};

export default CityWeatherCard;
