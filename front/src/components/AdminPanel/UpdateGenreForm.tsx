import { Button, TextField, Typography } from "@mui/material";
import { useState } from "react";

interface Props {
  onUpdateGenre: (data: { id: number; nome: string }) => void;
}

export default function UpdateGenreForm({ onUpdateGenre }: Props) {
  const [updateData, setUpdateData] = useState({ id: "", nome: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateGenre({ id: Number(updateData.id), nome: updateData.nome });
    setUpdateData({ id: "", nome: "" });
  };

  return (
    <form onSubmit={handleSubmit}>
      <Typography variant="h6">Atualizar Gênero</Typography>
      <TextField
        label="ID do Gênero"
        type="number"
        fullWidth
        margin="normal"
        value={updateData.id}
        onChange={(e) => setUpdateData({ ...updateData, id: e.target.value })}
      />
      <TextField
        label="Novo Nome do Gênero"
        fullWidth
        margin="normal"
        value={updateData.nome}
        onChange={(e) => setUpdateData({ ...updateData, nome: e.target.value })}
      />
      <Button type="submit" variant="contained" color="primary">
        Atualizar Gênero
      </Button>
    </form>
  );
}
