import express from "express";
import { configDotenv } from "dotenv";
import allRoutes from "./routes/allRoutes.js"
import cors from "cors";
import DBConnect from "./db.js";

configDotenv();
DBConnect();

const app = express();
const port = process.env.PORT || 8000;

app.use(cors({
  origin: ['https://ai-powered-resume-builder.ravikhokle.site', 'http://localhost:5173'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Authorization', 'Content-Type'],
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api", allRoutes);

app.get("/", (req, res) => {
  res.send("Home Page");
});

app.listen(port, () => {
  console.log(`Server is running on Port ${port}`);
});
