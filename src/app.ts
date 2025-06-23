import express from "express";
const app = express();
import authRouter from "./routes/globals/auth/auth.Route";
import instituteRouter from "./routes/institute/institute.Route";
import courseRouter from "./routes/institute/course/course.Route";
import routerCategory from "./routes/institute/category/category.Route";
import routerStudent from "./routes/institute/stundent/student.Route";
import routerTeacher from "./routes/institute/teacher/teacher.Route";
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/api", authRouter);
app.use("/api/institute", instituteRouter);

// cousre api
app.use("/api/institute/course", courseRouter);

// catgeory api
app.use("/api/institute/category", routerCategory);

//Student router
app.use("/api/institute/student", routerStudent);

// teacher api
app.use("/api/institute/teacher", routerTeacher);
export default app;
