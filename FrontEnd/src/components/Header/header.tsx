import { useSelector } from "react-redux";
import { HeaderContainer } from "./styles";
import { RootReducer } from "../../store";
import "bootstrap-icons/font/bootstrap-icons.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PerfilModel from "../Models/perfilModel/Model";

export default function Header() {
  const [search, setSearch] = useState("");
  const navegar = useNavigate();
  const [loginModel, setLoginModel] = useState(false);

  const { user } = useSelector((state: RootReducer) => state.user);

  async function getSearch(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!search.trim()) return;
    setSearch("");
    navegar(`results/${search}`, { replace: true });
  }

  return (
    <HeaderContainer>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid container ">
          <a
            style={{ cursor: "pointer" }}
            onClick={() => navegar("/")}
            className="navbar-brand"
          >
            My Moovies
          </a>

          <div className="collapse navbar-collapse ms-4" id="navbarNav">
            <ul className="navbar-nav"></ul>
          </div>
          <div className="left-side">
            {user.name.length === 0 && (
              <>
                {loginModel && (
                  <div className="model-perfil">
                    <PerfilModel />
                  </div>
                )}
                <i
                  onClick={() => setLoginModel(!loginModel)}
                  className="avatar-icon bi bi-person-circle"
                ></i>
              </>
            )}
            <form onSubmit={(e) => getSearch(e)}>
              <input
                onChange={(e) => setSearch(e.target.value)}
                value={search}
                className="form-control me-2 shadow-none"
                type="text"
                placeholder="Search"
                aria-label="Search"
                id="search-button"
              />
              <button
                id="search-button"
                className="btn btn-outline-secondary "
                type="submit"
              >
                <i className="bi bi-search"></i>
              </button>
            </form>
          </div>
        </div>
      </nav>
    </HeaderContainer>
  );
}
