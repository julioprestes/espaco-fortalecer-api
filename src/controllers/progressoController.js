import Progresso from "../models/ProgressoModel.js";
import Crianca from "../models/CriancaModel.js";
import Atividade from "../models/AtividadeModel.js";

const get = async (req, res) => {
    try {
        const id = req.params.id ? req.params.id.toString().replace(/\D/g, '') : null;

        if (!id) {
            const response = await Progresso.findAll({
                order: [['id', 'desc']],
                include: [
                    {
                        model: Crianca,
                        as: 'crianca',
                        attributes: ['id', 'nome']
                    },
                    {
                        model: Atividade,
                        as: 'atividade',
                        attributes: ['id', 'titulo', 'fase']
                    }
                ]
            });

            return res.status(200).send({
                message: 'Dados Encontrados',
                data: response,
            });
        }

        
        const response = await Progresso.findOne({
            where: {
                id: id
            },
            include: [
                {
                    model: Crianca,
                    as: 'crianca',
                    attributes: ['id', 'nome']
                },
                {
                    model: Atividade,
                    as: 'atividade',
                    attributes: ['id', 'titulo', 'fase']
                }
            ]
        });

        if (!response) {
            return res.status(404).send('Progresso não encontrado')
        };

        return res.status(200).send({
            message: 'Dados Encontrados',
            data: response,
        });

    } catch (error) {
        return res.status(500).send({
            message: error.message
        });
    }
}

const create = async (corpo) => {
    try {
        const {
            resposta_dada,
            foi_correto,
            data_hora,
            idCrianca,
            idAtividade
        } = corpo

        const response = await Progresso.create({
            resposta_dada,
            foi_correto,
            data_hora,
            idCrianca,
            idAtividade
        });

        return response;
    } catch (error) {
        throw new Error(error.message)
    }
}

const update = async (corpo, id) => {
    try {
        const response = await Progresso.findOne({
            where: {
                id
            }
        });

        if (!response) {
            throw new Error('Progresso não encontrado');
        }

        Object.keys(corpo).forEach((item) => response[item] = corpo[item]);
        await response.save();

        return response;
    } catch (error) {
        throw new Error(error.message)
    }
}

const persist = async (req, res) => {
    try {
        const id = req.params.id ? req.params.id.toString().replace(/\D/g, '') : null;

        if (!id) {
            const response = await create(req.body)
            return res.status(201).send({
                message: 'Progresso registrado com sucesso!',
                data: response
            });
        }

        const response = await update(req.body, id);
            return res.status(201).send({
                message: 'Progresso atualizado com sucesso!',
                data: response
            });
    } catch (error) {
        return res.status(500).send({
            message: error.message
        });
    }
}

const destroy = async (req, res) => {
    try {
        const id = req.params.id ? req.params.id.toString().replace(/\D/g, '') : null;
        if (!id) {
            res.status(400).send('Informe o ID do Progresso')
        }

        const response = await Progresso.findOne({
            where: {
                id
            }
        });

        if (!response) {
            return res.status(404).send('Progresso não encontrado')
        }

        await response.destroy();

        return res.status(200).send({
            message: 'Progresso excluído',
            data: response
        })

    } catch (error) {
        return res.status(500).send({
            message: error.message
        });
    }
}


export default {
    get,
    persist,
    destroy
}
