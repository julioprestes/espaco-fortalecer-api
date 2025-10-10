import { DataTypes } from "sequelize";
import { sequelize } from "../config/postgres.js";
import Usuario from "./UsuarioModel.js";

const Crianca = sequelize.define(
    'criancas',
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
        data_nascimento: {
            field: 'data_nascimento',
            type: DataTypes.DATEONLY,
        }
    },
    {
        freezeTableName: true,
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
    }
);

Crianca.belongsTo(Usuario, {
    as: 'usuario',
    onUpdate: 'NO ACTION',
    onDelete: 'NO ACTION',
    foreignKey: {
        name: 'idUsuario',
        allowNull: false,
        field: 'id_usuario'
    }
});

export default Crianca;
