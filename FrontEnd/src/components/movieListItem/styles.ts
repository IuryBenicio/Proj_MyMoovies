import styled from "styled-components";

export const ContainerMovie = styled.div`
  pointer-events: all;
  i {
    z-index: 6;
  }
  & {
    display: flex;
    align-items: center;
    cursor: grab;
    &:hover .bi-trash {
      width: 4%;
    }
    &:hover .table-item {
      width: 96%;
    }
    .bi-trash {
      transition: width 0.4s ease-in-out;
      font-size: 28px;
      margin: 0 auto;
      width: 0;
      overflow: hidden;
      cursor: pointer;
    }

    .table-item {
      &:active {
        cursor: grabbing;
      }
      transition: width 0.4s ease-in-out;
      width: 100%;
      margin: 0 auto;
      border-radius: 8px;
      border: black solid 1px;
      display: flex;
      align-items: center;
      #poster {
        width: 10%;
        position: relative;
        .img {
          width: 100%;
          height: 150px;
          object-fit: cover;
          border-top-left-radius: 8px;
          border-bottom-left-radius: 8px;
          border-right: solid 1px black;
          cursor: zoom-in;
        }
        .img:active .img_zoom {
          display: block;
          width: 100%;
          height: auto;
          object-fit: contain;
          cursor: zoom-out;
        }
        .img_zoom {
          display: none;
          position: absolute;
          width: 200px;
          bottom: -50%;
          left: -8px;
        }
      }
      #title {
        width: 20%;
        padding: 8px;
        text-align: center;
        h3 {
          margin: 0;
        }
      }
      #sinopse {
        width: 60%;
        text-align: center;
        p {
          margin: 0;
        }
        padding: 8px;
        align-items: center;
        p {
          margin: 0;
        }
      }
      #acoes {
        width: 10%;
        display: flex;
        justify-content: center;
        border-left: 1px solid black;
        i {
          transition: all 0.6s ease-in-out;
          font-size: 40px;
        }
        .cursor-pointer {
          cursor: pointer;
        }
        .confirm:hover {
          transform: scale(1.2);
        }
        .question:hover {
          transform: scale(1.2);
        }
        .cancel:hover {
          transform: scale(1.2);
        }
      }
    }
  }
`;
