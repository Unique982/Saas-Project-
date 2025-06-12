import express, { Router } from "express";
import InstituteController from "../../controller/institute/institutes.Controller";
const router: Router = express.Router();
router.route("/institute").post(InstituteController.craeteInstitute);

export default router;
