import styled from "styled-components";

type props = {
  night: boolean;
};

export const ContainerMovie = styled.div<props>`
  pointer-events: all;

  i {
    z-index: 6;
  }
  & {
    display: flex;
    align-items: center;
    cursor: grab;
    @media screen and (max-width: 431px) {
      &:active .bi-trash {
        width: 10%;
      }
      &:active .table-item {
        width: 70%;
      }
    }
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
      @media screen and (max-width: 431px) {
        display: flex;
        #sinopse {
          display: none;
        }
        #poster {
          width: 30%;
        }
        #title {
          width: 40%;
        }
        #acoes {
          width: 30%;
        }
      }
      &:active {
        cursor: grabbing;
      }
      transition: width 0.4s ease-in-out;
      width: 100%;
      margin: 0 auto;
      border-radius: 8px;
      border: ${(props) => (props.night ? "white" : "black")} solid 1px;
      display: flex;
      align-items: center;
      #poster {
        @media screen and (max-width: 431px) {
          width: 30%;
        }
        width: 10%;
        position: relative;

        .img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          border-top-left-radius: 8px;
          border-bottom-left-radius: 8px;
          border-right: solid 1px
            ${(props) => (props.night ? "white" : "black")};
          cursor: zoom-in;
        }
        .img:active .img_zoom {
          display: block;
          width: 100%;
          height: auto;
          object-fit: contain;
          cursor: zoom-out;
        }
        /* .img_zoom {
          display: none;
          position: absolute;
          width: 200px;
          bottom: -50%;
          left: -8px;
        } */
      }
      #title {
        @media screen and (max-width: 431px) {
          width: 50%;
          h3 {
            font-size: 1em;
          }
        }
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
        @media screen and (max-width: 431px) {
          width: 20%;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }
        width: 10%;
        display: flex;
        justify-content: center;
        border-left: 1px solid ${(props) => (props.night ? "white" : "black")};
        i {
          @media screen and (max-width: 431px) {
            font-size: 28px;
          }
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
