// register
// login
// forget password
// send otp
// verify otp
// change new pasword

import { Request, Response } from "express";
import User from "../../../database/models/user.Model";
import bcrypt from "bcrypt";

// const registerUser = async (req: Request, res: Response) => {
//   const { username, email, password } = req.body;
//   await User.create({
//     username,
//     email,
//     password,
//   });
// };

class AuthController {
  static async registerUser(req: Request, res: Response) {
    if (req.body == undefined) {
      console.log("triggereed");
      res.status(400).json({
        message: "No data was sent!!",
      });
      return;
    }
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      res.json({ message: "all filed require" });
      return;
    }
    try {
      await User.create({
        username: username,
        email: email,
        password: bcrypt.hashSync(password, 12),
      });
      res.json({ message: "new added succssfully" });
    } catch (err) {
      res.json({ message: "somthing wrong" });
    }
  }
  static async loginUser(req: Request, res: Response) {
    try {
      if (req.body == undefined) {
        console.log("triggereed");
        res.status(400).json({
          message: "No data was sent!",
        });
        return;
      }
      const { email, role, password } = req.body;
      if (!email || !role || !password) {
        res.json({ message: "All filed require" });
        return;
      }
      // check user exits or not
      const existUser = await User.findOne({
        where: {
          email,
          role,
        },
      });
      if (!existUser) {
        res.json({ message: "This email not registered" });
        return;
      }
      // check password
      const passwordMatched = bcrypt.compareSync(password, existUser.password);
      if (!passwordMatched) {
        res.json({ message: "Invalid credentials" });
        return;
      }
      res.json({ message: "Login successfully!" });
    } catch (err) {
      res.status(400).json({ message: "Something wrong" });
    }
  }
}
export default AuthController;
