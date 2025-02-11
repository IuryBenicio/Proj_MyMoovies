import { useDispatch, useSelector } from "react-redux";
import { HeaderContainer } from "./styles";
import { RootReducer } from "../../store";
import { changeNavBar } from "../../store/reducers/navbar";
import "bootstrap-icons/font/bootstrap-icons.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PerfilModel from "../Models/perfilModel/Model";

export default function Header() {
  const [search, setSearch] = useState("");
  const navegar = useNavigate();
  const [userExists, setUser] = useState(false);
  const [loginModel, setLoginModel] = useState(false);

  const { navBar } = useSelector((state: RootReducer) => state.navBar);
  const { user } = useSelector((state: RootReducer) => state.user);

  useEffect(() => {
    setUser(true);
  }, [user]);

  const dispatch = useDispatch();

  function setNavPage(query: string) {
    dispatch(changeNavBar(query));
    setSearch("");
  }

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
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse ms-4" id="navbarNav">
            <ul className="navbar-nav">
              {/* <li className="nav-item">
                <a
                  className={navBar === "Home" ? "nav-item active" : "nav-item"}
                  onClick={() => setNavPage("Home")}
                  aria-current="page"
                  href="#"
                >
                  Home
                </a>
              </li> */}
              {/* <li className="nav-item">
                <a
                  className={
                    navBar === "Perfil"
                      ? "nav-item active ms-3"
                      : "nav-item ms-3"
                  }
                  onClick={() => setNavPage("Perfil")}
                  href="#"
                >
                  Perfil
                </a>
              </li>
              <li className="nav-item">
                <a
                  className={
                    navBar === "Amigos"
                      ? "nav-item active ms-3"
                      : "nav-item ms-3"
                  }
                  onClick={() => setNavPage("Amigos")}
                  href="#"
                >
                  Amigos
                </a>
              </li> */}
            </ul>
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
