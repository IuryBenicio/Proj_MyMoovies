import { useDispatch, useSelector } from "react-redux";
import { ListasContainer, PerfilComponent } from "./styles";
import { RootReducer } from "../../store";
import axios from "axios";
import { bancoDeDados } from "../../helpers/getApi";
import { logout } from "../../store/reducers/user";
import { Link, useNavigate } from "react-router-dom";
import EditPerfil from "../../components/Models/editPerfil/EditPerfil/EditPerfil";
import { useEffect, useState } from "react";
import { returnDescription } from "../../helpers/utils/utilsMovies";
import AddListModel from "../../components/Models/addListModel/AddList";

type ListTypes = {
  _id: string;
  name: string;
  description: string;
  date: string;
};

export default function PerfilPage() {
  const { user } = useSelector((state: RootReducer) => state.user);
  const [editar, setEditar] = useState(false);
  const [lists, setLists] = useState<ListTypes[]>([]);
  const [addListModel, setAddListModel] = useState(false);

  const navegar = useNavigate();
  const dispatch = useDispatch();

  const letters = 19;

  function returnTitle(title: string) {
    if (title.length > letters) {
      return title.substring(0, letters) + "...";
    }
    return title;
  }

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

  const handleGetLists = async () => {
    await axios
      .get(`${bancoDeDados}/movie/lists/${user._id}`)
      .then((response) => {
        setLists(response.data.data);
      })
      .catch(() => {
        alert("Ocorreu um erro ao carregar as listas");
      });
  };

  async function removeList(listId: string, index: number): Promise<void> {
    await axios
      .post(`${bancoDeDados}/movie/removelist`, {
        userId: user._id,
        listId: listId,
      })
      .then(() => {
        const listaFiltrada: ListTypes[] = [];

        lists.forEach((list, i) => {
          if (i !== index) {
            listaFiltrada.push(list);
          }
        });

        setLists(listaFiltrada);
        alert("Listagem removida com sucesso");
      })
      .catch((err) => {
        alert("Ocorreu um erro ao remover a lista");
        console.error(err);
      });
  }

  useEffect(() => {
    handleGetLists();
  }, []);

  return (
    <PerfilComponent>
      {addListModel && (
        <AddListModel
          // atualizaLists={handleGetLists}
          userId={user._id}
          closeModel={() => setAddListModel(false)}
        />
      )}
      {editar && <EditPerfil closeModel={() => setEditar(false)} />}
      <>
        <div className="container-perfil">
          {user.name.length === 0 && (
            <div className="fixo">
              <h3>Faça seu login</h3>
              <button
                className="login-button mt-2 btn btn-outline-success"
                onClick={() => navegar("/login")}
              >
                Logar
              </button>
            </div>
          )}
          {user.name.length > 0 && (
            <div className="logado">
              <div className="card-perfil">
                <img src={user.profileImage.path} alt="" />
                <div className="perfil-data">
                  <h2>{user.name}</h2>
                  <p>{user.email}</p>
                  <div className="buttons">
                    <button
                      className="btn btn-outline-secondary"
                      onClick={() => setEditar(true)}
                    >
                      Editar perfil
                    </button>
                    <button
                      className="btn btn-outline-danger"
                      onClick={() => logoutPost()}
                    >
                      Sair
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        {user.name.length > 0 && (
          <ListasContainer>
            <div>
              <a
                onClick={() => setAddListModel(true)}
                id="add-button"
                className="btn btn-light"
              >
                <i className="bi fs-3 bi-plus-lg"></i>
              </a>
              <div className="container text-center">
                <div className="row row-cols-2 row-cols-lg-5 g-2 g-lg-3">
                  {Array.isArray(lists) &&
                    lists.map((list, index) => (
                      <div key={index}>
                        <div className="col">
                          <div className="card">
                            <div className="card-body">
                              <h5 className="card-title">
                                {returnTitle(list.name)}
                              </h5>
                              <p className="card-text">
                                {returnDescription(list.description)}
                              </p>
                              <div className="links">
                                <Link
                                  to={`/list/${list._id}`}
                                  className="link-secondary me-3"
                                >
                                  acessar lista
                                </Link>
                                <a
                                  onClick={() => removeList(list._id, index)}
                                  className="link-danger btn"
                                >
                                  apagar lista
                                </a>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </ListasContainer>
        )}
      </>
    </PerfilComponent>
  );
}
