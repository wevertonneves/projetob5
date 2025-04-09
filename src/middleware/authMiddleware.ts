import { NextFunction, Request, Response } from "express";
import { verifyToken } from "../utils/jwt";

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.header("Authorization")?.replace("Bearer ", ""); // Corrigido para garantir espaço após "Bearer"

  if (!token) {
    return res.status(401).json({ error: "Acesso Negado" });
  }

  try {
    const decoded = verifyToken(token);
    if (!decoded) {
      return res.status(401).json({ error: "Token inválido" }); // Impede que tokens falsos sejam aceitos
    }

    (req as any).user = decoded; // Salva os dados do usuário no request
    next(); // Continua para a próxima rota
  } catch (error) {
    console.error("Erro ao verificar token:", error); // Mostra erro detalhado no terminal
    return res.status(401).json({ error: "Token inválido ou expirado" });
  }
};
