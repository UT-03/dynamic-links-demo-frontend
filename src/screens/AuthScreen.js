import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import AuthForm from '../components/AuthForm';
import colors from '../constants/colors';
import dynamicLinks from '@react-native-firebase/dynamic-links';

const AuthScreen = () => {
    const [inviteeId, setInviteeId] = useState();

    useEffect(() => {
    }, [inviteeId]);

    useEffect(() => {
        const fetchInitialLink = () => {
            return dynamicLinks().getInitialLink()
                .then(url => {
                    if (url && url.url.includes('invitedBy')) {
                        setInviteeId(() => url.url.split('=')[1])
                    }
                })
                .catch(() => { })
        }

        fetchInitialLink();
    })

    return (
        <>
            <View style={styles.rootContainer}>
                <AuthForm inviteeId={inviteeId} />
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