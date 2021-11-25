import React, { useState, useCallback } from "react";
import { useNavigation } from '@react-navigation/native';
import { useFocusEffect } from '@react-navigation/native';

import { Alert, TouchableOpacity } from "react-native";

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { Container, List, RowData, InfoData, ValueData, BtnView } from '../../styles/custom_adm';


import api from '../../config/api';

export default function ListUsers() {

    const [users, setUsers] = useState([]);

    const navigation = useNavigation();

    const getUsers = async () => {
        await api.get("/users/1")
            .then((response) => {
                setUsers(response.data.users);
            }).catch((err) => {
                if (err.response) {
                    Alert.alert("", err.response.data.mensagem);
                } else {
                    Alert.alert("", "Erro: Tente mais tarde!");
                }
            });
    }

    useFocusEffect(
        useCallback(() => {
            getUsers();
        }, [])
    );

    return (
        <Container>

            <List>
                {users.map((user) => {
                    return (
                        <TouchableOpacity onPress={() => { navigation.navigate('ViewUser', { userId: user.id }) }} key={user.id}>
                            <RowData>
                                <InfoData>
                                    <ValueData>{user.name}</ValueData>
                                </InfoData>
                                <BtnView>

                                    <MaterialCommunityIcons
                                        name='greater-than'
                                        size={20}
                                        color={'#c0c0c0'} />
                                </BtnView>
                            </RowData>
                        </TouchableOpacity>
                    )
                })}
            </List>

        </Container>
    )
}