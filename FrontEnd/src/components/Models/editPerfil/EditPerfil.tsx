import { useDispatch, useSelector } from "react-redux";
import { EditPerfilContainer } from "./styles";
import { RootReducer } from "../../../store";
import { setAlert } from "../../../store/reducers/alert";
import { useState } from "react";
import axios from "axios";
import { bancoDeDados } from "../../../helpers/getApi";
import {
  updateEmail,
  updateName,
  updateUsername,
} from "../../../store/reducers/user";
import EditSenha from "./editSenha/EditSenha";

type PropsType = {
  closeModel: () => void;
};

export default function EditPerfil(props: PropsType) {
  const { user } = useSelector((state: RootReducer) => state.user);
  const dispatch = useDispatch();

  //nome States
  const [name, setName] = useState(user.name);
  const [editName, setEditName] = useState(false);

  //userName States
  const [userName, setUserName] = useState(user.userName);
  const [editUserName, setEditUserName] = useState(false);

  //email States
  const [email, setEmail] = useState(user.email);
  const [editEmail, setEditEmail] = useState(false);

  //editar senha State
  const [editarSenha, setEditarSenha] = useState(false);

  const closeEditSenha = () => {
    setEditarSenha(false);
  };

  //RESETA OS INPUTS
  const resetInput = (type: string) => {
    if (type === "name") {
      setName(user.name);
      setEditName(false);
    } else if (type === "username") {
      setUserName(user.userName);
      setEditUserName(false);
    } else if (type === "email") {
      setEmail(user.email);
      setEditEmail(false);
    }
  };

  const submitNome = async (props: string) => {
    if (props === user.name) {
      setEditName(false);
    }
    await axios
      .patch(`${bancoDeDados}/user/editname/${user._id}`, {
        name: name,
      })
      .then((response) => {
        dispatch(
          setAlert({
            messageText: response.data.message,
            type: "success",
          })
        );
        dispatch(updateName(name));
        setEditName(false);
      })
      .catch((response) => {
        console.log(response);
        dispatch(
          setAlert({
            messageText: response.message,
            type: "error",
          })
        );
      });
  };

  const submitUserName = async (props: string) => {
    if (props === user.userName) {
      setEditUserName(false);
      return;
    }
    await axios
      .patch(`${bancoDeDados}/user/editusername/${user._id}`, {
        userName: userName,
      })
      .then((response) => {
        dispatch(
          setAlert({
            messageText: response.data.message,
            type: "success",
          })
        );
        dispatch(updateUsername(userName));
        setEditUserName(false);
      })
      .catch((response) => {
        console.log(response);
        dispatch(
          setAlert({
            messageText: response.data?.message,
            type: "error",
          })
        );
      });
  };

  const submitEmail = async (props: string) => {
    if (props === user.email) {
      setEditEmail(false);
      return;
    }
    await axios
      .patch(`${bancoDeDados}/user/editemail/${user._id}`, {
        email: email,
      })
      .then((response) => {
        dispatch(
          setAlert({
            messageText: response.data.message,
            type: "success",
          })
        );
        dispatch(updateEmail(email));
        setEditEmail(false);
      })
      .catch((response) => {
        console.log(response.message);
        dispatch(
          setAlert({
            messageText: response.message,
            type: "error",
          })
        );
      });
    return;
  };

  // RETORNO
  return (
    <EditPerfilContainer>
      <>
        {editarSenha && <EditSenha closeModel={closeEditSenha} />}
        <div className="container">
          <i
            onClick={() => props.closeModel()}
            className="close bi bi-x-lg"
          ></i>
          <h2>Editar informações</h2>
          <form>
            <div className="form-group">
              <label htmlFor="nome">Nome:</label>
              <div className="input-div">
                {editName ? (
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    placeholder="Nome"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                ) : (
                  <input
                    disabled
                    type="text"
                    className="form-control disabled"
                    id="name"
                    placeholder="Nome"
                    value={name}
                  />
                )}
                {editName ? (
                  <div className="d-flex">
                    <i
                      onClick={() => submitNome(name)}
                      className="relative confirm edit-icon bi bi-check-circle"
                    ></i>
                    <i
                      onClick={() => resetInput("name")}
                      className="relative cancel edit-icon bi bi-x-circle"
                    ></i>
                  </div>
                ) : (
                  <i
                    onClick={() => setEditName(true)}
                    className="relative bi bi-pencil"
                  ></i>
                )}
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="nome">Nome de usuário:</label>
              <div className="input-div">
                {editUserName ? (
                  <input
                    type="text"
                    className="form-control"
                    id="userName"
                    placeholder="Nome de usuario"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                  />
                ) : (
                  <input
                    disabled
                    type="text"
                    className="form-control disabled"
                    id="userName"
                    placeholder="Nome de usuario"
                    value={userName}
                  />
                )}
                {editUserName ? (
                  <div className="d-flex">
                    <i
                      onClick={() => submitUserName(userName)}
                      className="relative confirm edit-icon bi bi-check-circle"
                    ></i>
                    <i
                      onClick={() => resetInput("username")}
                      className="relative cancel edit-icon bi bi-x-circle"
                    ></i>
                  </div>
                ) : (
                  <i
                    onClick={() => setEditUserName(true)}
                    className="relative bi bi-pencil"
                  ></i>
                )}
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="email">Email:</label>
              <div className="input-div">
                {editEmail ? (
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                ) : (
                  <input
                    disabled
                    type="email"
                    className="form-control disabled"
                    id="email"
                    placeholder="Email"
                    value={email}
                  />
                )}
                {editEmail ? (
                  <div className="d-flex">
                    <i
                      onClick={() => submitEmail(email)}
                      className="relative confirm edit-icon bi bi-check-circle"
                    ></i>
                    <i
                      onClick={() => resetInput("email")}
                      className="relative cancel edit-icon bi bi-x-circle"
                    ></i>
                  </div>
                ) : (
                  <i
                    onClick={() => setEditEmail(true)}
                    className="relative bi bi-pencil"
                  ></i>
                )}
              </div>
            </div>

            <button
              type="button"
              className="w-100 mt-2 p-2 mb-4 btn btn-outline-secondary"
              onClick={() => setEditarSenha(true)}
            >
              Mudar Senha
            </button>
            <button
              type="submit"
              className="w-100 mt-5 btn btn-outline-success"
            >
              Salvar
            </button>
          </form>
        </div>
      </>
    </EditPerfilContainer>
  );
}
