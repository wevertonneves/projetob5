import { Request, Response } from "express";
import FilmesModel from "../models/FilmesModel";
import GenerosModel from "../models/GenerosModel";
import { Op } from "sequelize";

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
        "sinopse", // adicionado
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
          through: { attributes: [] },
        },
      ],
      attributes: [
        "id",
        "name",
        "releaseYear",
        "duration",
        "image",
        "videoUrl",
        "sinopse", // adicionado
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
        "sinopse", // adicionado
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
    const { name, year, duration, imageUrl, videoUrl, sinopse, genres } = req.body;

    if (
      !name ||
      !year ||
      !duration ||
      !imageUrl ||
      !videoUrl ||
      !sinopse ||
      !genres ||
      genres.length === 0
    ) {
      return res.status(400).json({
        error: "Todos os campos são obrigatórios, incluindo o(s) gênero(s) e a sinopse.",
      });
    }

    const novoFilme = await FilmesModel.create({
      name,
      releaseYear: year,
      duration,
      image: imageUrl,
      videoUrl,
      sinopse,
    });

    await novoFilme.setGeneros(genres);

    res.status(201).json(novoFilme);
  } catch (error) {
    console.error("Erro ao adicionar filme:", error);
    res.status(500).json({ error: "Erro ao adicionar filme." });
  }
};

export const updateFilme = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const { name, year, duration, imageUrl, videoUrl, sinopse, genres } = req.body;

    if (isNaN(id)) {
      return res.status(400).json({ error: "ID inválido" });
    }

    if (
      !name ||
      !year ||
      !duration ||
      !imageUrl ||
      !videoUrl ||
      !sinopse ||
      !genres ||
      genres.length === 0
    ) {
      return res.status(400).json({
        error: "Todos os campos são obrigatórios, incluindo o(s) gênero(s) e a sinopse.",
      });
    }

    const filme = await FilmesModel.findByPk(id);

    if (!filme) {
      return res.status(404).json({ error: "Filme não encontrado" });
    }

    await filme.update({
      name,
      releaseYear: year,
      duration,
      image: imageUrl,
      videoUrl,
      sinopse,
    });

    await filme.setGeneros(genres);

    res.json({ message: "Filme atualizado com sucesso", filme });
  } catch (error) {
    console.error("Erro ao atualizar filme:", error);
    res.status(500).json({ error: "Erro ao atualizar filme." });
  }
};

export const searchFilmeByName = async (req: Request, res: Response) => {
  try {
    const { nome } = req.query;

    if (!nome || typeof nome !== "string") {
      return res.status(400).json({ error: "Nome do filme é obrigatório" });
    }

    const filme = await FilmesModel.findOne({
      where: {
        name: {
          [Op.like]: `%${nome}%`, // ✅ Funciona com MySQL
         // ou [Op.like] se não estiver usando PostgreSQL
        },
      },
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
        "sinopse",
      ],
    });

    if (!filme) {
      return res.status(404).json({ error: "Filme não encontrado" });
    }

    res.json(filme);
  } catch (error) {
    console.error("Erro ao buscar filme por nome:", error);
    res.status(500).json({ error: "Erro ao buscar filme por nome" });
  }
};
