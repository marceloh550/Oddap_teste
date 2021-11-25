import React, { useState } from "react";
import { Alert, ScrollView, ActivityIndicator } from "react-native";

import { useNavigation } from '@react-navigation/native';

import { ContainerLogin, Logo, ImageLogo, InputForm, BtnSubmitForm, TxtSubmitForm, LinkNewUser, LoadingArea } from '../../styles/custom_adm';

import api from '../../config/api';

export default function NewUser() {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const navigation = useNavigation();

    const addUser = async () => {

        if (!validade()) return;

        setLoading(true);

        await api.post('/add-user-login', { name, email, password })
            .then((response) => {
                setLoading(false);
                Alert.alert("", response.data.mensagem);
                navigation.navigate('Login');
            }).catch((err) => {
                //console.log(err.response.data.mensagem.toString());
                if (err.response) {
                    setLoading(false);
                    Alert.alert("", err.response.data.mensagem.toString());
                } else {
                    setLoading(false);
                    Alert.alert("", "Erro: Tente mais novamente!");
                }
            });
    }

    const validade = () => {
        if (!name) {
            Alert.alert("", "Erro: Necessário preencher o campo nome!");
            return false;
        }
        if (!email) {
            Alert.alert("", "Erro: Necessário preencher o campo e-mail!");
            return false;
        }
        if (!password) {
            Alert.alert("", "Erro: Necessário preencher o campo senha!");
            return false;
        }

        return true;
    }

    return (
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            <ContainerLogin>
                <Logo>
                    <ImageLogo source={require('../../../assets/logo.png')} />
                </Logo>

                <InputForm
                    placeholder="Seu nome completo"
                    value={name}
                    editable={!loading}
                    onChangeText={text => setName(text)}
                />

                <InputForm
                    placeholder="Seu melhor e-mail"
                    autoCorrect={false}
                    value={email}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    editable={!loading}
                    onChangeText={text => setEmail(text)}
                />

                <InputForm
                    placeholder="Senha"
                    autoCorrect={false}
                    value={password}
                    secureTextEntry={true}
                    editable={!loading}
                    onChangeText={text => setPassword(text)}
                />

                <BtnSubmitForm disabled={loading} onPress={addUser} >
                    <TxtSubmitForm>
                        Cadastrar
                    </TxtSubmitForm>
                </BtnSubmitForm>

                <LinkNewUser onPress={() => { navigation.navigate('Login') }}>
                    Login
                </LinkNewUser>

                {loading &&
                    <LoadingArea>
                        <ActivityIndicator size="large" color="#fff" />
                    </LoadingArea>
                }
            </ContainerLogin>
        </ScrollView>
    )
}
