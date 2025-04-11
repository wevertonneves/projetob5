import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

//validadores login e creação de usuaario

export function validateName(name: string) {
    if (!name || name.length < 3) {
      throw new Error("Campo 'name' deve ter pelo menos 3 caracteres.");
    }
  }
  
  export function validateEmail(email: string) {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!email || !emailRegex.test(email)) {
      throw new Error("Email inválido.");
    }
  }
  
  export function validatePassword(password: string) {
    if (!password || password.length < 6) {
      throw new Error("A senha deve ter pelo menos 6 caracteres.");
    }
  }
  
  export function validateCpf(cpf: string) {
    const cpfRegex = /^\d{11}$/;
    if (!cpf || !cpfRegex.test(cpf)) {
      throw new Error("CPF inválido. Deve conter 11 dígitos numéricos.");
    }
  }
  

//validadores filmecontroller
  export const validateFilmeId = (idParam: any): number => {
    const id = Number(idParam);
    if (isNaN(id) || id <= 0) throw new Error("ID inválido");
    return id;
  };


  //validadores gerenerocontroller
  export const validateId = (idParam: any): number => {
    const id = parseInt(idParam, 10);
    if (isNaN(id) || id <= 0) {
      throw new Error("ID inválido");
    }
    return id;
  };
  

  //VALIDAÇÕES RECUPERAR SENHA

  export const isEmailValido = (email: string): boolean => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };
  
  export const gerarCodigo = (): string => {
    return Math.floor(100000 + Math.random() * 900000).toString();
  };
  
  export const enviarEmail = async (email: string, codigo: string) => {
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
  };
  