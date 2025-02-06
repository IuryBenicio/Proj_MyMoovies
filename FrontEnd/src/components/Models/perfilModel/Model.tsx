import { useDispatch, useSelector } from "react-redux";
import { PerfilModelContainer } from "./styles";
import { logout } from "../../../store/reducers/user";
import axios from "axios";
import { bancoDeDados } from "../../../helpers/getApi";
import { useNavigate } from "react-router-dom";
import { RootReducer } from "../../../store";

interface Props {
  nome?: string;
}

export default function PerfilModel({ nome }: Props) {
  const { user } = useSelector((state: RootReducer) => state.user);
  const dispatch = useDispatch();
  const navegar = useNavigate();

  function handleLogout() {
    dispatch(logout());
  }

  function retornaUserName(userName: string) {
    if (userName!.length > 12) {
      return userName!.slice(0, 80) + " ...";
    }
    return userName;
  }

  const logoutPost = async () => {
    await axios.post(`${bancoDeDados}/user/logout`).then((response) => {
      handleLogout();
      if (response.status === 400) {
        alert("Sessão encerrada com sucesso");
        navegar("/");
      }
    });
  };

  return (
    <PerfilModelContainer>
      {user.name.length > 1 && (
        <>
          <span>
            Olá:{" "}
            <a className="perfil-button" href="/perfil">
              {retornaUserName(nome!)}
            </a>
          </span>
          <a className="perfil-button" href="">
            Configurações
          </a>
          <a className="btn btn-outline-danger" onClick={() => logoutPost()}>
            Sair
          </a>
        </>
      )}
      {user.name.length === 0 && (
        <div className="">
          {/* <span></span> */}
          <a className="login-button" href="/login">
            Faça login
          </a>
        </div>
      )}
    </PerfilModelContainer>
  );
}
