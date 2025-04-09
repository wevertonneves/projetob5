import axios from "axios";
import { useState } from "react";
import "../styles/Pokedex.css";
import { Link } from "react-router-dom";

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

  return (
    <div className="pokedex-container">
      <input
        className="input"
        placeholder="Digite o nome do Pokémon"
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
      />
      <button className="button" onClick={searchPokemon}>
        Buscar
      </button>

      {pokemon && (
        <div className="pokemon-info">
          <p className="PokemonName">Nome: {pokemon.name}</p>
          <Link to={`/pokedex/${pokemon.name}`} className="details-link">
            Ver detalhes
          </Link>
          <img src={pokemon.sprites.front_default} className="image" />
        </div>
      )}
    </div>
  );
};

export default Pokedex;
