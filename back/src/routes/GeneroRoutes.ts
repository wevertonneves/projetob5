import express from "express";
import {
  getAll,
  getFilmesPorGenero,
  createGenero,
  updateGenero,
  deleteGenero,
} from "../controllers/GeneroController";
import { authMiddleware } from "../middleware/authMiddleware";

const router = express.Router();

// 🔹 Buscar todos os gêneros
router.get("/genero", authMiddleware, getAll);

// 🔹 Buscar filmes de um gênero específico
router.get("/genero/:id", authMiddleware, getFilmesPorGenero);

// 🔹 Criar novo gênero
router.post("/genero", authMiddleware, createGenero);

// 🔹 Atualizar um gênero
router.put("/genero/:id", authMiddleware, updateGenero);

// 🔹 Deletar um gênero
router.delete("/genero/:id", authMiddleware, deleteGenero);

export default router;
