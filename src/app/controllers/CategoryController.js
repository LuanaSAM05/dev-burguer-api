import * as Yup from "yup";
import Category from "../models/Category.js";

class CategoryController {
  async store(req, res) {
    const schema = Yup.object({
      name: Yup.string().required(),
    });

    try {
      schema.validateSync(req.body, { abortEarly: false });
    } catch (err) {
      return res.status(400).json({
        message: "Validation failed!",
        errors: err.errors,
      });
    }

    if (!req.file) {
      return res.status(400).json({ error: "Image is required!" });
    }

    const { name } = req.body;

    // Cloudinary retorna a URL em req.file.path
    const path = req.file.path;

    const existingCategory = await Category.findOne({
      where: { name },
    });

    if (existingCategory) {
      return res.status(400).json({ error: "Category already exists!" });
    }

    const newCategory = await Category.create({
      name,
      path,
    });

    return res.status(201).json(newCategory);
  }

  async update(req, res) {
    const schema = Yup.object({
      name: Yup.string(),
    });

    try {
      schema.validateSync(req.body, { abortEarly: false });
    } catch (err) {
      return res.status(400).json({
        message: "Validation failed!",
        errors: err.errors,
      });
    }

    const { id } = req.params;
    const { name } = req.body;

    let path;
    if (req.file) {
      // Cloudinary retorna a URL em req.file.path
      path = req.file.path;
    }

    await Category.update(
      {
        name,
        ...(path && { path }),
      },
      {
        where: { id },
      }
    );

    return res.status(200).json();
  }

  async index(req, res) {
    try {
      const categories = await Category.findAll({
        attributes: ["id", "name", "path"],
      });

      return res.status(200).json(categories);
    } catch (err) {
      console.error("Erro ao buscar categorias:", err);
      return res.status(500).json({ error: "Erro interno ao buscar categorias." });
    }
  }
}

export default new CategoryController();