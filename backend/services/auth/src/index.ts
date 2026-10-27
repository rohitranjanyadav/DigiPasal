import dns from "node:dns";
dns.setServers(["1.1.1.1", "8.8.8.8"]);

import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { connectDb } from "./configs/db.js";
import authRouter from "./routes/auth.route.js";
import adminRouter from "./routes/admin.route.js";

dotenv.config();

const app = express();

app.use(express.json());

app.use(cookieParser());

const PORT = process.env.PORT;

app.get("/", (req, res) => {
  res.json("Hello from DigiPasal Auth-Service");
});

app.use("/",authRouter)
app.use("/admin",adminRouter)

app.listen(PORT, () => {
  console.log(`Auth-Service Server running on ${PORT}`);
  connectDb();
});
