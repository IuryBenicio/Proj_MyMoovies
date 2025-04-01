import axios from "axios";
import { ListContainer } from "./styles";
import { bancoDeDados } from "../../../helpers/getApi";
import { useState } from "react";

type AddListModelProps = {
  closeModel: () => void;
  userId: string;
  // atualizaLists: () => void; // função para atualizar a lista de listas após adicionar uma nova
};

export default function AddListModel({
  closeModel,
  userId,
}: // atualizaLists,
AddListModelProps) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  async function addList() {
    await axios
      .post(`${bancoDeDados}/movie/addlist`, {
        name: name,
        userId: userId,
        description: description,
      })
      .then(() => {
        setName("");
        setDescription("");
        // atualizaLists();
        alert("Lista Adicionada com sucesso!");
      })
      .catch((e) => {
        console.error(e);
        alert("Não foi possível adicionar a lista.");
      });
  }

  return (
    <ListContainer>
      <h3>Crie uma lista</h3>
      <input
        onChange={(e) => setName(e.target.value)}
        value={name}
        className="form-control"
        type="text"
        placeholder="Nome da lista"
      />
      <input
        className="form-control"
        type="text"
        placeholder="Descrição da lista"
        onChange={(e) => setDescription(e.target.value)}
        value={description}
      />
      <button
        onClick={addList}
        className="btn btn-outline-success"
        type="submit"
      >
        Criar lista
      </button>
      <button
        onClick={() => closeModel()}
        className="btn btn-outline-danger"
        type="button"
      >
        Cancelar
      </button>
    </ListContainer>
  );
}
