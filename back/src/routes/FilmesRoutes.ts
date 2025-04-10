import express from "express";
import {
  getAll,
  getFilmeById,
  deleteFilme,
  addFilme,
} from "../controllers/FilmesController";

const router = express.Router();

router.get("/filmes", getAll);
router.get("/filmes/:id", getFilmeById);
router.delete("/filmes/:id", deleteFilme);
router.post("/filmes", addFilme);

export default router;
