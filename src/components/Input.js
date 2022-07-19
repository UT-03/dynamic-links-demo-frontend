import React from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import colors from '../constants/colors';

const Input = ({ label, invalid, style, textInputConfig }) => {

    const inputStyles = [styles.input];

    if (textInputConfig && textInputConfig.multiline) {
        inputStyles.push(styles.inputMultiline)
    }

    if (invalid) {
        inputStyles.push(styles.invalidInput);
    }

    return (
        <View style={[styles.inputContainer, style]}>
            <Text style={[styles.label, invalid && styles.invalidLabel]}>{label}</Text>
            <TextInput style={inputStyles} {...textInputConfig} />
        </View>
    );
}

export default Input;

const styles = StyleSheet.create({
    inputContainer: {
        marginHorizontal: 4,
        marginVertical: 8
    },
    label: {
        fontSize: 16,
        color: colors.primary500,
        marginBottom: 4,
    },
    input: {
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: colors.primary500,
        color: colors.primary900,
        padding: 6,
        borderRadius: 6,
        fontSize: 18,
    },
    inputMultiline: {
        minHeight: 100,
        textAlignVertical: 'top'
    },
    invalidLabel: {
        color: colors.error500
    },
    invalidInput: {
        backgroundColor: colors.error50
    }
});
