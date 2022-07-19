import React from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import colors from '../constants/colors';

const ActivityIndicatorComponent = () => {
    return (
        <View style={styles.rootContainer}>
            <ActivityIndicator
                color={colors.primary500}
                size="large" />
        </View>
    );
};

export default ActivityIndicatorComponent;

const styles = StyleSheet.create({
    rootContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: 'center',
        backgroundColor: colors.primary100
    }
})