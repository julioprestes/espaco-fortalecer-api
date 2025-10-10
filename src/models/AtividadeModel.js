import { DataTypes } from "sequelize";
import { sequelize } from "../config/postgres.js";

const Atividade = sequelize.define(
    'atividades',
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        titulo: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        fase: {
            type: DataTypes.STRING(100),
        },
        imagem_path: {
            type: DataTypes.STRING(255),
        },
        resposta_correta: {
            type: DataTypes.STRING(255),
        }
    },
    {
        freezeTableName: true,
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
    }
);

export default Atividade;
