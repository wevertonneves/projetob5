import { Request, Response } from "express";
import GeneroModel from "../models/GenerosModel";

export const getAll = async (req: Request, res: Response) => {
  try {
    const generos = await GeneroModel.findAll();
    res.json(generos);
  } catch (error) {
    res.status(500).json({ message: "Erro ao buscar gêneros", error });
  }
};
