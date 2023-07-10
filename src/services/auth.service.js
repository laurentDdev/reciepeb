const UserDTO = require('../dto/user.dto')
const db = require('../models')
const bcrypt = require("bcrypt")
const authService = {
    
    registerUser: async (email, password, pseudo) => {
        const user = await db.User.create({email: email, password: password, pseudo: pseudo})

        return user
    },
    loginUser: async (email, password) => {
        const user = await db.User.findOne({where: {email : email}})

        if (!user) {
            throw{
                message: "Invalid email"
            }
        }

        const isSame = bcrypt.compareSync(password, user.password)

        if (!isSame) {
            throw {
                message: "Invalid password"
            }
        }

        return new UserDTO(user.id, user.email, user.pseudo)

    }
}



module.exports = authService