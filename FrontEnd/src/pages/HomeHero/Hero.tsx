import { useState } from "react";
import { HeroContainer } from "./styles";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootReducer } from "../../store";

export default function Hero() {
  const [button, setButton] = useState("light");
  const { night } = useSelector((state: RootReducer) => state.navBar);

  const navegar = useNavigate();

  return (
    <HeroContainer night={night}>
      <div className="escuro">
        <div className="text">
          <h2>ORGANIZE SEUS FILMES FAVORITOS OU QUE PRETENDE ASSISTIR</h2>
          <h3>TUDO ISSO ATRAVÉS DE LISTAS FEITAS DA SUA MANEIRA</h3>
          <button
            type="button"
            onClick={() => navegar("/signup")}
            onMouseOver={() => setButton("success")}
            onMouseLeave={() => setButton("light")}
            className={
              button === "light"
                ? "btn btn-outline-light mt-2"
                : "btn btn-outline-success mt-2"
            }
          >
            COMEÇAR AGORA
          </button>
        </div>
      </div>
    </HeroContainer>
  );
}
