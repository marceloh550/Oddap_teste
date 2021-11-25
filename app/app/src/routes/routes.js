import React, { useEffect, useMemo, useState } from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TabNavigator from './TabNavigator';

import AsyncStorage from "@react-native-async-storage/async-storage";
import { getValToken } from "../services/auth";
import { AuthContext } from '../contexts/auth';

const Stack = createNativeStackNavigator();

import Login from "../pages/Login";
import NewUser from "../pages/NewUser";
import RecoverPassword from "../pages/RecoverPassword";
import VerifyKey from "../pages/VerifyKey";

import Home from "../pages/Home";
import Profile from "../pages/Profile";

export default function Routes() {

    const [userToken, setUserToken] = useState(null);

    const authContext = useMemo(() => {
        return {
            signIn: async () => {
                const valToken = AsyncStorage.getItem('@token');
                setUserToken(valToken);
            },
            signOut: async () => {
                AsyncStorage.removeItem('@token');
                AsyncStorage.removeItem('@name');
                AsyncStorage.removeItem('@image');
                setUserToken(null);
            }
        }
    }, []);

    const getToken = async () => {
        try {
            const valToken = await getValToken();
            if (valToken !== null) {
                const valToken = AsyncStorage.getItem('@token');
                setUserToken(valToken);
            } else {
                setUserToken(null);
            }
        } catch (err) {
            setUserToken(null);
        }
    }

    useEffect(() => {
        getToken();
    }, []);

    /* <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Profile" component={Profile} />
    </Stack.Navigator> */
    return (
        <AuthContext.Provider value={authContext}>
            <NavigationContainer>
                {userToken ? (
                    <TabNavigator />
                ) : (
                    <Stack.Navigator>
                        <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
                        <Stack.Screen name="NewUser" component={NewUser} options={{ headerShown: false }} />
                        <Stack.Screen
                            name="RecoverPassword"
                            component={RecoverPassword}
                            options={{ headerTitle: "Recuperar senha" }} />
                        <Stack.Screen
                            name="VerifyKey"
                            component={VerifyKey}
                            options={{ headerTitle: "Verificar a chave" }} />
                    </Stack.Navigator>
                )}
            </NavigationContainer>
        </AuthContext.Provider >
    )
}