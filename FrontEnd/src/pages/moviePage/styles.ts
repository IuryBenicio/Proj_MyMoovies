import styled from "styled-components";

export const MovieContainer = styled.div`
  text-align: center;
  .moovie-data {
    h1 {
      font-size: 3rem;
      /* margin-top: 1rem; */

      margin-bottom: 1rem;
    }
    display: flex;
    flex-direction: column;
    align-items: center;
    .data {
      max-height: 100%;
      /* max-width: 100%; */
      display: flex;
      .movie-details {
        width: 500px;
        margin-left: 20px;
        .details-numbers {
          margin-bottom: 20px;
        }
        .description {
          display: flex;
          flex-direction: column;
          font-size: 20px;
          height: 76%;
        }
        p {
          margin-bottom: 10px;
        }
        .add-movie {
          display: flex;
          flex-direction: column;
        }
      }
    }
  }
`;
