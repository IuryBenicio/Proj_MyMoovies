import { useSelector } from "react-redux";
import { PageContainer } from "./styles";
import { Link } from "react-router-dom";
import { RootReducer } from "../../../store";

export default function LoginOrRegister() {
  const { night } = useSelector((state: RootReducer) => state.navBar);
  return (
    <PageContainer night={night}>
      <div className="container">
        <h2>Não possui conta?</h2>
        <Link
          to={"/register"}
          type="button"
          className="btn btn-outline-warning"
        >
          Crie uma conta
        </Link>
        <br />
        <h4>Já possui?</h4>
        <Link to={"/login"} type="button" className="btn btn-outline-success">
          Fazer login
        </Link>
      </div>
    </PageContainer>
  );
}
