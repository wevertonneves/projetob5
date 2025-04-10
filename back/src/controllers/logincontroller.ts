import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import UserModel from "../models/UserModel";

// 🔐 Chave secreta fixa apenas para testes (NÃO USAR EM PRODUÇÃO)
const SECRET_KEY = "meuSegredoSuperSeguro";

console.log("🔐 JWT_SECRET carregado (fixo):", SECRET_KEY);

// 📌 Função para gerar o token JWT
export const generateToken = (user: { id: number; email: string }) => {
  return jwt.sign({ id: user.id, email: user.email }, SECRET_KEY, {
    expiresIn: "2h",
  });
};

// 📌 Função para verificar o token JWT
export const verifyToken = (token: string) => {
  try {
    return jwt.verify(token, SECRET_KEY);
  } catch (error) {
    return null;
  }
};

// 📌 Função de login
export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  console.log("📥 Requisição de login recebida:");
  console.log("Email:", email);
  console.log("Senha:", password);

  if (!email || !password) {
    return res.status(400).json({ error: "Email e senha requeridos" });
  }

  try {
    const user = await UserModel.findOne({ where: { email } });
    console.log("🔍 Resultado da busca no banco:", user);

    if (!user) {
      return res.status(404).json({ error: "Usuário não encontrado" });
    }

    const isValidPassword = await user.validatePassword(password);
    console.log("🔐 Validação da senha:", isValidPassword);

    if (!isValidPassword) {
      return res.status(400).json({ error: "Email ou senha inválidos" });
    }

    const token = generateToken({ id: user.id, email: user.email });

    res.status(200).json({
      message: "✅ Login efetuado com sucesso",
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("💥 Erro inesperado no login:", error);
    res.status(500).json({
      error: "Erro interno no servidor",
      details: error,
    });
  }
};
