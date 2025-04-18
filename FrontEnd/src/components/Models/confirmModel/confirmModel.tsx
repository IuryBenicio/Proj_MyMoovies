import { useSelector } from "react-redux";
import { ConfirmModelContainer } from "./styles";
import { RootReducer } from "../../../store";

type PropsType = {
  text: string;
  closeModel: () => void;
  confirm: () => void;
};

export default function ConfirmModel({ closeModel, text, confirm }: PropsType) {
  const { night } = useSelector((state: RootReducer) => state.navBar);
  return (
    <ConfirmModelContainer night={night}>
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
