import express from "express";
const app = express();
import authRouter from "./route/globals/auth/auth.Route";
app.use("/api", authRouter);
export default app;
