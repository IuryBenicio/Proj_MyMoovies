import styled from "styled-components";
import { cores } from "../../../GlobalStyles";

export const LoginContainer = styled.div`
  width: 100%;
  height: 100dvh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${cores.fundo};
  h2 {
    margin-bottom: 12px;
  }
  .container {
    border: 1px solid rgba(0, 0, 0, 0.3);
    box-shadow: 0px 10px 15px rgba(0, 0, 0, 0.3);
    background-color: white;
    border-radius: 8px;
    width: 500px;
    padding: 45px 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
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
      .packing-card {
        position: relative;
        .error-div {
          position: absolute;
          top: 75px;
        }
      }
    }
  }
`;
