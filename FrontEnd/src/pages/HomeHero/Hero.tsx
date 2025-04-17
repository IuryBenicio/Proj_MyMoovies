import { useState } from "react";
import { HeroContainer } from "./styles";
import { useNavigate } from "react-router-dom";

export default function Hero() {
  const [button, setButton] = useState("light");
  const navegar = useNavigate();
  return (
    <HeroContainer>
      <div className="escuro">
        <div className="text">
          <h2>VENHA COMPARTILHAR COM SEUS AMIGOS</h2>
          <h3>E ORGANIZAR OS FILMES QUE VOCÊ DESEJA ASSISTIR</h3>
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
