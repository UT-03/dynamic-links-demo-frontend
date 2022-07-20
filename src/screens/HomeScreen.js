import React, { useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { AuthContext } from '../context/AuthContext';
import firebaseDynamicLinks from '@react-native-firebase/dynamic-links';
import Button from '../components/Button';
import colors from '../constants/colors';
import Clipboard from '@react-native-community/clipboard';

const HomeScreen = () => {
    const auth = useContext(AuthContext);

    const [inviteLink, setInviteLink] = useState('');

    useEffect(() => {
        const createInviteLink = () => {
            const link = `https://dynamiclinkdemodgdfgdfgdfgdfg.page.link?invitedBy=${auth.userId}`;
            const dynamicLinkDomain = 'https://dynamiclinkdemodgdfgdfgdfgdfg.page.link';
            const dynamicLink = firebaseDynamicLinks().buildLink({
                link: link,
                domainUriPrefix: dynamicLinkDomain
            })
            return dynamicLink;
        }

        createInviteLink()
            .then(link => {
                setInviteLink(link);
            })
    })

    return (
        <View>
            <Text style={styles.inviteLinkText}>
                Invite Link: {inviteLink}
            </Text>
            <Button
                color={colors.primary500}
                textColor='white'
                title="Copy"
                onPress={() => {
                    Clipboard.setString(inviteLink);
                }} />
        </View>
    );
};

export default HomeScreen;

const styles = StyleSheet.create({
    inviteLinkText: {
        color: 'black'
    }
})