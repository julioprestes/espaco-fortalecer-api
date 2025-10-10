import { DataTypes } from "sequelize";
import { sequelize } from "../config/postgres.js";

const Usuario = sequelize.define(
    'usuarios',
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        nome: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING(255),
            allowNull: false,
            unique: true,
        },
        passwordHash: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        token: {
            type: DataTypes.STRING(100),
        },
        cargo: {
            type: DataTypes.STRING(100)
        },
        codigoSenha: {
            field: 'codigo_senha',
            type: DataTypes.STRING(255),
        },
        codigoSenhaExpiracao: {
            field: 'codigo_senha_expiracao',
            type: DataTypes.DATE,
        }
    },
    {
        freezeTableName: true,
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
    }
);

export default Usuario;
