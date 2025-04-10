import { Model, DataTypes, Association } from "sequelize";
import sequelize from "../config/database";
import FilmesModel from "./FilmesModel"; // 🔹 Importa aqui mesmo

class GenerosModel extends Model {
  public id!: number;
  public name!: string;
  public image!: string;

  // 🔹 Definição explícita da associação
  public declare filmes?: FilmesModel[];

  public static associations: {
    filmes: Association<GenerosModel, FilmesModel>;
  };
}

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

// 🔹 Definição da associação muitos-para-muitos
GenerosModel.belongsToMany(FilmesModel, {
  through: "filmegenero",
  as: "filmes",
  foreignKey: "generoId",
  otherKey: "filmeId",
});

export default GenerosModel;
