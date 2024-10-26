import express from "express";
import { configDotenv } from "dotenv";
import cron from "node-cron";
import pool, { connectDB } from "./Config/DBConfig.js";
import { fetchWeather } from "./fetchWeather.js";
import { calculateAndStoreDailySummary } from "./dailySummary.js";
import cors from "cors";

configDotenv();
const app = express();
app.use(
  cors({
    origin:"*",
    credentials: true,
  }),
);
const port = 4000;

connectDB();

const cities = [
  "delhi",
  "mumbai",
  "chennai",
  "bangalore",
  "kolkata",
  "hyderabad",
];

const interval_minutes = 3;

// User-configurable alert threshold (in degrees Celsius)
// const TEMP_ALERT_THRESHOLD = 35;

// Set interval to fetch weather data for each city
setInterval(
  async () => {
    console.log("Fetching weather data for cities...");

    for (let city of cities) {
      await fetchWeather(city);
    }
  },

  interval_minutes * 60 * 1000, // milisecond conversion
);

// cron job for storing daily summary in the table daily_weather_summary which rund at the midnight
// currently set to run at server start for midnight update ("0 0 * * *") below line
cron.schedule("* * * * *", async () => {
  console.log("Running daily summary calculation...");
  for (let city of cities) {
    try {
      await calculateAndStoreDailySummary(city);
    } catch (error) {
      console.error(`Failed to calculate summary for ${city}: `, error);
    }
  }
});

// endpoint to get weather summary
app.get("/summary", async (req, res) => {
  const { city, date } = req.query;

  const query = `
    SELECT * FROM daily_weather_summary
    WHERE city = $1 AND date = $2
  `;

  try {
    const result = await pool.query(query, [city, date]);
    if (result.rows.length === 0) {
      return res.status(404).send("No data found for the given city and date");
    }
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).send("Error retrieving data");
    console.error(error);
  }
});

// start EXPRESS app
app.listen(port, () => {
  console.log(`Weather app backend running on port ${port}`);
});
