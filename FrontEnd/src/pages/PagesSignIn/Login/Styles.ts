import styled from "styled-components";
import { cores } from "../../../GlobalStyles";

type props = {
  night: boolean;
};

export const LoginContainer = styled.div<props>`
  width: 100%;
  height: calc(100dvh - 58px);
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${(props) =>
    props.night ? "rgb(58, 58, 58)" : cores.fundoGray};

  transition: all 0.3s ease-in-out;
  h2 {
    margin-bottom: 12px;
  }
  .container {
    border: 1px solid rgba(0, 0, 0, 0.3);
    box-shadow: 0px 10px 15px rgba(0, 0, 0, 0.3);
    background-color: ${(props) =>
      props.night === true ? cores.card : "white"};
    border-radius: 8px;
    color: ${(props) => (props.night === true ? "white" : "black")};
    width: 500px;
    padding: 45px 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    @media screen and (max-width: 431px) {
      width: 90%;
      padding: 25px 0;
    }
    #links {
      color: ${(props) => (props.night === true ? "white" : "black")};
      &:hover {
        color: grey;
      }
    }
    form {
      display: flex;
      flex-direction: column;
      @media screen and (max-width: 431px) {
        max-width: 100%;
        padding: 0 25px;
        input {
          max-width: 100%;
        }
        button {
          margin-top: 16px;
        }
      }
      .form-control {
        width: 400px;
        padding: 8px 0;
        margin-bottom: 10px;
        border-radius: 8px;
        border-style: solid 1px rgb();
        text-align: center;
      }
      .packing-card {
        position: relative;

        .error-div {
          position: absolute;
          top: 75px;
        }
      }
      .loading {
        width: 10px;
      }
    }
  }
`;
