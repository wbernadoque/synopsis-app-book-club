import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext } from 'react';
import apiInstance from '../../api';

interface AuthProps {
  getToken: () => Promise<string | null>;
  setToken: (token: string) => void;
  getUser: () => Promise<string | null>;
  setUser: (user: string) => void;
  getEmail: () => Promise<string | null>;
  setAuthEmail: (email: string) => void;
  getId: () => Promise<string | null>;
  setAuthId: (id: number) => void;
  removeData: () => void;
}

export const AuthContext = createContext<AuthProps>({} as AuthProps);

interface Props {
  children?: JSX.Element;
}

export const AuthProvider: React.FC<Props> = ({ children }) => {
  const getToken = async () => {
    return await AsyncStorage.getItem('token');
  };

  const setToken = async (token: string) => {
    await AsyncStorage.setItem('token', token);
  };

  const getUser = async () => {
    return await AsyncStorage.getItem('user');
  };

  const setUser = async (user: string) => {
    await AsyncStorage.setItem('user', user);
  };

  const getEmail = async () => {
    return await AsyncStorage.getItem('email');
  };

  const setAuthEmail = async (email: string) => {
    await AsyncStorage.setItem('email', email);
  };

  const getId = async () => {
    return await AsyncStorage.getItem('id');
  };

  const setAuthId = async (id: number) => {
    await AsyncStorage.setItem('id', id.toString());
  };

  const removeData = async () => {
    await AsyncStorage.removeItem('id');
    await AsyncStorage.removeItem('token');
    await AsyncStorage.removeItem('user');
    await AsyncStorage.removeItem('email');
    apiInstance.defaults.headers.Authorization = ``;
  };

  return (
    <AuthContext.Provider
      value={{
        getToken,
        setToken,
        getUser,
        setUser,
        getEmail,
        setAuthEmail,
        getId,
        setAuthId,
        removeData,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
