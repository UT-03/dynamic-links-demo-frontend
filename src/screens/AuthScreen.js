import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import AuthForm from '../components/AuthForm';
import colors from '../constants/colors';
import dynamicLinks from '@react-native-firebase/dynamic-links';

const AuthScreen = () => {
    useEffect(() => {
        const fetchInitialLink = () => {
            return dynamicLinks().getInitialLink()
                .then(url => {
                    console.log('incoming url', url);
                })
                .catch(err => {
                    console.log(err);
                })
        }

        fetchInitialLink();
    })

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