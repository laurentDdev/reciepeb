const { Sequelize } = require("sequelize")

const { DB_NAME, DB_HOST, DB_USER, DB_PASSWORD} = process.env
const user = require('./user.model')
const db = {}

db.Sequelize = new Sequelize(DB_NAME,DB_USER,DB_PASSWORD,{
    host: DB_HOST,
    dialect: "mysql"
})

db.User = user(db.Sequelize)




module.exports = db