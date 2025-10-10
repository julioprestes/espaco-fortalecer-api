import { DataTypes } from "sequelize";
import { sequelize } from "../config/postgres.js";
import Crianca from "./CriancaModel.js";
import Atividade from "./AtividadeModel.js";

const Progresso = sequelize.define(
    'progressos',
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        resposta_dada: {
            type: DataTypes.STRING(255),
        },
        foi_correto: {
            type: DataTypes.BOOLEAN,
        },
        data_hora: {
            field: 'data_hora',
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
        }
    },
    {
        freezeTableName: true,
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
    }
);

Progresso.belongsTo(Crianca, {
    as: 'crianca',
    onUpdate: 'NO ACTION',
    onDelete: 'NO ACTION',
    foreignKey: {
        name: 'idCrianca',
        allowNull: false,
        field: 'id_crianca'
    }
});

Progresso.belongsTo(Atividade, {
    as: 'atividade',
    onUpdate: 'NO ACTION',
    onDelete: 'NO ACTION',
    foreignKey: {
        name: 'idAtividade',
        allowNull: false,
        field: 'id_atividade'
    }
});

export default Progresso;
