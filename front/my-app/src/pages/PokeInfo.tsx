import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import "../styles/PokemonInfo.css";

type Pokemon = {
  name: string;
  sprites: {
    front_default: string;
    front_shiny: string;
  };
  weight: number;
  types: { type: { name: string } }[];
};

const PokemonInfo = () => {
  const [loading, setLoading] = useState(false);
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);
  const { name } = useParams<{ name: string }>();

  const getPokemonInfo = async () => {
    if (!name) return;

    try {
      setLoading(true);
      const { data } = await axios.get<Pokemon>(
        `https://pokeapi.co/api/v2/pokemon/${name}`
      );
      setPokemon(data);
    } catch (error) {
      console.error("Erro ao buscar o Pokémon:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getPokemonInfo();
  }, [name]);

  if (loading) {
    return <div>Carregando Pokémon...</div>;
  }

  if (!pokemon) {
    return <div>Pokémon não encontrado!</div>;
  }

  return (
    <div className="pokemon-container">
      <h1 className="pokemon-title">Informações do Pokémon: {pokemon.name}</h1>
      <div className="pokemon-info">
        <p>
          <strong>Nome:</strong> {pokemon.name}
        </p>
        <p>
          <strong>Peso:</strong> {pokemon.weight} kg
        </p>
        <p>
          <strong>Tipos:</strong>{" "}
          {pokemon.types.map((t) => t.type.name).join(", ")}
        </p>
      </div>

      <div className="pokemon-sprites">
        <img src={pokemon.sprites.front_default} alt={pokemon.name} />
        <img src={pokemon.sprites.front_shiny} alt={`${pokemon.name} shiny`} />
      </div>
    </div>
  );
};

export default PokemonInfo;
