import styled from "styled-components";

export const HeaderContainer = styled.div`
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
    .avatar-icon {
      margin-right: 25px;
      font-size: 28px;
      color: grey;
      transition: all 0.5s ease-in-out;
    }
    .model-perfil {
      /* opacity: 0; */
      transition: all 0.5s ease-in-out;
    }
    .avatar-icon:hover {
      color: black;
      cursor: pointer;
    }
    .avatar-icon:hover .model-perfil {
      opacity: 100;
    }
    form {
      display: flex;
    }
  }
`;
