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

  public async createVehicle(vehicleData: CreateVehicleInput): Promise<Vehicle> {
    const { shortcode, battery, position } = vehicleData;

    const result = await this.pool.query(
      `INSERT INTO vehicle_server.vehicles (shortcode, battery, position)
       VALUES ($1, $2, ST_SetSRID(ST_MakePoint($3, $4), 4326))
       RETURNING id, shortcode, battery, ST_X(position) AS longitude, ST_Y(position) AS latitude`,
      [shortcode, battery, position.longitude, position.latitude]
    );

    const row = result.rows[0];
    return {
      id: row.id,
      shortcode: row.shortcode,
      battery: row.battery,
      position: { latitude: row.latitude, longitude: row.longitude },
    };
  }
}
