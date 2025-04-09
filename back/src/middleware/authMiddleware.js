"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
const jwt_1 = require("../utils/jwt");
const authMiddleware = (req, res, next) => {
    var _a;
    console.log("🔍 Middleware de autenticação chamado!");
    const token = (_a = req.header("Authorization")) === null || _a === void 0 ? void 0 : _a.replace("Bearer ", "");
    console.log("🟢 Token recebido:", token);
    if (!token) {
        console.log("⛔ Nenhum token fornecido!");
        return res.status(401).json({ error: "Acesso Negado" });
    }
    try {
        const decoded = (0, jwt_1.verifyToken)(token);
        console.log("✅ Token decodificado:", decoded);
        if (!decoded) {
            console.log("⛔ Token inválido!");
            return res.status(401).json({ error: "Token inválido" });
        }
        req.user = decoded;
        next();
    }
    catch (error) {
        console.log("⛔ Erro ao verificar token:", error);
        return res.status(401).json({ error: "Token inválido ou expirado" });
    }
};
exports.authMiddleware = authMiddleware;
