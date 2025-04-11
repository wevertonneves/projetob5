import { Request, Response } from "express";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

// Salvar os códigos gerados em memória (ou no banco depois)
const codigosPorEmail: Record<string, string> = {};

export const recuperarSenha = async (req: Request, res: Response) => {
  const { email } = req.body;
  const codigo = Math.floor(100000 + Math.random() * 900000).toString(); // Gera um código de 6 dígitos
  codigosPorEmail[email] = codigo;

  // Configuração do transporte com variáveis de ambiente
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
    subject: "Recuperação de Senha - SeuApp",
    text: `Seu código de recuperação é: ${codigo}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`✅ Código enviado para ${email}: ${codigo}`);
    res.json({ message: "Código enviado para seu email." });
  } catch (error) {
    console.error("❌ Erro ao enviar e-mail:", error);
    res.status(500).json({ message: "Erro ao enviar e-mail." });
  }
};

export const validarCodigo = (req: Request, res: Response) => {
  const { email, codigoRecebido } = req.body;

  if (codigosPorEmail[email] === codigoRecebido) {
    delete codigosPorEmail[email]; // Invalida o código
    return res.json({
      message: "Código válido. Continue para redefinir sua senha.",
    });
  }

  res.status(400).json({ message: "Código inválido." });
};
