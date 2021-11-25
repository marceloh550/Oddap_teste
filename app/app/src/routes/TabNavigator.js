import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import {ListUserStack} from './StackNavigator';

import Home from '../pages/Home';
import Profile from '../pages/Profile';
import ListUsers from '../pages/ListUsers';

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
    return(
        <Tab.Navigator>
            <Tab.Screen 
                name="Home"
                component={Home}
                options={{
                    headerTitle: 'Dashboard',
                    tabBarLabel: 'Dashboard',
                    tabBarIcon: ({color, size}) => (
                        <MaterialCommunityIcons name="home" color={color} size={size} />
                    ),
                }}
            />

            <Tab.Screen 
                name="ListUsersTab"
                component={ListUserStack}
                options={{
                    headerShown: false,
                    tabBarLabel: 'Usuários',
                    tabBarIcon: ({color, size}) => (
                        <MaterialCommunityIcons name="view-list" color={color} size={size} />
                    ),
                }}
            />

            <Tab.Screen 
                name="Profile"
                component={Profile}
                options={{
                    headerTitle: 'Perfil',
                    tabBarLabel: 'Perfil',
                    tabBarIcon: ({color, size}) => (
                        <MaterialCommunityIcons name="account" color={color} size={size} />
                    ),
                }}
            />
        </Tab.Navigator>
    )
}

export default BottomTabNavigator;