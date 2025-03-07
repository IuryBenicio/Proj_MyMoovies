import styled from "styled-components";
import { cores, shadow } from "../../GlobalStyles";

export const PerfilComponent = styled.div`
  width: 100%;
  background-color: ${cores.fundo};
  padding: 40px;
  height: calc(100dvh - 58px);
  .form-place {
    display: flex;
    flex-direction: column;
  }
  .fixo {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .container-perfil {
    background-color: white;
    box-shadow: ${shadow.sombra};
    width: 100%;
    border: 1px solid gray;
    padding: 32px 32px;
    border-radius: 8px;
    .logado {
      display: flex;
      width: 100%;
      .listas {
        margin-left: 40px;
        width: 90%;
        border: 1px solid gray;
        .add-or-remove {
          margin-left: 10px;
          margin-right: 10px;
          i {
            font-size: 24px;
            margin-right: 10px;
            transition: transform 0.3s ease-in-out;
            cursor: pointer;
            &:hover {
              transform: scale(1.1);
            }
          }
          .bi-plus-circle {
            color: green;
          }
        }
      }
      .aside-container {
        text-align: center;
        width: 10%;
        justify-self: start;
      }
      .profile-image {
        width: auto;
        height: auto;
        object-fit: cover;
      }
    }

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
