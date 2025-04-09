import express from "express";
import sequelize from "./config/database";
import userRoutes from "./routes/userRoutes";
import bookRoutes from "./routes/bookRoutes";
import collectionRoutes from "./routes/collectionRoutes";
import loginRoutes from "./routes/loginRoutes";
import cors from "cors";

const app = express(); // 🔹 Defina o app antes de usá-lo
const port = 3000; // Define a porta do servidor

app.use(cors({ origin: "http://localhost:5173" })); // 🔹 Agora está na posição correta
app.use(express.json());

// Rota principal
app.get("/", (req, res) => {
  res.send("Hello World");
});

// Rotas
app.use(userRoutes);
app.use(bookRoutes);
app.use(collectionRoutes);
app.use(loginRoutes);

// Sincroniza o banco de dados e inicia o servidor
sequelize
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
