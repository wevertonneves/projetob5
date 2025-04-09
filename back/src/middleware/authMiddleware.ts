import { NextFunction, Request, Response } from "express";
import { verifyToken } from "../controllers/AuthController";

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log("🔍 Middleware de autenticação chamado!");

  const token = req.header("Authorization")?.replace("Bearer ", "");
  console.log("🟢 Token recebido:", token);

  if (!token) {
    console.log("🔓 Nenhum token fornecido, permitindo acesso.");
    return next(); // Permite o acesso sem autenticação
  }

  try {
    const decoded = verifyToken(token);
    console.log("✅ Token decodificado:", decoded);

    if (!decoded) {
      console.log("⛔ Token inválido!");
      return res.status(401).json({ error: "Token inválido" });
    }

    (req as any).user = decoded; // Adiciona o usuário à requisição
  } catch (error) {
    console.log("⛔ Erro ao verificar token, mas permitindo acesso:", error);
  }

  next();
};
