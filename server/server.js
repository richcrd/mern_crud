import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import router from "./routes/record.js";

// Middleware
const corsOptions = {
  origin: "http://localhost:10000",
}
const PORT = process.env.PORT || 10000;
const app = express();
dotenv.config();

app.use(cors(corsOptions));
app.use(express.json());

// Routes
app.use("/record", router);

app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
}).catch((error) => {
  console.log(error);
});
