const { Sequelize, ModelStatic, DataTypes} = require('sequelize')


/**
 * 
 * @param {Sequelize} sequelize 
 * @returns ModelStatic
 */

module.exports = (sequelize) => {
    return sequelize.define('User', {
        pseudo: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        email: {
            type: DataTypes.STRING(100),
            allowNull: false,
            unique: true
        },
        password: {
            type: DataTypes.STRING(300),
            allowNull: false
        },
        role: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: 'User',
            validate: {
                isIn: [['User', 'Admin']]
            }
        }
    })
}