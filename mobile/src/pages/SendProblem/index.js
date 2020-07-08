import React, { useState } from 'react';
import { TouchableOpacity, Alert } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';

import api from '~/services/api';

import {
  Container,
  Header,
  HeaderContent,
  HeaderTitle,
  TextArea,
  SubmitButton,
  SubmitButtonText,
} from './styles';

const SendProblem = () => {
  const [problemDescription, setProblemDescription] = useState('');
  const navigation = useNavigation();
  const {
    params: { id: order_id },
  } = useRoute();

  const handleSubmit = async () => {
    try {
      await api.post(`orders/${order_id}/problems/`, {
        description: problemDescription,
      });

      setProblemDescription(null);
    } catch (err) {
      Alert.alert('Houve um erro ao salvar as informações');
    }
  };

  return (
    <Container>
      <Header>
        <HeaderContent>
          <TouchableOpacity
            onPress={navigation.goBack}
            style={{ position: 'absolute', left: 20 }}
          >
            <Icon name="arrow-back" size={26} color="#fff" />
          </TouchableOpacity>
          <HeaderTitle>Informar Problema</HeaderTitle>
        </HeaderContent>
      </Header>

      <TextArea
        placeholder="Inclua aqui o problema que ocorreu na entrega"
        value={problemDescription}
        onChangeText={setProblemDescription}
        autoCapitalize="sentences"
        autoCorrect
        autoFocus
      />

      <SubmitButton disabled={!problemDescription} onPress={handleSubmit}>
        <SubmitButtonText>Enviar</SubmitButtonText>
      </SubmitButton>
    </Container>
  );
};

export default SendProblem;
