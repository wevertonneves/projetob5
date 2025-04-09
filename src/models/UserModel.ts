import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";
import bcrypt from "bcrypt";

class UserModel extends Model {
  id: number | undefined;
  name: string | undefined;
  email: string | undefined;
  password: string | undefined;

  public async hashPassword() {
    this.password = await bcrypt.hash(this.password!, 10);
  }
} // Nome do modelo no singular

UserModel.init(
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
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },

  {
    sequelize,
    modelName: "UserModel", // Nome do modelo no singular
    tableName: "users", // Nome da tabela no banco de dados
    timestamps: true, // Desativa os campos createdAt e updatedAt (opcional)
  }
);

UserModel.beforeCreate(async (user: UserModel) => {
  await user.hashPassword();
});

export default UserModel;
