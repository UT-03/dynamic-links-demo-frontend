import { useState, useCallback, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const KEY = 'dynamic-linking-demo-user-details';

export const useAuth = () => {
    const [token, setToken] = useState();
    const [userId, setUserId] = useState();
    const [isInvited, setIsInvited] = useState();
    const [hasPlayedAtLeastOneGame, setHasPlayedAtLeastOneGame] = useState();
    const [checked, setChecked] = useState(false);

    const login = useCallback(async (token, userId, isInvited, hasPlayedAtLeastOneGame) => {
        setToken(token);
        setUserId(userId);
        setIsInvited(isInvited);
        setHasPlayedAtLeastOneGame(hasPlayedAtLeastOneGame);

        await AsyncStorage.setItem(KEY, JSON.stringify({
            userId: userId,
            token: token,
            isInvited: isInvited,
            hasPlayedAtLeastOneGame: hasPlayedAtLeastOneGame,
        }));
    }, []);

    const logout = useCallback(async () => {
        setToken(null);
        setUserId(null);
        setIsInvited(null);
        setHasPlayedAtLeastOneGame(null);

        await AsyncStorage.removeItem(KEY);
    }, []);

    const confirmOneGamePlay = useCallback(async () => {
        setHasPlayedAtLeastOneGame(true);
        AsyncStorage.getItem(KEY)
            .then(async (res) => {
                if (!res)
                    return;

                return JSON.parse(res);
            })
            .then(async (data) => {
                await AsyncStorage.setItem(KEY, JSON.stringify({
                    ...data,
                    hasPlayedAtLeastOneGame: true,
                }));
            })
    }, []);

    useEffect(() => {
        AsyncStorage.getItem(KEY)
            .then(res => {
                if (!res)
                    return;

                const data = JSON.parse(res);

                login(data.token, data.userId, data.isInvited, data.hasPlayedAtLeastOneGame);
            })
            .finally(() => {
                setChecked(true);
            })
    }, [login]);

    return { token, userId, isInvited, hasPlayedAtLeastOneGame, checked, login, logout, confirmOneGamePlay };
};