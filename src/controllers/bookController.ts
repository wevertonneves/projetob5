import { Request, Response } from "express";
import BookModel from "../models/BookModel";

// Método para buscar todos os livros
export const getAll = async (req: Request, res: Response) => {
  try {
    const books = await BookModel.findAll();

    return res.status(200).json({
      success: true,
      message: "Livros encontrados com sucesso",
      data: books,
    });
  } catch (error) {
    console.error("Erro ao buscar livros:", error);

    return res.status(500).json({
      success: false,
      message: "Erro ao buscar livros",
      error: error instanceof Error ? error.message : "Erro desconhecido",
    });
  }
};
