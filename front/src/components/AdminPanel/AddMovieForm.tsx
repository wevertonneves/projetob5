import { Button, TextField, Typography } from "@mui/material";
import { useState } from "react";

interface Props {
  onAddMovie: (data: {
    nome: string;
    descricao: string;
    imagem: string;
    generoId: number;
  }) => void;
}

export default function AddMovieForm({ onAddMovie }: Props) {
  const [movieData, setMovieData] = useState({
    nome: "",
    descricao: "",
    imagem: "",
    generoId: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMovieData({ ...movieData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddMovie({ ...movieData, generoId: parseInt(movieData.generoId) });
    setMovieData({ nome: "", descricao: "", imagem: "", generoId: "" });
  };

  return (
    <form onSubmit={handleSubmit}>
      <Typography variant="h6" gutterBottom>
        Adicionar Filme
      </Typography>
      <TextField
        name="nome"
        label="Nome"
        fullWidth
        margin="normal"
        value={movieData.nome}
        onChange={handleChange}
      />
      <TextField
        name="descricao"
        label="Descrição"
        fullWidth
        margin="normal"
        value={movieData.descricao}
        onChange={handleChange}
      />
      <TextField
        name="imagem"
        label="Imagem (URL)"
        fullWidth
        margin="normal"
        value={movieData.imagem}
        onChange={handleChange}
      />
      <TextField
        name="generoId"
        label="ID do Gênero"
        type="number"
        fullWidth
        margin="normal"
        value={movieData.generoId}
        onChange={handleChange}
      />
      <Button type="submit" variant="contained" color="primary">
        Adicionar Filme
      </Button>
    </form>
  );
}
