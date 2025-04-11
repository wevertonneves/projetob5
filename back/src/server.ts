import express from "express";
import cors from "cors";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import userRoutes from "./routes/userRoutes";
import FilmesRoutes from "./routes/FilmesRoutes";
import GeneroRoutes from "./routes/GeneroRoutes";
import loginRoutes from "./routes/loginRoutes";
import favoritoRoutes from "./routes/favoritoRoutes";
import UserModel from "./models/UserModel";
import recuperarSenhaRoutes from "./routes/recuperarSenhaRoutes";
import { setupAssociations } from "./models/associations";

dotenv.config();

const app = express();
app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());

console.log("🚀 Servidor iniciando...");

// 🔄 Configura associações
setupAssociations();

// (Opcional) Sincroniza o banco – apenas se quiser garantir tabelas criadas
// sequelize.sync({ alter: true }).then(() => {
//   console.log("✅ Banco de dados sincronizado.");
// });

// 🔍 Validação de e-mail
const validarEmail = (email: string): boolean => {
  const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regexEmail.test(email);
};

// ✅ Rota principal
app.get("/", (req, res) => {
  console.log("✅ API online!");
  res.send("✅ API rodando corretamente!");
});

// 🛣️ Rotas principais
app.use(userRoutes);
app.use(FilmesRoutes);
app.use(GeneroRoutes);
app.use(loginRoutes);
app.use(favoritoRoutes);
app.use("/", recuperarSenhaRoutes);


// 🧠 Armazena códigos temporários para recuperação de senha
const codigosRecuperacao: {
  [key: string]: { codigo: string; expira: number };
} = {};

// 📩 Rota: Enviar código de recuperação
app.post("/recuperar-senha", async (req, res) => {
  const { email } = req.body;
  console.log(`📩 Tentativa de recuperação para: ${email}`);

  if (!email || !validarEmail(email)) {
    return res.status(400).json({ error: "Email inválido ou não informado" });
  }

  try {
    const user = await UserModel.findOne({ where: { email } });

    if (!user) {
      return res.status(404).json({ error: "Email não cadastrado!" });
    }

    const codigo = Math.floor(100000 + Math.random() * 900000).toString();
    const expira = Date.now() + 10 * 60 * 1000;
    codigosRecuperacao[email] = { codigo, expira };

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Recuperação de Senha - GAMBYFLIX",
      text: `Seu código de recuperação é: ${codigo}\n\nEle expira em 10 minutos.`,
    };

    await transporter.sendMail(mailOptions);
    res.json({ message: "Código de recuperação enviado ao e-mail." });
  } catch (error) {
    console.error("Erro ao enviar e-mail:", error);
    res.status(500).json({ error: "Erro ao enviar e-mail" });
  }
});

// ✅ Rota: Validar código de recuperação
app.post("/validar-codigo", (req, res) => {
  const { email, codigoRecebido } = req.body;
  const info = codigosRecuperacao[email];

  if (!info || Date.now() > info.expira) {
    delete codigosRecuperacao[email];
    return res.status(400).json({ error: "Código expirado ou inválido!" });
  }

  if (info.codigo !== codigoRecebido) {
    return res.status(400).json({ error: "Código inválido!" });
  }

  res.json({ message: "Código validado com sucesso!" });
});

// 🔐 Rota: Alterar senha
app.post("/nova-senha", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .json({ error: "Email e nova senha são obrigatórios" });
  }

  try {
    const user = await UserModel.findOne({ where: { email } });

    if (!user) {
      return res.status(404).json({ error: "Usuário não encontrado!" });
    }

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
    await user.save();

    delete codigosRecuperacao[email];
    res.json({ message: "Senha alterada com sucesso!" });
  } catch (error) {
    console.error("Erro ao atualizar senha:", error);
    res.status(500).json({ error: "Erro ao atualizar senha" });
  }
});

export default app;
