import styled from "styled-components";

type props = {
  night: boolean;
};

export const HeaderContainer = styled.div<props>`
  transition: all 0.3s ease-in-out;
  color: ${(props) => (props.night === true ? "white" : "black")};
  background-color: ${(props) =>
    props.night === true ? "rgb(29, 29, 29)" : "white"};
  .navbar-brand {
    color: ${(props) => (props.night === true ? "white" : "black")};
  }
  ul {
    align-items: center;
    a:hover {
      color: gray;
    }
  }
  .left-side {
    display: flex;
    align-items: center;
    position: relative;

    .gadgets {
      @media screen and (max-width: 431px) {
        display: none;
      }
      align-items: center;
      display: flex;
    }
    .avatar-icon {
      margin-right: 25px;
      font-size: 28px;
      color: ${(props) => (props.night === true ? "white" : "grey")};
      transition: all 0.5s ease-in-out;
    }
    .bi-sun {
      font-size: 18px;
    }
    .bi:hover {
      transform: scale(1.1);
    }
    .model-perfil {
      /* opacity: 0; */
      transition: all 0.5s ease-in-out;
    }
    .avatar-icon:hover {
      color: ${(props) => (props.night === true ? "rgb(87, 87, 87)" : "black")}
        black;
      cursor: pointer;
    }
    .avatar-icon:hover .model-perfil {
      opacity: 100;
    }
    form {
      display: flex;

      @media screen and (max-width: 431px) {
        width: 220px;
        justify-content: end;
      }
      @media screen and (max-width: 430px) {
        input {
          width: 50%;
        }
      }
    }
  }
`;
