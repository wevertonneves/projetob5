import express from "express";
import {
  getAll,
  getUserByid,
  createUser,
  updateUser,
  updatePassword ,
  destroyUserByid,
} from "../controllers/userController";

import { authMiddleware } from "../middleware/authMiddleware";

const router = express.Router();

router.post("/users", createUser);
router.get("/users", authMiddleware, getAll);
router.get("/users/:id", getUserByid);
router.put("/users/:id", updateUser);
router.delete("/users/:id", destroyUserByid);
router.post("/nova-senha", updatePassword);

export default router;
