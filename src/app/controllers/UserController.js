/*
store -> cria dados
index -> lista todos os dados
show -> mostra um unico dado
update -> atualiza um dado
delete -> deleta um dado
*/
import User from "../models/User.js";
import * as Yup from 'yup';
import bcrypt from 'bcrypt';

class UserController {
  async store(req, res) {

    const schema = Yup.object().shape({
      name: Yup.string()
        .matches(/^[A-Za-zÀ-ÿ\s]+$/, 'Name must contain only letters')
        .required(),
      email: Yup.string().email().required(),
      password: Yup.string().required().min(6),
      admin: Yup.boolean(),
    });

    try {
      schema.validateSync(req.body, {
        abortEarly: false,
        strict: true,
      });
    } catch (err) {
      return res.status(400).json({
        message: 'Validation failed!',
        errors: err.errors,
      });
    }

    const { name, email, password, admin } = req.body;

    const existingUser = await User.findOne({ where: { email } });

    if (existingUser) {
      return res.status(400).json({ message: 'Email already taken!' });
    }

    const password_hash = await bcrypt.hash(password, 10)

    const user = await User.create({
      name,
      email,
      password_hash,
      admin,
    });

    return res.status(201).json({
      id: user.id,
      name: user.name,
      email: user.email,
      admin: user.admin,
    });
  }
}

export default new UserController();