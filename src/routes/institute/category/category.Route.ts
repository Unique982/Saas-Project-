import express, { Router } from "express";
import Middleware from "../../../middleware/middleware";
import CategoryController from "../../../controller/institute/category/category.Controller";
import asyncErrorHandler from "../../../services/asyncErrorHandler";
const routerCategory: Router = express.Router();

routerCategory
  .route("/")
  .post(
    Middleware.isLoggedIn,
    asyncErrorHandler(CategoryController.createCategories)
  )
  .get(
    Middleware.isLoggedIn,
    asyncErrorHandler(CategoryController.getCategories)
  );

//update and  delete route
routerCategory
  .route("/:id")
  .delete(
    Middleware.isLoggedIn,
    asyncErrorHandler(CategoryController.deleteCategory)
  )
  .get(
    Middleware.isLoggedIn,
    asyncErrorHandler(CategoryController.getCategories)
  );

export default routerCategory;
