import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import * as yup from 'yup';

import { Navbar } from '../../components/Navbar';
import { Sidebar } from '../../components/Sidebar';
import api from '../../config/configApi';

export const AddSiteMsgContact = () => {

    const [id, setId] = useState("");
    const [siteMsgContact, setSiteMsgContact] = useState({
        name: '',
        idade: '',
        cidadet: '',
        estado: ''
    });

    const [status, setStatus] = useState({
        type: '',
        mensagem: ''
    });

    const valueInput = e => setSiteMsgContact({ ...siteMsgContact, [e.target.name]: e.target.value });

    const addSiteMsgContact = async e => {
        e.preventDefault();

        if (!(await validate())) return;

        const headers = {
            'headers': {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        };

        await api.post('/site-msg-contact/add-msg-contact', siteMsgContact, headers)
            .then((response) => {
                setId(response.data.id);
                //console.log(response.data.id);
                setStatus({
                    type: 'redSuccess',
                    mensagem: response.data.mensagem
                });
            }).catch((err) => {
                if (err.response) {
                    setStatus({
                        type: 'error',
                        mensagem: err.response.data.mensagem
                    });
                } else {
                    setStatus({
                        type: 'error',
                        mensagem: "Erro: Tente novamente!"
                    });
                }
            });
    }

    async function validate() {
        let schema = yup.object().shape({
            name: yup.string("Erro: Necessário preencher o campo nome!")
                .required("Erro: Necessário preencher o campo nome!"),
            idade: yup.string("Erro: Necessário preencher o campo idade!")
                .required("Erro: Necessário preencher o campo idade!"),
            cidade: yup.string("Erro: Necessário preencher o campo cidade!")
                .required("Erro: Necessário preencher o campo cidade!"),
            estado: yup.string("Erro: Necessário preencher o campo estado!")
                .required("Erro: Necessário preencher o campo estado!")
        });

        try {
            await schema.validate({
                name: siteMsgContact.name,
                idade: siteMsgContact.idade,
                cidade: siteMsgContact.cidade,
                estado: siteMsgContact.estado
            });
            return true;
        } catch (err) {
            setStatus({
                type: 'error',
                mensagem: err.errors
            });
            return false;
        }
    }

    return (
        <div>
            <Navbar />
            <div className="content">
                <Sidebar active="site-msg-contact" />


                <div className="wrapper">
                    <div className="row">

                        <div className="top-content-adm">
                            <span className="title-content">Cadastrar Paciente</span>
                            <div className="top-content-adm-right">
                                <Link to="/list-site-msg-contact">
                                    <button type="button" className="btn-info">Listar</button>
                                </Link>
                            </div>
                        </div>

                        <div className="alert-content-adm">
                            {status.type === 'error' ? <p className="alert-danger">{status.mensagem}</p> : ""}

                            {status.type === 'redSuccess' ?
                                <Redirect to={{
                                    pathname: '/view-site-msg-contact/' + id,
                                    state: {
                                        type: "success",
                                        mensagem: status.mensagem
                                    }
                                }} />
                                : ""}
                        </div>

                        <div className="content-adm">
                            <form onSubmit={addSiteMsgContact} className="form-adm">

                                <div className="row-input">
                                    <div className="column">
                                        <label className="title-input">Nome</label>
                                        <input type="text" name="name" id="name" className="input-adm" placeholder="Nome do paciente" onChange={valueInput} />
                                    </div>
                                </div>

                                <div className="row-input">
                                    <div className="column">
                                        <label className="title-input">Idade</label>
                                        <input type="number" step="1" pattern="\d+" name="idade" id="idade" className="input-adm" placeholder="Idade do paciente" onChange={valueInput} />
                                    </div>
                                </div>

                                <div className="row-input">
                                    <div className="column">
                                        <label className="title-input">Cidade</label>
                                        <input type="text" name="cidade" id="cidade" className="input-adm" placeholder="Cidade que o paciente mora" onChange={valueInput} />
                                    </div>
                                </div>

                                <div className="row-input">
                                    <div className="column">
                                        <label className="title-input">Estado</label>
                                        <input type="text" name="estado" id="estado" className="input-adm" placeholder="Estado que o paciente mora" onChange={valueInput} />
                                    </div>
                                </div>

                                <button type="submit" className="btn-success">Cadastrar</button>

                            </form>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};