import styled from "styled-components";
import { cores, shadow } from "../../GlobalStyles";

export const PerfilComponent = styled.div`
  width: 100%;
  background-color: ${cores.fundo};
  padding: 40px;
  height: calc(100dvh - 58px);
  /* display: flex;
  align-items: center;
  justify-content: center; */
  .form-place {
    display: flex;
    flex-direction: column;
  }
  .container-perfil {
    background-color: white;
    box-shadow: ${shadow.sombra};
    width: 100%;
    margin: 0 auto;
    border: 1px solid gray;
    padding: 32px 0;
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    align-items: center;

    .buttons {
      width: 100%;
      ul {
        margin-top: 14px;
        display: flex;
        flex-direction: column;
        width: 100%;
        padding: 0;
        text-align: center;
        li {
          button {
            font-size: 18px;
            font-weight: 100;
            border: none;
            background-color: white;
            border-bottom: 1px solid transparent;
            width: 80%;
            transition: all 0.3s ease-in-out;
            padding: 4px;
          }
          button:hover {
            border-bottom: 1px solid rgba(0, 0, 0, 0.2);
          }
          margin-top: 8px;
        }
      }
    }

    p {
      margin-bottom: 4px;
      font-size: 20px;
    }

    .username {
      font-size: 34px;
      margin-bottom: 16px;
    }
  }
`;
