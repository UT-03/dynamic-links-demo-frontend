import { useState, useCallback, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const KEY = 'dynamic-linking-demo-user-details';

export const useAuth = () => {
    const [token, setToken] = useState();
    const [userId, setUserId] = useState();
    const [checked, setChecked] = useState(false);

    const login = useCallback(async (token, userId) => {
        setToken(token);
        setUserId(userId);

        await AsyncStorage.setItem(KEY, JSON.stringify({
            userId: userId,
            token: token
        }));
    }, []);

    const logout = useCallback(async () => {
        setToken(null);
        setUserId(null);

        await AsyncStorage.removeItem(KEY);
    }, []);

    useEffect(() => {
        AsyncStorage.getItem(KEY)
            .then(res => {
                if (!res)
                    return;

                const data = JSON.parse(res);

                login(data.token, data.userId)
            })
            .finally(() => {
                setChecked(true);
            })
    }, [login]);

    return { token, userId, checked, login, logout };
};