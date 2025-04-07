// import { useState } from "react";
import { ListType } from "../../../pages/moviePage/movie";
import { ContainerListModel } from "./styles";
import { moovieType } from "../../../store/reducers/search";
import { bancoDeDados } from "../../../helpers/getApi";
import axios from "axios";

type Props = {
  closeModal: () => void;
  movie: moovieType;
  lists: ListType[];
  listsThatMovieIn?: ListType[];
  atualizaList: () => void;
  openCriarLIst: () => void;
};

export default function ListModel({
  closeModal,
  movie,
  lists,
  listsThatMovieIn,
  atualizaList,
  openCriarLIst,
}: Props) {
  // retorna descrição formatada

  function returnDescription(description: string) {
    return description.slice(0, 50) + " ...";
  }

  // add filme a uma list do usuário
  async function addMovieToPlaylist(
    e: React.ChangeEvent<HTMLInputElement>,
    listId: string,
    movie: moovieType
  ) {
    //se não estiver marcado e eu clicar, ele irá adicionar o filme
    if (e.target.checked === true) {
      // setLoadingAdd(true);
      await axios
        .post(`${bancoDeDados}/movie/addmovie`, {
          listId: listId,
          overview: movie.overview,
          moovieId: movie.id,
          moovieName: movie.title,
          poster_path: movie.poster_path,
        })
        .then(() => {
          // setLoadingAdd(false);
          console.log("Filme adicionado com sucesso");
          atualizaList();
        })
        .catch((e) => {
          alert("Não conseguimos adicionar seu filme a sua lista");
          console.log(e);
        });
      return;
    }
    //se estiver já marcado e eu clicar, ele irá remover o filme
    if (e.target.checked === false) {
      await axios
        .post(`${bancoDeDados}/movie/removemovie`, {
          listId: listId,
          moovieId: movie.id,
        })
        .then(() => {
          console.log("Filme removido com sucesso");
          atualizaList();
          return;
        })
        .catch((error) => {
          console.log(error);
          alert("Não conseguimos remover seu filme da sua lista");
        });
      return;
    }
  }

  // compara listas com a lista que o filme perce (se o filme pertencer)
  function searchListMovieInLists(listId: string): boolean {
    if (!listsThatMovieIn || listsThatMovieIn.length === 0) {
      return false; // Retorna falso se a lista estiver vazia
    }
    return listsThatMovieIn.some((list) => list._id === listId);
  }

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
                id={list._id}
                onChange={(e) => addMovieToPlaylist(e, list._id, movie)}
                checked={searchListMovieInLists(list._id)}
              />
              <label className="btn" htmlFor={list._id}>
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
        <button className="add-playlist" onClick={openCriarLIst}>
          Criar PlayList
        </button>
      </div>
    </ContainerListModel>
  );
}
