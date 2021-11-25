import React, { useState } from "react";
import { ScrollView, Alert, ActivityIndicator } from "react-native";

import { useNavigation } from '@react-navigation/native';

import { ContainerLogin, Logo, ImageLogo, InputForm, BtnSubmitForm, TxtSubmitForm, LinkNewUser, LoadingArea } from '../../styles/custom_adm';

import api from '../../config/api';

export default function VerifyKey() {

    const [recoverPasswordApp, setRecoverPasswordApp] = useState('');
    const [id, setId] = useState('');
    const [password, setPassword] = useState('');
    const [newPassword, setNewPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    const navigation = useNavigation();

    const verifyKey = async () => {
        if (!validate()) return;

        setLoading(true);

        await api.get('/val-key-recover-pass-app/' + recoverPasswordApp)
            .then((response) => {
                console.log(response.data);
                setId(response.data.id);
                setLoading(false);
                setNewPassword(true);
            }).catch((err) => {
                if (err.response) {
                    //console.log(err.response);
                    setLoading(false);
                    Alert.alert("", err.response.data.mensagem);
                } else {
                    setLoading(false);
                    Alert.alert("", "Erro: Tente mais tarde!");
                }
            });

    }

    const validate = () => {
        if (!recoverPasswordApp) {
            Alert.alert("", "Erro: Necessário preencher o campo código de verificação!");
            return false;
        }

        return true;
    }

    const editPassword = async () => {
        console.log("Id do usuário " + id + " e a senha " + password);

        const headers = {
            'Content-Type': 'application/json'
        }

        await api.put('/update-password-app', {id, password}, {headers})
        .then((response) => {
            Alert.alert("", response.data.mensagem);
            navigation.navigate('Login');
        }).catch((err) => {
            if(err.response){
                Alert.alert("", err.response.data.mensagem.toString());
            }else{
                Alert.alert("", "Erro: Tente mais tarde!");
            }
        });
    }

    return (

        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            <ContainerLogin>
                <Logo>
                    <ImageLogo source={require('../../../assets/logo.png')} />
                </Logo>

                {newPassword ?
                    <>
                        <InputForm
                            placeholder="Nova senha"
                            autoCorrect={false}
                            value={password}
                            autoCapitalize="none"
                            secureTextEntry={true}
                            editable={!loading}
                            onChangeText={text => setPassword(text)}
                        />

                        <BtnSubmitForm disabled={loading} onPress={editPassword} >
                            <TxtSubmitForm>
                                Salvar
                            </TxtSubmitForm>
                        </BtnSubmitForm>
                    </>
                    :
                    <>
                        <InputForm
                            placeholder="Código de verificação"
                            autoCorrect={false}
                            value={recoverPasswordApp}
                            autoCapitalize="none"
                            editable={!loading}
                            onChangeText={text => setRecoverPasswordApp(text)}
                        />

                        <BtnSubmitForm disabled={loading} onPress={verifyKey} >
                            <TxtSubmitForm>
                                Enviar
                            </TxtSubmitForm>
                        </BtnSubmitForm>
                    </>
                }


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