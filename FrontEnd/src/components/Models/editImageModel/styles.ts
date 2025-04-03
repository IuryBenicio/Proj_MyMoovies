import styled from "styled-components";
import { shadow } from "../../../GlobalStyles";

export const EditImageContainer = styled.div`
  /* width: 400px;
  height: 300px; */
  top: 50%;
  left: 50%;
  box-shadow: ${shadow.sombra};
  border-radius: 8px;
  z-index: 4;
  background-color: white;
  padding: 28px;
  display: flex;
  align-items: center;
  .trocar-imagem {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-left: 16px;
  }
  .input {
    position: relative;
    padding: 8px;
    button {
      top: 0;
      left: 0;
      position: absolute;
      width: 100%;
      height: 100%;
      text-align: center;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    input {
      width: 100%;
      opacity: 0;
      z-index: 4;
    }
  }
  .image {
    img {
      width: 300px;
      height: 300px;
      object-fit: cover;
      border-radius: 100%;
    }
  }
`;
