import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home/home";
import Results from "./pages/resultsSearch/results";
import MoviePage from "./pages/moviePage/movie";
import Header from "./components/Header/header";
import Login from "./pages/PagesSignIn/Login/Login";
import Register from "./pages/PagesSignIn/Register/Register";
import LoginOrRegister from "./pages/PagesSignIn/LoginOrRegister/Page";
import { useSelector } from "react-redux";
import { RootReducer } from "./store";
import ListPage from "./pages/PerfilPage/listPage/Page";
import ErrorPage from "./pages/ErrorPages/ErrorPost";
import { GlobalStyles } from "./GlobalStyles";
import Footer from "./components/Footer/Footer";

export default function App() {
  const { user } = useSelector((state: RootReducer) => state.user);
  const { night } = useSelector((state: RootReducer) => state.navBar);

  return (
    <>
      <BrowserRouter>
        <GlobalStyles night={night} />
        <Header />
        <Routes>
          <Route path="/" index element={<Home />} />
          <Route path="/results/:id" element={<Results />} />
          <Route path="/movie/:id" element={<MoviePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/signup" element={<LoginOrRegister />} />
          <Route
            path="/list/:id"
            element={
              user.name.length > 0 ? (
                <ListPage />
              ) : (
                <ErrorPage message="Você não tem permissão para estar aqui" />
              )
            }
          />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}
