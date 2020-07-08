import React, { useMemo } from 'react';

import parseISO from 'date-fns/parseISO';
import format from 'date-fns/format';
import { AuthContext } from '~/contexts/auth';
import {
  Container,
  ProfileImage,
  Text,
  Content,
  LogoutButton,
  LogoutButtonText,
} from './styles';

const Profile = () => {
  const auth = React.useContext(AuthContext);

  const formattedCreatedAt = useMemo(() => {
    return format(parseISO(auth.user.createdAt), 'dd/MM/yyyy');
  }, [auth.user.createdAt]);

  return (
    <Container>
      <ProfileImage source={{ uri: auth.user.avatar?.url }} />

      <Content>
        <Text>Nome Completo</Text>
        <Text primary>{auth.user.name}</Text>

        <Text>E-mail</Text>
        <Text primary>{auth.user.email}</Text>

        <Text>Data de Cadastro</Text>
        <Text primary>{formattedCreatedAt}</Text>
      </Content>

      <LogoutButton onPress={auth.logout}>
        <LogoutButtonText>Logout</LogoutButtonText>
      </LogoutButton>
    </Container>
  );
};

export default Profile;
