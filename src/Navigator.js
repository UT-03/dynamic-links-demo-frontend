import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useContext } from 'react';
import colors from './constants/colors';
import { AuthContext } from './context/AuthContext';

import AuthScreen from './screens/AuthScreen';
// import ChatScreen from './screens/ChatScreen';
import HomeScreen from './screens/HomeScreen';
import { Pressable, Text } from 'react-native';

const Stack = createNativeStackNavigator();

const Navigator = () => {
    const auth = useContext(AuthContext);

    return (
        <Stack.Navigator
            screenOptions={{
                headerStyle: {
                    backgroundColor: colors.primary500
                },
                headerTintColor: 'white',
            }}
        >
            {auth.isLoggedIn ? (
                <>
                    <Stack.Screen
                        name="home"
                        component={HomeScreen}
                        options={{
                            title: "Dynamic Links Demo",
                            headerRight: () => {
                                return (
                                    <Pressable
                                        onPress={() => auth.logout()}>
                                        <Text>Logout</Text>
                                    </Pressable>
                                )
                            }
                        }} />
                </>
            ) : (
                <Stack.Screen
                    name="auth"
                    component={AuthScreen}
                    options={{
                        headerShown: false
                    }} />
            )}
        </Stack.Navigator>
    );
};

export default Navigator;