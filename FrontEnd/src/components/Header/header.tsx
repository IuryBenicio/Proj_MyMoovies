import { useSelector } from "react-redux";
import { HeaderContainer } from "./styles";
import { RootReducer } from "../../store";
import "bootstrap-icons/font/bootstrap-icons.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PerfilModel from "../Models/perfilModel/Model";

export default function Header() {
  const [search, setSearch] = useState("");
  const navegar = useNavigate();
  const [userExists, setUser] = useState(false);
  const [loginModel, setLoginModel] = useState(false);

  const { user } = useSelector((state: RootReducer) => state.user);

  useEffect(() => {
    setUser(true);
  }, [user]);

  async function getSearch() {
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
                {loginModel && <PerfilModel className="model-perfil" />}
                <i
                  onClick={() => setLoginModel(!loginModel)}
                  className="avatar-icon bi bi-person-circle"
                ></i>
              </>
            )}
            {user.name.length > 0 && (
              <>
                {userExists && (
                  <PerfilModel className="model-perfil" nome={user?.userName} />
                )}
                <i
                  onClick={() => setUser(!userExists)}
                  className="avatar-icon bi bi-door-open"
                ></i>
              </>
            )}
            <label htmlFor="search-button" className="d-flex">
              <input
                onChange={(e) => setSearch(e.target.value)}
                value={search}
                className="form-control me-2 shadow-none"
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
              <button
                id="search-button"
                className="btn btn-outline-secondary "
                onClick={() => getSearch()}
                type="button"
              >
                <i className="bi bi-search"></i>
              </button>
            </label>
          </div>
        </div>
      </nav>
    </HeaderContainer>
  );
}
