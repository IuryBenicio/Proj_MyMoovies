import styled from "styled-components";
import { shadow } from "../../../GlobalStyles";

export const ListContainer = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  background-color: white;
  padding: 40px;
  border-radius: 10px;
  box-shadow: ${shadow.sombra};
  top: 40%;
  left: 43.8%;
  z-index: 5;
  input {
    margin: 10px 0;
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
`;
