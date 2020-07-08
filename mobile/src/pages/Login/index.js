import React, { useState, useContext } from 'react';
import { Platform, Alert, StatusBar } from 'react-native';

import { Container, SignInButton, ButtonText, Image } from './styles';
import TextInput from '~/components/TextInput';
import { AuthContext } from '~/contexts/auth';

const Login = () => {
  const [courierId, setCourierId] = useState('');
  const auth = useContext(AuthContext);

  const handleButtonPress = async () => {
    try {
      await auth.tryLogin(courierId);
    } catch (err) {
      Alert.alert('Erro', 'Código não encontrado');
    }
  };

  return (
    <Container enabled behavior={Platform.OS === 'ios' ? 'padding' : null}>
      <StatusBar backgroundColor="#7d40e7" />

      <Image source={require('~/assets/logo-white.png')} />

      <TextInput
        placeholder="Informe seu ID de cadastro"
        value={courierId}
        onChangeText={setCourierId}
      />

      <SignInButton onPress={handleButtonPress}>
        <ButtonText>Entrar no Sistema</ButtonText>
      </SignInButton>
    </Container>
  );
};

export default Login;
