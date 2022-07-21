import React, { useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { AuthContext } from '../context/AuthContext';
import Button from '../components/Button';
import colors from '../constants/colors';
import Clipboard from '@react-native-community/clipboard';
import { useHttpClient } from '../hooks/HttpHook';
import globalVariables from '../constants/globalVariables';

const HomeScreen = () => {
    const auth = useContext(AuthContext);

    const [inviteLink, setInviteLink] = useState('');

    const { sendRequest } = useHttpClient();

    useEffect(() => {
        const fetchInviteLink = () => {
            return sendRequest(
                `${globalVariables.backendHost}/user/invite-link`,
                'GET',
                null,
                {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + auth.token,
                }
            );
        };

        fetchInviteLink()
            .then(res => {
                setInviteLink(res.inviteLink);
            })
            .catch(err => {
                console.log(err);
            });
    }, []);

    const handleGamePlay = () => {
        sendRequest(
            `${globalVariables.backendHost}/user/play-game`,
            'POST',
            null,
            {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + auth.token,
            }
        )
            .then(() => {
                if (auth.isInvited && !auth.hasPlayedAtLeastOneGame) {
                    sendRequest(
                        `${globalVariables.backendHost}/user/confirm-reward`,
                        'POST',
                        null,
                        {
                            'Content-Type': 'application/json',
                            'Authorization': 'Bearer ' + auth.token,
                        }
                    )
                        .then(() => auth.confirmOneGamePlay())
                        .catch(err => { });
                }
            });
    };

    return (
        <View>
            <Text style={styles.inviteLinkText}>
                Invite Link: {inviteLink}
            </Text>
            <Button
                color={colors.primary500}
                textColor="white"
                title="Copy"
                onPress={() => {
                    Clipboard.setString(inviteLink);
                }} />
            <Button
                color={colors.primary500}
                textColor="white"
                title="Play Game"
                onPress={handleGamePlay} />
        </View>
    );
};

export default HomeScreen;

const styles = StyleSheet.create({
    inviteLinkText: {
        color: 'black',
    },
});
