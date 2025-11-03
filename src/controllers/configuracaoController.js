import Configuracao from "../models/ConfiguracaoModel.js";
import Crianca from "../models/CriancaModel.js";

const get = async (req, res) => {
    try {
        const id = req.params.id ? req.params.id.toString().replace(/\D/g, '') : null;

        if (!id) {
            const response = await Configuracao.findAll({
                order: [['id', 'desc']],
                include: [
                    {
                        model: Crianca,
                        as: 'crianca',
                        attributes: ['id', 'nome']
                    }
                ]
            });

            return res.status(200).send({
                message: 'Dados Encontrados',
                data: response,
            });
        }

        
        const response = await Configuracao.findOne({
            where: {
                id: id
            },
            include: [
                {
                    model: Crianca,
                    as: 'crianca',
                    attributes: ['id', 'nome']
                }
            ]
        });

        if (!response) {
            return res.status(404).send('Configuração não encontrada')
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
            tamanho_fonte,
            alto_contraste,
            idCrianca
        } = corpo

        const response = await Configuracao.create({
            tamanho_fonte,
            alto_contraste,
            idCrianca
        });

        return response;
    } catch (error) {
        throw new Error(error.message)
    }
}

const update = async (corpo, id) => {
    try {
        const response = await Configuracao.findOne({
            where: {
                id
            }
        });

        if (!response) {
            throw new Error('Configuração não encontrada');
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
                message: 'Configuração criada com sucesso!',
                data: response
            });
        }

        const response = await update(req.body, id);
            return res.status(201).send({
                message: 'Configuração atualizada com sucesso!',
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
            res.status(400).send('Informe o ID da Configuração')
        }

        const response = await Configuracao.findOne({
            where: {
                id
            }
        });

        if (!response) {
            return res.status(404).send('Configuração não encontrada')
        }

        await response.destroy();

        return res.status(200).send({
            message: 'Configuração excluída',
            data: response
        })

    } catch (error) {
        return res.status(500).send({
            message: error.message
        });
    }
}

const getConfigByCrianca = async (req, res) => {
    try {
        const idCrianca = req.params.idCrianca ? req.params.idCrianca.toString().replace(/\D/g, '') : null;
        
        if (!idCrianca) {
            return res.status(400).send('Informe o ID da criança');
        }

        const response = await Configuracao.findOne({
            where: {
                idCrianca: idCrianca
            },
            include: [
                {
                    model: Crianca,
                    as: 'crianca',
                    attributes: ['id', 'nome']
                }
            ]
        });

        // Se não encontrar, retorna configuração padrão
        if (!response) {
            return res.status(200).send({
                message: 'Configuração padrão',
                data: {
                    tamanho_fonte: 'medio',
                    alto_contraste: false,
                    idCrianca: idCrianca
                }
            });
        }

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


export default {
    get,
    persist,
    destroy,
    getConfigByCrianca
}
