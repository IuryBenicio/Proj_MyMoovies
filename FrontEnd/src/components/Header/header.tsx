import { useDispatch, useSelector } from "react-redux";
import { HeaderContainer } from "./styles";
import { RootReducer } from "../../store";
import "bootstrap-icons/font/bootstrap-icons.css";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { changeMode } from "../../store/reducers/navbar";

export default function Header() {
  // estados
  const [search, setSearch] = useState("");
  const [nightMode, setNightMode] = useState(false);

  const location = useLocation();

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

  useEffect(() => {
    console.log(location.pathname);
  });

  return (
    <HeaderContainer night={night}>
      <nav className="navbar navbar-expand-lg ">
        <div className="container-fluid container">
          <a
            style={{ cursor: "pointer" }}
            onClick={() => navegar("/", { state: { atualizou: true } })}
            className="navbar-brand"
          >
            My Movies
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
            </div>
            {location.pathname != "/" && user._id.length > 0 && (
              <form onSubmit={(e) => getSearch(e)}>
                <input
                  onChange={(e) => setSearch(e.target.value)}
                  value={search}
                  className="form-control me-2 shadow-none"
                  type="text"
                  placeholder="Buscar filme"
                  aria-label="Search"
                  id="search-button"
                />
                <button
                  id="search-button"
                  className={
                    !night
                      ? "btn btn-outline-secondary"
                      : "btn btn-outline-light"
                  }
                  type="submit"
                >
                  <i className="bi bi-search"></i>
                </button>
              </form>
            )}
          </div>
        </div>
      </nav>
    </HeaderContainer>
  );
}
