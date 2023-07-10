
const { ObjectSchema } = require('yup')


/**
 * 
 * @param {ObjectSchema} yupValidator 
 * @returns 
 */
const bodyMiddleware = (yupValidator) => {

    return async (req, res, next) => {
        try {
            const data = await yupValidator.noUnknown().validate(req.body, {abortEarly: false})

            req.body = data
            next()

        }catch (error) {
            return res.status(400).json({message: error.message})
        }
    }

}


module.exports = bodyMiddleware