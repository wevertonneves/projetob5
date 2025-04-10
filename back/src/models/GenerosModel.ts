import { Model, DataTypes, Association } from "sequelize";
import sequelize from "../config/database";
import FilmesModel from "./FilmesModel"; // Pode manter

class GenerosModel extends Model {
  public id!: number;
  public name!: string;
  public image!: string;

  // Apenas define a tipagem, sem fazer associação aqui
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

export default GenerosModel;
