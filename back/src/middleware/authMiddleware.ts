import { NextFunction, Request, Response } from "express";
import { verifyToken } from "../controllers/logincontroller";

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log("🔍 Middleware de autenticação chamado!");

  const token = req.header("Authorization")?.replace("Bearer ", "");
  console.log("🟢 Token recebido:", token);

  if (!token) {
    console.log("⛔ Nenhum token fornecido!");
    return res.status(401).json({ error: "Token não fornecido" });
  }

  try {
    const decoded = verifyToken(token);
    console.log("✅ Token decodificado:", decoded);

    if (!decoded) {
      console.log("⛔ Token inválido!");
      return res.status(401).json({ error: "Token inválido" });
    }

    (req as any).user = decoded; // Adiciona o usuário à requisição
    next(); // Continua para a próxima função
  } catch (error) {
    console.log("⛔ Erro ao verificar token:", error);
    return res.status(401).json({ error: "Token inválido" });
  }
};
