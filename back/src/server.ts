import express from "express";
import cors from "cors";
import userRoutes from "./routes/userRoutes";
import FilmesRoutes from "./routes/FilmesRoutes";
import GeneroRoutes from "./routes/GeneroRoutes";
import loginRoutes from "./routes/loginRoutes";
import colecaoRoutes from "./routes/colecaoRoutes";

const app = express(); // 🔹 Instância do Express

app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());

// Rota principal
app.get("/", (req, res) => {
  res.send("✅ API rodando corretamente!");
});

// Rotas
app.use(userRoutes);
app.use(FilmesRoutes);
app.use(GeneroRoutes);
app.use(loginRoutes);
app.use(colecaoRoutes);
export default app; // 🔹 Exporta o app para ser usado no index.ts
