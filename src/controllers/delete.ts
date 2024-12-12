import { VehicleStore } from "../store/vehicle";
import { Request, Response } from "express";
import { AppError, ErrorCode } from "../errors";

interface Parameters {
  id: string;
}

export class DeleteVehicleController {
  constructor(private readonly vehicleStore: VehicleStore) {}

  public async handle(req: Request<Parameters>, res: Response): Promise<void> {
      const idString: string = req.params.id;
      const id: number = parseInt(idString);

      if (isNaN(id)) {
        throw new AppError(ErrorCode.BadRequest, "Invalid vehicle ID");
      }

      await this.vehicleStore.deleteVehicle(id);
      res.status(200).json({ message: "vehicle successfully deleted" });
  }
}
