import styled from "styled-components";
import { cores, shadow } from "../../GlobalStyles";

export const PerfilComponent = styled.div`
  width: 100%;
  background-color: ${cores.fundo};
  padding: 40px;
  .container-perfil {
    background-color: white;
    box-shadow: ${shadow.sombra};
    width: 1324px;
    margin: 0 auto;
    border: 1px solid gray;
    padding: 32px;
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    align-items: center;
    .username {
      font-size: 34px;
      margin-bottom: 16px;
    }
    .logout-button {
      margin-top: 16px;
    }
  }
`;
