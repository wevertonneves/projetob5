import { Request, Response } from "express";
import BookModel from "../models/FilmeModel";

// Método para buscar todos os livros
export const getAll = async (req: Request, res: Response) => {
  try {
    const books = await BookModel.findAll();

    return res.status(200).json({
      success: true,
      message: "Filmes encontrados com sucesso",
      data: books,
    });
  } catch (error) {
    console.error("Erro ao buscar Filmes:", error);

    return res.status(500).json({
      success: false,
      message: "Erro ao buscar Filmes",
      error: error instanceof Error ? error.message : "Erro desconhecido",
    });
  }
};
