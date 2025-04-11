import { Button, TextField, Typography } from "@mui/material";
import { useState } from "react";

interface Props {
  onDeleteMovie: (id: number) => void;
  onDeleteGenre: (id: number) => void;
}

export default function DeleteMovieGenreForm({
  onDeleteMovie,
  onDeleteGenre,
}: Props) {
  const [deleteMovieId, setDeleteMovieId] = useState("");
  const [deleteGenreId, setDeleteGenreId] = useState("");

  const handleDeleteMovie = (e: React.FormEvent) => {
    e.preventDefault();
    onDeleteMovie(Number(deleteMovieId));
    setDeleteMovieId("");
  };

  const handleDeleteGenre = (e: React.FormEvent) => {
    e.preventDefault();
    onDeleteGenre(Number(deleteGenreId));
    setDeleteGenreId("");
  };

  return (
    <>
      <form onSubmit={handleDeleteMovie}>
        <Typography variant="h6">Excluir Filme</Typography>
        <TextField
          label="ID do Filme"
          type="number"
          fullWidth
          margin="normal"
          value={deleteMovieId}
          onChange={(e) => setDeleteMovieId(e.target.value)}
        />
        <Button type="submit" variant="contained" color="error">
          Excluir Filme
        </Button>
      </form>

      <form onSubmit={handleDeleteGenre} style={{ marginTop: 20 }}>
        <Typography variant="h6">Excluir Gênero</Typography>
        <TextField
          label="ID do Gênero"
          type="number"
          fullWidth
          margin="normal"
          value={deleteGenreId}
          onChange={(e) => setDeleteGenreId(e.target.value)}
        />
        <Button type="submit" variant="contained" color="error">
          Excluir Gênero
        </Button>
      </form>
    </>
  );
}
