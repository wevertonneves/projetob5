import {
  Typography,
  Button,
  Box,
  TextField,
  Container,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";
import "../styles/styles.css";

const AdminPanel = () => {
  const [movie, setMovie] = useState({
    name: "",
    year: "",
    duration: "",
    imageUrl: "",
    videoUrl: "",
    genre: "",
  });

  const [filmes, setFilmes] = useState([]);
  const [generos, setGeneros] = useState([]);
  const [selectedFilmeId, setSelectedFilmeId] = useState("");

  useEffect(() => {
    getAllFilmes();
    getAllGeneros();
  }, []);

  useEffect(() => {
    document.body.classList.add("bg-admin");

    return () => {
      document.body.classList.remove("bg-admin");
    };
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMovie({ ...movie, [e.target.name]: e.target.value });
  };

  const handleGenreChange = (event: any) => {
    setMovie({ ...movie, genre: event.target.value });
  };

  const getAllFilmes = async () => {
    try {
      const res = await axios.get("http://localhost:3000/filmes");
      setFilmes(res.data);
    } catch (error) {
      console.error("Erro ao buscar filmes:", error);
    }
  };

  const getAllGeneros = async () => {
    try {
      const res = await axios.get("http://localhost:3000/genero");
      setGeneros(res.data);
    } catch (error) {
      console.error("Erro ao buscar gêneros:", error);
    }
  };

  const handleDelete = async () => {
    if (!selectedFilmeId) return;

    const confirmacao = window.confirm(
      "Tem certeza que deseja deletar este filme?"
    );
    if (!confirmacao) return;

    try {
      await axios.delete(`http://localhost:3000/filmes/${selectedFilmeId}`);
      alert("Filme deletado com sucesso!");
      setSelectedFilmeId("");
      getAllFilmes();
    } catch (error) {
      console.error("Erro ao deletar filme:", error);
    }
  };

  const handleAddMovie = async () => {
    try {
      await axios.post("http://localhost:3000/filmes", {
        name: movie.name,
        year: movie.year,
        duration: movie.duration,
        imageUrl: movie.imageUrl,
        videoUrl: movie.videoUrl,
        genres: [movie.genre],
      });

      alert("Filme adicionado com sucesso!");

      setMovie({
        name: "",
        year: "",
        duration: "",
        imageUrl: "",
        videoUrl: "",
        genre: "",
      });

      getAllFilmes();
    } catch (error) {
      console.error("Erro ao adicionar filme:", error);
      alert("Erro ao adicionar filme.");
    }
  };

  return (
    <Container maxWidth="sm">
      <Box component="form" className="admin-form">
        <Typography variant="h4" align="center" gutterBottom>
          Painel Administrativo
        </Typography>

        <TextField
          label="Nome do Filme"
          name="name"
          value={movie.name}
          onChange={handleChange}
          fullWidth
        />
        <TextField
          label="Ano de Lançamento"
          name="year"
          value={movie.year}
          onChange={handleChange}
          fullWidth
        />
        <TextField
          label="Duração (min)"
          name="duration"
          value={movie.duration}
          onChange={handleChange}
          fullWidth
        />
        <TextField
          label="Link da capa do filme"
          name="imageUrl"
          value={movie.imageUrl}
          onChange={handleChange}
          fullWidth
        />
        <TextField
          label="Link do Vídeo"
          name="videoUrl"
          value={movie.videoUrl}
          onChange={handleChange}
          fullWidth
        />

        <FormControl fullWidth>
          <InputLabel id="genre-label">Gênero</InputLabel>
          <Select
            labelId="genre-label"
            name="genre"
            value={movie.genre}
            onChange={handleGenreChange}
            MenuProps={{
              PaperProps: {
                style: {
                  backgroundColor: "#1e1e1e",
                  color: "white",
                },
              },
            }}
          >
            {generos.map((genero) => (
              <MenuItem key={genero.id} value={genero.id}>
                {genero.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Button variant="contained" color="primary" onClick={handleAddMovie}>
          Adicionar Filme
        </Button>

        <FormControl fullWidth>
          <InputLabel id="select-filme-label">
            Selecione um Filme para Deletar
          </InputLabel>
          <Select
            labelId="select-filme-label"
            value={selectedFilmeId}
            onChange={(e) => setSelectedFilmeId(e.target.value)}
            MenuProps={{
              PaperProps: {
                style: {
                  backgroundColor: "#1e1e1e",
                  color: "white",
                },
              },
            }}
          >
            {filmes.map((filme) => (
              <MenuItem key={filme.id} value={filme.id}>
                {filme.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Button
          variant="contained"
          color="error"
          onClick={handleDelete}
          disabled={!selectedFilmeId}
        >
          Deletar Filme Selecionado
        </Button>
      </Box>
    </Container>
  );
};

export default AdminPanel;
