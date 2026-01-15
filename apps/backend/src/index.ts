import "dotenv/config";
import express from "express";

const app = express();

app.get("/health", (req, res) => {
  res.send("Server running");
});
app.listen(4004, () => {
  console.log(`Server is running on port 4004`);
});
