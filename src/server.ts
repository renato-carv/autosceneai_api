import "reflect-metadata"; 
import express from "express";
import cors from "cors";
import "./container/index.js"; 

import authRoutes from "./routes/auth.routes.js";
import chatRoutes from "./routes/chat.routes.js";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api", authRoutes);
app.use("/api", chatRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
