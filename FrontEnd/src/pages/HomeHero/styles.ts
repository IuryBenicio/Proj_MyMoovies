import styled from "styled-components";

export const HeroContainer = styled.div`
  /* background-color: rgba(0, 0, 0, 0.4); */
  height: calc(100dvh - 58px);
  max-width: 100dvw;
  width: 100%;
  .escuro {
    position: absolute;
    background-color: rgba(0, 0, 0, 0.5);
    width: 100%;
    height: calc(100dvh - 58px);
    z-index: 2;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .text {
      text-align: center;
    }
    h2 {
      @media screen and (max-width: 431px) {
        font-size: 38px;
        width: 90%;
        margin: 0 auto;
      }

      font-size: 3rem;
      color: white;
      font-weight: bold;
    }
    h3 {
      @media screen and (max-width: 431px) {
        font-size: 1.3em;
        margin: 0 auto;
        margin-top: 16px;
        width: 70%;
        margin-bottom: 16px;
      }
      font-size: 2rem;
      color: white;
    }
    button {
      font-size: 40px;
    }
  }
`;

export const FundoSlide = styled.div``;
