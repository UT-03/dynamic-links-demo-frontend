import React, { useEffect } from 'react';
import { useAuth } from './hooks/AuthHook';
import ActivityIndicatorComponent from './components/ActivityIndicatorComponent';
import { AuthContext } from './context/AuthContext';
import { NavigationContainer } from '@react-navigation/native';
import Navigator from './Navigator';

const App = () => {
  const { token, userId, isInvited, hasPlayedAtLeastOneGame, login, logout, checked } = useAuth();

  return (
    <>
      {checked ? (
        <AuthContext.Provider
          value={{
            isLoggedIn: !!token,
            token: token,
            login: login,
            logout: logout,
            userId: userId,
            isInvited: isInvited,
            hasPlayedAtLeastOneGame: hasPlayedAtLeastOneGame,
          }}
        >
          <NavigationContainer>
            <Navigator />
          </NavigationContainer>
        </AuthContext.Provider>
      ) : (
        <ActivityIndicatorComponent />
      )}
    </>
  );
};

export default App;