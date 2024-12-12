import { CreateVehicleController } from "../controllers/create";
import { VehicleStore } from "../store/vehicle";
import { AppError, ErrorCode } from "../errors";
import { Request, Response } from "express";

describe("CreateVehicleController", () => {
  let vehicleStoreMock: jest.Mocked<VehicleStore>;
  let createVehicleController: CreateVehicleController;
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;

  beforeEach(() => {
    vehicleStoreMock = {
      createVehicle: jest.fn(),
    } as unknown as jest.Mocked<VehicleStore>;

    createVehicleController = new CreateVehicleController(vehicleStoreMock);

    mockRequest = {
      body: {},
    };
    mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });

  it("crée un véhicule lorsque le payload est valide", async () => {
    mockRequest.body = {
      shortcode: "ABCD",
      battery: 50,
      latitude: 45.0,
      longitude: 90.0,
    };

    const mockVehicle = { id: "123", ...mockRequest.body };
    vehicleStoreMock.createVehicle.mockResolvedValue(mockVehicle);

    await createVehicleController.handle(
      mockRequest as Request,
      mockResponse as Response
    );

    expect(vehicleStoreMock.createVehicle).toHaveBeenCalledWith({
      shortcode: "ABCD",
      battery: 50,
      position: { latitude: 45.0, longitude: 90.0 },
    });
    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.json).toHaveBeenCalledWith({ vehicle: mockVehicle });
  });

  it("renvoie une erreur si le payload n'est pas valide", async () => {
    mockRequest.body = {
      shortcode: "ABC",
      battery: 150,
      latitude: 200,
      longitude: 500,
    };

    await expect(
      createVehicleController.handle(
        mockRequest as Request,
        mockResponse as Response
      )
    ).rejects.toThrow(AppError);

    try {
      await createVehicleController.handle(
        mockRequest as Request,
        mockResponse as Response
      );
    } catch (error) {
      expect(error).toBeInstanceOf(AppError);
      expect((error as AppError).code).toBe(ErrorCode.BadRequest);
      
    }
  });

  it("gère les erreurs de VehicleStore", async () => {
    mockRequest.body = {
      shortcode: "ABCD",
      battery: 50,
      latitude: 45.0,
      longitude: 90.0,
    };

    vehicleStoreMock.createVehicle.mockRejectedValue(new Error("Database error"));

    await expect(
      createVehicleController.handle(
        mockRequest as Request,
        mockResponse as Response
      )
    ).rejects.toThrow("Database error");

    expect(vehicleStoreMock.createVehicle).toHaveBeenCalled();
  });
});
