import express from "express";
import {
  getTodasColecoes,
  criarColecao,
} from "../controllers/ColecaoController";

const router = express.Router();

router.get("/colecoes", getTodasColecoes);
router.post("/colecoes", criarColecao);

export default router;
