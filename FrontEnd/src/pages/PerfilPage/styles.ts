import styled from "styled-components";
import { cores, shadow } from "../../GlobalStyles";

type props = {
  night: boolean;
};

export const PerfilComponent = styled.div<props>`
  .fundo {
    position: absolute;
    background-color: rgba(0, 0, 0, 0.5);
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    z-index: 3;
  }
  width: 100%;
  background-color: ${(props) =>
    props.night === true ? cores.fundo : cores.fundoGray};
  padding: 40px;
  min-height: calc(100dvh - 56px);
  position: relative;
  #add-button {
    position: relative;
  }
  .fixo {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .container-perfil {
    background-color: ${(props) =>
      props.night === true ? cores.card : "white"};
    color: ${(props) => (props.night === true ? "white" : "black")};
    box-shadow: ${shadow.sombra};
    width: 60%;
    margin: 0 auto;
    padding: 28px 28px;
    border-radius: 8px;
    @media screen and (max-width: 431px) {
      width: 100%;
    }
    .logado {
      width: 100%;
      .card-perfil {
        @media screen and (max-width: 431px) {
          display: flex;
          flex-direction: column;
          width: 100%;
        }
        margin: 0 auto;
        width: 80%;
        display: flex;
        align-items: center;
        justify-content: space-around;
        #edit {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: calc(100% + 2px);
          background-color: rgba(0, 0, 0, 0.3);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 3;
        }
        .image-div {
          border: ${(props) =>
            props.night === true ? "1px solid white" : "transparent"};
          position: relative;
          border-radius: 50%;
          @media screen and (max-width: 431px) {
            margin-bottom: 15px;
          }
          input {
            width: 100%;
            position: absolute;
            opacity: 0;
          }
          &:hover .edit-image {
            display: flex;
          }
          &:hover .bi {
            color: white;
          }
          .confirm-image {
            position: absolute;
            bottom: 30px;
            left: 37%;
            display: flex;
            align-items: center;
            i {
              z-index: 3;
              cursor: pointer;
              font-size: 30px;

              &:not(:first-child) {
                margin-left: 8px;
              }
            }
            .bi-x-lg {
              color: red;
              font-size: 34px;
            }
            .bi-check-lg {
              color: green;
              font-size: 39px;
            }
          }
          .edit-image {
            cursor: pointer;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.2);
            position: absolute;
            top: 0;
            border-radius: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            display: none;
            i {
              font-size: 28px;
              color: white;
            }
            span {
              margin-left: 8px;
              font-size: 24px;
              color: white;
            }
          }
          img {
            @media screen and (max-width: 431px) {
              width: 200px;
              height: 200px;
            }
            width: 300px;
            height: 300px;
            object-fit: cover;
            border-radius: 100%;
          }
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
            button {
              color: ${(props) => props.night && "white"};
            }
            button:not(:first-child) {
              margin-left: 8px;
            }
            .btn-outline-secondary {
              background-color: ${(props) =>
                props.night === true ? "transparent" : "transparent"};
              border: 1px solid green;
              color: green;
              &:hover {
                background-color: green;
                color: white;
              }
            }
            .btn-outline-danger {
              background-color: ${(props) =>
                props.night === true ? "transparent" : "transparent"};
              border: 1px solid red;
              color: ${(props) => props.night === true && "red"};
              &:hover {
                background-color: red;
                color: white;
              }
            }
          }
        }
      }
    }
  }
  .container-search {
    margin: 0 auto;
    margin-top: 32px;
    border-radius: 8px;
    background-color: ${(props) =>
      props.night === true ? cores.card : "white"};
    color: ${(props) => (props.night === true ? "white" : "black")};
    box-shadow: ${shadow.sombra};
    padding: 30px;
    padding-top: 20px;
    width: 50%;
    text-align: center;
    @media screen and (max-width: 431px) {
      width: 100%;
    }
    label {
      width: 100%;
    }
    form {
      margin-top: 16px;
      display: flex;
    }
  }
`;

export const ListasContainer = styled.div<props>`
  width: 90%;
  margin: 0 auto;
  margin-top: 40px;
  position: relative;
  .card {
    height: 178px;
    padding: 10px;
    background-color: ${(props) =>
      props.night === true ? cores.card : "white"};
    color: ${(props) => (props.night === true ? "white" : "black")};
    .card-body {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      .links {
        display: flex;
        align-items: center;
        a {
          margin: 0;
          text-align: center;
        }
      }
    }
  }
  .add-div {
    position: absolute;
    @media screen and (max-width: 431px) {
      top: -235px;
    }
    top: -220px;
    width: 100%;
    display: flex;
    justify-content: center;

    #add-button {
      border: 1px solid rgba(0, 0, 0, 0.3);
      box-shadow: ${shadow.sombra};
      z-index: 2;
    }
  }
  ul {
    padding: 0;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
    @media screen and (max-width: 431px) {
      display: flex;
      flex-direction: column;
      li:not(:first-child) {
        margin-top: 16px;
      }
    }
    li {
      margin: 0 auto;
    }
  }
`;

export const ContainerEmpty = styled.div<props>`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .empty {
    margin-top: 15px;
    background-color: ${(props) =>
      props.night === true ? cores.card : "white"};
    color: ${(props) => (props.night === true ? "white" : "black")};
    border-radius: 8px;
    box-shadow: ${shadow.sombra};
    padding: 20px;
    width: 350px;
    span {
      font-size: 22px;
      font-weight: 400;
    }
    p {
      margin: 0;
      font-weight: 200;
      font-size: 1.2em;
    }
  }
`;
