import { Request, Response } from "express";
import GeneroModel from "../models/GenerosModel";
import FilmeModel from "../models/FilmesModel";

export const getAll = async (req: Request, res: Response) => {
  try {
    const generos = await GeneroModel.findAll();
    res.json(generos);
  } catch (error) {
    res.status(500).json({ message: "Erro ao buscar gêneros", error });
  }
};

export const getFilmesPorGenero = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id, 10); // 🔹 Converte o ID para número

    if (isNaN(id)) {
      return res.status(400).json({ message: "ID de gênero inválido" });
    }

    const genero = await GeneroModel.findByPk(id, {
      include: [
        {
          model: FilmeModel,
          as: "filmes",
          through: { attributes: [] },
        },
      ],
    });

    if (!genero) {
      return res.status(404).json({ message: "Gênero não encontrado" });
    }

    return res.json(genero.filmes); // 🔹 Mais limpo e seguro que getDataValue
  } catch (error) {
    console.error("Erro ao buscar filmes por gênero:", error);
    return res.status(500).json({ message: "Erro interno do servidor" });
  }
};
