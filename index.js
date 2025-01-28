import express from "express";
import { configDotenv } from "dotenv";
import resumeRoutes from "./routes/resumeRoutes.js"

configDotenv();

const app = express();
const port = process.env.PORT || 8000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api", resumeRoutes);

app.post("/", (req, res) => {
  res.send("Home Page Again.");
});

app.listen(port, () => {
  console.log(`Server is running on Port ${port}`);
});
