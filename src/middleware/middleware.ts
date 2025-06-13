import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import User from "../database/models/user.Model";

interface IExtendedRequest extends Request {
  user?: any;
}

class Middleware {
  static async isLoggedIn(
    req: IExtendedRequest,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    // check if login or not
    // token accept
    // verify garne

    const token = req.headers.authorization;
    if (!token) {
      res.status(401).json({
        message: "Please provide token",
      });
      return;
    }
    //verfiy token
    jwt.verify(token, "thissecretkey", async (error, result: any) => {
      if (error) {
        res.status(403).json({ message: "Token invalid" });
      } else {
        const userData = await User.findByPk(result.id);
        if (!userData) {
          res
            .status(403)
            .json({ message: "No user with that id, invalid token" });
        } else {
          req.user = userData;
          next();
        }
      }
    });
  }
}
export default Middleware;
