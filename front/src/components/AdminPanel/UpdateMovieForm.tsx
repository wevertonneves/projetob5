import { Button, TextField, Typography } from "@mui/material";
import { useState } from "react";

interface Props {
  onUpdateMovie: (data: {
    id: number;
    nome: string;
    descricao: string;
    imagem: string;
  }) => void;
}

export default function UpdateMovieForm({ onUpdateMovie }: Props) {
  const [updateData, setUpdateData] = useState({
    id: "",
    nome: "",
    descricao: "",
    imagem: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUpdateData({ ...updateData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateMovie({ ...updateData, id: Number(updateData.id) });
    setUpdateData({ id: "", nome: "", descricao: "", imagem: "" });
  };

  return (
    <form onSubmit={handleSubmit}>
      <Typography variant="h6">Atualizar Filme</Typography>
      <TextField
        name="id"
        label="ID"
        type="number"
        fullWidth
        margin="normal"
        value={updateData.id}
        onChange={handleChange}
      />
      <TextField
        name="nome"
        label="Novo Nome"
        fullWidth
        margin="normal"
        value={updateData.nome}
        onChange={handleChange}
      />
      <TextField
        name="descricao"
        label="Nova Descrição"
        fullWidth
        margin="normal"
        value={updateData.descricao}
        onChange={handleChange}
      />
      <TextField
        name="imagem"
        label="Nova Imagem (URL)"
        fullWidth
        margin="normal"
        value={updateData.imagem}
        onChange={handleChange}
      />
      <Button type="submit" variant="contained" color="primary">
        Atualizar Filme
      </Button>
    </form>
  );
}
