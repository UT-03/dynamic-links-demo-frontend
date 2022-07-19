import React from 'react';
import { StyleSheet, View } from 'react-native';
import AuthForm from '../components/AuthForm';
import colors from '../constants/colors';

const AuthScreen = () => {
    return (
        <>
            <View style={styles.rootContainer}>
                <AuthForm />
            </View>
        </>
    );
};

export default AuthScreen;

const styles = StyleSheet.create({
    rootContainer: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: colors.primary100
    }
})