import express from "express";
import { getAll } from "../controllers/bookController";

const router = express.Router();

router.get("/book", getAll);

export default router;
