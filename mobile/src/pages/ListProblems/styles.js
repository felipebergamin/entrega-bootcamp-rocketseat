import styled from 'styled-components/native';

export const Container = styled.View`
  background-color: #fff;
  flex: 1;
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

export const DeliveryProblem = styled.View`
  width: 90%;
  background-color: #fff;
  border: 1px solid #0000001a;
  align-self: center;
  padding: 16px;
  border-radius: 4px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const ProblemDescription = styled.Text`
  color: #999999;
  font-size: 16px;
`;

export const ProblemDate = styled.Text`
  color: #c1c1c1;
  font-size: 12px;
`;

export const ItemSeparator = styled.View`
  height: 10px;
`;

export const ProductName = styled.Text`
  color: #fff;
  font-size: 20px;
  font-weight: bold;
  text-align: center;
  padding-bottom: 10px;
`;
