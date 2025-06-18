import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import User from "../database/models/user.Model";
import { IExtendedRequest } from "./type";

class Middleware {
  static async isLoggedIn(
    req: IExtendedRequest,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    // check if login or not
    // token accept
    // verify garne
    try{

    const token = req.headers.authorization;

    if (!token) {
      res.status(401).json({
        message: "Please provide token",
      });
      return;
    }
    //verfiy token
    jwt.verify(token, "token", async (erroraayo, resultaayo: any) => {
      if (erroraayo) {
        res.status(403).json({ message: "Token invalid vayo" });
      } else {
        const userData = await User.findByPk(resultaayo.id);
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
  }catch(err){
    console.log(err)
  }
  }
}
export default Middleware;
