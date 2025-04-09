import express from "express";
import { getAll } from "../controllers/FilmeController";

const router = express.Router();

router.get("/filmes", getAll);

export default router;
