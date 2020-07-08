import React, { useMemo } from 'react';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import PropTypes from 'prop-types';
import parseISO from 'date-fns/parseISO';
import format from 'date-fns/format';
import { useNavigation } from '@react-navigation/native';

import {
  DeliveryCard as Container,
  CardHeader,
  DeliveryName,
  CardContent,
  CardFooter,
  FooterBlock,
  BlockLabel,
  BlockValue,
  FooterLink,
  Timeline,
  TimelinePoint,
  TimelineText,
} from './styles';

const DeliveryCard = ({ data }) => {
  const navigation = useNavigation();

  const formattedDate = useMemo(() => {
    return format(parseISO(data.createdAt), 'dd/MM/yyyy');
  }, [data.createdAt]);

  return (
    <Container>
      <CardHeader>
        <Icon name="local-shipping" color="#7D40E7" size={28} />

        <DeliveryName>{data.product}</DeliveryName>
      </CardHeader>

      <CardContent>
        <Timeline>
          <TimelinePoint completed={data.step >= 1}>
            <TimelineText>Aguardando Retirada</TimelineText>
          </TimelinePoint>
          <TimelinePoint completed={data.step >= 2}>
            <TimelineText>Retirado</TimelineText>
          </TimelinePoint>
          <TimelinePoint completed={data.step >= 3}>
            <TimelineText>Entregue</TimelineText>
          </TimelinePoint>
        </Timeline>
      </CardContent>

      <CardFooter>
        <FooterBlock>
          <BlockLabel>Data</BlockLabel>
          <BlockValue>{formattedDate}</BlockValue>
        </FooterBlock>

        <FooterBlock>
          <BlockLabel>Cidade</BlockLabel>
          <BlockValue>{data.recipient.city}</BlockValue>
        </FooterBlock>

        <FooterBlock>
          <TouchableOpacity
            onPress={() => navigation.navigate('OrderDetail', data)}
          >
            <FooterLink>Ver Detalhes</FooterLink>
          </TouchableOpacity>
        </FooterBlock>
      </CardFooter>
    </Container>
  );
};

DeliveryCard.propTypes = {
  data: PropTypes.shape({
    product: PropTypes.string,
    createdAt: PropTypes.string,
    step: PropTypes.number,
    recipient: PropTypes.shape({
      city: PropTypes.string,
    }),
  }).isRequired,
};

export default DeliveryCard;
