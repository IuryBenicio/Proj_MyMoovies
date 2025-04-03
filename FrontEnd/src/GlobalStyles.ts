import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
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
      -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
      background-color: #F5F5F5;
      border-top-left-radius: 8px;
      border-bottom-left-radius: 8px;
    }
    
    &::-webkit-scrollbar  {
      width: 12px;
      background-color: #F5F5F5;
    }
    
    &::-webkit-scrollbar-thumb  {
      
      border-top-left-radius: 8px;
      border-bottom-left-radius: 8px;
      -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,.3);
      background-color: #555;
    }
}

.container{
    max-width: 1600px;
    width: 100%;
}
`;

export const cores = {
  fundo: "rgba(0, 0, 0, 0.3);",
};

export const shadow = {
  sombra: "0px 10px 15px rgba(0, 0, 0, 0.3)",
};

export const minHeight = {
  minHeight: "calc(100vh - 58px)",
};
