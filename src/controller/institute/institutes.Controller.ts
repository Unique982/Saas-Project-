import { NextFunction, Request, Response } from "express";
import sequelize from "../../database/connection";
import generateRandomNumber from "../../services/generateRandomNumber";
interface IExtendedRequest extends Request {
  user?: {
    name: string;
    age: number;
  };
}
class InstituteController {
  static async craeteInstitute(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const {
      instituteName,
      instituteEmail,
      institutePhoneNumber,
      instituteAddress,
    } = req.body;
    const institutePanNo = req.body.institutePanNo || null;
    const instituteVatNo = req.body.instituteVatNo || null;
    if (
      !instituteName ||
      !instituteEmail ||
      !institutePhoneNumber ||
      !instituteAddress
    ) {
      res.status(400).json({
        message:
          "Provide instituteName,instituteEmail,institutePhoneNo, instituteAddress",
      });
      return;
    }
    const instituteNumber = generateRandomNumber();
    await sequelize.query(
      `CREATE TABLE IF NOT EXISTS institute_${instituteNumber}(
       id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
       instituteName VARCHAR(255) NOT NULL,
       instituteEmail VARCHAR(255) NOT NULL UNIQUE,
       institutePhoneNumber VARCHAR(255) NOT NULL UNIQUE,
       instituteAddress VARCHAR(255) NOT NULL,
       institutePanNo VARCHAR(255),
       instituteVatNo VARCHAR(255),
       createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
       updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP 
     
      )`
    );

    await sequelize.query(
      `INSERT INTO institute_${instituteNumber}(
      instituteName,instituteEmail,institutePhoneNumber,instituteAddress,institutePanNo, instituteVatNo
      )VALUES(?,?,?,?,?,?)`,
      {
        replacements: [
          instituteName,
          instituteEmail,
          institutePhoneNumber,
          instituteAddress,
          institutePanNo,
          instituteVatNo,
        ],
      }
    );
    res.status(200).json({ message: "Institute Created!" });
  }
}

export default InstituteController;
