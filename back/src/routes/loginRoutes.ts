import express from "express";
import { loginUser } from "../controllers/logincontroller";

const router = express.Router();

// ROTAS DE LOGIN
router.post("/login", loginUser);

export default router;
