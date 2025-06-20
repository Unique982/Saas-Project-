import { Response } from "express";
import { IExtendedRequest } from "../../../middleware/type";

class TeacherController {
  static createTeacher = async (req: IExtendedRequest, res: Response) => {
    const institueNumber = req.user?.currentInstituteNumber;

    const {
      teacherName,
      teacherPhoneNumber,
      teacherEmail,
      teacherExperties,
      salary,
    } = req.body;
    if (
      !teacherName ||
      !teacherPhoneNumber ||
      !teacherEmail ||
      !teacherExperties ||
      !salary
    ) {
      res.status(200).json({ message: "teacher add succ" });
    }
  };
}
export default TeacherController;
