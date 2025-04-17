import styled from "styled-components";

type props = {
  night: boolean;
};

export const HeroContainer = styled.div<props>`
  @media screen and (max-width: 431px) {
    background-image: ${(props) =>
      props.night === true
        ? "url('/images/night-mobile.png')"
        : 'url("/images/mobile-hero.png")'};
  }

  background-image: ${(props) =>
    props.night === true
      ? "url('/images/night-pc.png')"
      : 'url("/images/pc-hero.png")'};
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;

  height: calc(100dvh - 58px);
  max-width: 100dvw;
  width: 100%;

  position: relative;

  .escuro {
    position: absolute;
    background-color: ${(props) =>
      props.night === true ? "none" : "rgba(0, 0, 0, 0.5)"};
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
      font-size: 3rem;
      color: white;
      font-weight: bold;

      @media screen and (max-width: 431px) {
        font-size: 38px;
        width: 90%;
        margin: 0 auto;
      }
    }

    h3 {
      font-size: 2rem;
      color: white;

      @media screen and (max-width: 431px) {
        font-size: 1.3em;
        margin: 16px auto;
        width: 70%;
      }
    }

    button {
      font-size: 40px;
    }
  }
`;
