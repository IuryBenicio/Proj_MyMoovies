import styled from "styled-components";
import { cores, minHeight } from "../../GlobalStyles";

type props = {
  night: boolean;
};

export const MovieContainer = styled.div<props>`
  @media screen and (min-width: 1080px) {
    max-height: ${minHeight};
    overflow: hidden;
    height: 100%;
  }
  text-align: center;
  padding: 40px;
  background-color: ${(props) =>
    props.night === true ? cores.fundo : "white"};
  color: ${(props) => (props.night === true ? "white" : "black")};
  .navegacao {
    /* text-decoration: underline; */
    position: absolute;
    top: 58px;
    left: 10px;
    display: flex;
    align-items: center;
    font-size: 18px;

    a {
      color: ${(props) => (props.night === true ? "white" : "black")};
      &:hover {
        color: grey;
      }
      &:hover i {
        color: grey;
      }
    }
    i {
      font-size: 17px;
    }
  }
  .moovie-data {
    display: flex;
    flex-direction: column;
    align-items: center;
    h1 {
      font-size: 3rem;
      margin-bottom: 1rem;
      @media screen and (max-width: 431px) {
        font-size: 1.4em;
      }
    }
    .data {
      /* max-height: 750px; */
      height: 100%;
      width: 80%;
      display: flex;
      justify-content: space-between;
      @media screen and (max-width: 431px) {
        width: 100dvw;
        flex-direction: column;
        align-items: center;
        justify-content: space-between;
        img {
          width: 50%;
          @media screen and (max-width: 431px) {
            width: 350px;
          }
        }
      }
      /* img {
        height: 750px;
      } */
      .movie-details {
        width: 500px;
        @media screen and (max-width: 431px) {
          width: 100%;
        }
        .details-numbers {
          margin-bottom: 20px;
        }
        .description {
          display: flex;
          flex-direction: column;
          font-size: 20px;
          height: 92.2%;
          @media screen and (max-width: 431px) {
            font-size: 18px;
            width: 200px;
            height: 100%;
            text-align: center;
            margin: 0 auto;
            margin-top: 16px;
            margin-bottom: 16px;
          }
        }
        p {
          margin-bottom: 10px;
        }
        .add-movie {
          display: flex;
          flex-direction: column;
          position: relative;
          margin: 0 auto;
          text-align: center;
          span {
            @media screen and (max-width: 431px) {
              font-size: 15px;
            }
          }

          button {
            color: ${(props) => (props.night === true ? "white" : "black")};
            border: ${(props) => props.night === true && "white"} 1px solid;
            width: 80%;
            margin: 0 auto;
            @media screen and (max-width: 431px) {
              margin-bottom: 24px;
            }
          }
        }
      }
    }
  }
`;
