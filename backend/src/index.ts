import express, { NextFunction, Request, Response } from "express";
import userRoutes from "./routes/userRoutes";
import { config } from "dotenv";
import cors from "cors";
import { verifyTelegramWebAppData } from "@utils/telegram";

config();

const app = express();
app.use(express.json());
app.use(cors());
app.use(express.static("public"));

app.use((req: Request, res: Response, next: NextFunction) => {
   if (req.method === "POST") {
      const telegramData = req.headers["x-telegram-data"];

      if (!telegramData || typeof telegramData !== "string") {
         res.status(403).json({ message: "Unauthorized action" });
         return;
      }

      const isValid = verifyTelegramWebAppData(telegramData);

      if (!isValid) {
         res.status(403).json({ message: "Unauthorized action" });
         return;
      }
   }

   next();
});

// Routes
app.use("/user", userRoutes);

// Jalankan server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
   console.log(`Server running on http://localhost:${PORT}`);
});
