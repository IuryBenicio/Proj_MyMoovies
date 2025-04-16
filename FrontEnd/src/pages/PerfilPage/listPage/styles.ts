import styled from "styled-components";
import { cores, minHeight, shadow } from "../../../GlobalStyles";

type propsListContainer = {
  ModelDelete?: boolean;
  night: boolean;
};

export const ListContainer = styled.div<propsListContainer>`
  width: 100%;
  height: ${(props) => (props.ModelDelete ? `${minHeight}` : "100%")};
  overflow-y: ${(props) => (props.ModelDelete ? "hidden" : "auto")};
  background-color: ${(props) => (props.night ? cores.fundo : cores.fundoGray)};
  min-height: calc(${minHeight.minHeight} + 2px);
  display: flex;
  flex-direction: column;
  justify-content: center;
  .list-data {
    margin: 38px auto;
    margin-bottom: 24px;
    background-color: ${(props) => (props.night ? cores.card : "white")};
    color: ${(props) => (props.night ? "white" : "black")};
    border-radius: 8px;
    box-shadow: ${shadow.sombra};
    padding: 20px;
    width: 80%;
    text-align: center;
    .name {
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
      h2 {
        font-size: 3em;
      }
      &:hover .bi-pencil {
        opacity: 1;
      }
      .bi-pencil {
        transition: all 0.4s ease-in-out;
        opacity: 0;
        position: absolute;
        background-color: rgba(255, 255, 255, 0.8);
        border-radius: 8px;
        padding: 4px;
        cursor: pointer;
      }
    }
    .description {
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
      p {
        margin: 0;
      }
      .bi-pencil {
        transition: all 0.4s ease-in-out;
        opacity: 0;
        position: absolute;
        background-color: rgba(255, 255, 255, 0.8);
        border-radius: 8px;
        padding: 4px;
        cursor: pointer;
      }
      &:hover .bi-pencil {
        opacity: 1;
      }
    }
  }
  .container-movies {
    margin: 0 auto;
    width: 90%;
    height: 650px;
    overflow-y: scroll;
    background-color: ${(props) => (props.night ? cores.card : "white")};
    color: ${(props) => (props.night ? "white" : "black")};
    box-shadow: ${shadow.sombra};
    border-radius: 8px;
    border: 1px solid ${shadow.sombra};
    padding: 30px;
    margin-bottom: 38px;

    // customização da barra de scroll

    &::-webkit-scrollbar-track {
      -webkit-box-shadow: inset 0 0 6px rgba(105, 105, 105, 0.3);
      border-radius: 10px;
      background-color: #f5f5f5;
    }

    &::-webkit-scrollbar {
      width: 8px;
      border-radius: 8px;
    }

    &::-webkit-scrollbar-thumb {
      border-radius: 10px;
      -webkit-box-shadow: inset 0 0 6px rgba(148, 148, 148, 0.53);
      background-color: #727272;
    }

    //

    .tabela {
      width: 100%;
      .item:not(:last-child) {
        margin-bottom: 16px;
      }
    }
  }
  .empty {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    img {
      width: 200px;
    }
    .text {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      span {
        font-size: 4em;
        margin: 0;
        padding: 0;
      }
      p {
        font-size: 2em;
        margin: 0;
        padding: 0;
      }
    }
  }
`;

export const EditContainer = styled.div<propsListContainer>`
  align-items: center;
  display: flex;
  .relative {
    margin-left: 8px;
    font-size: 20px;
    color: grey;
  }
  .confirm:hover {
    cursor: pointer;
    color: green;
  }
  .confirm:active {
    fill: green;
    color: white;
  }
  .cancel:hover {
    cursor: pointer;
    color: red;
  }
  .cancel:active {
    fill: red;
    color: white;
  }
  .name-input {
    font-size: 2.3em;
    margin-bottom: 16px;
  }
  .description-input {
    width: 400px;
  }
  input {
    text-align: center;
    border: none;
    border-bottom: 1px solid
      ${(props) => (props.night === true ? "white" : "grey")};
    width: auto;
  }
  textarea {
    margin-top: 8px;
    text-align: center;
    border: none;
    border-bottom: 1px solid
      ${(props) => (props.night === true ? "white" : "grey")};
    width: auto;
    resize: none;
  }
`;
