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

    if (!name || !email || !password) {
      return res.status(400).json({ error: "Campo Obrigatorio" });
    }

    const user = await UserModel.create({ name, email, password });
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json("Erro Interno no servidor" + error);
  }
};

// metodo que atualiza um usuario
export const updateUser = async (
  req: Request<{ id: string }>,
  res: Response
) => {
  try {
    const { name } = req.body;

    if (!name || name === "") {
      return res.status(400).json({ error: "Nome Obrigatorio" });
    }

    const user = await UserModel.findByPk(req.params.id);
    if (!user) {
      return res.status(404).json({ error: "Usuario nao encontrado" });
    }

    user.name = name;

    await user.save();
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json("Erro Interno no servidor" + error);
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
