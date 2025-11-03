import Crianca from "../models/CriancaModel.js";
import Usuario from "../models/UsuarioModel.js";
import jwt from 'jsonwebtoken';

const get = async (req, res) => {
    try {
        const id = req.params.id ? req.params.id.toString().replace(/\D/g, '') : null;

        // Pega o ID do usuário do token
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) {
            return res.status(401).send({ message: 'Token não fornecido' });
        }
        const decoded = jwt.verify(token, process.env.TOKEN_KEY);
        const idUsuario = decoded.idUsuario;

        if (!id) {
            // Lista apenas as crianças do usuário logado
            const response = await Crianca.findAll({
                where: { idUsuario },
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
                id: id,
                idUsuario // Garante que só pode ver suas próprias crianças
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

        // Pega o ID do usuário do token
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) {
            return res.status(401).send({ message: 'Token não fornecido' });
        }
        const decoded = jwt.verify(token, process.env.TOKEN_KEY);
        const idUsuario = decoded.idUsuario;

        // Adiciona o idUsuario ao corpo da requisição
        req.body.idUsuario = idUsuario;

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

        // Pega o ID do usuário do token
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) {
            return res.status(401).send({ message: 'Token não fornecido' });
        }
        const decoded = jwt.verify(token, process.env.TOKEN_KEY);
        const idUsuario = decoded.idUsuario;

        const response = await Crianca.findOne({
            where: {
                id,
                idUsuario // Garante que só pode deletar suas próprias crianças
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
