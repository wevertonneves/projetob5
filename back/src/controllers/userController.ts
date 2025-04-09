import { Request, Response } from "express";
import UserModel from "../models/UserModel";

//metodo que busca todos
export const getAll = async (req: Request, res: Response) => {
  const users = await UserModel.findAll();
  res.send(users);
};

// metodo que busca por id
export const getUserByid = async (
  req: Request<{ id: string }>,
  res: Response
) => {
  const user = await UserModel.findByPk(req.params.id);

  return res.json(user);
};

//metodo que cria um novo usuario
export const createUser = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;

    // Validação do campo 'name'
    if (!name) {
      return res.status(400).json({ error: "Campo 'name' é obrigatório." });
    }
    if (name.length < 3) {
      return res
        .status(400)
        .json({ error: "Campo 'name' deve ter pelo menos 3 caracteres." });
    }

    // Validação do campo 'email'
    if (!email) {
      return res.status(400).json({ error: "Campo 'email' é obrigatório." });
    }
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: "Email inválido." });
    }

    // Validação do campo 'password'
    if (!password) {
      return res.status(400).json({ error: "Campo 'password' é obrigatório." });
    }
    if (password.length < 6) {
      return res
        .status(400)
        .json({ error: "A senha deve ter pelo menos 6 caracteres." });
    }

    // Criação do usuário
    const user = await UserModel.create({ name, email, password });
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ error: "Erro Interno no servidor", message: error });
  }
};

// metodo que atualiza um usuario
export const updateUser = async (
  req: Request<{ id: string }>,
  res: Response
) => {
  try {
    const { name, email, password } = req.body;

    // Validação do campo 'name'
    if (name && name.length < 3) {
      return res
        .status(400)
        .json({ error: "Campo 'name' deve ter pelo menos 3 caracteres." });
    }

    // Validação do campo 'email'
    if (email) {
      const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
      if (!emailRegex.test(email)) {
        return res.status(400).json({ error: "Email inválido." });
      }
    }

    // Validação do campo 'password'
    if (password && password.length < 6) {
      return res
        .status(400)
        .json({ error: "A senha deve ter pelo menos 6 caracteres." });
    }

    // Busca o usuário a ser atualizado
    const user = await UserModel.findByPk(req.params.id);
    if (!user) {
      return res.status(404).json({ error: "Usuário não encontrado." });
    }

    // Atualiza os campos, se fornecidos
    if (name) user.name = name;
    if (email) user.email = email;
    if (password) user.password = password;

    // Salva as alterações
    await user.save();
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: "Erro Interno no servidor", message: error });
  }
};

// metodo que deleta
export const destroyUserByid = async (
  req: Request<{ id: string }>,
  res: Response
) => {
  try {
    const user = await UserModel.findByPk(req.params.id);

    if (!user) {
      return res.status(404).json({ error: "Usuario nao encontrado" });
    }

    await user.destroy();

    res.status(204).send();
  } catch (error) {
    res.status(500).json("erro interno servidor" + error);
  }
};
