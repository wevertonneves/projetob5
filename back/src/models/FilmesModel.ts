import { Model, DataTypes } from "sequelize";
import sequelize from "../config/database";

class FilmesModel extends Model {}

FilmesModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    releaseYear: {
      type: DataTypes.INTEGER,
    },
    duration: {
      type: DataTypes.INTEGER,
    },
    image: {
      type: DataTypes.STRING,
    },
    videoUrl: {
      type: DataTypes.STRING,
      allowNull: true, // 🔹 pode ser nulo
    },
  },
  {
    sequelize,
    modelName: "filmes",
  }
);

export default FilmesModel;

// 🔹 IMPORTAR GenerosModel **APÓS** EXPORTAR FilmesModel
import GenerosModel from "./GenerosModel";

FilmesModel.belongsToMany(GenerosModel, {
  through: "filmegenero",
  as: "generos",
  foreignKey: "filmeId",
  otherKey: "generoId",
});
