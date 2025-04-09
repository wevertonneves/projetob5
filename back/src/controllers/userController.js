"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.destroyUserByid = exports.updateUser = exports.createUser = exports.getUserByid = exports.getAll = void 0;
const UserModel_1 = __importDefault(require("../models/UserModel"));
//metodo que busca todos
const getAll = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield UserModel_1.default.findAll();
    res.send(users);
});
exports.getAll = getAll;
// metodo que busca por id
const getUserByid = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield UserModel_1.default.findByPk(req.params.id);
    return res.json(user);
});
exports.getUserByid = getUserByid;
//metodo que cria um novo usuario
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, password } = req.body;
        // Validação do campo 'name'
        if (!name) {
            return res.status(400).json({ error: "Campo 'name' é obrigatório." });
        }
        if (name.length < 3) {
            return res
                .status(400)
                .json({ error: "Campo 'name' deve ter pelo menos 3 caracteres." });
        }
        // Validação do campo 'email'
        if (!email) {
            return res.status(400).json({ error: "Campo 'email' é obrigatório." });
        }
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ error: "Email inválido." });
        }
        // Validação do campo 'password'
        if (!password) {
            return res.status(400).json({ error: "Campo 'password' é obrigatório." });
        }
        if (password.length < 6) {
            return res
                .status(400)
                .json({ error: "A senha deve ter pelo menos 6 caracteres." });
        }
        // Criação do usuário
        const user = yield UserModel_1.default.create({ name, email, password });
        res.status(201).json(user);
    }
    catch (error) {
        res.status(500).json({ error: "Erro Interno no servidor", message: error });
    }
});
exports.createUser = createUser;
// metodo que atualiza um usuario
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, password } = req.body;
        // Validação do campo 'name'
        if (name && name.length < 3) {
            return res
                .status(400)
                .json({ error: "Campo 'name' deve ter pelo menos 3 caracteres." });
        }
        // Validação do campo 'email'
        if (email) {
            const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
            if (!emailRegex.test(email)) {
                return res.status(400).json({ error: "Email inválido." });
            }
        }
        // Validação do campo 'password'
        if (password && password.length < 6) {
            return res
                .status(400)
                .json({ error: "A senha deve ter pelo menos 6 caracteres." });
        }
        // Busca o usuário a ser atualizado
        const user = yield UserModel_1.default.findByPk(req.params.id);
        if (!user) {
            return res.status(404).json({ error: "Usuário não encontrado." });
        }
        // Atualiza os campos, se fornecidos
        if (name)
            user.name = name;
        if (email)
            user.email = email;
        if (password)
            user.password = password;
        // Salva as alterações
        yield user.save();
        res.status(200).json(user);
    }
    catch (error) {
        res.status(500).json({ error: "Erro Interno no servidor", message: error });
    }
});
exports.updateUser = updateUser;
// metodo que deleta
const destroyUserByid = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield UserModel_1.default.findByPk(req.params.id);
        if (!user) {
            return res.status(404).json({ error: "Usuario nao encontrado" });
        }
        yield user.destroy();
        res.status(204).send();
    }
    catch (error) {
        res.status(500).json("erro interno servidor" + error);
    }
});
exports.destroyUserByid = destroyUserByid;
