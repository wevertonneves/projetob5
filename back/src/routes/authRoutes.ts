import express from "express";
import { loginUser } from "../controllers/AuthController";

const router = express.Router();

router.post("/login", loginUser); // Endpoint para login

export default router;
