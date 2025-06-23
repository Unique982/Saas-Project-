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
    const { categoryName, categoryDescription } = req.body;
    if (!categoryName || !categoryDescription) {
      res.status(200).json({ message: "all feild require" });
      return;
    }
    await sequelize.query(
      `INSERT INTO category_${institueNumber}(categoryName,categoryDescription)VALUES(?,?)`,
      {
        type: QueryTypes.INSERT,
        replacements: [categoryName, categoryDescription],
      }
    );
    res.status(200).json({ message: "Category Add sucessfully" });
  };

  //delete category
  static deleteCategory = async (req: IExtendedRequest, res: Response) => {
    const institueNumber = req.user?.currentInstituteNumber;
    const categoryId = req.params.id;

    const [categoryData] = await sequelize.query(
      `SELECT * FROM category_${institueNumber} WHERE id=?`,
      {
        replacements: [categoryId],
        type: QueryTypes.SELECT,
      }
    );
    await sequelize.query(
      `DELETE FROM category_${institueNumber} WHERE id =?`,
      {
        type: QueryTypes.DELETE,
        replacements: [categoryId],
      }
    );
    res.status(200).json({ message: "Category delete successfully!" });
  };

  // single data fetch
  static singleCategory = async (req: IExtendedRequest, res: Response) => {
    const institueNumber = req.user?.currentInstituteNumber;
    const categoryId = req.params.id;

    const [categoryData] = await sequelize.query(
      `SELECT * FROM category_${institueNumber} WHERE id = ?`,
      {
        replacements: [categoryId],
      }
    );
    if (categoryData.length == 0) {
      res.status(400).json({
        message: "This is not found. plase send correct category id!",
      });
    }

    const category = await sequelize.query(
      `SELECT * FROM category_${institueNumber} WHERE id = ?`,
      {
        replacements: [categoryId],
        type: QueryTypes.SELECT,
      }
    );
    res
      .status(200)
      .json({ message: "Single date fetch successfully!", data: category });
  };
}
export default CategoryController;
