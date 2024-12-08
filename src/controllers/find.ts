import { Request, Response } from "express";
import { VehicleStore } from "../store/vehicle";

export class ListVehiclesController {
  constructor(private readonly vehicleStore: VehicleStore) {}

  public async handle(req: Request, res: Response): Promise<void> {
    const vehicles = await this.vehicleStore.listVehicles();
    res.status(200).json(vehicles);
  }
}
