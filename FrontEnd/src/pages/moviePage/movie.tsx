import { useParams } from "react-router-dom";
import { MovieContainer } from "./styles";
import { useEffect, useState } from "react";
import axios from "axios";
import { apiKeyNumber, urlDefault } from "../../helpers/getApi";
import { moovieType } from "../../store/reducers/search";
// import Header from "../../components/Header/header";
import { useSelector } from "react-redux";
import { RootReducer } from "../../store";

export default function MoviePage() {
  const { user } = useSelector((state: RootReducer) => state.user);
  const [movieData, setMovieData] = useState<moovieType>({});
  const { id } = useParams();
  const [listData, setListData] = useState([]);

  async function getMoovie() {
    await axios
      .get(`${urlDefault}/movie/${id}`, {
        params: {
          api_key: apiKeyNumber,
        },
      })
      .then((response) => {
        console.log(response.data);
        setMovieData(response.data);
      });
  }

  useEffect(() => {
    getMoovie();
  }, []);

  return (
    <MovieContainer>
      {/* <Header /> */}
      <div className="container moovie-data">
        <h1>{movieData.title}</h1>
        <div className="data">
          <img
            src={`https://image.tmdb.org/t/p/w500${movieData.poster_path!}`}
            alt={movieData.title}
          />
          <div className="movie-details">
            <p className="description">{movieData.overview}</p>
            <div className="details-down">
              <div className="details-numbers">
                <p>Popularity: {movieData.popularity}</p>
                <p>Vote Average: {movieData.vote_average}</p>
                <p>Vote Count: {movieData.vote_count}</p>
              </div>
              {user.name.length > 1 ? (
                <div className="add-movie">
                  <button type="button" className="btn btn-outline-secondary">
                    Adicionar Filme à minha lista
                  </button>
                </div>
              ) : (
                <div className="add-movie">
                  <button
                    disabled
                    type="button"
                    className="btn btn-outline-secondary"
                  >
                    Adicionar Filme à minha lista
                  </button>
                  <span className="text-control">
                    você precisa estar logado para adicionar esse filme a uma
                    lista
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </MovieContainer>
  );
}
