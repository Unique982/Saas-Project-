import { Sequelize } from "sequelize";

const sequelize = new Sequelize({
  database: process.env.DB_NAME,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  dialect: "mysql",
  port: Number(process.env.DB_PORT),
});

sequelize
  .authenticate()
  .then(() => {
    console.log("Authenticated, connceted vayo");
  })
  .catch((err) => {
    console.log(err);
  });
export default sequelize;
