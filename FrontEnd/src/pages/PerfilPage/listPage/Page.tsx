import axios from "axios";
import { useParams } from "react-router-dom";
import { bancoDeDados } from "../../../helpers/getApi";
import { useEffect, useState } from "react";
import { EditContainer, ListContainer } from "./styles";
import ConfirmModel from "../../../components/Models/confirmModel/confirmModel";
import sadCat from "../../../assets/sad-cat-11.png";

import MovieItem from "../../../components/movieListItem/MovieItem";

export type movieType = {
  movieId: string;
  title: string;
  poster_path: string;
  sinopse: string;
  marqued: string;
};

type loadingType = {
  movieId: string;
  mark: "confirm" | "question" | "canceled";
  isLoading: boolean;
};

export default function ListPage() {
  const { id } = useParams();

  //estado delete filme
  const [movieModelDelete, setMovieModelDelete] = useState(false);

  //estados do list data
  const [listId, setListId] = useState("");

  ////estado do nome
  const [editName, setEditName] = useState(false);
  const [loadinName, setLoadinName] = useState(false);
  const [name, setName] = useState("");

  ////estado da descrição
  const [editDescription, setEditDescription] = useState(false);
  const [loadinDescription, setLoadinDescription] = useState(false);
  const [description, setDescription] = useState("");

  ////estados dos filmes
  const [movies, setMovies] = useState<movieType[]>([]);
  const [loading, setLoading] = useState<loadingType[]>([]);

  // Edita o nome da lista
  async function postNameList() {
    setLoadinName(true);
    await axios
      .post(`${bancoDeDados}/movie/editnamelist`, {
        listId: listId,
        newName: name,
      })
      .then((response) => {
        alert(response.data.message);
        setEditName(false);
        setLoadinName(false);
      })
      .catch((error) => {
        console.error(error);
        setLoadinName(false);
      });
  }

  // Edita a descrição da lista
  async function postDescriptionList() {
    setLoadinDescription(true);
    await axios
      .post(`${bancoDeDados}/movie/editdescriptionlist`, {
        listId: listId,
        newDescription: description,
      })
      .then(() => {
        setEditDescription(false);
        setLoadinDescription(false);
      })
      .catch((error) => {
        console.log(error);
        setLoadinDescription(false);
      });
  }

  // Marca o filme com sim ou não
  async function setMark(mark: string, movieId: string) {
    const isLoading = loading.find((i) => i.isLoading === true);
    if (isLoading) {
      return;
    }

    setLoading((prev) =>
      prev.map((movie) =>
        movie.movieId === movieId ? { ...movie, isLoading: true } : movie
      )
    );

    //Atualiza mark do filme
    await axios
      .post(`${bancoDeDados}/movie/markmovie`, {
        listId: listId,
        moovieId: movieId,
        mark: mark,
      })
      .then(() => {
        setMovies((prev) =>
          prev.map((movie) =>
            movie.movieId === movieId ? { ...movie, mark } : movie
          )
        );
        getList();
      })
      .catch((error) => {
        console.log(error);
        alert("erro ao mudar estado do filme");
      })
      .finally(() => {
        setTimeout(() => {
          setLoading((prev) =>
            prev.map((movie) =>
              movie.movieId === movieId ? { ...movie, isLoading: false } : movie
            )
          );
        }, 2000);
      });
  }

  // Função para buscar lista com filmes pelo id do usuário
  const getList = async () => {
    console.log("ATUALIZEI EM");
    await axios
      .get(`${bancoDeDados}/movie/listmovies/${id}`)
      .then((response) => {
        setMovies(response.data.moovieList);
        // info list
        setListId(response.data._id);
        setDescription(response.data.description);
        setName(response.data.name);
      });
  };

  // Deleta filme da lista
  const deleteMovie = async (moovieId: string) => {
    await axios
      .post(`${bancoDeDados}/movie/removemovie`, {
        listId: listId,
        moovieId: moovieId,
      })
      .then(() => {
        console.log("deletou");
        setMovieModelDelete(false);
        setMovies(movies.filter((movie) => movie.movieId !== moovieId));
        getList();
      })
      .catch((e) => {
        alert("Deu merdda");
        console.log(e);
      });
  };

  // Reorganiza no banco de dados
  // const reorderList = async (updatedMovies: movieType[]) => {
  //   await axios
  //     .post(`${bancoDeDados}/movie/reorderlist`, {
  //       listId: listId,
  //       newOrder: updatedMovies.map((movie, index) => ({
  //         movieId: movie.movieId,
  //         order: index,
  //       })),
  //     })
  //     .then((response) => {
  //       // setMovies();
  //       console.log(response.data.data);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // };

  // //Dnd
  // function reorder<T>(List: T[], startIndex: number, endIndex: number) {
  //   const result = Array.from(List);

  //   const [removed] = result.splice(startIndex, 1);
  //   result.splice(endIndex, 0, removed);

  //   return result;
  // }

  // async function onDragEnd(result: any) {
  //   if (!result.destination) {
  //     return;
  //   }

  //   const reorderedMovies = reorder(
  //     movies,
  //     result.source.index,
  //     result.destination.index
  //   );

  //   try {
  //     await reorderList(reorderedMovies);
  //   } catch (e) {
  //     console.log(e);
  //   }
  // }

  // Carrega a lista assim que o componente é renderizado
  useEffect(() => {
    getList();
  }, []);

  return (
    <ListContainer ModelDelete={movieModelDelete}>
      <div className="list-data">
        <div className="name">
          {!editName && !loadinName ? (
            <>
              <h2>{name}</h2>
              <i
                onClick={() => setEditName(true)}
                className="relative bi bi-pencil"
              >
                editar
              </i>
            </>
          ) : (
            <EditContainer>
              <input
                onChange={(e) => setName(e.target.value)}
                className="name-input"
                type="text"
                value={name}
              />
              <i
                onClick={() => postNameList()}
                className="relative confirm edit-icon bi bi-check-circle"
              ></i>
              <i
                onClick={() => setEditName(false)}
                className="relative cancel edit-icon bi bi-x-circle"
              ></i>
            </EditContainer>
          )}
        </div>
        <div className="description">
          {!editDescription && !loadinDescription ? (
            <>
              <p>{description}</p>
              <i
                onClick={() => setEditDescription(true)}
                className="relative bi bi-pencil"
              >
                editar
              </i>
            </>
          ) : (
            <EditContainer>
              <textarea
                onChange={(e) => setDescription(e.target.value)}
                className="description-input"
                value={description}
              />
              <i
                onClick={() => postDescriptionList()}
                className="relative confirm edit-icon bi bi-check-circle"
              ></i>
              <i
                onClick={() => setEditDescription(false)}
                className="relative cancel edit-icon bi bi-x-circle"
              ></i>
            </EditContainer>
          )}
        </div>
      </div>
      <div className="container-movies">
        {movies.length > 0 && (
          <div className="tabela">
            {movies.map((movie, index) => (
              <div className="item" key={index}>
                <MovieItem
                  Mark={setMark}
                  deleteModel={setMovieModelDelete}
                  movie={movie}
                />
                {movieModelDelete === true && (
                  <ConfirmModel
                    closeModel={() => setMovieModelDelete(false)}
                    text={"Deseja apagar o filme " + movie.title}
                    confirm={() => deleteMovie(movie.movieId)}
                  />
                )}
              </div>
            ))}
          </div>
        )}
        {movies.length === 0 && (
          <div className="empty">
            <img src={sadCat} alt="" />
            <div className="text">
              <span className="d-flex justify-content-center">Lista vazia</span>
              <p>adicione filmes para vê-los aqui</p>
            </div>
          </div>
        )}
      </div>
    </ListContainer>
  );
}
