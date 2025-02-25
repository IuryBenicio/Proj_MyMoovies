import styled from "styled-components";

export const RegisterContainer = styled.div`
  width: 100%;
  height: 100dvh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.3);
  .email_container {
    margin: 0 auto;
    position: relative;
    .error-trick {
      position: absolute;
      top: 70px;
    }
  }
  h2 {
    margin-bottom: 12px;
  }
  .container {
    border: 1px solid rgba(0, 0, 0, 0.3);
    box-shadow: 0px 10px 15px rgba(0, 0, 0, 0.3);
    background-color: white;
    border-radius: 8px;
    width: 1024px;
    .packing {
      display: flex;
      justify-content: space-between;
      .image-div {
        margin: 0 auto;
        margin-bottom: 24px;
        i {
          display: flex;
          font-size: 20px;
          color: grey;
          cursor: pointer;
          margin-top: 8px;
          justify-content: center;
        }
        .image-card {
          position: relative;
          .image-preview:hover i {
            display: block;
          }
          .image-preview {
            position: absolute;
            width: 100%;
            height: 100%;
            object-fit: cover;
          }
          margin: 0 auto;
          width: 200px;
          height: 150px;
          aspect-ratio: 16/9;
          object-fit: cover;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 2px dashed rgba(0, 0, 0, 0.3);
          color: grey;
          padding: 8px;
          text-align: center;
          border-radius: 8px;

          .image-input {
            opacity: 0;
            position: absolute;
          }
        }
      }
      .packing-card:not(:first-child) {
        margin-left: 24px;
      }
      .packing-card {
        position: relative;
        margin-bottom: 24px;
        .mostrar-senha {
          position: absolute;
          width: 24px;
          top: 50%;
          right: 10px;
        }
        .error-trick {
          position: absolute;
          top: 70px;
        }
      }
    }
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
        border-style: solid 1px;
        text-align: center;
      }
      .form-check {
        margin: 0 auto;
      }
    }
  }
`;
