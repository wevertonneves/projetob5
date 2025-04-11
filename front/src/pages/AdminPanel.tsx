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
    sinopse: "",
  });

  const [updateMovie, setUpdateMovie] = useState({
    id: "",
    name: "",
    year: "",
    duration: "",
    imageUrl: "",
    videoUrl: "",
    genre: "",
    sinopse: "",
  });

  const [filmes, setFilmes] = useState<any[]>([]);
  const [generos, setGeneros] = useState<any[]>([]);
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

  const handleChange = (e: any, stateSetter: any) => {
    stateSetter((prev: any) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const getAllFilmes = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:3000/filmes", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setFilmes(res.data);
    } catch (error) {
      console.error("Erro ao buscar filmes:", error);
    }
  };

  const getAllGeneros = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:3000/genero", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setGeneros(res.data);
    } catch (error) {
      console.error("Erro ao buscar gêneros:", error);
    }
  };

  const handleAddMovie = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        "http://localhost:3000/filmes",
        {
          name: movie.name,
          year: movie.year,
          duration: movie.duration,
          imageUrl: movie.imageUrl,
          videoUrl: movie.videoUrl,
          sinopse: movie.sinopse,
          genres: [movie.genre],
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      alert("Filme adicionado com sucesso!");
      setMovie({
        name: "",
        year: "",
        duration: "",
        imageUrl: "",
        videoUrl: "",
        genre: "",
        sinopse: "",
      });
      getAllFilmes();
    } catch (error) {
      console.error("Erro ao adicionar filme:", error);
      alert("Erro ao adicionar filme.");
    }
  };

  const handleDelete = async () => {
    if (!selectedFilmeId) return;
    if (!window.confirm("Tem certeza que deseja deletar este filme?")) return;

    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:3000/filmes/${selectedFilmeId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("Filme deletado com sucesso!");
      setSelectedFilmeId("");
      getAllFilmes();
    } catch (error) {
      console.error("Erro ao deletar filme:", error);
    }
  };

  const handleUpdateMovie = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `http://localhost:3000/filmes/${updateMovie.id}`,
        {
          name: updateMovie.name,
          year: updateMovie.year,
          duration: updateMovie.duration,
          imageUrl: updateMovie.imageUrl,
          videoUrl: updateMovie.videoUrl,
          sinopse: updateMovie.sinopse,
          genres: [updateMovie.genre],
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      alert("Filme atualizado com sucesso!");
      setUpdateMovie({
        id: "",
        name: "",
        year: "",
        duration: "",
        imageUrl: "",
        videoUrl: "",
        genre: "",
        sinopse: "",
      });
      getAllFilmes();
    } catch (error) {
      console.error("Erro ao atualizar filme:", error);
    }
  };

  const textFieldStyle = {
    input: { color: "#fff" },
    "& .MuiInputBase-input::placeholder": { color: "#ccc" },
    "& .MuiInputLabel-root": { color: "#ccc" },
    "& .MuiFilledInput-root": {
      backgroundColor: "rgba(255, 255, 255, 0.1)",
    },
  };

  return (
    <Container maxWidth="xl" sx={{ mt: 10 }}>
      <Typography variant="h4" align="center" gutterBottom color="white">
        Painel Administrativo
      </Typography>

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          gap: 4,
          mt: 4,
          mb: 4,
          p: 4,
          borderRadius: 3,
          backgroundColor: "rgba(0, 0, 0, 0.7)",
          boxShadow: 4,
        }}
      >
        {/* Adicionar Filme */}
        <Box sx={{ width: "100%" }}>
          <Typography variant="h6" gutterBottom color="white">
            Adicionar Filme
          </Typography>
          {["name", "year", "duration", "imageUrl", "videoUrl", "sinopse"].map((field) => (
            <TextField
              key={field}
              label={field[0].toUpperCase() + field.slice(1)}
              name={field}
              value={(movie as any)[field]}
              onChange={(e) => handleChange(e, setMovie)}
              fullWidth
              variant="filled"
              sx={{ ...textFieldStyle, mb: 2 }}
            />
          ))}
          <FormControl fullWidth variant="filled" sx={{ mb: 2 }}>
            <InputLabel sx={{ color: "#ccc" }}>Gênero</InputLabel>
            <Select
              name="genre"
              value={movie.genre}
              onChange={(e) => handleChange(e, setMovie)}
              sx={{ color: "#fff", backgroundColor: "rgba(255,255,255,0.1)" }}
            >
              {generos.map((g) => (
                <MenuItem key={g.id} value={g.id}>
                  {g.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Button fullWidth variant="contained" onClick={handleAddMovie}>
            Adicionar
          </Button>
        </Box>

        {/* Deletar Filme */}
        <Box sx={{ width: "100%" }}>
          <Typography variant="h6" gutterBottom color="white">
            Deletar Filme
          </Typography>
          <FormControl fullWidth variant="filled" sx={{ mb: 2 }}>
            <InputLabel sx={{ color: "#ccc" }}>Filme</InputLabel>
            <Select
              value={selectedFilmeId}
              onChange={(e) => setSelectedFilmeId(e.target.value)}
              sx={{ color: "#fff", backgroundColor: "rgba(255,255,255,0.1)" }}
            >
              {filmes.map((f) => (
                <MenuItem key={f.id} value={f.id}>
                  {f.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Button fullWidth variant="contained" color="error" onClick={handleDelete}>
            Deletar
          </Button>
        </Box>

        {/* Atualizar Filme */}
        <Box sx={{ width: "100%" }}>
          <Typography variant="h6" gutterBottom color="white">
            Atualizar Filme
          </Typography>
          <FormControl fullWidth variant="filled" sx={{ mb: 2 }}>
            <InputLabel sx={{ color: "#ccc" }}>Filme</InputLabel>
            <Select
              value={updateMovie.id}
              onChange={(e) => {
                const filme = filmes.find((f) => f.id === e.target.value);
                if (filme) {
                  setUpdateMovie({
                    id: filme.id,
                    name: filme.name,
                    year: filme.releaseYear,
                    duration: filme.duration,
                    imageUrl: filme.image,
                    videoUrl: filme.videoUrl,
                    sinopse: filme.sinopse,
                    genre: filme.generos?.[0]?.id || "",
                  });
                }
              }}
              sx={{ color: "#fff", backgroundColor: "rgba(255,255,255,0.1)" }}
            >
              {filmes.map((f) => (
                <MenuItem key={f.id} value={f.id}>
                  {f.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          {["name", "year", "duration", "imageUrl", "videoUrl", "sinopse"].map((field) => (
            <TextField
              key={field}
              label={field[0].toUpperCase() + field.slice(1)}
              name={field}
              value={(updateMovie as any)[field]}
              onChange={(e) => handleChange(e, setUpdateMovie)}
              fullWidth
              variant="filled"
              sx={{ ...textFieldStyle, mb: 2 }}
            />
          ))}
          <FormControl fullWidth variant="filled" sx={{ mb: 2 }}>
            <InputLabel sx={{ color: "#ccc" }}>Gênero</InputLabel>
            <Select
              name="genre"
              value={updateMovie.genre}
              onChange={(e) => handleChange(e, setUpdateMovie)}
              sx={{ color: "#fff", backgroundColor: "rgba(255,255,255,0.1)" }}
            >
              {generos.map((g) => (
                <MenuItem key={g.id} value={g.id}>
                  {g.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Button
            fullWidth
            variant="contained"
            color="warning"
            onClick={handleUpdateMovie}
            disabled={!updateMovie.id}
          >
            Atualizar
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default AdminPanel;
