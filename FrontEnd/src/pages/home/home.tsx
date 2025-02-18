import { useSelector } from "react-redux";
import Hero from "../../components/HomeHero/Hero";
import { RootReducer } from "../../store";
import PerfilPage from "../PerfilPage/Page";

export default function Home() {
  const { authenticated } = useSelector((state: RootReducer) => state.user);

  return <>{authenticated ? <PerfilPage /> : <Hero />}</>;
}
