import styled from "styled-components";
import { cores, shadow } from "../../../../GlobalStyles";

type props = {
  isLoading: boolean;
  night: boolean;
};

export const EditSenhaContainer = styled.div<props>`
  position: absolute;
  z-index: 5;
  background-color: rgba(0, 0, 0, 0.5);
  width: 100dvw;
  height: 100dvh;
  @media screen and (max-width: 431px) {
    width: 100%;
    height: calc(100dvh + 6px);
  }
  top: -58px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .card-edit {
    position: relative;
    width: 500px;
    @media screen and (max-width: 431px) {
      width: 100%;
    }
    box-shadow: ${shadow.sombra};
    z-index: 6;
    border: 1px solid rgba(0, 0, 0, 0.5);
    background-color: ${(props) =>
      props.night === true ? cores.card : "White"};
    padding: 34px;
    color: ${(props) => (props.night === true ? "white" : "black")};
    border-radius: 8px;
    .input {
      display: flex;
      align-items: center;
      input {
        @media screen and (max-width: 431px) {
          margin-top: 8px;
        }
        transition: all 0.3s ease;
        width: ${(props: props) =>
          props.isLoading === true ? "337.203" : "100%"};
        margin-right: ${(props: props) =>
          props.isLoading === true ? "14px" : "0"};
      }
    }
  }
`;
