import express, { Request, Response, NextFunction } from "express";
import { CreateVehicleController } from "./controllers/create";
import { ListVehiclesController } from "./controllers/find";

import { VehicleStore } from "./store/vehicle";
import { AppError } from "./errors";
import { connectDb, dbConfig } from "./db";

const app = express();
app.use(express.json());

(async () => {
  try {
    const pool = await connectDb(dbConfig);

    const vehicleStore = new VehicleStore(pool);
    const createVehicleController = new CreateVehicleController(vehicleStore);
    const listVehiclesController = new ListVehiclesController(vehicleStore);

    app.post("/vehicles", (req, res, next) => {
      createVehicleController
        .handle(req, res)
        .catch(next);
    });

    app.get("/vehicles", (req, res, next) => {
      listVehiclesController
        .handle(req, res)
        .catch(next);
    });
      
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
