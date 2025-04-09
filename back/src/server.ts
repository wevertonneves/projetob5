import express from "express";
import cors from "cors";
import userRoutes from "./routes/userRoutes";
import bookRoutes from "./routes/bookRoutes";
import collectionRoutes from "./routes/collectionRoutes";
import loginRoutes from "./routes/loginRoutes";

const app = express(); // 🔹 Instância do Express

app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());

// Rota principal
app.get("/", (req, res) => {
  res.send("✅ API rodando corretamente!");
});

// Rotas
app.use(userRoutes);
app.use(bookRoutes);
app.use(collectionRoutes);
app.use(loginRoutes);

export default app; // 🔹 Exporta o app para ser usado no index.ts
