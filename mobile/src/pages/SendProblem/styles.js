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

export const TextArea = styled.TextInput.attrs({
  placeholderTextColor: '#999999',
  numberOfLines: 10,
  textAlignVertical: 'top',
  multiline: true,
})`
  border: 1px solid #0000001a;
  height: 240px;
  border-radius: 5px;
  background-color: #fff;
  align-self: center;
  width: 90%;
  font-size: 18px;
  padding: 20px;
  justify-content: flex-start;

  margin-top: -50px;
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
