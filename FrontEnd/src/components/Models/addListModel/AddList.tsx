import axios from "axios";
import { ListContainer } from "./styles";
import { bancoDeDados } from "../../../helpers/getApi";
import { useState } from "react";

type AddListModelProps = {
  closeModel: () => void;
  position: {
    top: string;
    left: string;
  };
  backgroundColor: string;
  inputBorder?: string;
  userId?: string;
  atualizaLists?: () => void; // função para atualizar a lista de listas após adicionar uma nova
};

export default function AddListModel({
  closeModel,
  userId,
  atualizaLists,
  position,
  backgroundColor,
  inputBorder,
}: // atualizaLists,
AddListModelProps) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  async function addList() {
    setLoading(true);
    await axios
      .post(`${bancoDeDados}/movie/addlist`, {
        name: name,
        userId: userId,
        description: description,
      })
      .then(() => {
        setName("");
        setDescription("");
        setLoading(false);
        // atualizaLists();
        alert("Lista Adicionada com sucesso!");
        if (atualizaLists) {
          atualizaLists();
        }
      })
      .catch((e) => {
        console.error(e);
        setLoading(false);
        alert("Não foi possível adicionar a lista.");
      });
  }

  return (
    <ListContainer backgroundColor={backgroundColor} position={position}>
      <h3>Crie uma lista</h3>
      <input
        style={{
          backgroundColor: backgroundColor,
          border: `1px solid ${inputBorder}`,
        }}
        onChange={(e) => setName(e.target.value)}
        value={name}
        className="form-control"
        type="text"
        placeholder="Nome da lista"
      />
      <input
        style={{
          backgroundColor: backgroundColor,
          border: `1px solid ${inputBorder}`,
        }}
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
        disabled={loading}
      >
        Criar lista
      </button>
      <button
        onClick={() => closeModel()}
        className="btn btn-outline-danger"
        type="button"
        disabled={loading}
      >
        Cancelar
      </button>
    </ListContainer>
  );
}
