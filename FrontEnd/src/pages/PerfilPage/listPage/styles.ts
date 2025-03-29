import styled from "styled-components";
import { cores, minHeight, shadow } from "../../../GlobalStyles";

type propsListContainer = {
  ModelDelete: boolean;
};

export const ListContainer = styled.div<propsListContainer>`
  width: 100%;
  height: ${(props) => (props.ModelDelete ? `${minHeight}` : "100%")};
  overflow-y: ${(props) => (props.ModelDelete ? "hidden" : "auto")};
  background-color: ${cores.fundo};
  min-height: ${minHeight.minHeight};
  display: flex;
  flex-direction: column;
  justify-content: center;
  .list-data {
    margin: 38px auto;
    margin-bottom: 24px;
    background-color: white;
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
    width: 80%;
    height: 90%;
    background-color: white;
    box-shadow: ${shadow.sombra};
    border-radius: 8px;
    border: 1px solid ${shadow.sombra};
    padding: 30px;
    margin-bottom: 38px;
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
    img {
      width: 100px;
    }
    .text {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      span {
        font-size: 2em;
        margin: 0;
        padding: 0;
      }
      p {
        margin: 0;
        padding: 0;
      }
    }
  }
`;

export const EditContainer = styled.div`
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
    border-bottom: 1px solid grey;
    width: auto;
  }
  textarea {
    margin-top: 8px;
    text-align: center;
    border: none;
    border-bottom: 1px solid grey;
    width: auto;
    resize: none;
  }
`;
