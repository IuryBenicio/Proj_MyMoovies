import { ErrorPageContainer } from "./styles";

export default function ErrorPage(message: string) {
  return (
    <ErrorPageContainer className="container">
      <h1>Error 404</h1>
      <h2>{message}</h2>
      <a href="/">Voltar para a página inicial</a>
    </ErrorPageContainer>
  );
}
