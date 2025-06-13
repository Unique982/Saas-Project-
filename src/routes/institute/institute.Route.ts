import express, { Router } from "express";
import InstituteController from "../../controller/institute/institutes.Controller";
import Middleware from "../../middleware/middleware";
const router: Router = express.Router();

router
  .route("/institute")
  .post(Middleware.isLoggedIn, InstituteController.craeteInstitute);

export default router;
