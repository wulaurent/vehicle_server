import * as pg from "pg";

const createSchemaStatement = `
CREATE EXTENSION IF NOT EXISTS postgis;
CREATE SCHEMA IF NOT EXISTS vehicle_server;
CREATE TABLE IF NOT EXISTS vehicle_server.vehicles (
  id SERIAL PRIMARY KEY,
  shortcode TEXT NOT NULL,
  battery SMALLINT CHECK (battery >= 0 AND battery <= 100), -- Validation de la batterie entre 0 et 100
  position GEOMETRY(POINT, 4326) NOT NULL
);
`;

const deleteSchemaStatement = `
DROP TABLE IF EXISTS vehicle_server.vehicles;
DROP SCHEMA IF EXISTS vehicle_server;
`;

interface DBConfig {
  user: string;
  host: string;
  database: string;
  password: string;
  port: number;
}

export const dbConfig: DBConfig = {
  host: "localhost",
  port: 5434,
  database: "vehicle",
  user: "vehicle",
  password: "vehicle",
};

export async function connectDb(cfg: DBConfig): Promise<pg.Pool> {
  const pool = new pg.Pool({
    user: cfg.user,
    host: cfg.host,
    database: cfg.database,
    password: cfg.password,
    port: cfg.port,
  });

  await pool.query("SELECT 1");
  await createSchema(pool);

  return pool;
}

export async function createSchema(pool: pg.Pool): Promise<void> {
    await pool.query(createSchemaStatement);
}

export async function dropSchema(pool: pg.Pool): Promise<void> {
    await pool.query(deleteSchemaStatement);
}
