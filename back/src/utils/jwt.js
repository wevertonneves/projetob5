"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = exports.generateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// Chave secreta carregada do ambiente ou um valor padrão
const JWT_SECRET = process.env.JWT_SECRET || "ss";
console.log("🔑 JWT_SECRET:", JWT_SECRET); // Log para verificar se a chave secreta está sendo carregada corretamente
const JWT_EXPIRES_IN = "7d";
// Função para gerar o token com os dados do usuário
const generateToken = (user) => {
    return jsonwebtoken_1.default.sign({ id: user.id, email: user.email }, // Usando apenas id e email do usuário para criar o payload
    JWT_SECRET, { expiresIn: JWT_EXPIRES_IN } // Definindo o tempo de expiração do token
    );
};
exports.generateToken = generateToken;
// Função para verificar o token e retornar os dados decodificados
const verifyToken = (token) => {
    try {
        // Verificando e decodificando o token
        const decoded = jsonwebtoken_1.default.verify(token, JWT_SECRET);
        return decoded; // Retorna os dados do usuário decodificados se o token for válido
    }
    catch (error) {
        return null; // Retorna null se o token for inválido ou expirado
    }
};
exports.verifyToken = verifyToken;
