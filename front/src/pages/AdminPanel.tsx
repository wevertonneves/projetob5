import {
  AppBar,
  Toolbar,
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
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const AdminPanel = () => {
  const navigate = useNavigate();
  const [movie, setMovie] = useState({
    name: "",
    year: "",
    duration: "",
    imageUrl: "",
    videoUrl: "",
    genre: "", // Agora usamos um array para suportar múltiplos gêneros
  });

  const [filmes, setFilmes] = useState([]);
  const [generos, setGeneros] = useState([]); // Novo estado para armazenar os gêneros
  const [selectedFilmeId, setSelectedFilmeId] = useState("");

  useEffect(() => {
    getAllFilmes();
    getAllGeneros(); // Buscar os gêneros ao carregar a página
  }, []);

  const handleChange = (e) => {
    setMovie({ ...movie, [e.target.name]: e.target.value });
  };

  const handleGenreChange = (event) => {
    setMovie({ ...movie, genre: event.target.value });
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const handleGoHome = () => {
    navigate("/home");
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
      const res = await axios.get("http://localhost:3000/genero"); // Rota correta para buscar gêneros
      setGeneros(res.data); // Salvar gêneros no estado
    } catch (error) {
      console.error("Erro ao buscar gêneros:", error);
    }
  };

  const handleDelete = async () => {
    if (!selectedFilmeId) return;

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
        genres: [movie.genre], // Enviar o ID do gênero corretamente
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
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">Painel Administrativo</Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={handleGoHome}
            sx={{ marginLeft: "auto", marginRight: 2 }}
          >
            Voltar para Home
          </Button>
          <Button variant="contained" color="error" onClick={handleLogout}>
            Sair
          </Button>
        </Toolbar>
      </AppBar>

      <Container maxWidth="sm" sx={{ mt: 4 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Adicionar ou Remover Filmes
        </Typography>

        <Box
          component="form"
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            mt: 2,
            backgroundColor: "#121212",
            p: 3,
            borderRadius: 2,
          }}
        >
          <TextField
            label="Nome do Filme"
            name="name"
            value={movie.name}
            onChange={handleChange}
            fullWidth
            InputProps={{ style: { color: "white" } }}
            InputLabelProps={{ style: { color: "white" } }}
          />
          <TextField
            label="Ano de Lançamento"
            name="year"
            value={movie.year}
            onChange={handleChange}
            fullWidth
            InputProps={{ style: { color: "white" } }}
            InputLabelProps={{ style: { color: "white" } }}
          />
          <TextField
            label="Duração (min)"
            name="duration"
            value={movie.duration}
            onChange={handleChange}
            fullWidth
            InputProps={{ style: { color: "white" } }}
            InputLabelProps={{ style: { color: "white" } }}
          />
          <TextField
            label="Link da capa do filme"
            name="imageUrl"
            value={movie.imageUrl}
            onChange={handleChange}
            fullWidth
            InputProps={{ style: { color: "white" } }}
            InputLabelProps={{ style: { color: "white" } }}
          />
          <TextField
            label="Link do Vídeo"
            name="videoUrl"
            value={movie.videoUrl}
            onChange={handleChange}
            fullWidth
            InputProps={{ style: { color: "white" } }}
            InputLabelProps={{ style: { color: "white" } }}
          />

          <FormControl fullWidth>
            <InputLabel id="genre-label" sx={{ color: "white" }}>
              Gênero
            </InputLabel>
            <Select
              labelId="genre-label"
              name="genre"
              value={movie.genre}
              onChange={handleGenreChange}
              sx={{ color: "white" }}
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

          <FormControl fullWidth sx={{ mt: 2 }}>
            <InputLabel id="select-filme-label" sx={{ color: "white" }}>
              Selecione um Filme para Deletar
            </InputLabel>
            <Select
              labelId="select-filme-label"
              value={selectedFilmeId}
              onChange={(e) => setSelectedFilmeId(e.target.value)}
              sx={{ color: "white" }}
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
    </div>
  );
};

export default AdminPanel;
