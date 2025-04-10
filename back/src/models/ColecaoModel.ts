import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";
import FilmeModel from "./FilmesModel"; // ⬅️ importar o model do filme

class ColecaoModel extends Model {
  id: number | undefined;
  name: string | undefined;
  filmeId: number | undefined;
}

ColecaoModel.init(
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
    filmeId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "filmes",
        key: "id",
      },
      onDelete: "CASCADE",
    },
  },
  {
    sequelize,
    modelName: "ColecaoModel",
    tableName: "colecoes",
  }
);

// 🔁 Relacionamento
ColecaoModel.belongsTo(FilmeModel, { foreignKey: "filmeId", as: "filme" });
FilmeModel.hasMany(ColecaoModel, { foreignKey: "filmeId", as: "colecoes" });

export default ColecaoModel;
