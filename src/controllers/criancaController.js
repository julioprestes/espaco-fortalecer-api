import Crianca from "../models/CriancaModel.js";
import Usuario from "../models/UsuarioModel.js";

const get = async (req, res) => {
    try {
        const id = req.params.id ? req.params.id.toString().replace(/\D/g, '') : null;

        if (!id) {
            const response = await Crianca.findAll({
                order: [['id', 'desc']],
                include: [
                    {
                        model: Usuario,
                        as: 'usuario',
                        attributes: ['id', 'nome', 'email']
                    }
                ]
            });

            return res.status(200).send({
                message: 'Dados Encontrados',
                data: response,
            });
        }

        
        const response = await Crianca.findOne({
            where: {
                id: id
            },
            include: [
                {
                    model: Usuario,
                    as: 'usuario',
                    attributes: ['id', 'nome', 'email']
                }
            ]
        });

        if (!response) {
            return res.status(404).send('Criança não encontrada')
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
            nome,
            data_nascimento,
            idUsuario
        } = corpo

        const response = await Crianca.create({
            nome,
            data_nascimento,
            idUsuario
        });

        return response;
    } catch (error) {
        throw new Error(error.message)
    }
}

const update = async (corpo, id) => {
    try {
        const response = await Crianca.findOne({
            where: {
                id
            }
        });

        if (!response) {
            throw new Error('Criança não encontrada');
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
                message: 'Criança cadastrada com sucesso!',
                data: response
            });
        }

        const response = await update(req.body, id);
            return res.status(201).send({
                message: 'Dados da criança atualizados com sucesso!',
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
            res.status(400).send('Informe o ID da Criança')
        }

        const response = await Crianca.findOne({
            where: {
                id
            }
        });

        if (!response) {
            return res.status(404).send('Criança não encontrada')
        }

        await response.destroy();

        return res.status(200).send({
            message: 'Registro excluído',
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
