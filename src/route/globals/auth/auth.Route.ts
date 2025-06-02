import express, { Router } from "express";
const router: Router = express.Router();
import AuthController from "../../../controller/globals/auth/auth.Controller";
router.route("/register").post(AuthController.registerUser);

export default router;
