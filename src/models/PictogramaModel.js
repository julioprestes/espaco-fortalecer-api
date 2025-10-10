import { DataTypes } from "sequelize";
import { sequelize } from "../config/postgres.js";

const Pictograma = sequelize.define(
    'pictogramas',
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        texto: {
            type: DataTypes.STRING(100),
        },
        imagem_path: {
            type: DataTypes.STRING(255),
        },
        categoria: {
            type: DataTypes.STRING(100),
        }
    },
    {
        freezeTableName: true,
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
    }
);

export default Pictograma;
