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

  function logoutStore() {
    dispatch(logout());
  }

  const handleLogout = async () => {
    await axios.post(`${bancoDeDados}/user/logout`).then((response) => {
      logoutStore();
      if (response.status === 400) {
        alert("Sessão encerrada com sucesso");
        navegar("/");
      }
    });
  };

  return (
    <PerfilComponent>
      <div className="container-perfil">
        <span className="username">NOME DO USUÁRIO</span>
        <span className="email">E-mail: iury620@gmail.com {user.email}</span>

        {/* {user.name.length > 0 && ( */}
        <button
          className="logout-button btn btn-outline-danger"
          onClick={() => handleLogout()}
        >
          Sair
        </button>
        {/* )} */}
      </div>
    </PerfilComponent>
  );
}
