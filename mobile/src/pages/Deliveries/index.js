import React, { useState, useCallback } from 'react';
import { View, StatusBar, TouchableOpacity, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useFocusEffect } from '@react-navigation/native';

import { AuthContext } from '~/contexts/auth';
import api from '~/services/api';
import DeliveryCard from '~/components/DeliveryCard';
import {
  Container,
  UserInfoBox,
  UserImage,
  WelcomeText,
  UserName,
  Spacer,
  TitleRow,
  Title,
  FilterText,
  ItemSeparator,
} from './styles';

const LIMIT = 10;

const Deliveries = () => {
  const auth = React.useContext(AuthContext);
  const [list, setList] = useState(null);
  const [listType, setListType] = useState('pending');
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [disablePaging, setDisablePaging] = useState(false);

  const apiUrl = React.useMemo(() => {
    const urls = {
      pending: `/couriers/${auth.user.id}/pending`,
      delivered: `/couriers/${auth.user.id}/delivered`,
    };

    return urls[listType];
  }, [listType, auth.user.id]);

  const loadData = useCallback(() => {
    const fetchData = async () => {
      setLoading(true);

      const { data } = await api.get(apiUrl, {
        params: {
          limit: LIMIT,
          offset: 0,
        },
      });

      setList(data);
      setLoading(false);
      setPage(0);
    };

    fetchData();
  }, [apiUrl]);

  const fetchMore = useCallback(() => {
    if (disablePaging) return;

    const fetchData = async () => {
      setLoading(true);

      const { data } = await api.get(apiUrl, {
        params: {
          limit: LIMIT,
          offset: (page + 1) * LIMIT,
        },
      });

      if (data.length < LIMIT) setDisablePaging(true);
      setList((state) => [...state, ...data]);
      setLoading(false);
      setPage((currentPage) => currentPage + 1);
    };

    fetchData();
  }, [apiUrl, page, disablePaging]);

  useFocusEffect(loadData);

  // eslint-disable-next-line react/prop-types
  const renderItem = ({ item }) => <DeliveryCard data={item} />;

  return (
    <Container>
      <StatusBar barStyle="dark-content" />

      <UserInfoBox>
        <UserImage source={{ uri: auth.user.avatar.url }} />

        <View>
          <WelcomeText>Bem vindo de volta,</WelcomeText>

          <UserName>{auth?.user.name}</UserName>
        </View>

        <Spacer />

        <TouchableOpacity onPress={auth.logout}>
          <Icon name="exit-to-app" color="#E74040" size={28} />
        </TouchableOpacity>
      </UserInfoBox>

      <TitleRow>
        <Title>Entregas</Title>

        <Spacer />

        <TouchableOpacity onPress={() => setListType('pending')}>
          <FilterText selected={listType === 'pending'}>Pendentes</FilterText>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setListType('delivered')}>
          <FilterText selected={listType === 'delivered'}>Entregues</FilterText>
        </TouchableOpacity>
      </TitleRow>

      <FlatList
        data={list}
        keyExtractor={(item) => String(item.id)}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={ItemSeparator}
        onRefresh={loadData}
        refreshing={loading}
        onEndReached={fetchMore}
        onEndReachedThreshold={0.2}
      />
    </Container>
  );
};

export default Deliveries;
