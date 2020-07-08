import styled from 'styled-components';

export const Container = styled.div`
  color: #ddd;
  align-self: center;
  position: relative;

  height: 190px;
  width: 190px;
  border-radius: 50%;
  border: 1px solid #ddd;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  img {
    border-radius: 50%;
    height: 190px;
    width: 190px;
  }

  label {
    cursor: pointer;

    .fileinput {
      width: 0.1px;
      height: 0.1px;
      opacity: 0;
      overflow: hidden;
      position: absolute;
      z-index: -1;
    }
  }
`;
