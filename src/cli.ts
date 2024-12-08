#!/usr/bin/env node

import { Command } from "commander";
import axios from "axios";

const program = new Command();

program
  .name("vehicle-cli")
  .description("CLI tool to interact with the vehicle server")
  .version("1.0.0")
  .option("--address <address>", "Server address (e.g., localhost:8080)", "localhost:8080");

program
  .command("create-vehicle")
  .description("Create a new vehicle")
  .requiredOption("--shortcode <shortcode>", "Shortcode of the vehicle")
  .requiredOption("--battery <battery>", "Battery percentage (0-100)", parseInt)
  .requiredOption("--longitude <longitude>", "Longitude of the vehicle", parseFloat)
  .requiredOption("--latitude <latitude>", "Latitude of the vehicle", parseFloat)
  .action(async (options) => {
    const { shortcode, battery, longitude, latitude } = options;
    const { address } = program.opts();

    const url = `http://${address}/vehicles`;

    const payload = { shortcode, battery, latitude, longitude };

    try {
      const response = await axios.post(url, payload);
      console.log(`Created vehicle '${shortcode}', with ID '${response.data.vehicle.id}'`);
    } catch (error: any) {
      if (error.response) {
        console.error(`Failed to create vehicle: ${error.response.status} - ${JSON.stringify(error.response.data)}`);
      } else {
        console.error(`Error: ${error.message}`);
      }
    }
  });

program
  .command("list-vehicles")
  .description("List all vehicles")
  .action(async () => {
    const { address } = program.opts(); // Utilise l'option globale pour récupérer l'adresse

    const url = `http://${address}/vehicles`;

    try {
      const response = await axios.get(url);
      const vehicles = response.data;

      if (vehicles.length === 0) {
        console.log("No vehicles found.");
        return;
      }

      console.log("Vehicles:");
      vehicles.forEach((vehicle: any) => {
        console.log(
          `- ID: ${vehicle.id}, Shortcode: ${vehicle.shortcode}, Battery: ${vehicle.battery}, Position: Longitude ${vehicle.position.longitude}, Latitude ${vehicle.position.latitude}`
        );
      });
    } catch (error: any) {
      if (error.response) {
        console.error(
          `Failed to list vehicles: ${error.response.status} - ${JSON.stringify(error.response.data)}`
        );
      } else {
        console.error(`Error: ${error.message}`);
      }
    }
  });

program
  .command("delete-vehicle")
  .description("Delete a vehicle by ID")
  .requiredOption("--id <id>", "ID of the vehicle to delete", parseInt)
  .action(async (options) => {
    const { id } = options;
    const { address } = program.opts(); // Utilise l'option globale pour récupérer l'adresse

    const url = `http://${address}/vehicles/${id}`;

    try {
      await axios.delete(url);
      console.log(`Vehicle with ID '${id}' deleted successfully.`);
    } catch (error: any) {
      if (error.response) {
        console.error(
          `Failed to delete vehicle: ${error.response.status} - ${JSON.stringify(error.response.data)}`
        );
      } else {
        console.error(`Error: ${error.message}`);
      }
    }
  });

program.parse(process.argv);
