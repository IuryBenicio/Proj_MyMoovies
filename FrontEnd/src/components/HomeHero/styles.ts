import styled from "styled-components";

export const HeroContainer = styled.div`
  /* background-color: rgba(0, 0, 0, 0.4); */
  height: calc(100dvh - 56px);
  max-width: 100dvw;
  width: 100%;
  .escuro {
    position: absolute;
    background-color: rgba(0, 0, 0, 0.5);
    width: 100%;
    height: calc(100dvh - 56px);
    z-index: 2;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    h2 {
      font-size: 3rem;
      color: white;
      font-weight: bold;
    }
    h3 {
      font-size: 2rem;
      color: white;
    }
    button {
      font-size: 40px;
    }
  }
`;

export const FundoSlide = styled.div``;
