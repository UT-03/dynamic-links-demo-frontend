import React from 'react';
import { Platform, Pressable, StyleSheet, View, Text } from 'react-native';
import colors from '../constants/colors';

const Button = ({ color, textColor, title, onPress }) => {
    return (
        <View style={styles.outerContainer}>
            <View style={[styles.buttonContainer, { backgroundColor: color }]}>
                <Pressable
                    onPress={onPress}
                    style={({ pressed }) => [styles.pressable, pressed ? styles.pressed : null]}
                    android_ripple={{ color: colors.primary700 }}>
                    <Text style={{ color: textColor }}>{title}</Text>
                </Pressable>
            </View>
        </View>
    );
};

export default Button;

const styles = StyleSheet.create({
    outerContainer: {
        alignItems: 'center',
        margin: 6
    },
    buttonContainer: {
        alignItems: 'center',
        maxWidth: 150
    },
    pressable: {
        paddingVertical: 16,
        paddingHorizontal: 20,
        textAlign: 'center'
    },
    pressed: {
        opacity: Platform.OS === 'ios' ? 0.75 : 1
    }
})