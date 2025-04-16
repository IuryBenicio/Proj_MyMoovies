import styled from "styled-components";
import { cores } from "../../../GlobalStyles";

type props = {
  night: boolean;
};

export const PerfilModelContainer = styled.div<props>`
  z-index: 3;
  position: absolute;
  width: 150px;
  height: auto;
  top: 55px;
  left: -50px;
  background-color: ${(props) => (props.night === true ? cores.card : "white")};
  overflow: hidden;
  border: solid 1px rgba(0, 0, 0, 0.5);
  border-radius: 8px;
  //aspectos do conteúdo

  padding: 5px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  span {
    display: flex;
  }
  .login-button {
    color: ${(props) => (props.night === true ? "white" : "black")};
    font-size: 16px;
    border: none;
    margin-bottom: 8px;
    cursor: pointer;
  }
  .login-button:hover {
    color: green;
  }
  .btn {
    padding: 0px;
    width: 50%;
    font-size: 16px;
    border: none;
    margin-bottom: 8px;
  }
  .btn:hover {
  }
  .perfil-button:not(:first-child) {
    margin-bottom: 8px;
  }
  .perfil-button:hover {
    color: grey;
  }
`;
