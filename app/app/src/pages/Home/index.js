import React, { useContext } from "react";
import { Button, Text } from "react-native";
import { AuthContext } from '../../contexts/auth';
import { useNavigation } from '@react-navigation/native';

import { Container } from '../../styles/custom_adm';

export default function Home() {

    const navigation = useNavigation();

    const { signOut } = useContext(AuthContext);
    return (
        <Container>

            <Text>Bem vindo</Text>

            <Text>Acessar o Perfil</Text>
            <Button title="Perfil" onPress={() => {navigation.navigate('Profile')}} />

            <Text>Sair do aplicativo</Text>
            <Button title="Sair" onPress={() => signOut()} />

        </Container>
    )
}