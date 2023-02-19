// CONEXÃO OM MYSQL2 NORMAL
// const mysql = require("mysql2/promise");
// const config = {
// 	host: "localhost",
// 	user: "root",
// 	password: ",
// 	database: "megacred"
// };

// async function query(sql, params) {
// 	const connection = await mysql.createConnection(config);
// 	const [results,] = await connection.execute(sql, params);
// 	return results;
// }

// module.exports = {
// 	query
// };


//CONEXÃO COM SEQUELIZE
const Sequelize = require("sequelize");
const dbName = "megacred_dev";
const dbUser = "root";
const dbHost = "localhost";
const dbPassword = "";

const sequelize = new Sequelize(dbName, dbUser, dbPassword, {
	dialect: "mysql",
	host: dbHost,
});

module.exports = sequelize;

