import styled from "styled-components";

export const EditPerfilContainer = styled.div`
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
    border: 1px solid white;
    box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.5);
    background-color: white;
    padding: 50px;
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    input {
      margin-bottom: 15px;
      padding: 10px;
      border-radius: 4px;
      border: 1px solid #ccc;
      width: 100%;
    }
    button {
    }
  }
`;
