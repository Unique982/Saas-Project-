import { Response } from "express";
import { IExtendedRequest } from "../../../middleware/type";
import sequelize from "../../../database/connection";

import { QueryTypes } from "sequelize";

class CategoryController {
  // get all catgeory
  static getCategories = async (req: IExtendedRequest, res: Response) => {
    const institueNumber = req.user?.currentInstituteNumber;
    const categories = await sequelize.query(
      `SELECT * FROM category_${institueNumber}`,
      {
        type: QueryTypes.SELECT, // kasto type ko operation garna lako ho vanna dinu paro
      }
    );
    res
      .status(200)
      .json({ message: "Categories fetched successfully", data: categories });
  };
  // add category
  static createCategories = async (req: IExtendedRequest, res: Response) => {
    const institueNumber = req.user?.currentInstituteNumber;
    const [categoryName, categoryDescription] = req.body;
    if (!categoryName || !categoryDescription) {
      res.status(200).json({ message: "all feild require" });
      return;
    }
    await sequelize.query(
      `INSERT INTO INTO category_${institueNumber}(categoryName,categoryDescription)VALUES(?,?)`,
      {
        replacements: [categoryName, categoryDescription],
      }
    );
    res.status(200).json({ message: "Category Add sucessfully" });
  };

  //delete category
  static deleteCategory = async (req: IExtendedRequest, res: Response) => {
    const institueNumber = req.user?.currentInstituteNumber;
    const id = req.params.id;
    await sequelize.query(
      `DELETE FROM category_${institueNumber} WHERE id =?`,
      {
        type: QueryTypes.DELETE,
        replacements: [id],
      }
    );
    res.status(200).json({ message: "Category delete successfully!" });
  };

  // single data fetch
}
export default CategoryController;
