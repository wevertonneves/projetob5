import express from "express";
import { getAll, getFilmesPorGenero } from "../controllers/GeneroController";
import { authMiddleware } from "../middleware/authMiddleware";


const router = express.Router();

// Rota para buscar todos os gêneros
router.get("/genero", authMiddleware, getAll);

// Rota para buscar filmes de um gênero específico
router.get("/genero/:id", authMiddleware, getFilmesPorGenero);

export default router;
