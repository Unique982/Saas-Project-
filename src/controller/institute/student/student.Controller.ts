import { Response } from "express";
import { IExtendedRequest } from "../../../middleware/type";
import sequelize from "../../../database/connection";

class Studentcontroller {
  static getStudent = async (req: IExtendedRequest, res: Response) => {
    const instituteNumber = req.user?.currentInstituteNumber;

    const students = await sequelize.query(
      `SELECT * FROM students_${instituteNumber}`
    );
    res
      .status(200)
      .json({ message: "Student fetech successfully", data: students });
  };

  // add student

  static addStudent = async (req: IExtendedRequest, res: Response) => {
    const instituteNumber = req.user?.currentInstituteNumber;
    const {
      studentName,
      studentEmail,
      studentPhoneNumber,
      studentAddress,
      enrolledDate,
    } = req.body;
    const studentImage = req.file ? req.file.path : null;
    if (
      !studentName ||
      !studentEmail ||
      !studentPhoneNumber ||
      !studentAddress ||
      enrolledDate
    ) {
      res.status(400).json({ message: "All feild  are require " });
    }
    await sequelize.query(
      `INSERT INTO student${instituteNumber}(studentName,studentEmail,studentPhoneNumber,studentAddress,enrolledData,studentImage)VALUES(?,?,?,?,?.?)`,
      {
        replacements: [
          studentName,
          studentEmail,
          studentPhoneNumber,
          studentAddress,
          enrolledDate,
          studentImage,
        ],
      }
    );
    res.status(200).json({ message: "student add successfully!" });
  };
}
export default Studentcontroller;
