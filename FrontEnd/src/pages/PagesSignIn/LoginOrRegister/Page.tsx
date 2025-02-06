import { PageContainer } from "./styles";
import { Link } from "react-router-dom";

export default function LoginOrRegister() {
  return (
    <PageContainer>
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
