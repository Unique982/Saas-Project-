import express from "express";
const app = express();
import authRouter from "./routes/globals/auth/auth.Route";
import instituteRouter from "./routes/institute/institute.Route";
app.use(express.json());
app.use("/api", authRouter);
app.use("/api", instituteRouter);
export default app;
