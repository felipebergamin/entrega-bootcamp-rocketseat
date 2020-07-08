import styled, { css } from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  padding: 14px;
  background-color: #fff;
`;

export const UserInfoBox = styled.View`
  flex-direction: row;
  align-items: center;
  width: 100%;
`;

export const UserImage = styled.Image`
  width: 80px;
  height: 80px;
  border-radius: 40px;
  margin-right: 10px;
`;

export const WelcomeText = styled.Text`
  color: #666666;
`;

export const UserName = styled.Text`
  color: #444444;
  font-size: 22px;
  font-weight: bold;
`;

export const Spacer = styled.View`
  flex: 1;
`;

export const TitleRow = styled.View`
  flex-direction: row;
  align-items: center;
  margin: 16px 0px;
`;

export const Title = styled.Text`
  color: #444444;
  font-weight: bold;
  font-size: 22px;
`;

export const FilterText = styled.Text`
  font-size: 14px;
  font-weight: bold;
  margin: 0px 0px 0px 10px;
  color: ${(props) => (props.selected ? '#7D40E7' : '#999999')};

  ${(props) =>
    props.selected &&
    css`
      text-decoration: underline;
    `}
`;

export const ItemSeparator = styled.View`
  height: 20px;
`;
