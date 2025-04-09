import express from "express";
import { getAll } from "../controllers/GeneroController";

const router = express.Router();

router.get("/genero", getAll);

export default router;
