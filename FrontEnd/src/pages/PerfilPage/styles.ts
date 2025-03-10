import styled from "styled-components";
import { cores, shadow } from "../../GlobalStyles";

export const PerfilComponent = styled.div`
  width: 100%;
  background-color: ${cores.fundo};
  padding: 40px;
  min-height: calc(100dvh - 58px);
  .fixo {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .container-perfil {
    background-color: white;
    box-shadow: ${shadow.sombra};
    width: 60%;
    margin: 0 auto;
    border: 1px solid gray;
    padding: 28px 28px;
    border-radius: 8px;
    .logado {
      width: 100%;
      .card-perfil {
        margin: 0 auto;
        width: 80%;
        display: flex;
        align-items: center;
        justify-content: space-around;
        img {
          width: 300px;
          height: 300px;
          object-fit: cover;
          border-radius: 100%;
        }
        .perfil-data {
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
          width: auto;
          .buttons {
            display: flex;
            justify-content: center;
            align-items: center;
            button:not(:first-child) {
              margin-left: 8px;
            }
          }
        }
      }
    }
  }
`;

export const ListasContainer = styled.div`
  width: 90%;
  margin: 0 auto;
  margin-top: 40px;
  position: relative;
  .card {
    height: 178px;
    padding: 10px;
    .card-body {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }
  }
  #add-button {
    position: absolute;
    top: -40px;
    left: 49%;
    border: 1px solid rgba(0, 0, 0, 0.3);
    box-shadow: ${shadow.sombra};
    z-index: 2;
  }
  ul {
    padding: 0;
    display: grid;
  }
`;
