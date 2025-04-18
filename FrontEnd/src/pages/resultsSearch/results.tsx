import axios from "axios";
import { apiKeyNumber, urlDefault } from "../../helpers/getApi";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { moovieType } from "../../store/reducers/search";
import { useNavigate } from "react-router-dom";
import { OrbitProgress } from "react-loading-indicators";
import {
  MovieContainer,
  PaginationContainer,
  ProgressContainer,
} from "./styles";
import {
  filterMovies,
  returnDescription,
  returnTitle,
} from "../../helpers/utils/utilsMovies";
import { useQuery } from "@tanstack/react-query";
import imageMovieNotFounded from "../../assets/ChatGPT Image 5_04_2025, 11_55_25.png";
import { useSelector } from "react-redux";
import { RootReducer } from "../../store";
//

export default function Results() {
  const [page, setPage] = useState(1);
  const navegar = useNavigate();
  const { id } = useParams();
  const [pageTotal, setPageTotal] = useState(0);

  const { night } = useSelector((state: RootReducer) => state.navBar);

  const { innerWidth: width } = window;

  async function fetchMoovies() {
    try {
      const response = await axios.get(`${urlDefault}/search/movie`, {
        params: {
          api_key: apiKeyNumber,
          query: id,
          page: page,
          language: "pt-BR",
        },
      });

      setPageTotal(response.data.total_pages);

      // const filmesArray = response.data.results;

      const filmesFiltrados = filterMovies(response.data.results);
      return filmesFiltrados;
    } catch (error) {
      alert("Error:" + error);
      return [];
    }
  }

  useEffect(() => {
    console.log(width);
  }, []);

  //DATA
  const { data: moovies, isLoading } = useQuery<moovieType[]>({
    queryKey: ["get-moovies", page, id],
    queryFn: fetchMoovies,
  });

  // Função para navegar
  function navigateToMovie(IdNumber?: number) {
    const StringId = String(IdNumber);
    navegar(`/movie/${StringId}`);
  }
  //--------------------

  // Se ainda estiver pesquisando
  if (isLoading) {
    return (
      <ProgressContainer>
        <div className="content">
          <OrbitProgress
            color="black"
            variant="track-disc"
            speedPlus={-4}
            easing="linear"
            size="large"
          />
          <h2>Carregando conteúdo</h2>
        </div>
      </ProgressContainer>
    );
  } else {
    return (
      <>
        <MovieContainer night={night} className="container">
          <div className="navegacao">
            <Link to={"/"}>
              <i className="bi bi-chevron-double-left"></i>Inicio
            </Link>
          </div>
          <h2>
            Resultados para: <span>{id}</span>
          </h2>
          <ul>
            <div className="movies_container">
              {moovies!.map((movie: moovieType) => (
                <li className="movie_card" key={movie.id}>
                  <div className="card ">
                    <img
                      src={
                        movie.poster_path
                          ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                          : imageMovieNotFounded
                      }
                      className="card-img-top"
                    />
                    <div className="card-body">
                      <h5 className="card-title">
                        {returnTitle(width, movie.title)}
                      </h5>
                      <p className="card-text">
                        {returnDescription(movie.overview)}
                      </p>
                      <a
                        onClick={() => navigateToMovie(movie.id)}
                        className="btn btn-secondary"
                      >
                        Ver mais sobre o filme
                      </a>
                    </div>
                  </div>
                </li>
              ))}
            </div>
          </ul>
        </MovieContainer>
        {/* Paginação */}

        <PaginationContainer>
          {pageTotal > 1 && pageTotal != 1 && (
            <nav className="pagination">
              <ul>
                {page > 1 && (
                  <li className="previous-page">
                    <button
                      onClick={() => setPage((old) => Math.max(old - 1, 1))}
                      type="button"
                      className="btn btn-outline-secondary"
                    >
                      Página Anterior
                    </button>
                  </li>
                )}

                <li className="actual-page">
                  <div className="btn btn-outline-secondary">
                    {page} de {pageTotal}
                  </div>
                </li>
                {page !== pageTotal && (
                  <li className="next-page">
                    <button
                      onClick={() => setPage(page + 1)}
                      type="button"
                      className="btn btn-outline-secondary"
                    >
                      Página Posterior
                    </button>
                  </li>
                )}
              </ul>
            </nav>
          )}
        </PaginationContainer>
      </>
    );
  }
  //------------------------------
}
//-----------------
