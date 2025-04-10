import { Request, Response } from "express";
import ColecaoModel from "../models/ColecaoModel";

export const getTodasColecoes = async (req: Request, res: Response) => {
  try {
    const colecoes = await ColecaoModel.findAll();
    res.json(colecoes);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar coleções" });
  }
};

export const criarColecao = async (req: Request, res: Response) => {
  try {
    const { name } = req.body;
    const novaColecao = await ColecaoModel.create({ name });
    res.status(201).json(novaColecao);
  } catch (error) {
    res.status(500).json({ error: "Erro ao criar coleção" });
  }
};
