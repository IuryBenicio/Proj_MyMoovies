import styled from "styled-components";
import { cores } from "../../../GlobalStyles";

type props = {
  night: boolean;
};

export const ConfirmModelContainer = styled.div<props>`
  position: absolute;
  z-index: 4;
  width: 100%;
  top: 0;
  left: 0;
  height: calc(100%);
  background-color: rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  cursor: default;
  .card {
    width: 300px;
    text-align: center;
    background-color: ${(props) =>
      props.night === true ? cores.card : "white"};
    color: ${(props) => (props.night === true ? "white" : "black")};
    border: 1px solid black;
    padding: 34px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .actions {
      button {
        cursor: pointer;
      }
      button:not(:first-child) {
        margin-left: 8px;
      }
    }
  }
`;
