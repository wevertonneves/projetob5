import { Model, DataTypes } from "sequelize";
import sequelize from "../config/database";

class GenerosModel extends Model {}

GenerosModel.init(
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
    image: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize,
    modelName: "genero",
  }
);

export default GenerosModel;

// 🔹 IMPORTAR FilmeModel **APÓS** EXPORTAR GenerosModel
import FilmesModel from "./FilmesModel";

GenerosModel.belongsToMany(FilmesModel, {
  through: "filmegenero",
  as: "filmes",
  foreignKey: "generoId",
  otherKey: "filmeId",
});
