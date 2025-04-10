import { Request, Response } from "express";
import FilmesModel from "../models/FilmesModel";
import GenerosModel from "../models/GenerosModel";

export const getFilmesByGenero = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id); // 🔹 Converte o ID para número

    if (isNaN(id)) {
      return res.status(400).json({ error: "ID inválido" });
    }

    const filmes = await FilmesModel.findAll({
      include: [
        {
          model: GenerosModel,
          as: "generos",
          where: { id },
          attributes: ["id", "name"],
        },
      ],
      attributes: [
        "id",
        "name",
        "releaseYear",
        "duration",
        "image",
        "videoUrl",
      ], // 🔹 Incluindo videoUrl
    });

    res.json(filmes);
  } catch (error) {
    console.error("Erro ao buscar filmes do gênero:", error);
    res.status(500).json({ error: "Erro ao buscar filmes do gênero" });
  }
};

export const getAll = async (req: Request, res: Response) => {
  try {
    const filmes = await FilmesModel.findAll();
    res.json(filmes);
  } catch (error) {
    console.error("Erro ao buscar todos os filmes:", error);
    res.status(500).json({ error: "Erro ao buscar filmes" });
  }
};
