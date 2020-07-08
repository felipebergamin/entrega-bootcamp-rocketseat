import styled from 'styled-components';
import { transparentize } from 'polished';

export const Container = styled.div`
  height: 40px;
  width: 40px;
  border-radius: 50%;
  border: 1px solid ${(props) => props.color};
  background-color: ${(props) => transparentize(0.9, props.color)};
  font-weight: bold;
  color: ${(props) => props.color};

  display: flex;
  align-items: center;
  justify-content: center;
`;
