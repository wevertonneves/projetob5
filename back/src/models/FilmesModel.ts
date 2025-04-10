import {
  Model,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from "sequelize";
import sequelize from "../config/database";

// Tipagem correta para os atributos do model
class FilmesModel extends Model<
  InferAttributes<FilmesModel>,
  InferCreationAttributes<FilmesModel>
> {
  declare id: CreationOptional<number>;
  declare name: string;
  declare releaseYear: number;
  declare duration: number;
  declare image: string;
  declare videoUrl: string | null;

  // ✅ Métodos do Sequelize para associação
  declare setGeneros: (generoIds: number[]) => Promise<void>;
}

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
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: "filmes",
  }
);

export default FilmesModel;

// 🔹 IMPORTAÇÕES E ASSOCIAÇÕES
import GenerosModel from "./GenerosModel";

FilmesModel.belongsToMany(GenerosModel, {
  through: "filmegenero", // nome da tabela intermediária
  as: "generos",
  foreignKey: "filmeId",
  otherKey: "generoId",
});
