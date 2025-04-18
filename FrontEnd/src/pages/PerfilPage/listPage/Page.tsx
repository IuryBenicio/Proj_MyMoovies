import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { bancoDeDados } from "../../../helpers/getApi";
import { useEffect, useState } from "react";
import { EditContainer, ListContainer } from "./styles";
import ConfirmModel from "../../../components/Models/confirmModel/confirmModel";
import sadCat from "../../../assets/sad-cat-11.png";

import MovieItem from "../../../components/movieListItem/MovieItem";
import { useSelector } from "react-redux";
import { RootReducer } from "../../../store";
import { useQuery } from "@tanstack/react-query";

import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "@hello-pangea/dnd";

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

  //estado de movie
  const [movies, setMovies] = useState<movieType[]>([]);

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

  // Função de Drag
  function onDragEnd(result: DropResult) {
    const { source, destination } = result;
    if (!destination || source.index === destination.index) return;

    const updated = Array.from(movies);
    const [moved] = updated.splice(source.index, 1);
    updated.splice(destination.index, 0, moved);
    setMovies(updated);

    // Só manda os IDs
    const movieIds = updated.map((m) => m.movieId);

    axios
      .put(`${bancoDeDados}/movie/reorderlist/${id}`, { movieIds })
      .then(() => refetch())
      .catch((err) => console.error("Erro ao reordenar:", err));
  }

  // Estilo do item no DND
  const getItemStyle = (
    isDragging: boolean,
    draggableStyle: React.CSSProperties
  ): React.CSSProperties => ({
    userSelect: "none",
    padding: 8,
    margin: "0 0 8px 0",
    background: isDragging ? "#ececec1d" : "transparent",
    borderRadius: 4,
    boxShadow: isDragging ? "0 2px 8px rgba(0,0,0,0.2)" : "none",
    ...draggableStyle,
  });

  useEffect(() => {
    if (data) setMovies(data);
  }, [data]);

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
      {data && data?.length > 0 && (
        <div className="container-movies">
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="movieList">
              {(provided) => (
                <div
                  className="tabela"
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                >
                  {movies.map((movie, index) => (
                    <Draggable
                      key={movie.movieId}
                      draggableId={movie.movieId}
                      index={index}
                    >
                      {(prov, snapshot) => (
                        <div
                          ref={prov.innerRef}
                          {...prov.draggableProps}
                          {...prov.dragHandleProps}
                          style={getItemStyle(
                            snapshot.isDragging,
                            prov.draggableProps.style || {}
                          )}
                        >
                          <MovieItem
                            night={night}
                            Mark={setMark}
                            deleteModel={setMovieModelDelete}
                            movie={movie}
                          />
                          {movieModelDelete && (
                            <ConfirmModel
                              closeModel={() => setMovieModelDelete(false)}
                              text={`Deseja apagar o filme ${movie.title}?`}
                              confirm={() => deleteMovie(movie.movieId)}
                            />
                          )}
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
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
    </ListContainer>
  );
}
