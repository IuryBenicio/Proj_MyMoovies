import { useSelector } from "react-redux";
import { EditPerfilContainer } from "./styles";
import { RootReducer } from "../../../store";

type PropsType = {
  closeModel: () => void;
};

export default function EditPerfil(props: PropsType) {
  const { user } = useSelector((state: RootReducer) => state.user);
  return (
    <EditPerfilContainer>
      <>
        <div className="container">
          <i onClick={() => props.closeModel()} className="bi bi-x-circle"></i>
          <h2>Editar informações</h2>
          <form action="">
            <div className="form-group">
              <label htmlFor="nome">Nome</label>
              <input
                type="text"
                className="form-control"
                id="nome"
                placeholder="Nome"
                defaultValue={user.name}
              />
            </div>
            <div className="form-group">
              <label htmlFor="nome">UserName</label>
              <input
                type="text"
                className="form-control"
                id="nome"
                placeholder="Nome"
                defaultValue={user.userName}
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                className="form-control"
                id="email"
                placeholder="Email"
                defaultValue={user.email}
              />
            </div>
            <button
              type="button"
              className="w-100 mt-2 p-2 mb-4 btn btn-outline-secondary"
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
