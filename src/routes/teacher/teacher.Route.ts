import express, { Router } from "express";
const teacherRoute: Router = express.Router();
import TeacherController from "../../controller/teacher/teacher.Controller";
import asyncErrorHandler from "../../services/asyncErrorHandler";

teacherRoute.route("/").post(asyncErrorHandler(TeacherController.teacherLogin));

export default teacherRoute;
