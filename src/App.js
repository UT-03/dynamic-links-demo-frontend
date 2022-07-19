import React, { useEffect } from 'react';
import { Text, View } from 'react-native';
import { useAuth } from './hooks/AuthHook';
import ActivityIndicatorComponent from './components/ActivityIndicatorComponent';
import { AuthContext } from './context/AuthContext';
import { NavigationContainer } from '@react-navigation/native';
import Navigator from './Navigator';
import dynamicLinks from '@react-native-firebase/dynamic-links';

const App = () => {
  const { token, userId, login, logout, checked } = useAuth();
  useEffect(() => {
    const fetchInitialLink = () => {
      return dynamicLinks().getInitialLink()
        .then(url => {
          console.log('incoming url', url);
        })
        .catch(err => {
          console.log(err);
        })
    }

    fetchInitialLink();
  })
  return (
    <>
      {checked ? (
        <AuthContext.Provider
          value={{
            isLoggedIn: !!token,
            token: token,
            login: login,
            logout: logout,
            userId: userId
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