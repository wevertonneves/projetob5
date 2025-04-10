import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";
import FilmeModel from "./FilmeModel";

class GeneroModel extends Model {
  id: number | undefined;
  name: string | undefined;
  image: string | undefined; // 🔹 Adicionando campo para imagem
}

GeneroModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING, // 🔹 Campo para armazenar a URL da imagem
      allowNull: true, // Pode ser nulo caso não tenha imagem
    },
  },
  {
    sequelize,
    modelName: "generoModel",
    tableName: "genero",
  }
);

// Relacionamento muitos-para-muitos com FilmeModel
GeneroModel.belongsToMany(FilmeModel, {
  through: "FilmeGenero",
  foreignKey: "generoId",
  as: "filmes",
});

FilmeModel.belongsToMany(GeneroModel, {
  through: "FilmeGenero",
  foreignKey: "FilmesId",
  as: "generos",
});

export default GeneroModel;
