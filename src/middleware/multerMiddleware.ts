import { Request } from "express";
import multer from "multer";
// locally file store
const storage = multer.diskStorage({
  // location incomming file kata rakha na vanne ho
  // cd -- callback function
  // cd (error,success)
  destination: function (req: Request, file: Express.Multer.File, cb: any) {
    cb(null, "./src/storage");
  },
  // mathi ko location dekoma rakey paxi,k name ma rakha vanna
  filename: function (req: Request, file: Express.Multer.File, cd: any) {
    cd(null, Date.now() + "-" + file.originalname);
  },
});
export { multer, storage };
