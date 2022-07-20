import React, { useContext, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import colors from '../constants/colors';
import globalVariables from '../constants/globalVariables';
import { AuthContext } from '../context/AuthContext';
import { useHttpClient } from '../hooks/HttpHook';
import ActivityIndicatorComponent from './ActivityIndicatorComponent';
import Button from './Button';
import ErrorMessage from './ErrorMessage';
import Input from './Input';

const AuthForm = ({ inviteeId }) => {
    const [isLoginMode, setIsLoginMode] = useState(true);
    const [inputs, setInputs] = useState({
        name: {
            value: '',
            isValid: true
        },
        phoneNumber: {
            value: '',
            isValid: true
        },
        password: {
            value: '',
            isValid: true
        },
        confirmPassword: {
            value: '',
            isValid: true
        }
    });

    const { isLoading, error, sendRequest, clearError } = useHttpClient();

    const auth = useContext(AuthContext);

    const inputChangedHandler = (inputIdentifier, enteredValue) => {
        setInputs((curInputs) => {
            return {
                ...curInputs,
                [inputIdentifier]: { value: enteredValue, isValid: true },
            };
        });
    }

    const modeHandler = () => {
        setIsLoginMode(currState => !currState);
    }

    const submitHandler = () => {
        let url;
        if (isLoginMode)
            url = `${globalVariables.backendHost}/auth/login`;
        else
            url = `${globalVariables.backendHost}/auth/signup`;

        console.log(url, inviteeId, inputs);

        return sendRequest(url,
            'POST',
            JSON.stringify({
                name: inputs.name.value,
                phoneNumber: inputs.phoneNumber.value,
                password: inputs.password.value,
                inviteeId: inviteeId
            }),
            {
                'Content-Type': 'application/json'
            }
        )
            .then(res => {
                auth.login(res.token, res.userId);
            })
            .catch(err => {
            })
    }

    return (
        <>
            {
                isLoading ? (
                    <ActivityIndicatorComponent />
                ) : (
                    <>
                        <View style={styles.headingContainer}>
                            <Text style={styles.heading}>Login required</Text>
                        </View>
                        <View>
                            {!isLoginMode && (
                                <Input
                                    label="Name"
                                    invalid={!inputs.name.isValid}
                                    textInputConfig={{
                                        value: inputs.name.value,
                                        onChangeText: (enteredValue) => inputChangedHandler('name', enteredValue)
                                    }} />
                            )}
                            <Input
                                label="Phone Number"
                                invalid={!inputs.phoneNumber.isValid}
                                textInputConfig={{
                                    keyboardType: 'decimal-pad',
                                    value: inputs.phoneNumber.value,
                                    onChangeText: (enteredValue) => inputChangedHandler('phoneNumber', enteredValue)
                                }} />
                            <Input
                                label="Password"
                                invalid={!inputs.password.isValid}
                                textInputConfig={{
                                    secureTextEntry: true,
                                    value: inputs.password.value,
                                    autoCapitalize: 'none',
                                    onChangeText: (enteredValue) => inputChangedHandler('password', enteredValue)
                                }} />
                            {!isLoginMode && (
                                <Input
                                    label="Confirm Password"
                                    invalid={!inputs.confirmPassword.isValid}
                                    textInputConfig={{
                                        secureTextEntry: true,
                                        value: inputs.confirmPassword.value,
                                        onChangeText: (enteredValue) => inputChangedHandler('confirmPassword', enteredValue)
                                    }} />
                            )}

                            <Button
                                color={colors.primary500}
                                textColor='white'
                                title={isLoginMode ? 'Login' : 'Signup'}
                                onPress={submitHandler} />
                            <View>
                                {isLoginMode ? (
                                    <Text style={styles.textHighlightContainer}>Don't have an account? Switch to <Text style={styles.textHighlight} onPress={modeHandler}>Signup</Text>.</Text>
                                ) : (
                                    <Text style={styles.textHighlightContainer}>Already have an account? Switch to <Text style={styles.textHighlight} onPress={modeHandler}>Login</Text>.</Text>
                                )}
                            </View>
                        </View>
                        {error && (
                            <ErrorMessage
                                onClearError={clearError}
                                errorMessage={error} />
                        )}
                    </>
                )
            }


        </>
    );
};

export default AuthForm;

const styles = StyleSheet.create({
    headingContainer: {

    },
    heading: {
        color: colors.primary500,
        textAlign: 'center',
        fontSize: 24
    },
    textHighlightContainer: {
        textAlign: 'center',
        marginTop: 6
    },
    textHighlight: {
        fontWeight: 'bold',
        color: colors.primary500
    }
})