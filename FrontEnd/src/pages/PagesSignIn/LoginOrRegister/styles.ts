import styled from "styled-components";
import { cores } from "../../../GlobalStyles";

type props = {
  night: boolean;
};

export const PageContainer = styled.div<props>`
  width: 100%;
  height: calc(100dvh - 58px);
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${(props) =>
    props.night === true ? cores.fundo : cores.fundoGray};
  h2 {
    margin-bottom: 12px;
  }
  .container {
    @media screen and (max-width: 431px) {
      width: 90%;
    }
    border: 1px solid rgba(0, 0, 0, 0.3);
    box-shadow: 0px 10px 15px rgba(0, 0, 0, 0.3);
    background-color: ${(props) =>
      props.night === true ? cores.card : "white"};
    color: ${(props) => (props.night === true ? "white" : "black")};
    border-radius: 8px;
    width: 500px;
    padding: 45px 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    .btn {
      font-size: 22px;
    }
    .btn:hover {
      color: white;
    }
    form {
      display: flex;
      flex-direction: column;
      .form-control {
        width: 400px;
        padding: 8px 0;
        margin-bottom: 10px;
        border-radius: 8px;
        border-style: solid 1px rgb();
        text-align: center;
      }
    }
  }
`;
