require('dotenv').config()
const express = require("express")
const db = require('./models/index')
const router = require('./routes')
const expressJSDocSwagger = require('express-jsdoc-swagger');
const swaggerOptions = require('../swaggerOptions');

const app = express()


app.use(express.json())


app.use('/api', router)

expressJSDocSwagger(app)(swaggerOptions)




db.Sequelize.authenticate().then(() => {
    db.Sequelize.sync({force: true})
    console.log("Database connected");
    app.listen(3000, () => {
        console.log("server running on port 3000");
    })
}).catch(err => {
    console.log(err);
})




