import React, {  useContext ,useState } from "react";
import { ScrollView, Alert, ActivityIndicator } from "react-native";

import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AuthContext} from '../../contexts/auth';

import { ContainerLogin, Logo, ImageLogo, InputForm, BtnSubmitForm, TxtSubmitForm, LinkNewUser, LoadingArea } from '../../styles/custom_adm';

import api from '../../config/api';

export default function Login() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const {signIn} = useContext(AuthContext);

    const navigation = useNavigation();

    const loginSubmit = async () => {

        if (!validate()) return;

        setLoading(true);

        await api.post('/login', { email, password })
            .then((response) => {
                //console.log(response.data);
                //Alert.alert("", response.data.mensagem);
                AsyncStorage.setItem('@token', response.data.token);
                AsyncStorage.setItem('@name', response.data.user.name);
                AsyncStorage.setItem('@image', response.data.user.image);
                //AsyncStorage.removeItem('@token');
                setLoading(false);
                signIn();
                //navigation.navigate('Home');
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
                    placeholder="E-mail"
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

                <BtnSubmitForm disabled={loading} onPress={loginSubmit} >
                    <TxtSubmitForm>
                        Acessar
                    </TxtSubmitForm>
                </BtnSubmitForm>

                <LinkNewUser onPress={() => { navigation.navigate('NewUser') }}>
                    Cadastrar
                </LinkNewUser>

                <LinkNewUser onPress={() => { navigation.navigate('RecoverPassword') }}>
                    Esqueceu a Senha
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