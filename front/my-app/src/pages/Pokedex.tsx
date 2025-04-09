import axios from "axios";
import { useState } from "react";
import "../styles/Pokedex.css";

const Pokedex = () => {
  const [inputText, setInputText] = useState("");
  const [loading, setLoading] = useState(false);
  const [pokemon, setPokemon] = useState(null);
  const [error, setError] = useState("");

  const searchPokemon = async () => {
    if (!inputText.trim()) {
      setError("Digite um nome válido!");
      return;
    }

    try {
      setLoading(true);
      setError("");
      const { data } = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${inputText.toLowerCase()}`
      );
      setPokemon(data);
    } catch (error) {
      setPokemon(null);
      setError("Pokémon não encontrado!");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="pokedex-container">Carregando...</div>;
  }

  return (
    <div className="pokedex-container">
      <input
        placeholder="Digite o nome do Pokémon"
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
      />
      <button onClick={searchPokemon}>Buscar</button>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {pokemon && (
        <div>
          <p>Nome: {pokemon.name}</p>
          <p>Peso: {pokemon.weight}</p>
          <img src={pokemon.sprites.front_default} alt={pokemon.name} />
        </div>
      )}
    </div>
  );
};

export default Pokedex;
