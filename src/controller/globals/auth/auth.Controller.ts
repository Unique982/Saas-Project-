// register
// login
// forget password
// send otp
// verify otp
// change new pasword

import { Request, Response } from "express";
import User from "../../../database/models/userModel";

const registerUser = async (req: Request, res: Response) => {
  const { username, email, password } = req.body;
  await User.create({
    username,
    email,
    password,
  });
};

class AuthController {
  static async registerUser(req: Request, res: Response) {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      res.json({ message: "all filed require" });
      return;
    }
    await User.create({
      username: username,
      email: email,
      password: password,
    });
  }
}
export default AuthController;
