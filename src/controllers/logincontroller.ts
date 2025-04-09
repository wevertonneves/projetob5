import { Request, Response } from "express";
import UserModel from "../models/UserModel";
import { generateToken } from "../utils/jwt";

export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email e senha requeridos" });
  }

  const user = await UserModel.findOne({ where: { email } });
  if (!user) {
    return res.status(404).json({ error: "Usuario nao encontrado" });
  }
  const isValidPassword = await user.validatePassword(password);
  if (!isValidPassword) {
    return res.status(400).json({ error: "email e senha invalidos" });
  }

  const token = generateToken(user);
  res.status(200).json({ message: "login efetuado com sucesso", token });
};
