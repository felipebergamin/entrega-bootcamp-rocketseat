import styled from 'styled-components';

export const Container = styled.div`
  .title-row {
    display: flex;
    flex-direction: row;
    align-items: center;
    font-size: 1.5rem;
    margin-bottom: 1rem;

    button {
      margin: 0 10px;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;

      border: none;
      height: 36px;
      font-size: 0.9rem;
      border-radius: 4px;
      background-color: #7d40e7;
      width: 120px;

      text-transform: uppercase;
      color: #fff;

      &:disabled {
        background-color: #ccc;
        cursor: not-allowed;
      }

      svg {
        font-size: 1rem;
        margin-right: 1em;
      }
    }
  }

  form {
    background-color: #fff;
    border-radius: 4px;
    padding: 30px;

    display: flex;
    flex-direction: column;

    label {
      margin: 0.75rem;
      color: #444;

      input {
        padding: 0px 1.5em;
        border-radius: 4px;
        width: 100%;
        margin-top: 4px;
        display: block;
        height: 45px;
        background: #ffffff 0% 0% no-repeat padding-box;
        border-width: 1px;
        border-style: solid;
        border-color: #dddddd;
        opacity: 1;

        &:focus {
          border: 1px solid #7d40e7;
        }
      }

      .error-message {
        color: red;
        text-align: right;
        font-size: 1em;
        margin-top: 4px;
      }
    }
  }
`;

export const Spacer = styled.div`
  flex: 1;
`;
