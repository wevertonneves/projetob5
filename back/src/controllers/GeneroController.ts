import { Request, Response } from "express";
import GeneroModel from "../models/GenerosModel";

// Método para buscar todas as coleções
export const getAll = async (req: Request, res: Response) => {
  try {
    const generos = await GeneroModel.findAll(); // Busca todas as coleções no banco de dados
    res.json(generos); // Retorna as coleções em formato JSON
  } catch (error) {
    res.status(500).json({ message: "Erro ao buscar coleções", error });
  }
};
