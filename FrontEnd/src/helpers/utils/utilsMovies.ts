import { moovieType } from "../../store/reducers/search";

export function filterMovies(moviesUnprocessed: moovieType[]) {
  return moviesUnprocessed.filter(
    (m) => m.overview!.length > 0 && m.poster_path?.length
  );
}

// Padroniza descrição
export function returnDescription(text?: string) {
  if (text!.length > 100) {
    return text!.slice(0, 80) + " ...";
  }
  return text;
}
//--------------------

// Padroniza Título
export function returnTitle(text?: string) {
  if (text!.length > 42) {
    return text!.slice(0, 38) + "...";
  }
  return text;
}
//-----------------
