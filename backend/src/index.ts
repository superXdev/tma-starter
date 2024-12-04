import express from "express";
import userRoutes from "./routes/userRoutes";
import { config } from "dotenv";
import cors from "cors";

config();

const app = express();
app.use(express.json());
app.use(cors());
app.use(express.static("public"));

// Routes
app.use("/user", userRoutes);

// Jalankan server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
   console.log(`Server running on http://localhost:${PORT}`);
});
