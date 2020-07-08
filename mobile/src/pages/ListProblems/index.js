import React, { useState, useEffect } from 'react';
import { TouchableOpacity, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation, useRoute } from '@react-navigation/native';

import api from '~/services/api';
import {
  Container,
  Header,
  HeaderContent,
  HeaderTitle,
  DeliveryProblem,
  ProblemDescription,
  ProblemDate,
  ItemSeparator,
  ProductName,
} from './styles';

const ListProblems = () => {
  const [list, setList] = useState(null);
  const navigation = useNavigation();
  const {
    params: { id: order_id, product },
  } = useRoute();

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await api.get(`orders/${order_id}/problems/`);
      setList(data);
    };

    fetchData();
  }, [order_id]);

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
          <HeaderTitle>Visualizar Problemas</HeaderTitle>
        </HeaderContent>
      </Header>

      <FlatList
        data={list}
        keyExtractor={(item) => String(item.id)}
        ItemSeparatorComponent={ItemSeparator}
        style={{ marginTop: -50 }}
        ListHeaderComponent={() => <ProductName>{product}</ProductName>}
        renderItem={({ item }) => (
          <DeliveryProblem>
            <ProblemDescription>{item.description}</ProblemDescription>
            <ProblemDate>{item.createdAt}</ProblemDate>
          </DeliveryProblem>
        )}
      />
    </Container>
  );
};

export default ListProblems;
