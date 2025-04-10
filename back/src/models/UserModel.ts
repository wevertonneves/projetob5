import {
  DataTypes,
  Model,
  Optional,
  Association,
  HasManyAddAssociationMixin,
  HasManyRemoveAssociationMixin,
} from "sequelize";
import sequelize from "../config/database";
import bcrypt from "bcrypt";
import FilmesModel from "./FilmesModel"; // 👈 Importa o modelo de filmes

// Interface para os atributos do usuário
interface UserAttributes {
  id: number;
  name: string;
  email: string;
  password: string;
}

// Interface para criação de usuários (id opcional)
interface UserCreationAttributes extends Optional<UserAttributes, "id"> {}

// Definição do modelo
class UserModel extends Model<UserAttributes, UserCreationAttributes> {
  public id!: number;
  public name!: string;
  public email!: string;
  public password!: string;

  // 🔐 Métodos personalizados
  public async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }

  public async validatePassword(password: string): Promise<boolean> {
    return await bcrypt.compare(password, this.password);
  }

  // 📌 Associação com favoritos (filmes)
  public favoritos?: FilmesModel[];
  public addFavorito!: HasManyAddAssociationMixin<FilmesModel, number>;
  public removeFavorito!: HasManyRemoveAssociationMixin<FilmesModel, number>;

  public static associations: {
    favoritos: Association<UserModel, FilmesModel>;
  };
}

// Inicializa o modelo no Sequelize
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
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "User",
    tableName: "users",
    timestamps: true,
  }
);

// Middleware para hash de senha antes de salvar no banco
UserModel.beforeCreate(async (user) => {
  await user.hashPassword();
});

UserModel.beforeUpdate(async (user) => {
  if (user.changed("password")) {
    await user.hashPassword();
  }
});

export default UserModel;
