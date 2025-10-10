import Atividade from "../models/AtividadeModel.js";

const get = async (req, res) => {
    try {
        const id = req.params.id ? req.params.id.toString().replace(/\D/g, '') : null;

        if (!id) {
            const response = await Atividade.findAll({
                order: [['id', 'desc']],
            });

            return res.status(200).send({
                message: 'Dados Encontrados',
                data: response,
            });
        }

        
        const response = await Atividade.findOne({
            where: {
                id: id
            }
        });

        if (!response) {
            return res.status(404).send('Atividade não encontrada')
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
            titulo,
            fase,
            imagem_path,
            resposta_correta
        } = corpo

        const response = await Atividade.create({
            titulo,
            fase,
            imagem_path,
            resposta_correta
        });

        return response;
    } catch (error) {
        throw new Error(error.message)
    }
}

const update = async (corpo, id) => {
    try {
        const response = await Atividade.findOne({
            where: {
                id
            }
        });

        if (!response) {
            throw new Error('Atividade não encontrada');
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
                message: 'Atividade criada com sucesso!',
                data: response
            });
        }

        const response = await update(req.body, id);
            return res.status(201).send({
                message: 'Atividade atualizada com sucesso!',
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
            res.status(400).send('Informe o ID da Atividade')
        }

        const response = await Atividade.findOne({
            where: {
                id
            }
        });

        if (!response) {
            return res.status(404).send('Atividade não encontrada')
        }

        await response.destroy();

        return res.status(200).send({
            message: 'Atividade excluída',
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
