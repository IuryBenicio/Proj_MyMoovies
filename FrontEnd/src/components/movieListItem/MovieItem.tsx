import { movieType } from "../../pages/PerfilPage/listPage/Page";
import { ContainerMovie } from "./styles";

type MovieItemProps = {
  movie: movieType;
  deleteModel: (state: boolean) => void;
  Mark: (mark: string, movieId: string) => Promise<void>;
};

const MovieItem = ({ movie, deleteModel, Mark }: MovieItemProps) => {
  //Return Description
  function returnDescription(description: string) {
    // if (description.length > 100) {
    //   return `${description.slice(0, 510)} ...`;
    // }
    return description;
  }

  return (
    <ContainerMovie>
      <i
        onClick={(e) => {
          e.stopPropagation();
          console.log("clicou");
          deleteModel(true);
        }}
        className="delete-movie bi bi-trash"
      ></i>
      <div className="table-item">
        {/* Imagem */}
        <div id="poster">
          <img className="img" src={movie.poster_path} alt={movie.title} />
        </div>

        {/* Título */}
        <div id="title">
          <h3 className="title">{movie.title}</h3>
        </div>

        {/* Sinopse */}
        <div id="sinopse">
          <p className="sinopse">{returnDescription(movie.sinopse)}</p>
        </div>

        <div id="acoes">
          {movie.marqued === "cancel" ? (
            <i className="bi bi-bookmark-dash-fill text-success"></i>
          ) : (
            <i
              onClick={(e) => {
                e.stopPropagation();
                Mark("cancel", movie.movieId);
              }}
              className="cancel cursor-pointer bi bi-bookmark-dash"
            ></i>
          )}
          {movie.marqued === "question" ? (
            <i className="bi bi-bookmark-fill"></i>
          ) : (
            <i
              onClick={(e) => {
                e.stopPropagation();
                Mark("question", movie.movieId);
              }}
              className="question cursor-pointer bi bi-bookmark"
            ></i>
          )}
          {movie.marqued === "confirm" ? (
            <i className="bi bi-bookmark-check-fill text-danger"></i>
          ) : (
            <i
              onClick={(e) => {
                e.stopPropagation(); // prevent
                Mark("confirm", movie.movieId);
              }}
              className="confirm cursor-pointer bi bi-bookmark-check"
            ></i>
          )}
        </div>
      </div>
    </ContainerMovie>
  );
};

export default MovieItem;
