import { Request, Response } from "express";
import GeneroModel from "../models/GenerosModel";
import FilmeModel from "../models/FilmesModel";

// 🔹 GET todos os gêneros
export const getAll = async (req: Request, res: Response) => {
  try {
    const generos = await GeneroModel.findAll();
    res.json(generos);
  } catch (error) {
    res.status(500).json({ message: "Erro ao buscar gêneros", error });
  }
};

// 🔹 GET filmes por gênero
export const getFilmesPorGenero = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id, 10);

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

    return res.json(genero.filmes);
  } catch (error) {
    console.error("Erro ao buscar filmes por gênero:", error);
    return res.status(500).json({ message: "Erro interno do servidor" });
  }
};

// 🔹 POST criar novo gênero
export const createGenero = async (req: Request, res: Response) => {
  try {
    const { name, image } = req.body;

    if (!name || typeof name !== "string") {
      return res.status(400).json({ message: "Nome do gênero é obrigatório" });
    }

    if (image && typeof image !== "string") {
      return res
        .status(400)
        .json({ message: "URL da imagem deve ser uma string" });
    }

    const novoGenero = await GeneroModel.create({ name, image });
    return res.status(201).json(novoGenero);
  } catch (error) {
    console.error("Erro ao criar gênero:", error);
    return res.status(500).json({ message: "Erro ao criar gênero", error });
  }
};
// 🔹 PUT atualizar gênero
export const updateGenero = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id, 10);
    const { name, image } = req.body;

    if (isNaN(id)) {
      return res.status(400).json({ message: "ID inválido" });
    }

    const genero = await GeneroModel.findByPk(id);

    if (!genero) {
      return res.status(404).json({ message: "Gênero não encontrado" });
    }

    if (!name || typeof name !== "string") {
      return res.status(400).json({ message: "Nome inválido" });
    }

    genero.name = name;

    // Atualiza imagem, se fornecida
    if (typeof image === "string") {
      genero.image = image;
    }

    await genero.save();

    return res
      .status(200)
      .json({ message: "Gênero atualizado com sucesso", genero });
  } catch (error) {
    console.error("Erro ao atualizar gênero:", error);
    return res.status(500).json({ message: "Erro ao atualizar gênero", error });
  }
};

// 🔹 DELETE gênero por ID
export const deleteGenero = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id, 10);

    if (isNaN(id)) {
      return res.status(400).json({ message: "ID inválido" });
    }

    const genero = await GeneroModel.findByPk(id);

    if (!genero) {
      return res.status(404).json({ message: "Gênero não encontrado" });
    }

    await genero.destroy();
    return res.status(200).json({ message: "Gênero deletado com sucesso" });
  } catch (error) {
    console.error("Erro ao deletar gênero:", error);
    return res.status(500).json({ message: "Erro ao deletar gênero", error });
  }
};
