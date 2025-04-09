import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";
import AuthorModel from "./AuthorModels";
import BookModel from "./FilmeModel";

class CollectionModel extends Model {
  id: number | undefined;
  name: string | undefined;
}

// Inicialização do modelo CollectionModel
CollectionModel.init(
  {
    id: {
      type: DataTypes.INTEGER, // Define o campo como um número inteiro
      autoIncrement: true, // O valor será incrementado automaticamente
      primaryKey: true, // Define como chave primária
    },
    name: {
      type: DataTypes.STRING, // Define o campo como string (texto)
      allowNull: false, // Não permite valores nulos
    },
  },
  {
    sequelize, // Usa a conexão com o banco de dados
    modelName: "CollectionModel", // Nome do modelo no Sequelize
    tableName: "collection", // Nome real da tabela no banco de dados
  }
);

// Definição do relacionamento muitos-para-muitos com AuthorModel
CollectionModel.belongsToMany(BookModel, {
  through: "collection_books", // Nome da tabela intermediária
  foreignKey: "collectionId", // Chave estrangeira referente a CollectionModel
  as: "books", // Nome do relacionamento (apelido)
});

// Definição do relacionamento muitos-para-muitos na outra direção
BookModel.belongsToMany(CollectionModel, {
  through: "collection_books", // Nome da tabela intermediária
  foreignKey: "bookId", // Chave estrangeira referente a AuthorModel
  as: "collections", // Nome do relacionamento (apelido)
});

// AuthorModel.hasMany(CollectionModel); // Isso não faz sentido em um relacionamento muitos-para-muitos

export default CollectionModel;
