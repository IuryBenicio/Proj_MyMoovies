import { useDispatch, useSelector } from "react-redux";
import { PerfilComponent } from "./styles";
import { RootReducer } from "../../store";
import axios from "axios";
import { bancoDeDados } from "../../helpers/getApi";
import { logout } from "../../store/reducers/user";
import { useNavigate } from "react-router-dom";
import EditPerfil from "../../components/Models/editPerfil/EditPerfil";
import { useState } from "react";

export default function PerfilPage() {
  const { user } = useSelector((state: RootReducer) => state.user);
  const [editar, setEditar] = useState(true);

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
      {editar && <EditPerfil />}
      <>
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
              <div className="form-place">
                <span className="username">{user.userName}</span>
              </div>
              <p>Dados pessoais:</p>
              <span className="name">{user.name}</span>
              <span className="email">E-mail: {user.email}</span>
              <div className="buttons">
                <ul>
                  <li>
                    <button className="">Editar Perfil</button>
                    <button className="">Apagar Conta</button>
                    <button onClick={logoutPost}>Sair</button>
                  </li>
                </ul>
              </div>
            </>
          )}
        </div>
      </>
    </PerfilComponent>
  );
}
