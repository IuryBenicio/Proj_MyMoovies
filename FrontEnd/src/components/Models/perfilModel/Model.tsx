import { useDispatch, useSelector } from "react-redux";
import { PerfilModelContainer } from "./styles";
import { logout } from "../../../store/reducers/user";
import axios from "axios";
import { bancoDeDados } from "../../../helpers/getApi";
import { Link, useNavigate } from "react-router-dom";
import { RootReducer } from "../../../store";

interface Props {
  nome?: string;
}

export default function PerfilModel({ nome }: Props) {
  const { authenticated } = useSelector((state: RootReducer) => state.user);
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
    <PerfilModelContainer>
      {authenticated && (
        <>
          <span>
            Olá
            <Link className="perfil-button" to="/perfil">
              {"! " + retornaUserName(nome!)}
            </Link>
          </span>
          <a className="btn btn-outline-danger" onClick={() => logoutPost()}>
            Sair
          </a>
        </>
      )}
      {!authenticated && (
        <div className="">
          <Link className="login-button" to="/login">
            Faça login
          </Link>
        </div>
      )}
    </PerfilModelContainer>
  );
}
