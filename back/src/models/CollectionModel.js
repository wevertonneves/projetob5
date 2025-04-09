"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../config/database"));
const BookModel_1 = __importDefault(require("./BookModel"));
class CollectionModel extends sequelize_1.Model {
}
// Inicialização do modelo CollectionModel
CollectionModel.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER, // Define o campo como um número inteiro
        autoIncrement: true, // O valor será incrementado automaticamente
        primaryKey: true, // Define como chave primária
    },
    name: {
        type: sequelize_1.DataTypes.STRING, // Define o campo como string (texto)
        allowNull: false, // Não permite valores nulos
    },
}, {
    sequelize: database_1.default, // Usa a conexão com o banco de dados
    modelName: "CollectionModel", // Nome do modelo no Sequelize
    tableName: "collection", // Nome real da tabela no banco de dados
});
// Definição do relacionamento muitos-para-muitos com AuthorModel
CollectionModel.belongsToMany(BookModel_1.default, {
    through: "collection_books", // Nome da tabela intermediária
    foreignKey: "collectionId", // Chave estrangeira referente a CollectionModel
    as: "books", // Nome do relacionamento (apelido)
});
// Definição do relacionamento muitos-para-muitos na outra direção
BookModel_1.default.belongsToMany(CollectionModel, {
    through: "collection_books", // Nome da tabela intermediária
    foreignKey: "bookId", // Chave estrangeira referente a AuthorModel
    as: "collections", // Nome do relacionamento (apelido)
});
// AuthorModel.hasMany(CollectionModel); // Isso não faz sentido em um relacionamento muitos-para-muitos
exports.default = CollectionModel;
