import React from 'react';
import { StatusBar } from 'react-native';

import Routes from '~/routes';
import AuthProvider from '~/contexts/auth';

const App = () => {
  return (
    <>
      <StatusBar backgroundColor="#ffffff" barStyle="light-content" />
      <AuthProvider>
        <Routes />
      </AuthProvider>
    </>
  );
};

export default App;
