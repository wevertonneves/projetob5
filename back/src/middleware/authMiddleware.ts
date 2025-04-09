import { NextFunction, Request, Response } from "express";
import { verifyToken } from "../utils/jwt";

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
    return res.status(401).json({ error: "Acesso Negado" });
  }

  try {
    const decoded = verifyToken(token);
    console.log("✅ Token decodificado:", decoded);

    if (!decoded) {
      console.log("⛔ Token inválido!");
      return res.status(401).json({ error: "Token inválido" });
    }

    (req as any).user = decoded;
    next();
  } catch (error) {
    console.log("⛔ Erro ao verificar token:", error);
    return res.status(401).json({ error: "Token inválido ou expirado" });
  }
};
