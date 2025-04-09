import express from "express";
import {
  getAll,
  getUserByid,
  createUser,
  updateUser,
  destroyUserByid,
} from "../controllers/userController";

import { authMiddleware } from "../middleware/authMiddleware";

const router = express.Router();

// ROTAS DE LOGIN
//rota publica
router.post("/users", createUser);

router.get("/users", authMiddleware, getAll);
router.get("/users/:id", getUserByid);
router.put("/users/:id", updateUser);
router.delete("/users/:id", destroyUserByid);

export default router;
