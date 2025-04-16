import { useSelector } from "react-redux";
import { FooterContainer } from "./styles";
import { RootReducer } from "../../store";

export default function Footer() {
  const { night } = useSelector((state: RootReducer) => state.navBar);
  return (
    <FooterContainer night={night}>
      <div className="icons">
        <span>Site feito por Iury Benicio</span>
        <span>
          <a href="https://github.com/IuryBenicio" target="blank">
            <i className="bi bi-github">/IuryBenicio</i>
          </a>
        </span>
      </div>
    </FooterContainer>
  );
}
