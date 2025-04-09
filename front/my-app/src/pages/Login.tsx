import { Link } from "react-router";

const login = () => {
  const id = 10;
  return (
    <div>
      pokedexxxxxxxxxxxxxxx Login
      <Link to={`/home/${id}`}> ir para home</Link>
    </div>
  );
};

export default login;
