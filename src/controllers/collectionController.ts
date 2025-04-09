import { Request, Response } from "express";
import CollectionModel from "../models/CollectionModel";

// Método para buscar todas as coleções
export const getAll = async (req: Request, res: Response) => {
  try {
    const collections = await CollectionModel.findAll(); // Busca todas as coleções no banco de dados
    res.json(collections); // Retorna as coleções em formato JSON
  } catch (error) {
    res.status(500).json({ message: "Erro ao buscar coleções", error });
  }
};
