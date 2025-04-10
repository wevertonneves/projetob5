// routes/recuperarSenhaRoutes.ts
import express from "express";
import {
  recuperarSenha,
  validarCodigo,
} from "../controllers/recuperarSenhaController";

const router = express.Router();

router.post("/recuperar-senha", recuperarSenha);
router.post("/validar-codigo", validarCodigo);

export default router;
