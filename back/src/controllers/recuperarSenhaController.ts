// controllers/recuperarSenhaController.ts
import nodemailer from "nodemailer";
import { Request, Response } from "express";

// Salvar os códigos gerados em memória (ou no banco depois)
const codigosPorEmail: Record<string, string> = {};

export const recuperarSenha = async (req: Request, res: Response) => {
  const { email } = req.body;
  const codigo = Math.floor(100000 + Math.random() * 900000).toString(); // Gera um código de 6 dígitos
  codigosPorEmail[email] = codigo;

  // Configuração do transporte
  const transporter = nodemailer.createTransport({
    service: "gmail", // ou outro provedor (ex: Outlook, Yahoo)
    auth: {
      user: "wtnn2010@gmail.com",
      pass: "dszkfyxqjkwfadmi",
    },
  });

  const mailOptions = {
    from: "wtnn2010@gmail.com",
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
