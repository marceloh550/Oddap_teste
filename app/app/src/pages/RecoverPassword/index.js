import React, {useState} from "react";
import { ScrollView, Alert, ActivityIndicator } from "react-native";

import { useNavigation } from '@react-navigation/native';

import { ContainerLogin, Logo, ImageLogo, InputForm, BtnSubmitForm, TxtSubmitForm, LinkNewUser, LoadingArea } from '../../styles/custom_adm';

import api from '../../config/api';

export default function RecoverPassword() {

    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);

    const navigation = useNavigation();

    const recoverPass = async () => {
        if (!validate()) return;

        setLoading(true);

        await api.post('/recover-password-app', { email })
        .then((response) => {
            //console.log(response.data);
            Alert.alert("", response.data.mensagem);
            setLoading(false);            
            navigation.navigate('VerifyKey');
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
        if (!email) {
            Alert.alert("", "Erro: Necessário preencher o campo e-mail!");
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
                    placeholder="E-mail"
                    autoCorrect={false}
                    value={email}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    editable={!loading}
                    onChangeText={text => setEmail(text)}
                />

                <BtnSubmitForm disabled={loading} onPress={recoverPass} >
                    <TxtSubmitForm>
                        Enviar
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