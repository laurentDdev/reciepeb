const { Request, Response } = require('express');
const bcrypt = require('bcrypt')
const authService = require('../services/auth.service');
const jwt = require('jsonwebtoken')

const authController = {

    /**
     * 
     * POST /api/auth/register 
     * @summary Permet de ce register
     * @tags Auth
     * @param {registerUser} request.body
     * @example request - Inscription d'un utilisateur
     * {
     *      "email": "exemple@gmail.com",
     *      "pseudo": "Votre pseudo",
     *      "password": "mot de passe"
     * }
     * @returns 200 - Message : Register with success
     * @param {Request} req 
     * @param {Response} res

     */
    register: async (req, res) => {
        try{
            const {email, password, pseudo} = req.body
            const hashedPassword = bcrypt.hashSync(password, 10)
            const user = await authService.registerUser(email, hashedPassword, pseudo)
            if (user) {
                res.status(200).json({message: 'Register with success'})
            }
        }catch(e) {
            console.log(e);
            res.status(401).json({message: 'Erreur ' + e.message})
        }
    },

    /**
     * 
     * POST /api/auth/login 
     * @summary Permet de ce login
     * @tags Auth
     * @param {loginUser} request.body
     * @example request - Connexion d'un utilisateur
     * {
     *      "email": "exemple@gmail.com",
     *      "password": "mot de passe"
     * }
     * @returns 200 - Bearer token authorization
     * @returns 401 - Erreur de connexion
     * @param {Request} req 
     * @param {Response} res
     */
    login: async (req, res) => {
        try {
            const {email, password} = req.body
            const user = await authService.loginUser(email, password)

            if (user) {
                const payload = {
                    id : user.id
                }

                const options = {
                    expiresIn: '2h'
                }

                const token = await jwt.sign(payload, process.env.JWT_SECRET, options)

                res.setHeader('Authorization', `Bearer ${token}`)
                res.sendStatus(200)
            }

        }catch(e) {
            console.log(e);
            res.status(401).json({message: 'Erreur ' + e.message})
        }
    }
}


module.exports = authController