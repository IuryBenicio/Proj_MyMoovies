import styled from "styled-components";
import { cores } from "../../GlobalStyles";

type props = {
  night: boolean;
};

export const FooterContainer = styled.div<props>`
  width: 100%;
  padding: 24px;
  display: flex;
  justify-content: center;
  background-color: ${(props) => (props.night === true ? cores.card : "white")};
  color: ${(props) => (props.night === true ? "white" : "black")};
  .icons {
    display: flex;
    text-align: center;
    flex-direction: column;
    a {
      color: ${(props) => (props.night === true ? "white" : "black")};
    }
  }
`;
