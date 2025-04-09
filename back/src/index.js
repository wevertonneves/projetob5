"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const database_1 = __importDefault(require("./config/database"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const bookRoutes_1 = __importDefault(require("./routes/bookRoutes"));
const collectionRoutes_1 = __importDefault(require("./routes/collectionRoutes"));
const loginRoutes_1 = __importDefault(require("./routes/loginRoutes"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)(); // 🔹 Defina o app antes de usá-lo
const port = 3000; // Define a porta do servidor
app.use((0, cors_1.default)({ origin: "http://localhost:5173" })); // 🔹 Agora está na posição correta
app.use(express_1.default.json());
// Rota principal
app.get("/", (req, res) => {
    res.send("Hello World");
});
// Rotas
app.use(userRoutes_1.default);
app.use(bookRoutes_1.default);
app.use(collectionRoutes_1.default);
app.use(loginRoutes_1.default);
// Sincroniza o banco de dados e inicia o servidor
database_1.default
    .sync({ alter: true })
    .then(() => {
    console.log("Banco de dados sincronizado!");
    app.listen(port, () => {
        console.log(`Servidor rodando na porta ${port}`);
    });
})
    .catch((err) => {
    console.error("Erro ao sincronizar o banco de dados:");
});
