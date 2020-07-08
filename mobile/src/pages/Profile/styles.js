import styled, { css } from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  padding: 22px;
  align-items: center;
  background-color: #fff;
`;

export const ProfileImage = styled.Image`
  width: 140px;
  height: 140px;
  border-radius: 70px;
`;

export const Content = styled.View`
  width: 100%;
  padding-top: 30px;
`;

export const Text = styled.Text`
  ${(props) =>
    props.primary
      ? css`
          color: #444444;
          font-size: 28px;
          font-weight: bold;
          margin-bottom: 16px;
        `
      : css`
          color: #666666;
          font-size: 14px;
        `}
`;

export const LogoutButton = styled.TouchableOpacity`
  width: 100%;
  height: 45px;
  background-color: #e74040;
  border-radius: 4px;
  justify-content: center;
  align-items: center;
  margin: 16px 0px;
`;

export const LogoutButtonText = styled.Text`
  color: #fff;
  font-size: 16px;
  font-weight: bold;
`;
