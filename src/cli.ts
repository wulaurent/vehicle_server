#!/usr/bin/env node

import { Command } from "commander";

const program = new Command();

program
  .name("vehicle-cli")
  .description("CLI tool to interact with the vehicle server")
  .version("1.0.0")
  .option("--address <address>", "Server address (e.g., localhost:8080)", "localhost:8080");

program.parse(process.argv);
