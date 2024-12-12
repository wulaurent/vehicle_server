import { DeleteVehicleController } from "../controllers/delete";
import { VehicleStore } from "../store/vehicle";
import { AppError, ErrorCode } from "../errors";
import { Request, Response } from "express";

interface Parameters {
  id: string;
}

describe("DeleteVehicleController", () => {
  let vehicleStoreMock: jest.Mocked<VehicleStore>;
  let deleteVehicleController: DeleteVehicleController;
  let mockRequest: Partial<Request<Parameters>>;
  let mockResponse: Partial<Response>;

  beforeEach(() => {
    vehicleStoreMock = {
      deleteVehicle: jest.fn(),
    } as unknown as jest.Mocked<VehicleStore>;

    deleteVehicleController = new DeleteVehicleController(vehicleStoreMock);

    mockRequest = {
        params: { id: "123" },
      };
    mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });

  it("supprime un véhicule lorsqu'un identifiant valide est fourni", async () => {
    mockRequest.params = { id: "123" };

    await deleteVehicleController.handle(
      mockRequest as Request<Parameters>,
      mockResponse as Response
    );

    expect(vehicleStoreMock.deleteVehicle).toHaveBeenCalledWith(123);
    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.json).toHaveBeenCalledWith({
      message: "vehicle successfully deleted",
    });
  });

  it("renvoie une erreur si l'ID n'est pas un numéro valide", async () => {
    mockRequest.params = { id: "invalid" };

    await expect(
      deleteVehicleController.handle(
        mockRequest as Request<Parameters>,
        mockResponse as Response
      )
    ).rejects.toThrow(AppError);

    try {
      await deleteVehicleController.handle(
        mockRequest as Request<Parameters>,
        mockResponse as Response
      );
    } catch (error) {
      expect(error).toBeInstanceOf(AppError);
      expect((error as AppError).code).toBe(ErrorCode.BadRequest);
    }

    expect(vehicleStoreMock.deleteVehicle).not.toHaveBeenCalled();
  });

  it("gère les erreurs de VehicleStore", async () => {
    mockRequest.params = { id: "123" };
    vehicleStoreMock.deleteVehicle.mockRejectedValue(
      new Error("Database error")
    );

    await expect(
      deleteVehicleController.handle(
        mockRequest as Request<Parameters>,
        mockResponse as Response
      )
    ).rejects.toThrow("Database error");

    expect(vehicleStoreMock.deleteVehicle).toHaveBeenCalledWith(123);
  });
});
