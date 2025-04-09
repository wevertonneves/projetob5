import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";
import AuthorModel from "./AuthorModels";

class FilmesModel extends Model {
  id: number | undefined;
  name: string | undefined;
  authorId: number | undefined;
}

FilmesModel.init(
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
    authorId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: "FilmesModel",
    tableName: "filmes",
  }
);

FilmesModel.belongsTo(AuthorModel, {
  foreignKey: "authorId",
  as: "author",
});
AuthorModel.hasMany(FilmesModel, {
  foreignKey: "authorId",
  as: "author",
});

export default FilmesModel;
