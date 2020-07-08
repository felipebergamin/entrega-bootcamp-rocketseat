import styled from 'styled-components';

export const Container = styled.div`
  height: 64px;
  background-color: #fff;
  border: 1px solid #ddd;
  padding: 19px;
  display: flex;
  align-items: center;

  img {
    height: 100%;
  }

  .separator {
    height: 100%;
    width: 1px;
    background-color: #ddd;
    margin: 0px 2rem;
  }

  ul {
    li {
      display: inline;
      font-size: 1rem;
      padding: 0px 1rem;
      cursor: pointer;
      text-transform: uppercase;
      color: #444;
    }

    .active-link {
      font-weight: bold;
    }
  }

  .spacer {
    flex: 1;
  }

  .user-box {
    display: flex;
    flex-direction: column;
    align-items: center;

    strong {
      color: #666;
    }

    p {
      color: #de3b3b;
      font-size: 0.75rem;
      cursor: pointer;
    }
  }
`;
