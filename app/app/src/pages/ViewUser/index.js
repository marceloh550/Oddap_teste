import React, { useState, useCallback } from "react";
import { Alert, Text } from "react-native";

import { useNavigation, useFocusEffect } from "@react-navigation/native";

import { Container, TitleViewContent, ViewContent, BtnActionEdit, BtnActionDelete, TxtBtnAction } from '../../styles/custom_adm';

import api from '../../config/api';

export default function ViewUser({ route }) {

    const [user, setUser] = useState('');

    const navigation = useNavigation();

    const getUser = async () => {

        //console.log(route.params.userId);
        const { userId } = route.params;

        await api.get('/user/' + userId)
        .then((response) => {
            //console.log(response.data);
            setUser(response.data.user);
        }).catch((err) => {
            if(err.response){
                Alert.alert("", err.response.data.mensagem);
                navigation.navigate('ListUsers');
            }else{
                Alert.alert("", "Erro: Tente mais tarde!");
                navigation.navigate('ListUsers');
            }
        });
    }

    useFocusEffect(
        useCallback(() => {
            getUser();
        }, [])
    );

    return (
        <Container>

            <TitleViewContent>Id:</TitleViewContent>
            <ViewContent>{user.id}</ViewContent>

            <TitleViewContent>Nome:</TitleViewContent>
            <ViewContent>{user.name}</ViewContent>

            <TitleViewContent>E-mail:</TitleViewContent>
            <ViewContent>{user.email}</ViewContent>

            <BtnActionEdit>
                <TxtBtnAction>
                    Editar
                </TxtBtnAction>
            </BtnActionEdit>

            <BtnActionDelete>
                <TxtBtnAction>
                    Apagar
                </TxtBtnAction>
            </BtnActionDelete>

        </Container>
    )
}