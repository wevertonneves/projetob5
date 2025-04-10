import {
  Model,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from "sequelize";
import sequelize from "../config/database";

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

  // Tipagem para relacionamentos (se necessário)
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
