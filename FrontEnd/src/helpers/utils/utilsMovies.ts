import { moovieType } from "../../store/reducers/search";

export function filterMovies(moviesUnprocessed: moovieType[]) {
  return moviesUnprocessed.filter(
    (m) => m.overview!.length > 0 && m.poster_path?.length
  );
}

// Padroniza descrição
export function returnDescription(text?: string) {
  if (text!.length > 81) {
    return text!.slice(0, 77) + " ...";
  }
  return text;
}
//--------------------

// Padroniza Título
export function returnTitle(mobile: number, text?: string) {
  if (mobile >= 430) {
    if (text!.length > 32) {
      return text!.slice(0, 29) + "...";
    }
  }
  if (text!.length > 42) {
    return text!.slice(0, 38) + "...";
  }
  return text;
}
//-----------------
