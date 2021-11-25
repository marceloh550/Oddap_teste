var express = require('express');
var router = express.Router();

const yup = require('yup');

const { eAdmin } = require('../middlewares/auth');

const MsgContact = require('../models/Paciente');

router.get('/list-msg-contact/:page', async (req, res) => {
    const { page = 1 } = req.params;
    const limit = 40;
    var lastPage = 1;

    const countMsgContact = await MsgContact.count();
    if (countMsgContact === null) {
        return res.status(400).json({
            erro: true,
            mensagem: "Erro: Nenhum paciente encontrada!"
        });
    } else {
        lastPage = Math.ceil(countMsgContact / limit);
    }

    await MsgContact.findAll({
        attributes: ['id', 'name', 'idade', 'cidade', 'estado'],
        order: [['id', 'DESC']],
        offset: Number((page * limit) - limit),
        limit: limit
    })
        .then((msgContacts) => {
            return res.json({
                erro: false,
                msgContacts,
                countMsgContact,
                lastPage
            });
        }).catch(() => {
            return res.status(400).json({
                erro: true,
                mensagem: "Erro: Nenhum paciente encontrado!"
            });
        });
});

router.get("/msg-contact/:id", eAdmin, async (req, res) => {
    const { id } = req.params;

    await MsgContact.findByPk(id)
        .then((msgContact) => {
            return res.json({
                erro: false,
                msgContact
            });
        }).catch(() => {
            return res.status(400).json({
                erro: true,
                mensagem: "Erro: Nenhum paciente encontrado!"
            });
        });
});

router.post('/add-msg-contact', async (req, res) => {

    const schema = yup.object().shape({
        estado: yup.string("Erro: Necessário preencher o campo estado!")
            .required("Erro: Necessário preencher o campo estado!"),
        cidade: yup.string("Erro: Necessário preencher o campo cidade!")
            .required("Erro: Necessário preencher o campo cidade!"),
        name: yup.string("Erro: Necessário preencher o campo nome!")
            .required("Erro: Necessário preencher o campo nome!")
    });

    try {
        await schema.validate(req.body);
    } catch (err) {
        return res.status(400).json({
            erro: true,
            mensagem: err.errors
        })
    }

    await MsgContact.create(req.body)
        .then((msgContact) => {
            return res.json({
                id: msgContact.id,
                erro: false,
                mensagem: "Paciente cadastrado com sucesso!"
            });
        }).catch(() => {
            return res.status(400).json({
                erro: true,
                mensagem: "Erro: Paciente não cadastrado!"
            });
        });
});

router.put("/edit-msg-contact", eAdmin, async (req, res) => {
    const { id } = req.body;

    const schema = yup.object().shape({
        estado: yup.string("Erro: Necessário preencher o campo estado!")
            .required("Erro: Necessário preencher o campo estado!"),
        cidade: yup.string("Erro: Necessário preencher o campo cidade!")
            .required("Erro: Necessário preencher o campo cidade!"),
        name: yup.string("Erro: Necessário preencher o campo nome!")
            .required("Erro: Necessário preencher o campo nome!")
    });

    try {
        await schema.validate(req.body);
    } catch (err) {
        return res.status(400).json({
            erro: true,
            mensagem: err.errors
        });
    }

    await MsgContact.update(req.body, { where: { id } })
        .then(() => {
            return res.json({
                erro: false,
                mensagem: "Paciente editado com sucesso!"
            });

        }).catch(() => {
            return res.status(400).json({
                erro: true,
                mensagem: "Erro: Paciente não editado!"
            });
        });
});

router.delete("/msg-contact/:id", eAdmin, async (req, res) => {
    const { id } = req.params;

    await MsgContact.destroy({ where: { id } })
        .then(() => {
            return res.json({
                erro: false,
                mensagem: "Paciente apagado com sucesso!"
            });
        }).catch(() => {
            return res.status(400).json({
                erro: true,
                mensagem: "Erro: Paciente não apagado com sucesso!"
            });
        });
});

module.exports = router;