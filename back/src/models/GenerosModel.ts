import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";
import FilmeModel from "./FilmeModel";

class GeneroModel extends Model {
  id: number | undefined;
  name: string | undefined;
}

// Inicialização do modelo CollectionModel
GeneroModel.init(
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
    modelName: "generoModel", // Nome do modelo no Sequelize
    tableName: "genero", // Nome real da tabela no banco de dados
  }
);

// Definição do relacionamento muitos-para-muitos com AuthorModel
GeneroModel.belongsToMany(FilmeModel, {
  through: "FilmeGenero", // Nome correto da tabela intermediária
  foreignKey: "generoId",
  as: "books",
});

FilmeModel.belongsToMany(GeneroModel, {
  through: "FilmeGenero",
  foreignKey: "FilmesId",
  as: "collections",
});

// AuthorModel.hasMany(CollectionModel); // Isso não faz sentido em um relacionamento muitos-para-muitos

export default GeneroModel;
