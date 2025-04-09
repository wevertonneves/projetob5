import { useNavigate, useParams } from "react-router";

const Home = () => {
  const navigation = useNavigate();
  const { id } = useParams();

  return (
    <div>
      <button onClick={() => navigation("/")}>Ir para Login</button>
      <button onClick={() => navigation("/pokedex")}>PESQUISAR POKEMON</button>

      <p>Home - ID: {id}</p>
    </div>
  );
};

export default Home;
