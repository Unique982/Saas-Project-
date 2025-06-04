import express, { Router } from "express";
const router: Router = express.Router();
import AuthController from "../../../controller/globals/auth/auth.Controller";
router.route("/register").post(AuthController.registerUser);
router.route("/login").post(AuthController.loginUser);

export default router;
