import { DataTypes } from "sequelize";
import { sequelize } from "../config/postgres.js";
import Crianca from "./CriancaModel.js";

const Configuracao = sequelize.define(
    'configuracoes',
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        tamanho_fonte: {
            type: DataTypes.STRING(50),
        },
        alto_contraste: {
            type: DataTypes.BOOLEAN,
        }
    },
    {
        freezeTableName: true,
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
    }
);

Configuracao.belongsTo(Crianca, {
    as: 'crianca',
    onUpdate: 'NO ACTION',
    onDelete: 'NO ACTION',
    foreignKey: {
        name: 'idCrianca',
        allowNull: false,
        field: 'id_crianca'
    }
});

export default Configuracao;
