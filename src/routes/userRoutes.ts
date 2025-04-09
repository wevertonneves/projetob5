import express from "express";
import {
  getAll,
  getUserByid,
  createUser,
  updateUser,
  destroyUserByid,
} from "../controllers/userController";

const router = express.Router();

// ROTAS DE LOGIN
router.get("/users", getAll);
router.get("/users/:id", getUserByid);
router.post("/users", createUser);
router.put("/users/:id", updateUser);
router.delete("/users/:id", destroyUserByid);

export default router;
