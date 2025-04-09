import express from "express"; // O nome correto é "express" (minúsculo)
import sequelize from "./config/database";
import userRoutes from "./routes/userRoutes";
import bookRoutes from "./routes/bookRoutes";
import collectionRoutes from "./routes/collectionRoutes";
import loginRoutes from "./routes/loginRoutes";

const app = express(); // Corrigido: "Express" para "express"
const port = 3000; // Define a porta do servidor

// Rota principal
app.get("/", (req, res) => {
  res.send("Hello World");
});
app.use(express.json());
app.use(userRoutes);
app.use(bookRoutes);
app.use(collectionRoutes);
app.use(loginRoutes);

// Sincroniza o banco de dados e só depois inicia o servidor
sequelize
  .sync({ alter: true }) // Atualiza as tabelas conforme os modelos
  .then(() => {
    console.log("Banco de dados sincronizado!");
    app.listen(port, () => {
      console.log(`Servidor rodando na porta ${port}`);
    });
  })
  .catch((err) => {
    console.error("Erro ao sincronizar o banco de dados:", err);
  });
