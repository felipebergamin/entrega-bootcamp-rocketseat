import styled from 'styled-components';
import { transparentize } from 'polished';

export const StatusTag = styled.p`
  color: ${(props) => props.color};
  background: ${({ color }) => transparentize(0.9, color)};
  padding: 4px 6px;
  border-radius: 15%;

  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const Dot = styled.div`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  margin-right: 8px;
  background-color: ${(props) => props.color};
`;

export const ModalContent = styled.div`
  strong,
  p {
    margin: 10px 0px;
  }

  strong {
    font-weight: bold;
  }

  p {
    font-weight: normal;
  }

  hr {
    margin: 10px 0px;
    border-color: #33333311;
    border-width: 1px;
  }
`;

export const SignatureImage = styled.img`
  display: block;
  margin-top: 20px;
  max-height: 300px;
`;
