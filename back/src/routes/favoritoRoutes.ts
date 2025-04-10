import { Router } from "express";
import {
  adicionarFavorito,
  removerFavorito,
  listarFavoritos,
} from "../controllers/FavoritoController";

const router = Router();

router.post("/favoritos/adicionar", adicionarFavorito);
router.post("/favoritos/remover", removerFavorito);
router.get("/favoritos/:userId", listarFavoritos);

export default router;
