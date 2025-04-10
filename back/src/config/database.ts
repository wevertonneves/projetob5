import { Sequelize } from "sequelize";
const sequelize = new Sequelize("netgamby", "root", "", {
  host: "localhost",
  dialect: "mysql",
});

export default sequelize;
