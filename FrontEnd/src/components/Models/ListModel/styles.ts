import styled from "styled-components";
import { shadow } from "../../../GlobalStyles";

export const ContainerListModel = styled.div`
  /* max-height: 100%; */
  background-color: rgba(0, 0, 0, 0.25);
  border: 1px solid rgba(0, 0, 0, 0.25);
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  position: absolute;
  border-radius: 8px;
  box-shadow: ${shadow.sombra};
  top: -390px;
  right: 0;
  width: 500px;
  height: 375px;
  z-index: 2;
  @media screen and (max-width: 431px) {
    position: relative;
    top: 0;
    width: 100%;
  }
  .close {
    transition: all 0.3s ease-in-out;
    position: absolute;
    top: 12px;
    left: 16px;
    cursor: pointer;
    font-size: 16px;
    color: white;
    &:hover {
      color: grey;
    }
  }
  ul {
    margin: 0;
    padding: 0;
    height: 55%;
    overflow-y: scroll;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    li {
      overflow: hidden;
      &:hover {
        background-color: rgba(0, 0, 0, 0.06);
        color: white;
      }
      label {
        display: flex;
      }
      input {
        margin-right: 14px;
        margin-left: 14px;
        justify-self: start;
      }
      .data {
        display: flex;
        flex-direction: column;
        align-items: start;
        margin: 8px;
        h4 {
          margin: 0;
        }
        p {
          margin: 0;
        }
      }
    }
    &::-webkit-scrollbar-track {
      -webkit-box-shadow: inset 0 0 6px rgba(46, 45, 45, 0.37);
      border-radius: 10px;
    }

    &::-webkit-scrollbar {
      width: 12px;
      border-radius: 10px;
    }

    &::-webkit-scrollbar-thumb {
      border-radius: 10px;
      -webkit-box-shadow: inset 0 0 6px hsla(0, 0%, 23.1%, 0.67);
      background-color: #555;
    }
  }
  h2 {
    font-size: 40px;
    padding: 8px 8px 0 8px;
  }
  .buttons {
    width: 100%;
    hr {
      margin: 0 auto;
      width: 90%;
      height: 1px;
    }
    .add-playlist {
      width: 100%;
      color: white;
      padding: 14px;
      border: none;
      /* border-radius: 8px; */
      background-color: transparent;
      transition: all 0.2s ease-in-out;
    }
    .add-playlist:hover {
      background-color: rgba(0, 0, 0, 0.1);
      /* border: 1px solid white;
      border-radius: 8px; */
      cursor: pointer;
    }
  }
`;
