import pkg from "pg";
import { readFileSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import { configDotenv } from "dotenv";

configDotenv();
const { Pool } = pkg;

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
export const pool = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  database: process.env.DB_NAME,
  password: process.env.DB_PASS,
  port: process.env.DB_PORT,
});

export const connectDB = async () => {
  const client = await pool.connect();
  console.log("Connected successfully to PostgreSQL");

  try {
    const createTablesScript = readFileSync(
      join(__dirname, "CreateTables.sql"),
      "utf8",
    );

    await client.query(createTablesScript);
    console.log("Tables created successfully - If any new");
  } catch (err) {
    console.error("Error creating tables", err);
  } finally {
    client.release(); // Release the connection back to the pool
  }
};

export default pool;
