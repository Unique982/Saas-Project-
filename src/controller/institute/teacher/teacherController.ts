import { Response } from "express";
import { IExtendedRequest } from "../../../middleware/type";
import sequelize from "../../../database/connection";
import generatedRandomPassword from "../../../services/generateRandomPassword";

import { QueryTypes } from "sequelize";
import sendMail from "../../../services/sendEmail";

class TeacherController {
  static createTeacher = async (req: IExtendedRequest, res: Response) => {
    const institueNumber = req.user?.currentInstituteNumber;

    const {
      teacherName,
      teacherPhoneNumber,
      teacherEmail,
      teacherExperties,
      salary,
      joinedDate,
      courseId,
    } = req.body;

    if (
      !teacherName ||
      !teacherPhoneNumber ||
      !teacherEmail ||
      !teacherExperties ||
      !salary ||
      !joinedDate
    ) {
      return res.status(400).json({ message: "All filed is require" });
    }
    const teacherPhoto = req.file ? req.file.path : "https://uniqe.png";
    // password generatad function
    const data = generatedRandomPassword(teacherName);
    await sequelize.query(
      `INSERT INTO teacher_${institueNumber}(teacherName,teacherPhoneNumber,teacherEmail,teacherExperties,salary,joinedDate,teacherPhoto,teacherPassword,courseI) VALUES(?,?,?,?,?,?,?,?)`,
      {
        type: QueryTypes.INSERT,
        replacements: [
          teacherName,
          teacherPhoneNumber,
          teacherEmail,
          teacherExperties,
          salary,
          joinedDate,
          teacherPhoto,
          data.hashedVersion,
        ],
      }
    );
    const teacherData: { id: string }[] = await sequelize.query(
      `SELECT id FROM teacher_${institueNumber} WHERE teacherEmail = ?`,
      {
        type: QueryTypes.SELECT,
        replacements: [teacherEmail],
      }
    );
    console.log(teacherData, "teacherData");
    await sequelize.query(
      `UPDATE course_${institueNumber} SET teacherId=? WHERE id=?`,
      {
        type: QueryTypes.UPDATE,
        replacements: [teacherData[0].id, courseId],
      }
    );
    // sent email
    const mailInformation = {
      to: teacherEmail,
      subject: "Welcom to teacher our saas project2!",
      text: `Welcome your <b>Email:</b> <span>${teacherEmail}</span>,<br> <B>Password:</b><span>${data.planVersion}</span>`,
    };
    await sendMail(mailInformation);
    res.status(200).json({ message: "Teacher added successfully!" });
  };

  // get teacher
  static getTeachers = async (req: IExtendedRequest, res: Response) => {
    const institueNumber = req.user?.currentInstituteNumber;
    const teachers = await sequelize.query(
      `SELECT * FROM teacher_${institueNumber}`,
      {
        type: QueryTypes.SELECT,
      }
    );
    res.status(200).json({ message: "teahers fetch", data: teachers });
  };

  // delete teacher
  static deleteTeachers = async (req: IExtendedRequest, res: Response) => {
    const institueNumber = req.user?.currentInstituteNumber;
    const id = req.params.id;
    await sequelize.query(`DELETE FROM teacher_${institueNumber} WHERE id =?`, {
      type: QueryTypes.DELETE,
      replacements: [id],
    });
    res.status(200).json({ message: "Delete teacher successfully" });
  };

  static singleTeachers = async (req: IExtendedRequest, res: Response) => {
    const institueNumber = req.user?.currentInstituteNumber;
    const id = req.params.id;
    const teachers = await sequelize.query(
      `SELECT * FROM teacher_${institueNumber} WHERE id=?`,
      {
        type: QueryTypes.SELECT,
        replacements: [id],
      }
    );
    res
      .status(200)
      .json({ message: "single teacher fetch successfully", data: teachers });
  };

  // update teacher record
  static updateTeachers = async (req: IExtendedRequest, res: Response) => {
    const institueNumber = req.user?.currentInstituteNumber;
    const id = req.params.id;
    const {
      teacherName,
      teacherPhoneNumber,
      teacherEmail,
      teacherExperties,
      salary,
      joinedDate,
      courseId,
    } = req.body;

    if (
      !teacherName ||
      !teacherPhoneNumber ||
      !teacherEmail ||
      !teacherExperties ||
      !salary ||
      !joinedDate
    ) {
      return res.status(400).json({ message: "All filed is require" });
    }
    const teacherPhoto = req.file ? req.file.path : "https://uniqe.png";
    // password generatad function
    await sequelize.query(
      `UPDATE teacher_${institueNumber} SET teacherName=?,teacherPhoneNumber=?,teacherEmail=?,teacherExperties=?,salary=?,joinedDate=?,teacherPhoto=?,courseId=? WHERE id =?`,
      {
        type: QueryTypes.UPDATE,
        replacements: [
          teacherName,
          teacherPhoneNumber,
          teacherEmail,
          teacherExperties,
          salary,
          joinedDate,
          teacherPhoto,
          courseId,
        ],
      }
    );
    res.status(200).json({ message: "teacher update successfully!" });
  };
}
export default TeacherController;
