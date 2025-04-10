import { Request, Response } from "express";
import UserModel from "../models/UserModel";
import { UniqueConstraintError } from "sequelize"; // Importando erro específico do Sequelize

// Método que busca todos os usuários
export const getAll = async (req: Request, res: Response) => {
  try {
    const users = await UserModel.findAll();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar usuários.", message: error instanceof Error ? error.message : error });
  }
};

// Método que busca usuário por ID
export const getUserByid = async (req: Request<{ id: string }>, res: Response) => {
  try {
    const user = await UserModel.findByPk(req.params.id);
    if (!user) {
      return res.status(404).json({ error: "Usuário não encontrado." });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar usuário.", message: error instanceof Error ? error.message : error });
  }
};

// Método que cria um novo usuário
export const createUser = async (req: Request, res: Response) => {
  try {
    let { name, email, password } = req.body;

    // Removendo espaços extras
    name = name?.trim();
    email = email?.trim();
    password = password?.trim();

    // Validação do campo 'name'
    if (!name || name.length < 3) {
      return res.status(400).json({ error: "Campo 'name' deve ter pelo menos 3 caracteres." });
    }

    // Validação do campo 'email'
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!email || !emailRegex.test(email)) {
      return res.status(400).json({ error: "Email inválido." });
    }

    // Validação do campo 'password'
    if (!password || password.length < 6) {
      return res.status(400).json({ error: "A senha deve ter pelo menos 6 caracteres." });
    }

    // Criando o usuário
    const user = await UserModel.create({ name, email, password });
    res.status(201).json(user);
  } catch (error) {
    if (error instanceof UniqueConstraintError) {
      return res.status(409).json({ error: "Este email já está cadastrado." });
    }
    res.status(500).json({ error: "Erro ao criar usuário.", message: error instanceof Error ? error.message : error });
  }
};

// Método que atualiza um usuário
export const updateUser = async (req: Request<{ id: string }>, res: Response) => {
  try {
    const { name, email, password } = req.body;

    // Busca o usuário antes de atualizar
    const user = await UserModel.findByPk(req.params.id);
    if (!user) {
      return res.status(404).json({ error: "Usuário não encontrado." });
    }

    // Atualiza os campos se forem fornecidos
    if (name?.trim() && name.length >= 3) user.name = name.trim();
    if (email?.trim()) {
      const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
      if (!emailRegex.test(email.trim())) {
        return res.status(400).json({ error: "Email inválido." });
      }
      user.email = email.trim();
    }
    if (password?.trim() && password.length >= 6) user.password = password.trim();

    // Salva as alterações
    await user.save();
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: "Erro ao atualizar usuário.", message: error instanceof Error ? error.message : error });
  }
};

// Método que deleta um usuário
export const destroyUserByid = async (req: Request<{ id: string }>, res: Response) => {
  try {
    const user = await UserModel.findByPk(req.params.id);
    if (!user) {
      return res.status(404).json({ error: "Usuário não encontrado." });
    }

    await user.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: "Erro ao deletar usuário.", message: error instanceof Error ? error.message : error });
  }
};

export const updatePassword = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Email e nova senha são obrigatórios." });
    }

    // Busca o usuário pelo email
    const user = await UserModel.findOne({ where: { email } });

    if (!user) {
      return res.status(404).json({ error: "Usuário não encontrado." });
    }

    // Validação da senha
    if (password.length < 6) {
      return res.status(400).json({ error: "A senha deve ter pelo menos 6 caracteres." });
    }

    // Atualiza a senha
    user.password = password.trim();
    await user.save();

    res.json({ success: true, message: "Senha alterada com sucesso!" });
  } catch (error) {
    res.status(500).json({ error: "Erro ao atualizar senha.", message: error instanceof Error ? error.message : error });
  }
};