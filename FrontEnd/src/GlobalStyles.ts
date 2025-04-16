import { createGlobalStyle } from "styled-components";
type props = {
  night: boolean;
};
export const GlobalStyles = createGlobalStyle<props>`
*{
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    font-family: "Quicksand", serif;
    list-style: none;
    a{
        color: black;
        text-decoration: none;
        &:hover{
            color: cyan;
        }
    }
    .bootstrap-select .form-control:focus {
        outline: 0px none #fff !important;
    }

    .bootstrap-select .form-control > div.filter-option:focus {
        outline: 0px none #fff !important;
    }

    .bootstrap-select .form-control > div.filter-option > div.filter-option-inner:focus {
        outline: 0px none #fff !important;
    }

    .bootstrap-select .form-control > div.filter-option > div.filter-option-inner > div.filter-option-inner-inner:focus {
        outline: 0px none #fff !important;
    }
    .close {
      z-index: 6;
      position: absolute;
      top: 20px;
      left: 20px;
      font-size: 20px;
      font-weight: 100;
      cursor: pointer;
      color: black;
      transition: color 0.3s ease;
      &:hover {
        color: red;
      }
    }
    &::-webkit-scrollbar-track  {
      background-color: ${(props) =>
        props.night === true ? cores.card : "white"};
      transition: all 0.4s ease-in-out ;
      
    }
    
    &::-webkit-scrollbar  {
      width: 12px;
      background-color: ${(props) =>
        props.night === true ? "transparent" : cores.fundo};
      transition: all 0.4s ease-in-out ;
    }
    
    &::-webkit-scrollbar-thumb  {
      /* border-radius: 8px; */
      /* border-bottom-left-radius: 8px; */
      -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,.3);
      background-color: ${(props) =>
        props.night === true ? "white" : cores.card};
      transition: all 0.4s ease-in-out ;
    }
  }
  .container{
      max-width: 1600px;
      width: 100%;
  }

  /* .background{
    fundo: ${(props) => (props.night === true ? "rgb(26, 26, 26);" : "white")}
  } */

    .fundo-card{
      ${(props) => (props.night === true ? "rgb(36, 36, 36)" : "white")}
    }

    .Links{
      background-color: ${(props) => (props.night === true ? "wihte" : "black")}
    }
  `;

export const cores = {
  fundo: "rgb(58, 58, 58)",
  fundoGray: "rgb(145, 145, 145)",
  card: "rgb(36, 36, 36)",
};

export const shadow = {
  sombra: "0px 10px 15px rgba(0, 0, 0, 0.3)",
};

export const minHeight = {
  minHeight: "calc(100vh - 58px)",
};
