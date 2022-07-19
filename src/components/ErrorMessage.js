import { View, Text, StyleSheet } from 'react-native';
import colors from '../constants/colors';
import Button from './Button';

const ErrorMessage = ({ errorMessage, onClearError }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.heading}>An Error Occurred!</Text>
            <Text style={styles.errorMessage}>{errorMessage}</Text>
            <Button
                color={colors.error500}
                textColor="white"
                title="Okay"
                onPress={onClearError} />
        </View>
    );
};

export default ErrorMessage;

const styles = StyleSheet.create({
    container: {
        margin: 10,
        padding: 10,
        borderWidth: 1,
        borderColor: colors.error500,
        borderRadius: 6
    },
    heading: {
        textAlign: 'center',
        color: colors.error500,
        fontWeight: 'bold',
        marginBottom: 6
    },
    errorMessage: {
        marginBottom: 6
    }
})