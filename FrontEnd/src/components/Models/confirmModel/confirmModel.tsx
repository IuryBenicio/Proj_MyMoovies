import { ConfirmModelContainer } from "./styles";

type PropsType = {
  text: string;
  closeModel: () => void;
  confirm: () => void;
};

export default function ConfirmModel({ closeModel, text, confirm }: PropsType) {
  return (
    <ConfirmModelContainer>
      <div className="card">
        <p>{text}</p>
        <div className="actions">
          <button className="btn btn-outline-success" onClick={confirm}>
            Confirmar
          </button>
          <button className="btn btn-outline-danger" onClick={closeModel}>
            Cancelar
          </button>
        </div>
      </div>
    </ConfirmModelContainer>
  );
}
