import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { bancoDeDados } from "../../../helpers/getApi";
import { useState } from "react";
import { EditContainer, ListContainer } from "./styles";
import ConfirmModel from "../../../components/Models/confirmModel/confirmModel";
import sadCat from "../../../assets/sad-cat-11.png";

import MovieItem from "../../../components/movieListItem/MovieItem";
import { useSelector } from "react-redux";
import { RootReducer } from "../../../store";
import { useQuery } from "@tanstack/react-query";

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
  const { user } = useSelector((state: RootReducer) => state.user);
  const { night } = useSelector((state: RootReducer) => state.navBar);

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
  const [loading, setLoading] = useState<loadingType[]>([]);

  // Edita o nome da lista
  async function postNameList() {
    setLoadinName(true);
    await axios
      .post(`${bancoDeDados}/movie/editnamelist`, {
        listId: listId,
        newName: name,
        userId: user._id,
      })
      .then(() => {
        setEditName(false);
        setLoadinName(false);
        refetch();
      })
      .catch(() => {
        refetch();
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
        userId: user._id,
      })
      .then(() => {
        setEditDescription(false);
        setLoadinDescription(false);
        refetch();
      })
      .catch(() => {
        refetch();
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
        refetch();
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
    try {
      const response = await axios.get(
        `${bancoDeDados}/movie/listmovies/${id}`
      );
      // info list
      setListId(response.data._id);
      setDescription(response.data.description);
      setName(response.data.name);

      return response.data.moovieList;
    } catch (error) {
      console.log(error);
    }
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
        refetch();
      })
      .catch((e) => {
        alert("Deu merdda");
        console.log(e);
      });
  };

  // Carrega a lista assim que o componente é renderizado

  const { data, refetch } = useQuery<movieType[]>({
    queryKey: ["filmes-list"],
    queryFn: getList,
    refetchOnWindowFocus: true,
  });

  return (
    <ListContainer night={night} ModelDelete={movieModelDelete}>
      <div className="navegacao">
        <Link to={"/"}>
          <i className="bi bi-chevron-double-left"></i>Inicio
        </Link>
      </div>
      <div className="list-data">
        <div className="name">
          {!editName && !loadinName ? (
            <>
              <h2>{name}</h2>
              <i
                onClick={() => setEditName(true)}
                className="relative bi bi-pencil"
                style={{ color: "black" }}
              >
                editar
              </i>
            </>
          ) : (
            <EditContainer night={night}>
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
                style={{ color: "black" }}
              >
                editar
              </i>
            </>
          ) : (
            <EditContainer night={night}>
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
        {data && (
          <div className="tabela">
            {data!.map((movie, index) => (
              <div className="item" key={index}>
                <MovieItem
                  night={night}
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
        {data?.length === 0 && (
          <div className="empty">
            <img src={sadCat} alt="" />
            <div className="text">
              <span className="d-flex justify-content-center">Lista vazia</span>
              <p>adicione filmes, procurando-os na barra de busca</p>
            </div>
          </div>
        )}
      </div>
    </ListContainer>
  );
}
