import React, { useState } from "react";
import { Alert, ScrollView } from "react-native";
import { useNavigation } from '@react-navigation/native';

import { Container, LabelFormDash, InputFormDash, BtnSubmitFormDash, TxtSubmitFormDash, TitleRequired } from '../../styles/custom_adm';

import api from '../../config/api';

export default function AddUser() {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigation = useNavigation();

    const addUser = async () => {
        await api.post('/user', { name, email, password })
            .then((response) => {
                Alert.alert("", response.data.mensagem);
                navigation.navigate('ListUsers');
            }).catch((err) => {
                if (err.response) {
                    Alert.alert("", err.response.data.mensagem.toString());
                } else {
                    Alert.alert("", "Erro: Usuário não cadastrado com sucesso, tente mais tarde!");
                }
            });
    }

    return (
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            <Container>

                <LabelFormDash>* Nome</LabelFormDash>
                <InputFormDash
                    placeholder="Nome completo"
                    autoCorrect={false}
                    value={name}
                    onChangeText={text => setName(text)}
                />

                <LabelFormDash>* E-mail</LabelFormDash>
                <InputFormDash
                    placeholder="Melhor e-mail"
                    autoCorrect={false}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    value={email}
                    onChangeText={text => setEmail(text)}
                />

                <LabelFormDash>* Senha</LabelFormDash>
                <InputFormDash
                    placeholder="A senha deve ter no mínimo 6 caracteres"
                    autoCorrect={false}
                    secureTextEntry={true}
                    value={password}
                    onChangeText={text => setPassword(text)}
                />

                <TitleRequired>* Campo obrigatório</TitleRequired>

                <BtnSubmitFormDash onPress={addUser}>
                    <TxtSubmitFormDash>Cadastrar</TxtSubmitFormDash>
                </BtnSubmitFormDash>

            </Container>
        </ScrollView>
    )
}