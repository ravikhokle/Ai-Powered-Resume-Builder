import express from "express";
import { configDotenv } from "dotenv";
import allRoutes from "./routes/allRoutes.js"
import cors from "cors";
import DBConnect from "./db.js";

configDotenv();
DBConnect();

const app = express();
const port = process.env.PORT || 8000;

const allowedOrigins = [
  process.env.FRONTEND_URL,
  "http://localhost:5173",
  "http://localhost:5174",
  "https://resumebuilder.ninja",
];

app.use(
  cors({
    origin: allowedOrigins,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api", allRoutes);

app.get("/", (req, res) => {
  res.send("Home Page");
});

app.listen(port, () => {
  console.log(`Server is running on Port ${port}`);
});
