import { useParams } from "react-router-dom";
import { MovieContainer } from "./styles";
import { useEffect, useState } from "react";
import axios from "axios";
import { apiKeyNumber, bancoDeDados, urlDefault } from "../../helpers/getApi";
import { moovieType } from "../../store/reducers/search";
import { useSelector } from "react-redux";
import { RootReducer } from "../../store";
import ListModel from "../../components/Models/ListModel/List";
import noImage from "../../assets/ChatGPT Image 5_04_2025, 11_55_25.png";
import AddListModel from "../../components/Models/addListModel/AddList";

export type ListType = {
  date: string;
  description: string;
  name: string;
  _id: string;
};

export default function MoviePage() {
  const { user } = useSelector((state: RootReducer) => state.user);
  const [movieData, setMovieData] = useState<moovieType>({});
  const { id } = useParams();

  //State addList Model
  const [addPlayList, setAddPlayList] = useState(true);

  // State List Model
  const [listModel, setListModel] = useState(false);

  // Lists do usuário
  const [lists, setLists] = useState<ListType[]>([]);
  const [listsMovieIn, setListsMovieIn] = useState<ListType[]>([]);

  //pega as listas do backend
  async function getLists() {
    await axios
      .get(`${bancoDeDados}/movie/lists/${user._id}`)
      .then((response) => {
        setLists(response.data.data);
      })
      .catch((error) => console.log(error));
  }

  //pega listas em que o filme está
  async function getListsthaMovieIsPresent() {
    await axios
      .post(`${bancoDeDados}/movie/movieinlists`, {
        moovieId: movieData.id,
        userId: user._id,
      })
      .then((response) => {
        setListsMovieIn(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  async function getMovieEn() {
    await axios
      .get(`${urlDefault}/movie/${id}`, {
        params: {
          api_key: apiKeyNumber,
          language: "en-US",
        },
      })
      .then((response) => {
        setMovieData(response.data);
      })
      .catch(() => {
        alert("Erro ao requisitar filme");
      });
  }

  async function getMoovie() {
    await axios
      .get(`${urlDefault}/movie/${id}`, {
        params: {
          api_key: apiKeyNumber,
          language: "pt-BR",
        },
      })
      .then((response) => {
        if (response.data.overview.length === 0) {
          getMovieEn();
          return;
        }
        setMovieData(response.data);
      })
      .catch(() => {
        alert(
          "Tivemos um erro ao buscar o filme no banco de dados, por favor, tente novamente mais tarde"
        );
      });
  }

  function abreModel(boolean: boolean) {
    setListModel(boolean);
    getListsthaMovieIsPresent();
  }

  useEffect(() => {
    if (listModel === false) {
      setAddPlayList(false);
    }
  }, [listModel]);

  useEffect(() => {
    getMoovie();
    getLists();
  }, []);

  return (
    <MovieContainer>
      {/* <Header /> */}
      <div className="container moovie-data">
        <h1>{movieData.title}</h1>
        <div className="data">
          <img
            src={
              movieData.poster_path
                ? `https://image.tmdb.org/t/p/w500${movieData.poster_path!}`
                : noImage
            }
            alt={movieData.title}
          />
          <div className="movie-details">
            <p className="description">{movieData.overview}</p>
            <div className="details-down">
              {user.name.length > 1 ? (
                <>
                  {addPlayList && (
                    <AddListModel
                      colorText="black"
                      backgroundColor="rgba(0, 0, 0, 0.25)"
                      position={{ left: "76.6%", top: "52.5%" }}
                      closeModel={() => setAddPlayList(false)}
                      inputBorder="grey"
                      userId={user._id}
                    />
                  )}
                  <div className="add-movie">
                    <button
                      onClick={() => {
                        abreModel(!listModel);
                      }}
                      type="button"
                      className="btn btn-outline-secondary"
                    >
                      Adicionar Filme à minha lista
                    </button>
                    {listModel && (
                      <ListModel
                        atualizaList={getListsthaMovieIsPresent}
                        listsThatMovieIn={listsMovieIn}
                        lists={lists}
                        movie={movieData}
                        closeModal={() => {
                          setListModel(false);
                          setAddPlayList(false);
                        }}
                        openCriarLIst={() => setAddPlayList(!addPlayList)}
                      />
                    )}
                  </div>
                </>
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
