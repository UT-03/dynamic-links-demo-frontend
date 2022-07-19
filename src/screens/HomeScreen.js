import React, { useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { AuthContext } from '../context/AuthContext';
import firebaseDynamicLinks from '@react-native-firebase/dynamic-links';

const HomeScreen = () => {
    const auth = useContext(AuthContext);

    const [inviteLink, setInviteLink] = useState('');

    useEffect(() => {
        const createInviteLink = () => {
            const link = `https://dynamiclinksdemo123456.page.link?invitedBy=${auth.userId}`;
            const dynamicLinkDomain = 'https://dynamiclinksdemo123456.page.link';
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
        <View><Text style={styles.inviteLinkText}>
            Invite Link: {inviteLink}
        </Text></View>
    );
};

export default HomeScreen;

const styles = StyleSheet.create({
    inviteLinkText: {
        color: 'black'
    }
})