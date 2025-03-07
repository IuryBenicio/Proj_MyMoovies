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
  const [editar, setEditar] = useState(false);

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
      {editar && <EditPerfil closeModel={() => setEditar(false)} />}
      <>
        <div className="container-perfil fixo">
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
            <div className="logado">
              <aside className="aside-container">
                <div className="form-place">
                  <img
                    className="profile-image"
                    src={user.profileImage.path}
                    alt={user.userName}
                  />
                  <span className="username">{user.userName}</span>
                </div>
                <p>Dados pessoais:</p>
                <span className="name">{user.name}</span>
                <span className="email">E-mail: {user.email}</span>
                <div className="buttons">
                  <ul>
                    <li>
                      <button onClick={() => setEditar(true)} className="">
                        Editar Perfil
                      </button>
                      <button className="">Apagar Conta</button>
                      <button onClick={logoutPost}>Sair</button>
                    </li>
                  </ul>
                </div>
              </aside>
              <div className="listas">
                <div className="add-or-remove">
                  <i className="bi bi-plus-circle"></i>
                </div>
              </div>
            </div>
          )}
        </div>
      </>
    </PerfilComponent>
  );
}
