import styled, { css } from 'styled-components/native';
import { StyleSheet } from 'react-native';

const { hairlineWidth } = StyleSheet;

export const Container = styled.ScrollView`
  background-color: #fff;
`;

export const Header = styled.View`
  background-color: #7d40e7;
  height: 160px;
`;

export const HeaderContent = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-top: 38px;
  position: relative;
`;

export const HeaderTitle = styled.Text`
  font-size: 16px;
  color: #fff;
  font-weight: bold;
`;

export const ContentCard = styled.View`
  width: 90%;
  border: 1px solid #ddd;
  align-self: center;
  background-color: #fff;
  padding: 16px;
  margin-bottom: 10px;
`;

export const CardHeader = styled.View``;

export const CardBody = styled.View``;

export const CardTitle = styled.Text`
  color: #7d40e7;
  font-size: 16px;
  font-weight: bold;
`;

export const CardText = styled.Text`
  font-size: 16px;
  margin: 4px 0px;

  ${(props) =>
    props.label &&
    css`
      color: #999999;
      font-weight: bold;
    `}
`;

export const BodyRow = styled.View`
  flex-direction: row;
`;

export const BodyGroup = styled.View`
  flex: 1;
`;

export const ButtonGroup = styled.View`
  flex-direction: row;
  align-self: center;
  width: 90%;
`;

export const Button = styled.TouchableOpacity`
  flex: 1;
  background-color: #f8f9fd;
  border: ${hairlineWidth}px solid #0000001a;
  height: 100px;
  align-items: center;
  justify-content: center;
  padding: 10px;
`;

export const ButtonText = styled.Text`
  text-align: center;
  color: #999999;
`;

export const CardsContainer = styled.View`
  margin-top: -75px;
`;
