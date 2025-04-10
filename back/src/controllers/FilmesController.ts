import { Request, Response } from "express";
import FilmesModel from "../models/FilmesModel";
import GenerosModel from "../models/GenerosModel";

export const getFilmesByGenero = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);

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
      ],
    });

    res.json(filmes);
  } catch (error) {
    console.error("Erro ao buscar filmes do gênero:", error);
    res.status(500).json({ error: "Erro ao buscar filmes do gênero" });
  }
};

export const getAll = async (req: Request, res: Response) => {
  try {
    const filmes = await FilmesModel.findAll({
      include: [
        {
          model: GenerosModel,
          as: "generos",
          attributes: ["id", "name"],
          through: { attributes: [] }, // opcional: não mostrar dados da tabela intermediária
        },
      ],
    });
    res.json(filmes);
  } catch (error) {
    console.error("Erro ao buscar todos os filmes:", error);
    res.status(500).json({ error: "Erro ao buscar filmes" });
  }
};

export const getFilmeById = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);

    if (isNaN(id)) {
      return res.status(400).json({ error: "ID inválido" });
    }

    const filme = await FilmesModel.findByPk(id, {
      include: [
        {
          model: GenerosModel,
          as: "generos",
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
      ],
    });

    if (!filme) {
      return res.status(404).json({ error: "Filme não encontrado" });
    }

    res.json(filme);
  } catch (error) {
    console.error("Erro ao buscar filme por ID:", error);
    res.status(500).json({ error: "Erro ao buscar filme por ID" });
  }
};

export const deleteFilme = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);

    if (isNaN(id)) {
      return res.status(400).json({ error: "ID inválido" });
    }

    const filme = await FilmesModel.findByPk(id);

    if (!filme) {
      return res.status(404).json({ error: "Filme não encontrado" });
    }

    await filme.destroy();

    res.json({ message: "Filme deletado com sucesso" });
  } catch (error) {
    console.error("Erro ao deletar filme:", error);
    res.status(500).json({ error: "Erro ao deletar filme" });
  }
};

export const addFilme = async (req: Request, res: Response) => {
  try {
    const { name, year, duration, imageUrl, videoUrl, genres } = req.body;

    if (
      !name ||
      !year ||
      !duration ||
      !imageUrl ||
      !videoUrl ||
      !genres ||
      genres.length === 0
    ) {
      return res
        .status(400)
        .json({
          error: "Todos os campos são obrigatórios, incluindo o(s) gênero(s).",
        });
    }

    // Cria o filme
    const novoFilme = await FilmesModel.create({
      name,
      releaseYear: year,
      duration,
      image: imageUrl,
      videoUrl,
    });

    // Associa os gêneros (tabela FilmeGenero será populada automaticamente)
    await novoFilme.setGeneros(genres); // genres deve ser um array de IDs

    res.status(201).json(novoFilme);
  } catch (error) {
    console.error("Erro ao adicionar filme:", error);
    res.status(500).json({ error: "Erro ao adicionar filme." });
  }
};
