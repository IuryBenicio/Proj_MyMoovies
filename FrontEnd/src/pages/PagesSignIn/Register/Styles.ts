import styled from "styled-components";
import { cores } from "../../../GlobalStyles";

type props = {
  night: boolean;
};

export const RegisterContainer = styled.div<props>`
  width: 100%;
  height: calc(100dvh - 58px);
  @media screen and (max-width: 431px) {
    min-height: 100dvh;
    padding: 20px;
  }
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${(props) =>
    props.night === true ? cores.fundo : cores.fundoGray};
  color: ${(props) => (props.night === true ? "white" : "black")};
  .email_container {
    @media screen and (max-width: 431px) {
      width: 90%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      margin: 0;
      text-align: center;
      input {
        max-width: 100%;
      }
    }
    margin: 0 auto;
    position: relative;
    .error-trick {
      position: absolute;
      top: 70px;
    }
  }
  h2 {
    /* @media screen and (max-width: 431px) {
      margin-top: 24px;
    } */
    margin-bottom: 12px;
    color: ${(props) => (props.night === true ? "white" : "black")};
  }
  .container {
    @media screen and (max-width: 431px) {
      position: relative;
      margin-top: 24px;
      width: 90%;
      max-height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      margin-bottom: 24px;
    }
    position: absolute;
    border: 1px solid rgba(0, 0, 0, 0.3);
    box-shadow: 0px 10px 15px rgba(0, 0, 0, 0.3);
    background-color: ${(props) =>
      props.night === true ? cores.card : "white"};
    border-radius: 8px;
    width: 1024px;
    .packing {
      display: flex;
      justify-content: space-between;
      @media screen and (max-width: 431px) {
        width: 90%;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
      }
      .image-div {
        @media screen and (max-width: 431px) {
          margin: 0;
          margin-bottom: 16px;
        }
        margin: 0 auto;
        margin-bottom: 42px;
        i {
          display: flex;
          font-size: 20px;
          color: grey;
          cursor: pointer;
          margin-top: 8px;
          justify-content: center;
          position: absolute;
        }
        .image-card {
          @media screen and (max-width: 431px) {
            width: 70%;
          }
          position: relative;
          .image-preview:hover i {
            display: block;
          }
          .image-preview {
            position: absolute;
            width: 100%;
            height: 100%;
            object-fit: cover;
          }
          margin: 0 auto;
          width: 200px;
          height: 150px;
          aspect-ratio: 16/9;
          object-fit: cover;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 2px dashed
            ${(props) =>
              props.night === true ? "white" : "rgba(0, 0, 0, 0.3)"};
          color: grey;
          padding: 8px;
          text-align: center;
          border-radius: 8px;

          .image-input {
            opacity: 0;
            position: absolute;
          }
        }
      }
      .packing-card:not(:first-child) {
        @media screen and (max-width: 431px) {
          margin: 0;
        }
        margin-left: 24px;
      }
      .packing-card {
        @media screen and (max-width: 431px) {
          display: flex;
          justify-content: center;
          flex-direction: column;
          align-items: center;
          width: 100%;
          input {
            width: 100%;
          }
        }
        position: relative;
        margin-bottom: 24px;
        .mostrar-senha {
          position: absolute;
          width: 24px;
          top: 50%;
          right: 10px;
        }
        .error-trick {
          position: absolute;
          top: 70px;
        }
      }
    }
    padding: 45px 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    form {
      display: flex;
      flex-direction: column;
      @media screen and (max-width: 431px) {
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
      }
      .form-control {
        width: 400px;
        padding: 8px 0;
        margin-bottom: 10px;
        border-radius: 8px;
        border-style: solid 1px;
        text-align: center;
      }
      .form-check {
        margin: 0 auto;
        label,
        h4,
        a {
          color: ${(props) => (props.night === true ? "white" : "grey")};
          transition: all 0.3s ease-in-out;
        }
        a:hover {
          color: grey;
        }
      }
    }
  }
`;
