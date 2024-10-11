import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import router from "./routes/record.js";

// Middleware
const PORT = process.env.PORT || 5000;
const app = express();
dotenv.config();

app.use(cors());
app.use(express.json());

// Routes
app.use("/record", router);

app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
