CREATE TABLE IF NOT EXISTS weather_data (
    id SERIAL PRIMARY KEY,
    city VARCHAR(50),
    temp_celsius DECIMAL,
    feels_like_celsius DECIMAL,
    condition VARCHAR(50),
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS daily_weather_summary (
    city VARCHAR(255),
    date DATE,
    avg_temp FLOAT,
    max_temp FLOAT,
    min_temp FLOAT,
    dominant_condition VARCHAR(255),
    PRIMARY KEY (city, date)  -- This will also create a unique constraint
);


