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
exports.getAll = void 0;
const CollectionModel_1 = __importDefault(require("../models/CollectionModel"));
// Método para buscar todas as coleções
const getAll = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const collections = yield CollectionModel_1.default.findAll(); // Busca todas as coleções no banco de dados
        res.json(collections); // Retorna as coleções em formato JSON
    }
    catch (error) {
        res.status(500).json({ message: "Erro ao buscar coleções", error });
    }
});
exports.getAll = getAll;
