import sequelize from "./config/database";
import app from "./server"; // 🔹 Importa o app do server.ts

const port = 3000;

// Sincroniza o banco de dados e inicia o servidor
sequelize
  .sync({ alter: true })
  .then(() => {
    console.log("✅ Banco de dados sincronizado!");
    app.listen(port, () => {
      console.log(`🚀 Servidor rodando na porta ${port}`);
    });
  })
  .catch((err) => {
    console.error("❌ Erro ao sincronizar o banco de dados:", err);
  });
