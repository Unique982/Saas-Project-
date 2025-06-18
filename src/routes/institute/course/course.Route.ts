import express, { Router } from "express";
const routerCourse: Router = express.Router();
import CourseController from "../../../controller/institute/course/course.Controller";
import asyncErrorHandler from "../../../services/asyncErrorHandler";
import Middleware from "../../../middleware/middleware";

routerCourse
  .route("/course")

  .get(asyncErrorHandler(CourseController.getAllCourse))
  .post(
    Middleware.isLoggedIn,
    asyncErrorHandler(CourseController.createCourse)
  );
routerCourse
  .route("/course/:id")
  .get(asyncErrorHandler(CourseController.getSingleCourse))
  .delete(
    Middleware.isLoggedIn,
    asyncErrorHandler(CourseController.deleteCoures)
  );

export default routerCourse;
