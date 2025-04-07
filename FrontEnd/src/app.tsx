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
// import AlertModal from "./components/Models/alertModel/alert";
// import { useState } from "react";
import ListPage from "./pages/PerfilPage/listPage/Page";
import ErrorPage from "./pages/ErrorPages/ErrorPost";

export default function App() {
  const { user } = useSelector((state: RootReducer) => state.user);

  // const { showMessage, messageText, type } = useSelector(
  //   (state: RootReducer) => state.alert
  // );

  // const [alert, setAlert] = useState(showMessage);

  return (
    <>
      <BrowserRouter>
        <Header />
        {/* {alert && (
          <AlertModal
            closeAlert={() => setAlert(false)}
            type={type}
            messageText={messageText}
          />
        )} */}
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
      </BrowserRouter>
    </>
  );
}
