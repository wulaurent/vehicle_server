import express, { Request, Response, NextFunction } from "express";

import { VehicleStore } from "./store/vehicle";
import { AppError } from "./errors";
import { connectDb, dbConfig } from "./db";

const app = express();
app.use(express.json());

(async () => {
  try {
    const pool = await connectDb(dbConfig);

    const vehicleStore = new VehicleStore(pool);

    app.use((err: AppError, req: Request, res: Response, next: NextFunction) => {
      if (err instanceof AppError) {
        res.status(400).json({ error: err.code, message: err.message, details: err.details });
      } else {
        console.error(err);
        res.status(500).json({ error: "INTERNAL_ERROR", message: "Something went wrong" });
      }
    });
  } catch (error) {
    console.error("Failed to start the server:", error);
    process.exit(1);
  }
})();

export default app;
