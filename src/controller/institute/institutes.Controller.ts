import { NextFunction, Request, Response } from "express";
import sequelize from "../../database/connection";
import generateRandomNumber from "../../services/generateRandomNumber";
import { IExtendedRequest } from "../../middleware/type";
import User from "../../database/models/user.Model";

class InstituteController {
  static async createInstitute(
    req: IExtendedRequest,
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
    //
    await sequelize.query(`CREATE TABLE IF NOT EXISTS user_institute(id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    userId VARCHAR(255) REFERENCES users(id), instituteNumber INT UNIQUE)`);
    if (req.user) {
      await sequelize.query(
        `INSERT INTO user_institute(userId,instituteNumber) VALUES(?,?)`,
        {
          replacements: [req.user.id, instituteNumber],
        }
      );

      await User.update(
        {
          currentInstituteNumber: instituteNumber,
          role: "institute",
        },
        {
          where: {
            id: req.user.id,
          },
        }
      );
      req.instituteNumber = instituteNumber;
    }
    next();
  }
  // create Teacher table

  static async createTeacherTable(
    req: IExtendedRequest,
    res: Response,
    next: NextFunction
  ) {
    const instituteNumber = req.instituteNumber;
    await sequelize.query(`CREATE TABLE IF NOT EXISTS teacher_${instituteNumber}(
  id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  teacherName VARCHAR(255) NOT NULL,
  teacherPhoneNumber VARCHAR (255), teacherEmail VARCHAR(255) UNIQUE, teacherExperties VARCHAR(255), joinedDate DATE, salary VARCHAR(255),  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP)`);
    next();
  }

  //  create student table
  static async createStudentTable(
    req: IExtendedRequest,
    res: Response,
    next: NextFunction
  ) {
    const institueNumber = req.instituteNumber;
    await sequelize.query(
      `CREATE TABLE IF NOT EXISTS student_${institueNumber}(id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,studentName VARCHAR(255) NOT NULL,studentEmail VARCHAR(255) NOT NULL UNIQUE, studentPhoneNumber VARCHAR(255) NOT NULL UNIQUE, studentAddress TEXT, enrolledDate DATE, studentImage VARCHAR(255), createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP)`
    );
    next();
  }
  // create course table
  static async createCourseTable(req: IExtendedRequest, res: Response) {
    const institueNumber = req.instituteNumber;
    await sequelize.query(
      `CREATE TABLE IF NOT EXISTS course_${institueNumber}(id INT NOT NULL PRIMARY KEY AUTO_INCREMENT, courseName VARCHAR(255) NOT NULL, coursePrice VARCHAR(255) NOT NULL,
      courseDescription TEXT NOT NULL, courseDuration VARCHAR(255) NOT NULL, courseLevel ENUM('beginner','intermediate','advance')NOT NULL, createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP)`
    );
    res.status(200).json({
      message: "Institue create successfully vayo!",
      institueNumber,
    });
  }
}
export default InstituteController;
