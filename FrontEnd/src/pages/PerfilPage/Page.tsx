import { useDispatch, useSelector } from "react-redux";
import { PerfilComponent } from "./styles";
import { RootReducer } from "../../store";
import axios from "axios";
import { bancoDeDados } from "../../helpers/getApi";
import { logout } from "../../store/reducers/user";
import { useNavigate } from "react-router-dom";

export default function PerfilPage() {
  const { user } = useSelector((state: RootReducer) => state.user);

  const navegar = useNavigate();

  const dispatch = useDispatch();

  function handleLogout() {
    dispatch(logout());
  }

  const logoutPost = async () => {
    await axios
      .post(`${bancoDeDados}/user/logout`)
      .then((response) => {
        handleLogout();
        alert("Sessão encerrada com sucesso" + response.status);
        navegar("/");
      })
      .catch((error) => {
        console.log(error);
        alert("Ocorreu um erro ao encerrar a sessão");
      });
  };

  return (
    <PerfilComponent>
      <div className="container-perfil">
        {user.name.length === 0 && (
          <>
            <h3>Faça seu login</h3>
            <button
              className="login-button mt-2 btn btn-outline-success"
              onClick={() => navegar("/login")}
            >
              Logar
            </button>
          </>
        )}
        {user.name.length > 0 && (
          <>
            <span className="username">NOME DO USUÁRIO</span>
            <span className="email">
              E-mail: iury620@gmail.com {user.email}
            </span>

            <button
              className="logout-button btn btn-outline-danger"
              onClick={() => logoutPost()}
            >
              Sair
            </button>
          </>
        )}
      </div>
    </PerfilComponent>
  );
}
