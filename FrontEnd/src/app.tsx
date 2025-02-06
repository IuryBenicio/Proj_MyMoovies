import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Header from "./components/Header/header";
import Home from "./pages/home/home";
import Results from "./pages/resultsSearch/results";
import MoviePage from "./pages/moviePage/movie";
import Header from "./components/Header/header";
import Login from "./pages/PagesSignIn/Login/Login";
import Register from "./pages/PagesSignIn/Register/Register";
import LoginOrRegister from "./pages/PagesSignIn/LoginOrRegister/Page";
import PerfilPage from "./pages/PerfilPage/Page";

export default function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" index element={<Home />} />
          <Route path="/results/:id" element={<Results />} />
          <Route path="/movie/:id" element={<MoviePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/signup" element={<LoginOrRegister />} />
          <Route path="/perfil" element={<PerfilPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
