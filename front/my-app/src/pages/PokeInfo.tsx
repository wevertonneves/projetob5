import { useParams } from "react-router";

const PokeInfo = () => {
  const { name } = useParams();
  return (
    <div>
      <h1>pokemon info {name}</h1>
    </div>
  );
};

export default PokeInfo;
