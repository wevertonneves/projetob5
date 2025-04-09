"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../config/database"));
const AuthorModels_1 = __importDefault(require("./AuthorModels"));
class BookModel extends sequelize_1.Model {
}
BookModel.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    authorId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true,
    },
}, {
    sequelize: database_1.default,
    modelName: "BookModel",
    tableName: "books",
});
BookModel.belongsTo(AuthorModels_1.default, {
    foreignKey: "authorId",
    as: "author",
});
AuthorModels_1.default.hasMany(BookModel, {
    foreignKey: "authorId",
    as: "author",
});
exports.default = BookModel;
