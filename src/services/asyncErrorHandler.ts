import { Request, Response, NextFunction } from "express";

const asyncErrorHandler = (fn: Function) => {
  return (req: Request, res: Response, next: NextFunction) => {
    fn(req, res, next).catch((err: Error) => {
      return res.status(400).json({ message: err.message, fullError: Error });
    });
  };
};
export default asyncErrorHandler;
