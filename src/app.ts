import express from "express";
const app = express();
import authRouter from "./routes/globals/auth/auth.Route";
app.use(express.json());
app.use("/api", authRouter);
export default app;
