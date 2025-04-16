import styled from "styled-components";
import { cores } from "../../GlobalStyles";
export const ProgressContainer = styled.div`
  width: 100%;
  height: calc(100dvh - 58px);
  display: flex;
  justify-content: center;
  align-items: center;
  .content {
    margin-bottom: 20px;
    text-align: center;
    font-size: 2rem;
    color: #333;
  }
`;

type props = {
  night: boolean;
};

export const MovieContainer = styled.div<props>`
  width: 100%;
  ul {
    @media screen and (max-width: 431px) {
      padding: 0;
    }
  }
  h2 {
    margin-top: 24px;
    text-align: center;
  }
  .movies_container {
    @media screen and (max-width: 431px) {
      grid-template-columns: repeat(2, 1fr);
    }
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 20px;
    padding: 20px;

    .movie_card {
      height: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;

      .card {
        background-color: ${(props) => (props.night ? cores.card : "white")};
        color: ${(props) => (props.night ? "white" : "black")};
        display: flex;
        flex-direction: column;
        width: 18rem;
        height: 100%;
        /* height: 100%; */
        @media screen and (max-width: 431px) {
          width: auto;
          height: auto;
        }

        img {
          width: 100%;
          height: 350px;
          border-radius: 8px;
          object-fit: cover;
          @media screen and (max-width: 431px) {
            width: 100%;
            height: 171px;
          }
        }

        .card-body {
          display: flex;
          flex-direction: column;
          flex-grow: 1;
          justify-content: space-between;
          align-items: center;
          @media screen and (max-width: 431px) {
            height: 174px;
            p {
              display: none;
            }
          }
        }

        a.btn {
          margin-top: auto;
          width: 100%;
        }
      }
    }
  }
`;

export const PaginationContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-around;
  .pagination {
    ul {
      @media screen and (max-width: 431px) {
        padding: 0;
      }
      display: flex;
      li:not(:first-child) {
        margin-left: 8px;
      }
    }
    justify-content: center;
  }
`;
