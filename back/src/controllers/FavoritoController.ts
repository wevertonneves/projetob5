import { Request, Response } from "express";
import UserModel from "../models/UserModel";
import FilmesModel from "../models/FilmesModel";

// 🔹 Adiciona um filme aos favoritos do usuário
export const adicionarFavorito = async (req: Request, res: Response) => {
  const { userId, filmeId } = req.body;

  try {
    const usuario = await UserModel.findByPk(userId);
    const filme = await FilmesModel.findByPk(filmeId);

    if (!usuario || !filme) {
      return res
        .status(404)
        .json({ error: "Usuário ou filme não encontrado!" });
    }

    await usuario.addFavorito(filme); // ✅ Método correto
    res.status(200).json({ message: "Filme adicionado aos favoritos!" });
  } catch (error) {
    console.error("Erro ao adicionar favorito:", error);
    res.status(500).json({ error: "Erro interno ao adicionar favorito." });
  }
};

// 🔹 Remove um filme dos favoritos do usuário
export const removerFavorito = async (req: Request, res: Response) => {
  const { userId, filmeId } = req.body;

  try {
    const usuario = await UserModel.findByPk(userId);
    const filme = await FilmesModel.findByPk(filmeId);

    if (!usuario || !filme) {
      return res
        .status(404)
        .json({ error: "Usuário ou filme não encontrado!" });
    }

    await usuario.removeFavorito(filme); // ✅ Método correto
    res.status(200).json({ message: "Filme removido dos favoritos!" });
  } catch (error) {
    console.error("Erro ao remover favorito:", error);
    res.status(500).json({ error: "Erro interno ao remover favorito." });
  }
};

// 🔹 Lista todos os favoritos de um usuário
export const listarFavoritos = async (req: Request, res: Response) => {
  const { userId } = req.params;

  try {
    const usuario = await UserModel.findByPk(userId, {
      include: [{ model: FilmesModel, as: "favoritos" }],
    });

    if (!usuario) {
      return res.status(404).json({ error: "Usuário não encontrado!" });
    }

    res.status(200).json(usuario.favoritos);
  } catch (error) {
    console.error("Erro ao buscar favoritos:", error);
    res.status(500).json({ error: "Erro interno ao buscar favoritos." });
  }
};
