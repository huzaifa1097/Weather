import axios from "axios";
import pool from "./Config/DBConfig.js";

const API_KEY = process.env.OPENWEATHER_API_KEY;

const kelvinToCelsius = (temp) => {
  return temp - 273.15;
};

// Fetch weather data from OpenWeatherMap API and store in both tables
export const fetchWeather = async (city) => {
  try {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather`,
      {
        params: { q: city, appid: API_KEY },
      },
    );

    console.log("RESPONSE: ", response.data);
    const { main, weather } = response.data;
    const currentTemp = kelvinToCelsius(main.temp);
    const condition = weather[0].main;

    // Store individual weather update
    await pool.query(
      `INSERT INTO weather_data (city, temp_celsius, feels_like_celsius, condition) 
       VALUES ($1, $2, $3, $4)`,
      [city, currentTemp, kelvinToCelsius(main.feels_like), condition],
    );

    // Check for alert threshold
    if (currentTemp > TEMP_ALERT_THRESHOLD) {
      console.log(
        `ALERT: Temperature in ${city} exceeded ${TEMP_ALERT_THRESHOLD}°C`,
      );
      // Here, you can implement an email notification system if desired
    }

    return {
      city: city,
      temp: currentTemp,
      main: condition,
    };
  } catch (error) {
    console.error(`Failed to fetch weather for ${city}: `, error.message);
    return null;
  }
};
