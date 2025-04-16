import styled from "styled-components";
import { cores } from "../../../../GlobalStyles";

type props = {
  night: boolean;
};

export const EditPerfilContainer = styled.div<props>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 3;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  h2 {
    text-align: center;
  }
  .container {
    z-index: 4;
    width: 50%;
    /* border: 1px solid white; */
    box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.5);
    background-color: ${(props) =>
      props.night === true ? cores.card : "white"};
    color: ${(props) => (props.night === true ? "white" : "black")};
    padding: 50px;
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    position: relative;
    .form-group {
      position: relative;
      .relative {
        position: relative;
        display: flex;
        margin-bottom: 32px;
      }
      .cancel {
        margin-left: 12px;
      }
      .edit-icon {
        font-size: 20px;
      }
      .disabled {
        border: none;
        border-bottom: 1px solid rgba(0, 0, 0, 0.2);
        background-color: transparent;
        border-radius: 0;
        color: ${(props) => (props.night === true ? "white" : "black")};
      }
    }
    .d-flex i {
      font-size: 18px;
      margin-left: 5px;
    }
    .input-div {
      display: flex;
      align-items: center;
      position: relative;
    }
    .error-trick {
      position: absolute;
      top: 67px;
      right: 28px;
    }
    i {
      position: absolute;
      left: 15px;
      top: 10px;
      cursor: pointer;
      font-size: 20px;
      color: grey;
    }
    .position {
      position: relative;
      margin-bottom: 33px;
      cursor: pointer;
    }
    input {
      margin-bottom: 15px;
      padding: 10px;
      border-radius: 4px;
      border: 1px solid #ccc;
      width: 100%;
      background-color: white;
    }
    button {
    }
  }
`;
