const mongoose = require("mongoose");

const mongoConnect = () => {
  mongoose
    .connect("mongodb://127.0.0.1:27017/connect_api")
    .then(() => {
      console.log("mongodb connection success");
    })
    .catch((error) => {
      console.error("mongodb connection Fail :", error);
    });
};

module.exports = { mongoConnect };










// const { Sequelize } = require('sequelize');


// const sequelize = new Sequelize('connect_api', 'root', 'password', {
//   host: 'localhost',
//   dialect: 'mysql'
// });


// const mysqlConnect = async () => {
//   try {
//     await sequelize.authenticate();
//     console.log('MySQL connection success');
//   } catch (error) {
//     console.error('MySQL connection failed:', error);
//   }
// };

// module.exports = { mysqlConnect, sequelize };

