import { useDispatch, useSelector } from "react-redux";
import { ContainerEmpty, ListasContainer, PerfilComponent } from "./styles";
import { RootReducer } from "../../store";
import axios from "axios";
import { bancoDeDados } from "../../helpers/getApi";
import { logout } from "../../store/reducers/user";
import { Link, useNavigate } from "react-router-dom";
import EditPerfil from "../../components/Models/editPerfil/EditPerfil/EditPerfil";
import { useState } from "react";
import { returnDescription } from "../../helpers/utils/utilsMovies";
import AddListModel from "../../components/Models/addListModel/AddList";
import { updateImage } from "../../store/reducers/user";
import { MoonLoader } from "react-spinners";
import { useQuery } from "@tanstack/react-query";
import { cores } from "../../GlobalStyles";
import ConfirmModel from "../../components/Models/confirmModel/confirmModel";

type ListTypes = {
  _id: string;
  name: string;
  description: string;
  date: string;
};

export default function PerfilPage() {
  const { user } = useSelector((state: RootReducer) => state.user);
  const { night } = useSelector((state: RootReducer) => state.navBar);

  //states
  const [search, setSearch] = useState("");
  const [editar, setEditar] = useState(false);
  const [addListModel, setAddListModel] = useState(false);
  const [confirmDeleteList, setConfirmDeleteList] = useState<string | null>(
    null
  );

  //image states

  const [imageFile, setImageFile] = useState<File | null>(null); // Guarda o arquivo
  const [preview, setPreview] = useState<string | undefined>(undefined); // Guarda a URL do preview

  const [imageLoad, setImageLoad] = useState(false);

  const navegar = useNavigate();
  const dispatch = useDispatch();

  const letters = 19;

  async function updateImageProfile() {
    if (imageFile) {
      const formData = new FormData();

      formData.append("image", imageFile);

      setImageLoad(true);

      await axios
        .patch(
          `${bancoDeDados}/user/uploadprofileimage/${user._id}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        )
        .then((response) => {
          alert("mudado com sucesso");
          dispatch(updateImage(response.data.data));
          setPreview(undefined);
          setImageLoad(false);

          return;
        })
        .catch((err) => {
          setImageLoad(false);
          alert("Erro ao atualizar imagem de perfil");
          console.log(err);
        });
    }
    return;
  }

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      setImageFile(file);

      // Criar preview
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
    }
  };

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
      .then(() => {
        handleLogout();
        navegar("/");
      })
      .catch((error) => {
        console.error(error);
        alert("Ocorreu um erro ao encerrar a sessão");
      });
  };

  const handleGetLists = async () => {
    try {
      const response = await axios.get(
        `${bancoDeDados}/movie/lists/${user._id}`
      );

      return response.data.data;
    } catch {
      alert("Ocorreu um erro ao carregar as listas");
    }
  };

  async function removeList(listId: string): Promise<void> {
    await axios
      .post(`${bancoDeDados}/movie/removelist`, {
        listId: listId,
        userId: user._id,
      })
      .then(() => {
        // alert("Listagem removida com sucesso");
        refetch();
      })
      .catch((err) => {
        alert("Ocorreu um erro ao remover a lista");
        console.error(err);
      });
  }

  async function getSearch(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!search.trim()) return;
    setSearch("");
    navegar(`results/${search}`, { replace: true });
  }

  const { data, refetch } = useQuery<ListTypes[]>({
    queryKey: ["minhas-listas"],
    queryFn: handleGetLists,
    refetchOnWindowFocus: true, // recarrega quando volta para a aba
  });

  return (
    <PerfilComponent night={night}>
      {addListModel && (
        <div className="fundo">
          <AddListModel
            colorText={night ? "white" : "black"}
            backgroundColor={night ? cores.card : "white"}
            position={{ top: "40%", left: "43.8%" }}
            atualizaLists={refetch}
            userId={user._id}
            closeModel={() => setAddListModel(false)}
          />
        </div>
      )}
      {editar && <EditPerfil closeModel={() => setEditar(false)} />}
      <>
        <div className="container-perfil">
          <div className="logado ">
            <div className="card-perfil">
              {/* IMAGE DIV */}
              <div className="image-div">
                {imageLoad ? (
                  <MoonLoader />
                ) : (
                  <>
                    <label htmlFor="image-card">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        id="image-card"
                      />
                      <img
                        src={
                          preview === undefined
                            ? user.profileImage.path
                            : preview
                        }
                        alt=""
                      />
                      <div className="edit-image">
                        {preview === undefined ? (
                          <>
                            <i className="bi bi-pencil-fill"></i>
                            <span>editar imagem</span>
                          </>
                        ) : (
                          <>
                            <i className="bi bi-pencil-fill"></i>
                            <span>escolher outra imagem</span>
                          </>
                        )}
                      </div>
                    </label>
                    {preview !== undefined && (
                      <div className="confirm-image">
                        <i
                          onClick={() => {
                            setPreview(undefined);
                            setImageFile(null);
                          }}
                          className="bi bi-x-lg"
                        ></i>
                        <i
                          onClick={() => updateImageProfile()}
                          className="bi bi-check-lg"
                        ></i>
                      </div>
                    )}
                  </>
                )}
              </div>
              {/*  */}
              <div className="perfil-data">
                <h2>{user.name}</h2>
                <p>@{user.userName}</p>
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
        </div>
        <div className="container-search">
          <label htmlFor="search-button">
            <span>PESQUISE AQUI SEUS FILMES PARA ADICIONA-LOS A UMA LISTA</span>
            <form onSubmit={(e) => getSearch(e)}>
              <input
                onChange={(e) => setSearch(e.target.value)}
                value={search}
                className="form-control me-2 shadow-none"
                type="text"
                placeholder="Buscar filme"
                aria-label="Search"
                id="search-button"
              />
              <button
                id="search-button"
                className={
                  !night ? "btn btn-outline-secondary" : "btn btn-outline-light"
                }
                type="submit"
              >
                <i className="bi bi-search"></i>
              </button>
            </form>
          </label>
        </div>
        {user.name.length > 0 && (
          <ListasContainer night={night}>
            <div>
              <div className="add-div">
                <a
                  onClick={() => setAddListModel(true)}
                  id="add-button"
                  className="btn btn"
                  style={{ backgroundColor: night ? cores.card : "white" }}
                >
                  <i
                    style={{ color: night ? "white" : "black" }}
                    className="add-list-i bi fs-3 bi-plus-lg"
                  ></i>
                </a>
              </div>
              <div className="container text-center">
                {data?.length === 0 && (
                  <ContainerEmpty night={night}>
                    <div className="empty">
                      <span>Crie listas e as adicione aqui</span>
                      <p>basta clicar no +</p>
                    </div>
                  </ContainerEmpty>
                )}
                <ul>
                  {Array.isArray(data) &&
                    data.map((list, index) => (
                      <li key={index}>
                        <div>
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
                                    className="link-secondary btn"
                                  >
                                    acessar lista
                                  </Link>
                                  <a
                                    onClick={() =>
                                      setConfirmDeleteList(list._id)
                                    }
                                    className="link-danger btn"
                                  >
                                    apagar lista
                                  </a>
                                  {confirmDeleteList === list._id && (
                                    <ConfirmModel
                                      text={`Deseja mesmo deletar a lista "${list.name}"`}
                                      confirm={() => {
                                        removeList(list._id);
                                      }}
                                      closeModel={() =>
                                        setConfirmDeleteList(null)
                                      }
                                    />
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </li>
                    ))}
                </ul>
              </div>
            </div>
          </ListasContainer>
        )}
      </>
    </PerfilComponent>
  );
}
