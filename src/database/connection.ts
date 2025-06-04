import { Sequelize } from "sequelize-typescript";

const sequelize = new Sequelize({
  database: process.env.DB_NAME, // databaseName
  username: process.env.DB_USER, // database ko username by default root
  password: process.env.DB_PASSWORD, // database ko password by default ""
  host: process.env.DB_HOST, // database ko location kaha xa vanne kura, localhost(mycomputer)
  dialect: "mysql", // k database use garna
  port: Number(process.env.DB_PORT), // database ko port number by default 3306 hunxa
  models: [__dirname + "/models"],
});

sequelize
  .authenticate()
  .then(() => {
    console.log("Authenticated, connceted vayo");
  })
  .catch((err) => {
    console.log(err);
  });
sequelize.sync({ alter: false }).then(() => {
  console.log("migrated successfully new changes");
});
export default sequelize;
