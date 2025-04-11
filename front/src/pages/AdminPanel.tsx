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
  const [selectedGeneroId, setSelectedGeneroId] = useState("");
  const [newGenero, setNewGenero] = useState({ name: "", image: "" });
  const [updateGenero, setUpdateGenero] = useState({
    id: "",
    name: "",
    image: "",
  });

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

  const handleDeleteGenero = async () => {
    if (!selectedGeneroId) return;
    if (!window.confirm("Tem certeza que deseja deletar este gênero?")) return;

    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:3000/genero/${selectedGeneroId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("Gênero deletado com sucesso!");
      setSelectedGeneroId("");
      getAllGeneros();
    } catch (error) {
      console.error("Erro ao deletar gênero:", error);
      alert("Erro ao deletar gênero.");
    }
  };

  const handleAddGenero = async () => {
    if (!newGenero.name.trim()) return;

    try {
      const token = localStorage.getItem("token");
      await axios.post(
        "http://localhost:3000/genero",
        {
          name: newGenero.name,
          image: newGenero.image,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("Gênero adicionado com sucesso!");
      setNewGenero({ name: "", image: "" });
      getAllGeneros();
    } catch (error) {
      console.error("Erro ao adicionar gênero:", error);
      alert("Erro ao adicionar gênero.");
    }
  };

  const handleUpdateGenero = async () => {
    if (!updateGenero.id || !updateGenero.name.trim()) return;

    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `http://localhost:3000/genero/${updateGenero.id}`,
        {
          name: updateGenero.name,
          image: updateGenero.image,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert("Gênero atualizado com sucesso!");
      setUpdateGenero({ id: "", name: "", image: "" });
      getAllGeneros();
    } catch (error) {
      console.error("Erro ao atualizar gênero:", error);
      alert("Erro ao atualizar gênero.");
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
        {/* Adicionar Filme e Gênero */}
        <Box sx={{ width: "100%" }}>
          <Typography variant="h6" gutterBottom color="white">
            Adicionar Filme
          </Typography>
          {["name", "year", "duration", "imageUrl", "videoUrl", "sinopse"].map(
            (field) => (
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
            )
          )}
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

          <Typography variant="h6" gutterBottom color="white" sx={{ mt: 4 }}>
            Adicionar Gênero
          </Typography>
          <TextField
            label="Nome do Gênero"
            value={newGenero.name}
            onChange={(e) =>
              setNewGenero((prev) => ({ ...prev, name: e.target.value }))
            }
            fullWidth
            variant="filled"
            sx={{ ...textFieldStyle, mb: 2 }}
          />
          <TextField
            label="URL da Imagem do Gênero"
            value={newGenero.image}
            onChange={(e) =>
              setNewGenero((prev) => ({ ...prev, image: e.target.value }))
            }
            fullWidth
            variant="filled"
            sx={{ ...textFieldStyle, mb: 2 }}
          />
          <Button
            fullWidth
            variant="contained"
            color="primary"
            onClick={handleAddGenero}
          >
            Adicionar Gênero
          </Button>
        </Box>

        {/* Deletar Filme e Gênero */}
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
          <Button
            fullWidth
            variant="contained"
            color="error"
            onClick={handleDelete}
          >
            Deletar Filme
          </Button>

          <Typography variant="h6" gutterBottom color="white" sx={{ mt: 4 }}>
            Deletar Gênero
          </Typography>
          <FormControl fullWidth variant="filled" sx={{ mb: 2 }}>
            <InputLabel sx={{ color: "#ccc" }}>Gênero</InputLabel>
            <Select
              value={selectedGeneroId}
              onChange={(e) => setSelectedGeneroId(e.target.value)}
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
            color="error"
            onClick={handleDeleteGenero}
          >
            Deletar Gênero
          </Button>
        </Box>

        {/* Atualizar Filme e Gênero */}
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
          {["name", "year", "duration", "imageUrl", "videoUrl", "sinopse"].map(
            (field) => (
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
            )
          )}
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
            Atualizar Filme
          </Button>

          <Typography variant="h6" gutterBottom color="white" sx={{ mt: 4 }}>
            Atualizar Gênero
          </Typography>
          <FormControl fullWidth variant="filled" sx={{ mb: 2 }}>
            <InputLabel sx={{ color: "#ccc" }}>Gênero</InputLabel>
            <Select
              value={updateGenero.id}
              onChange={(e) => {
                const genero = generos.find((g) => g.id === e.target.value);
                if (genero) {
                  setUpdateGenero({
                    id: genero.id,
                    name: genero.name,
                    image: genero.image || "",
                  });
                }
              }}
              sx={{ color: "#fff", backgroundColor: "rgba(255,255,255,0.1)" }}
            >
              {generos.map((g) => (
                <MenuItem key={g.id} value={g.id}>
                  {g.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            label="Novo nome do gênero"
            value={updateGenero.name}
            onChange={(e) =>
              setUpdateGenero((prev) => ({ ...prev, name: e.target.value }))
            }
            fullWidth
            variant="filled"
            sx={{ ...textFieldStyle, mb: 2 }}
          />

          <TextField
            label="URL da imagem do gênero"
            value={updateGenero.image || ""}
            onChange={(e) =>
              setUpdateGenero((prev) => ({ ...prev, image: e.target.value }))
            }
            fullWidth
            variant="filled"
            sx={{ ...textFieldStyle, mb: 2 }}
          />
          <Button
            fullWidth
            variant="contained"
            color="warning"
            onClick={handleUpdateGenero}
          >
            Atualizar Gênero
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default AdminPanel;
