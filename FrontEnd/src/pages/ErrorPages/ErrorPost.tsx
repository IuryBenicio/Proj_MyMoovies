import { Link } from "react-router-dom";
import { ErrorPageContainer } from "./styles";

type props = {
  message: string;
};

export default function ErrorPage({ message }: props) {
  return (
    <ErrorPageContainer className="container">
      <h1>Error 404</h1>
      <h2>{message}</h2>
      <Link to="/">Voltar para a página inicial</Link>
    </ErrorPageContainer>
  );
}
