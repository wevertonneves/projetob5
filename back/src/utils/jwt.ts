import Jwt from "jsonwebtoken";
import UserModel from "../models/UserModel";

// Chave secreta carregada do ambiente ou um valor padrão
const JWT_SECRET = process.env.JWT_SECRET || "ss";
console.log("🔑 JWT_SECRET:", JWT_SECRET); // Log para verificar se a chave secreta está sendo carregada corretamente

const JWT_EXPIRES_IN = "7d";

// Função para gerar o token com os dados do usuário
export const generateToken = (user: UserModel): string => {
  return Jwt.sign(
    { id: user.id, email: user.email }, // Usando apenas id e email do usuário para criar o payload
    JWT_SECRET,
    { expiresIn: JWT_EXPIRES_IN } // Definindo o tempo de expiração do token
  );
};

// Função para verificar o token e retornar os dados decodificados
export const verifyToken = (
  token: string
): { id: number; email: string } | null => {
  try {
    // Verificando e decodificando o token
    const decoded = Jwt.verify(token, JWT_SECRET) as {
      id: number;
      email: string;
    };
    return decoded; // Retorna os dados do usuário decodificados se o token for válido
  } catch (error) {
    return null; // Retorna null se o token for inválido ou expirado
  }
};
