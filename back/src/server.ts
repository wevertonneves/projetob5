import express from "express";
import cors from "cors";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import userRoutes from "./routes/userRoutes";
import FilmesRoutes from "./routes/FilmesRoutes";
import GeneroRoutes from "./routes/GeneroRoutes";
import loginRoutes from "./routes/loginRoutes";
import colecaoRoutes from "./routes/colecaoRoutes";
import UserModel from "./models/UserModel"; // Importa o modelo de usuário

dotenv.config();

const app = express();
app.use(cors({ origin: "http://localhost:5173" })); // Ajuste a origem do frontend se necessário
app.use(express.json());

console.log("🚀 Servidor iniciando...");

// 🔹 Função para validar o formato do e-mail
const validarEmail = (email: string): boolean => {
  const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regexEmail.test(email);
};

// 🔹 Rota principal
app.get("/", (req, res) => {
  console.log("✅ API online!");
  res.send("✅ API rodando corretamente!");
});

// 🔹 Rotas principais
app.use(userRoutes);
app.use(FilmesRoutes);
app.use(GeneroRoutes);
app.use(loginRoutes);
app.use(colecaoRoutes);

// 🔹 Armazena códigos de recuperação temporariamente
const codigosRecuperacao: { [key: string]: { codigo: string; expira: number } } = {};

// 🔹 Rota para enviar código de recuperação
app.post("/recuperar-senha", async (req, res) => {
  const { email } = req.body;
  console.log(`📩 Tentativa de recuperação para: ${email}`);

  if (!email) {
    console.log("❌ Erro: Nenhum email foi informado!");
    return res.status(400).json({ error: "Email é obrigatório" });
  }

  if (!validarEmail(email)) {
    console.log("❌ Erro: Formato de e-mail inválido!");
    return res.status(400).json({ error: "Formato de e-mail inválido!" });
  }

  try {
    // 🔍 Verifica se o e-mail existe no banco de dados
    const user = await UserModel.findOne({ where: { email } });

    console.log("🔎 Usuário encontrado:", user ? user.email : "Nenhum usuário encontrado");

    if (!user) {
      console.log(`❌ Erro: Nenhum usuário encontrado para o email: ${email}`);
      return res.status(404).json({ error: "Email não cadastrado!" });
    }

    // 🔹 Gera um código de recuperação aleatório com validade de 10 minutos
    const codigoRecuperacao = Math.floor(100000 + Math.random() * 900000).toString();
    const expira = Date.now() + 10 * 60 * 1000; // Expira em 10 minutos

    codigosRecuperacao[email] = { codigo: codigoRecuperacao, expira };

    console.log(`🔑 Código gerado para ${email}: ${codigoRecuperacao} (expira em 10 min)`);

    // 🔹 Configura o serviço de e-mail
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
      text: `Seu código de recuperação de senha é: ${codigoRecuperacao}\n\nO código expira em 10 minutos.`,
    };

    await transporter.sendMail(mailOptions);
    console.log(`📤 E-mail enviado para ${email}!`);

    res.json({ message: "Código de recuperação enviado para o e-mail" });
  } catch (error) {
    console.error("❌ Erro ao enviar e-mail:", error);
    res.status(500).json({ error: "Erro ao enviar e-mail" });
  }
});

// 🔹 Rota para validar o código de recuperação
app.post("/validar-codigo", (req, res) => {
  const { email, codigoRecebido } = req.body;
  console.log(`🔍 Validando código para ${email}`);

  if (!email || !codigoRecebido) {
    console.log("❌ Falha na validação: Email ou código não informado!");
    return res.status(400).json({ error: "Email e código são obrigatórios" });
  }

  const codigoInfo = codigosRecuperacao[email];

  if (!codigoInfo) {
    console.log("❌ Nenhum código foi gerado para esse email!");
    return res.status(400).json({ error: "Código inválido ou expirado!" });
  }

  const { codigo, expira } = codigoInfo;

  if (Date.now() > expira) {
    console.log("❌ Código expirado!");
    delete codigosRecuperacao[email];
    return res.status(400).json({ error: "Código expirado! Solicite um novo." });
  }

  if (codigo !== codigoRecebido) {
    console.log("❌ Código incorreto!");
    return res.status(400).json({ error: "Código inválido!" });
  }

  console.log("✅ Código validado com sucesso!");
  res.json({ message: "Código validado com sucesso!" });
});

// 🔹 Rota para redefinir a senha
app.post("/nova-senha", async (req, res) => {
  const { email, password } = req.body;
  console.log(`🔐 Tentativa de alteração de senha para ${email}`);

  if (!email || !password) {
    console.log("❌ Erro: Email ou nova senha não informados!");
    return res.status(400).json({ error: "Email e nova senha são obrigatórios" });
  }

  try {
    const user = await UserModel.findOne({ where: { email } });

    if (!user) {
      console.log("❌ Erro: Usuário não encontrado!");
      return res.status(404).json({ error: "Usuário não encontrado!" });
    }

    // 🔹 Criptografar a nova senha antes de salvar
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    await user.save();
    delete codigosRecuperacao[email];

    console.log("✅ Senha alterada com sucesso!");
    res.json({ message: "Senha alterada com sucesso!" });
  } catch (error) {
    console.error("❌ Erro ao atualizar senha:", error);
    res.status(500).json({ error: "Erro ao atualizar senha", message: error });
  }
});

export default app;
