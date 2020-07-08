import styled from 'styled-components';

export const Form = styled.form`
  background-color: #fff;
  width: 100%;
  max-width: 400px;
  padding: 30px;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
`;

export const InputLabel = styled.label`
  display: flex;
  flex-direction: column;
  font-size: 1rem;
  text-transform: uppercase;
  font-weight: bold;
  color: #000000cc;
  margin: 10px 0;
`;

export const TextInput = styled.input`
  height: 2.5rem;
  border: 1px solid rgba(0, 0, 0, 0.2);
  border-radius: 5px;
  padding: 5px 15px;
  margin: 10px 0px;
`;

export const Image = styled.img`
  width: 100%;
  margin-bottom: 20px;
`;

export const Button = styled.button`
  width: 100%;
  background-color: #7d40e7;
  border: 1px solid #7d40e7;
  padding: 10px;
  color: #fff;
  font-weight: bold;
  border-radius: 5px;
`;
