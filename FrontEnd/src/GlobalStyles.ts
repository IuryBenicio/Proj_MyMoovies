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
