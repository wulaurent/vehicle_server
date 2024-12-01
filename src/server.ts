import app from "./app";

const PORT = parseInt(process.argv[2], 10) || 8080;

if (isNaN(PORT)) {
  console.error("Invalid port specified. Please provide a valid number.");
  process.exit(1);
}

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
