import pool from "./Config/DBConfig.js";

export const calculateAndStoreDailySummary = async (cityName) => {

  const currentDate = new Date().toISOString().split("T")[0];

  // Fetch aggregated weather data for the day
  const { rows } = await pool.query(
    `SELECT 
       AVG(temp_celsius) AS avg_temp,
       MAX(temp_celsius) AS max_temp,
       MIN(temp_celsius) AS min_temp,
       condition AS dominant_condition
     FROM weather_data 
     WHERE city = $1 AND DATE(timestamp) = $2
     GROUP BY condition
     ORDER BY COUNT(*) DESC 
     LIMIT 1`,
    [cityName, currentDate],
  );

  if (rows.length === 0) return; // No data to summarize

  // Extract values from the aggregated result
  const { avg_temp, max_temp, min_temp, dominant_condition } = rows[0];

  // Insert daily summary into PostgreSQL
  await pool.query(
    `INSERT INTO daily_weather_summary (city, date, avg_temp, max_temp, min_temp, dominant_condition) 
     VALUES ($1, $2, $3, $4, $5, $6) 
     ON CONFLICT (city, date) DO UPDATE 
     SET avg_temp = EXCLUDED.avg_temp, max_temp = EXCLUDED.max_temp, min_temp = EXCLUDED.min_temp, dominant_condition = EXCLUDED.dominant_condition`,
    [cityName, currentDate, avg_temp, max_temp, min_temp, dominant_condition],
  );

  console.log(`Stored daily summary for ${cityName}`);
};
