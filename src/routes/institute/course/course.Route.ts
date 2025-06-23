import express, { Request, Router } from "express";
import CourseController from "../../../controller/institute/course/course.Controller";
import asyncErrorHandler from "../../../services/asyncErrorHandler";
import Middleware from "../../../middleware/middleware";
import upload from "../../../middleware/multerUpload";
const routerCourse: Router = express.Router();
routerCourse
  .route("/")

  .get(Middleware.isLoggedIn, asyncErrorHandler(CourseController.getAllCourse))
  .post(
    Middleware.isLoggedIn,
    upload.single("courseThumbnail"),
    asyncErrorHandler(CourseController.createCourse)
  );
routerCourse
  .route("/:id")
  .get(
    Middleware.isLoggedIn,
    asyncErrorHandler(CourseController.getSingleCourse)
  )
  .delete(
    Middleware.isLoggedIn,
    asyncErrorHandler(CourseController.deleteCoures)
  );

export default routerCourse;
