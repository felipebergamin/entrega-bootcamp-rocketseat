import styled from 'styled-components/native';

export const Container = styled.KeyboardAvoidingView`
  flex: 1;
  align-items: center;
  justify-content: center;
  background-color: #7d40e7;
  padding: 25px;
`;

export const Image = styled.Image`
  margin-bottom: 40px;
`;

export const SignInButton = styled.TouchableOpacity`
  background-color: #82bf18;
  border-radius: 4px;
  align-items: center;
  justify-content: center;
  margin-top: 15px;
  height: 45px;
  width: 100%;
`;

export const ButtonText = styled.Text`
  font-size: 16px;
  font-weight: bold;
  color: #fff;
`;
