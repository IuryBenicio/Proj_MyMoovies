import { useEffect, useState } from "react";
import { ListType } from "../../../pages/moviePage/movie";
import { ContainerListModel } from "./styles";
import { moovieType } from "../../../store/reducers/search";
import { bancoDeDados } from "../../../helpers/getApi";
import axios from "axios";
import { userType } from "../../../store/reducers/user";

type Props = {
  closeModal: () => void;
  movie: moovieType;
  user: userType;
};

export default function ListModel({ closeModal, movie, user }: Props) {
  // const [addPlayList, setAddPlayList] = useState(false);
  const [loadingAdd, setLoadingAdd] = useState(false);

  // State List Model
  const [lists, setLists] = useState<ListType[]>([]);
  const [listsMovieIn, setListsMovieIn] = useState<ListType[]>([]);

  async function getLists() {
    await axios
      .get(`${bancoDeDados}/movie/lists/${user._id}`)
      .then((response) => {
        console.log(response.data);
        setLists(response.data.data);
      })
      .catch((error) => console.log(error));
  }

  async function getListsthaMovieIsPresent() {
    await axios
      .get(`${bancoDeDados}/movie/movieinlists`, {
        params: {
          moovieId: movie.id,
          userId: user._id,
        },
      })
      .then((response) => {
        setListsMovieIn(response.data);
      });
  }

  // OUTRAS
  function returnDescription(description: string) {
    return description.slice(0, 50) + " ...";
  }

  async function addMovieToPlaylist(
    e: React.ChangeEvent<HTMLInputElement>,
    listId: string,
    movie: moovieType
  ) {
    // return console.log(e);
    if (e.target.checked === true) {
      setLoadingAdd(true);
      await axios
        .post(`${bancoDeDados}/movie/addmovie`, {
          listId: listId,
          overview: movie.overview,
          moovieId: movie.id,
          moovieName: movie.title,
          poster_path: movie.poster_path,
        })
        .then(() => {
          setLoadingAdd(false);
          console.log("Filme adicionado com sucesso");
        })
        .catch((e) => {
          alert("Não conseguimos adicionar seu filme a sua lista");
          console.log(e);
        });
      return;
    }
    if (e.target.checked === false) {
      await axios
        .post(`${bancoDeDados}/movie/removemovie`, {
          listId: listId,
          moovieId: movie.id,
        })
        .then(() => {
          console.log("Filme removido com sucesso");
          return;
        })
        .catch((error) => {
          console.log(error);
          alert("Não conseguimos remover seu filme da sua lista");
        });
      return;
    }
  }

  function searchListMovieInLists(listId: string) {
    const movieIsIn = [];
    // Filtra as listas em que o filme está incluso
    for (let i = 0; i < listsMovieIn.length; i++) {
      if (listsMovieIn[i]._id === listId) {
        movieIsIn.push(listsMovieIn[i]);
      }
    }

    if (movieIsIn.length > 0) {
      return true;
    }
    if (movieIsIn.length === 0) {
      return false;
    }
  }

  useEffect(() => {
    getLists();
    getListsthaMovieIsPresent();
  }, []);

  return (
    <ContainerListModel>
      <i onClick={() => closeModal()} className="close bi bi-x-lg"></i>
      <h2>Minhas Listas</h2>
      {lists!.length > 0 ? (
        <ul className="list-lists">
          {lists!.map((list, index) => (
            <li key={index}>
              <input
                type="checkbox"
                className="btn-check"
                autoComplete="off"
                name=""
                id="add1"
                onChange={(e) => addMovieToPlaylist(e, list._id, movie)}
                checked={searchListMovieInLists(list._id)}
              />
              <label className="btn" htmlFor="add1">
                <div className="data">
                  <h4>{list.name}</h4>
                  <p className="m-0">{returnDescription(list.description)}</p>
                </div>
              </label>
            </li>
          ))}
        </ul>
      ) : (
        <p>Você ainda não possui listas de filmes.</p>
      )}
      <div className="buttons">
        <hr />
        <button className="add-playlist">Criar PlayList</button>
      </div>
    </ContainerListModel>
  );
}
