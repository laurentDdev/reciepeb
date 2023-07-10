const yup = require('yup')

const registerValidator = yup.object({
    email: yup.string().required().email(),
    pseudo: yup.string().required().trim(),
    password: yup.string().required().min(5).trim()
})

const loginValidator = yup.object({
    email: yup.string().required().email(),
    password: yup.string().required().min(5).trim()
})


module.exports = {registerValidator, loginValidator}