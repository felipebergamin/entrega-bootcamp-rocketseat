import React, { createContext, useState, useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import AsyncStorage from '@react-native-community/async-storage';
import Splash from 'react-native-splash-screen';

import api from '~/services/api';

export const AuthContext = createContext({});

const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [isAuth, setIsAuth] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.defaults.headers.common.Authorization = `Bearer ${token}`;
  }, [token]);

  useEffect(() => {
    const load = async () => {
      const authData = await AsyncStorage.getItem('@fastfeet/credentials');

      if (!authData) {
        setLoading(false);
        return;
      }

      const { token: _token, user: _user } = JSON.parse(authData);

      setUser(_user);
      setToken(_token);
      setIsAuth(true);
      setLoading(false);
    };

    load().finally(() => Splash.hide());
  }, []);

  useEffect(() => {
    AsyncStorage.setItem(
      '@fastfeet/credentials',
      JSON.stringify({ token, user }),
    );
  }, [token, user]);

  const tryLogin = useCallback((id) => {
    const login = async (courierId) => {
      const { data } = await api.post('auth-courier/', {
        id: courierId,
      });

      setToken(data.token);
      setUser(data.user);
      setIsAuth(true);
    };

    return login(id);
  }, []);

  const logout = useCallback(() => {
    setIsAuth(false);
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider value={{ isAuth, user, tryLogin, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthProvider;
