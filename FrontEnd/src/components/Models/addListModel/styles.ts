import styled from "styled-components";
import { shadow } from "../../../GlobalStyles";

type propsCss = {
  position: {
    top: string;
    left: string;
  };
  backgroundColor: string;
  colorText: string;
};

export const ListContainer = styled.div<propsCss>`
  position: absolute;
  display: flex;
  flex-direction: column;
  background-color: ${(props: propsCss) => props.backgroundColor};
  padding: 40px;
  border-radius: 10px;
  box-shadow: ${shadow.sombra};
  top: ${(props: propsCss) => props.position.top};
  left: ${(props: propsCss) => props.position.left};
  z-index: 5;
  color: ${(props: propsCss) => props.colorText};
  input {
    margin: 10px 0;
    color: black;
  }
  h3 {
    margin: 0;
  }
  button {
    margin-top: 8px;
  }
  .btn-outline-danger {
    margin-top: 16px;
  }
  .buttons {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 8px;
    button {
      margin: 0;
    }
  }
`;
