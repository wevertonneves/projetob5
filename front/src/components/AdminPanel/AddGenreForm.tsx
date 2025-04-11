import { Button, TextField, Typography } from "@mui/material";
import { useState } from "react";

interface Props {
  onAddGenre: (nome: string) => void;
}

export default function AddGenreForm({ onAddGenre }: Props) {
  const [nomeGenero, setNomeGenero] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddGenre(nomeGenero);
    setNomeGenero("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <Typography variant="h6" gutterBottom>
        Adicionar Gênero
      </Typography>
      <TextField
        label="Nome do Gênero"
        fullWidth
        margin="normal"
        value={nomeGenero}
        onChange={(e) => setNomeGenero(e.target.value)}
      />
      <Button type="submit" variant="contained" color="primary">
        Adicionar Gênero
      </Button>
    </form>
  );
}
