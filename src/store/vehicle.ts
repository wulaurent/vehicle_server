import { Pool } from "pg";

interface Vehicle {
  id: number;
  shortcode: string;
  battery: number;
  position: { latitude: number; longitude: number };
}

interface CreateVehicleInput {
  shortcode: string;
  battery: number;
  position: { latitude: number; longitude: number };
}

export class VehicleStore {
  constructor(private readonly pool: Pool) {}
}
