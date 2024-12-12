import { ListVehiclesController } from "../controllers/find";
import { VehicleStore } from "../store/vehicle";
import { Request, Response } from "express";

describe("ListVehiclesController", () => {
  let vehicleStoreMock: jest.Mocked<VehicleStore>;
  let listVehiclesController: ListVehiclesController;
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;

  beforeEach(() => {
    vehicleStoreMock = {
      listVehicles: jest.fn(),
    } as unknown as jest.Mocked<VehicleStore>;

    listVehiclesController = new ListVehiclesController(vehicleStoreMock);

    mockRequest = {};
    mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });

  it("should list vehicles and return them in the response", async () => {
    const mockVehicles = [
        {
          id: 1,
          name: "abcd",
          shortcode: "abcd",
          battery: 12,
          position: {
            latitude: 30.0,
            longitude: 20.0,
          },
        },
        {
          id: 2,
          name: "efgh",
          shortcode: "efgh",
          battery: 12,
          position: {
            latitude: 30.0,
            longitude: 20.0,
          },
        },
      ];
      
    vehicleStoreMock.listVehicles.mockResolvedValue(mockVehicles);

    await listVehiclesController.handle(
      mockRequest as Request,
      mockResponse as Response
    );

    expect(vehicleStoreMock.listVehicles).toHaveBeenCalled();
    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.json).toHaveBeenCalledWith(mockVehicles);
  });

  it("should handle errors and not call res.json if an exception is thrown", async () => {
    const mockError = new Error("Database error");
    vehicleStoreMock.listVehicles.mockRejectedValue(mockError);

    await expect(
      listVehiclesController.handle(
        mockRequest as Request,
        mockResponse as Response
      )
    ).rejects.toThrow("Database error");

    expect(vehicleStoreMock.listVehicles).toHaveBeenCalled();
    expect(mockResponse.json).not.toHaveBeenCalled();
  });
});
