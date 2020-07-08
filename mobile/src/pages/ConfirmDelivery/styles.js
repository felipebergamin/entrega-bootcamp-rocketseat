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

export const TakePhotoButton = styled.TouchableOpacity`
  background-color: #0000004d;
  width: 50px;
  height: 50px;
  border-radius: 25px;
  align-items: center;
  justify-content: center;
  align-self: center;
`;

export const SubmitButton = styled.TouchableOpacity`
  background-color: ${(props) => (props.disabled ? '#9485AD' : '#7d40e7')};
  align-self: center;
  justify-content: center;
  align-items: center;
  border-radius: 4px;
  elevation: 1;
  height: 45px;
  width: 90%;
  margin: 20px 0px;
`;

export const SubmitButtonText = styled.Text`
  color: #fff;
  font-weight: bold;
  font-size: 16px;
`;
