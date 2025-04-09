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

router.post("/users", createUser);
router.get("/users", getAll);
router.get("/users/:id", authMiddleware, getUserByid);
router.put("/users/:id", authMiddleware, updateUser);
router.delete("/users/:id", authMiddleware, destroyUserByid);

export default router;
