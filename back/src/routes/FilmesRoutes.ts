import express from "express";
import {
  getAll,
  getFilmeById,
  deleteFilme,
  addFilme,
  updateFilme,
} from "../controllers/FilmesController";
import { authMiddleware } from "../middleware/authMiddleware";

const router = express.Router();

router.get("/filmes", authMiddleware, getAll);              
router.get("/filmes/:id", authMiddleware, getFilmeById);    
router.delete("/filmes/:id", authMiddleware, deleteFilme); 
router.post("/filmes", authMiddleware, addFilme); 
router.put("/filmes/:id", updateFilme);


export default router;
