import express, { Request, Router } from "express";
import CourseController from "../../../controller/institute/course/course.Controller";
import asyncErrorHandler from "../../../services/asyncErrorHandler";
import Middleware from "../../../middleware/middleware";

import multer from "multer";

import { cloudinary, storage } from "../../../services/cloudinaryConfig";
const upload = multer({
  storage: storage,
  fileFilter: (req: Request, file: Express.Multer.File, cb) => {
    const allowedFileTypes = ["image/png", "image/jpeg", "image/jpg"];
    if (allowedFileTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Only image support garxaa hai!!!"));
    }
  },
  limits: {
    fileSize: 4 * 1024 * 1024, // 2 mb
  },
});
const routerCourse: Router = express.Router();
routerCourse
  .route("/course")

  .get(asyncErrorHandler(CourseController.getAllCourse))
  .post(
    Middleware.isLoggedIn,
    upload.single("courseThumbnail"),
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
