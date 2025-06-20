import express from "express";
const app = express();
import authRouter from "./routes/globals/auth/auth.Route";
import instituteRouter from "./routes/institute/institute.Route";
import courseRouter from "./routes/institute/course/course.Route";
import routerCategory from "./routes/institute/category/category.Route";
import routerStudent from "./routes/institute/stundent/student.Route";
import routerTeacher from "./routes/institute/teacher/teacher.Route";

app.use(express.json());
app.use("/api", authRouter);
app.use("/api", instituteRouter);

// cousre api
app.use("/api", courseRouter);

// catgeory api
app.use("/api", routerCategory);

//Student router
app.use("/api", routerStudent);

// teacher api
app.use("/api", routerTeacher);
export default app;
