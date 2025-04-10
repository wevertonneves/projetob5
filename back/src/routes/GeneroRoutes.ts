import express from "express";
import { getAll, getFilmesPorGenero } from "../controllers/GeneroController";

const router = express.Router();

// Rota para buscar todos os gêneros
router.get("/genero", getAll);

// Rota para buscar filmes de um gênero específico
router.get("/genero/:id", getFilmesPorGenero);

export default router;
