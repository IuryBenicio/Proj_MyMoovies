import styled from "styled-components";

export const ProgressContainer = styled.div`
  width: 100dvw;
  height: 100dvh;
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

export const MovieContainer = styled.div`
  .pagination ul {
    width: 100%;
    display: flex;
    justify-content: center;
    li:not(:first-child) {
      margin-left: 15px;
    }
  }
  h2 {
    text-align: center;
  }
  .movies_container {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
    gap: 20px;
    padding: 20px;
    .movie_card {
      height: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
      .card {
        img {
          width: 100%;
          height: 350px;
          border-radius: 8px;
          object-fit: cover;
        }
        .card_body {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          align-items: center;
          p {
            text-justify: distribute-all-lines;
          }
          .btn {
          }
        }
      }
      .movie-title {
        font-size: 1.3rem;
        margin-top: 10px;
      }
    }
  }
`;
