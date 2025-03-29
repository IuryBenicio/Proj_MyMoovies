import styled from "styled-components";
import { minHeight } from "../../GlobalStyles";

export const ErrorPageContainer = styled.div`
  width: 100dvw;
  height: ${minHeight};
  margin-top: 300px;
  background-color: white;
  color: black;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  a:hover {
    color: grey;
  }
`;
