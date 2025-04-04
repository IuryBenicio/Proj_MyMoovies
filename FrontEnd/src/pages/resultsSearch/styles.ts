import styled from "styled-components";
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

export const MovieContainer = styled.div`
  h2 {
    text-align: center;
  }
  .movies_container {
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
        display: flex;
        flex-direction: column;
        height: 100%;

        img {
          width: 100%;
          height: 350px;
          border-radius: 8px;
          object-fit: cover;
        }

        .card-body {
          display: flex;
          flex-direction: column;
          flex-grow: 1;
          justify-content: space-between;
          align-items: center;
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
      display: flex;
      li:not(:first-child) {
        margin-left: 8px;
      }
    }
    justify-content: center;
  }
`;
