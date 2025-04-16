import { useDispatch, useSelector } from "react-redux";
import { HeaderContainer } from "./styles";
import { RootReducer } from "../../store";
import "bootstrap-icons/font/bootstrap-icons.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PerfilModel from "../Models/perfilModel/Model";
import { changeMode } from "../../store/reducers/navbar";

export default function Header() {
  // estados
  const [search, setSearch] = useState("");
  const [loginModel, setLoginModel] = useState(false);
  const [nightMode, setNightMode] = useState(false);

  // função para navegar
  const navegar = useNavigate();

  // dispatch
  const dispatch = useDispatch();

  // estados de redux
  const { user } = useSelector((state: RootReducer) => state.user);
  const { night } = useSelector((state: RootReducer) => state.navBar);

  // funções
  function mudaNightMode() {
    if (nightMode) {
      dispatch(changeMode(false));
      setNightMode(false);
    }
    if (!nightMode) {
      dispatch(changeMode(true));
      setNightMode(true);
    }
  }

  async function getSearch(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!search.trim()) return;
    setSearch("");
    navegar(`results/${search}`, { replace: true });
  }

  return (
    <HeaderContainer night={night}>
      <nav className="navbar navbar-expand-lg ">
        <div className="container-fluid container">
          <a
            style={{ cursor: "pointer" }}
            onClick={() => navegar("/", { state: { atualizou: true } })}
            className="navbar-brand"
          >
            My Moovies
          </a>

          <div className="collapse navbar-collapse ms-4" id="navbarNav">
            <ul className="navbar-nav"></ul>
          </div>
          <div className="left-side">
            <div className="gadgets">
              <input
                type="checkbox"
                className="btn-check"
                id="btn-check-5"
                onChange={() => mudaNightMode()}
                checked
              />
              <label className="btn me-4" htmlFor="btn-check-5">
                {night ? (
                  <i className="bi bi-moon-stars-fill"></i>
                ) : (
                  <i className="bi bi-sun-fill"></i>
                )}
              </label>
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
            </div>
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
                className={
                  !night ? "btn btn-outline-secondary" : "btn btn-outline-light"
                }
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
