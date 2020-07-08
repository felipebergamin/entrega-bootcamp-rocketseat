import styled from 'styled-components/native';

export const TextInput = styled.TextInput.attrs({
  placeholderTextColor: '#999999',
})`
  height: 45px;
  border: 1px solid #ddd;
  border-radius: 4px;
  background-color: #fff;
  width: 100%;
  padding-left: 20px;
  padding-right: 20px;
`;
