import React from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { TitleIcon } from '../styles/custom_adm';

const Stack = createNativeStackNavigator();

import ListUsers from '../pages/ListUsers';
import ViewUser from '../pages/ViewUser';
import AddUser from '../pages/AddUser';

const screnOtionStyle = {
    headerStyle: {
        backgroundColor: '#161616'
    },
    headerTintColor: '#ebb105'
}

const ListUserStack = () => {

    const navigation = useNavigation();

    return (
        <Stack.Navigator screenOptions={screnOtionStyle}>
            <Stack.Screen
                name="ListUsers"
                component={ListUsers}
                options={{
                    headerTitle: "Listar Usuários",
                    headerRight: () => (
                        <TitleIcon
                            onPress={() => {
                                navigation.navigate('AddUser')
                            }}>
                            <MaterialCommunityIcons
                                name="plus-circle-outline"
                                size={25}
                                color="#ebb105"
                            />
                        </TitleIcon>
                    )
                }}
            />

            <Stack.Screen
                name="ViewUser"
                component={ViewUser}
                options={{
                    headerTitle: "Detalhes do Usuário"
                }}
            />

            <Stack.Screen
                name="AddUser"
                component={AddUser}
                options={{
                    headerTitle: "Cadastrar Usuário"
                }}
            />
        </Stack.Navigator>
    )
}

export { ListUserStack };