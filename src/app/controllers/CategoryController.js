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
 
    // ✅ Garante que req.file existe antes de prosseguir
    if (!req.file) {
      return res.status(400).json({ error: "Image is required!" });
    }
 
    const { name } = req.body;
 
    // ✅ Usa a URL pública gerada pelo Supabase (vem em req.file.path ou req.file.location
    //    dependendo do storage driver do multer que você usa)
    //    Se estiver usando multer-storage-supabase ou similar, ajuste aqui:
    const path = req.file.path || req.file.location || req.file.filename;
 
    const existingCategory = await Category.findOne({
      where: { name },
    });
 
    if (existingCategory) {
      return res.status(400).json({ error: "Category already exists!" });
    }
 
    const newCategory = await Category.create({
      name,
      path, // ✅ salva a URL correta
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
      // ✅ Mesmo ajuste no update
      path = req.file.path || req.file.location || req.file.filename;
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