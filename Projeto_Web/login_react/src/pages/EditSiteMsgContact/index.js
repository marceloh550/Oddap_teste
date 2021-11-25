import React, { useEffect, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import * as yup from 'yup';

import { Navbar } from '../../components/Navbar';
import { Sidebar } from '../../components/Sidebar';
import api from '../../config/configApi';
import { servDeleteMsgContact } from '../../services/servDeleteMsgContact';

export const EditSiteMsgContact = (props) => {

    const [name, setName] = useState('');
    const [idade, setIdade] = useState('');
    const [cidade, setCidade] = useState('');
    const [estado, setEstado] = useState('');
    const [id] = useState(props.match.params.id);

    const [status, setStatus] = useState({
        type: '',
        mensagem: ''
    });

    const editSiteMsgContact = async e => {
        e.preventDefault();

        if (!(await validate())) return;

        const headers = {
            'headers': {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        }

        await api.put("/site-msg-contact/edit-msg-contact", { id, name, idade, cidade, estado }, headers)
            .then((response) => {
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
                        mensagem: 'Erro: Tente mais tarde!'
                    });
                }
            });
    }

    useEffect(() => {
        const getMsgContact = async () => {

            const headers = {
                'headers': {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                }
            }

            await api.get("/site-msg-contact/msg-contact/" + id, headers)
                .then((response) => {
                    if (response.data.msgContact) {
                        setName(response.data.msgContact.name);
                        setIdade(response.data.msgContact.idade);
                        setCidade(response.data.msgContact.cidade);
                        setEstado(response.data.msgContact.estado);
                    } else {
                        setStatus({
                            type: 'redWarning',
                            mensagem: "Erro: Paciente não encontrado!"
                        });
                    }

                }).catch((err) => {
                    if (err.response) {
                        setStatus({
                            type: 'redWarning',
                            mensagem: err.response.data.mensagem
                        });
                    } else {
                        setStatus({
                            type: 'redWarning',
                            mensagem: "Erro: Tente mais tarde!"
                        });
                    }
                })
        }

        getMsgContact();
    }, [id]);

    async function validate() {
        let schema = yup.object().shape({
            name: yup.string("Erro: Necessário preencher o campo nome!")
                .required("Erro: Necessário preencher o campo nome!"),
        
            cidade: yup.string("Erro: Necessário preencher o campo cidade!")
                .required("Erro: Necessário preencher o campo cidade!"),
            estado: yup.string("Erro: Necessário preencher o campo estado!")
                .required("Erro: Necessário preencher o campo estado!")
        });

        try {
            await schema.validate({
                name,
                idade,
                cidade,
                estado
            });
            return true;
        } catch (err) {
            setStatus({ type: 'error', mensagem: err.errors });
            return false;
        }
    }

    const deleteMsgContact = async (idUser) => {
        const response = await servDeleteMsgContact(idUser);
        if (response) {
            if (response.type === "success") {
                setStatus({
                    type: 'redSuccess',
                    mensagem: response.mensagem
                });
            } else {
                setStatus({
                    type: "error",
                    mensagem: response.mensagem
                });
            }
        } else {
            setStatus({
                type: 'error',
                mensagem: 'Erro: Tente mais tarde!'
            });
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
                            <span className="title-content">Editar Paciente</span>
                            <div className="top-content-adm-right">
                                <Link to="/list-site-msg-contact">
                                    <button type="button" className="btn-info">Listar</button>
                                </Link>{" "}
                                <Link to={"/view-site-msg-contact/" + id}>
                                    <button type="button" className="btn-primary">Visualizar</button>
                                </Link>{" "}
                                <Link to="#">
                                    <button type="button" className="btn-danger" onClick={() => deleteMsgContact(id)}>Apagar</button>
                                </Link>
                            </div>
                        </div>

                        <div className="alert-content-adm">
                            {status.type === 'redWarning' ?
                                <Redirect to={{
                                    pathname: '/view-site-msg-contact/' + id,
                                    state: {
                                        type: "error",
                                        mensagem: status.mensagem
                                    }
                                }} /> : ""}
                            {status.type === 'redSuccess' ? <Redirect to={{
                                pathname: '/view-site-msg-contact/' + id,
                                state: {
                                    type: "success",
                                    mensagem: status.mensagem
                                }
                            }} /> : ""}
                            {status.type === 'error' ? <p className="alert-danger">{status.mensagem}</p> : ""}
                        </div>

                        <div className="content-adm">
                            <form onSubmit={editSiteMsgContact} className="form-adm">

                                <div className="row-input">
                                    <div className="column">
                                        <label className="title-input">Nome</label>
                                        <input type="text" name="name" id="name" className="input-adm" placeholder="Nome do paciente" value={name} onChange={text => setName(text.target.value)} />
                                    </div>
                                </div>

                                <div className="row-input">
                                    <div className="column">
                                        <label className="title-input">idade</label>
                                        <input type="text" name="idade" id="idade" className="input-adm" placeholder="Idade do paciente" value={idade} onChange={text => setIdade(text.target.value)} />
                                    </div>
                                </div>

                                <div className="row-input">
                                    <div className="column">
                                        <label className="title-input">cidade</label>
                                        <input type="text" name="cidade" id="cidade" className="input-adm" placeholder="Cidade que o paciente mora" value={cidade} onChange={text => setCidade(text.target.value)} />
                                    </div>
                                </div>

                                <div className="row-input">
                                    <div className="column">
                                        <label className="title-input">estado</label>
                                        <input type="text" name="estado" id="estado" className="input-adm" placeholder="Estado que o paciente mora" value={estado} onChange={text => setEstado(text.target.value)} />
                                    </div>
                                </div>

                                <button type="submit" className="btn-warning">Salvar</button>

                            </form>
                        </div>

                    </div>
                </div>

            </div>
        </div>
    )
}