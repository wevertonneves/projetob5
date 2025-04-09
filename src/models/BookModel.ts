import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";
import AuthorModel from "./AuthorModels";

class BookModel extends Model {
  id: number | undefined;
  name: string | undefined;
  authorId: number | undefined;
}

BookModel.init(
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
    modelName: "BookModel",
    tableName: "books",
  }
);

BookModel.belongsTo(AuthorModel, {
  foreignKey: "authorId",
  as: "author",
});
AuthorModel.hasMany(BookModel, {
  foreignKey: "authorId",
  as: "author",
});

export default BookModel;
