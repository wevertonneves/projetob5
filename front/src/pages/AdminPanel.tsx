// AdminPanel.tsx
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

const initialMovie = {
  name: "",
  year: "",
  duration: "",
  imageUrl: "",
  videoUrl: "",
  genre: "",
  sinopse: "",
};

const initialGenero = { name: "", image: "" };

const AdminPanel = () => {
  const [movie, setMovie] = useState(initialMovie);
  const [updateMovie, setUpdateMovie] = useState({ ...initialMovie, id: "" });
  const [filmes, setFilmes] = useState<any[]>([]);
  const [generos, setGeneros] = useState<any[]>([]);
  const [selectedFilmeId, setSelectedFilmeId] = useState("");
  const [selectedGeneroId, setSelectedGeneroId] = useState("");
  const [newGenero, setNewGenero] = useState(initialGenero);
  const [updateGenero, setUpdateGenero] = useState({ ...initialGenero, id: "" });

  useEffect(() => {
    getAllFilmes();
    getAllGeneros();
  }, []);

  useEffect(() => {
    document.body.classList.add("bg-admin");
    return () => document.body.classList.remove("bg-admin");
  }, []);

  const handleChange = (e: any, setter: any) => {
    setter((prev: any) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const getToken = () => localStorage.getItem("token");

  const fetchData = async (url: string, setter: Function) => {
    try {
      const res = await axios.get(url, {
        headers: { Authorization: `Bearer ${getToken()}` },
      });
      setter(res.data);
    } catch (error) {
      console.error(`Erro ao buscar ${url.includes("filmes") ? "filmes" : "gêneros"}:`, error);
    }
  };

  const getAllFilmes = () => fetchData("http://localhost:3000/filmes", setFilmes);
  const getAllGeneros = () => fetchData("http://localhost:3000/genero", setGeneros);

  const sendData = async (method: string, url: string, data?: any) => {
    return axios({
      method,
      url,
      data,
      headers: { Authorization: `Bearer ${getToken()}` },
    });
  };

  const handleAddMovie = async () => {
    try {
      await sendData("post", "http://localhost:3000/filmes", {
        ...movie,
        genres: [movie.genre],
      });
      alert("Filme adicionado com sucesso!");
      setMovie(initialMovie);
      getAllFilmes();
    } catch (error) {
      console.error("Erro ao adicionar filme:", error);
    }
  };

  const handleDelete = async () => {
    if (!selectedFilmeId || !window.confirm("Deseja deletar este filme?")) return;
    try {
      await sendData("delete", `http://localhost:3000/filmes/${selectedFilmeId}`);
      alert("Filme deletado com sucesso!");
      setSelectedFilmeId("");
      getAllFilmes();
    } catch (error) {
      console.error("Erro ao deletar filme:", error);
    }
  };

  const handleDeleteGenero = async () => {
    if (!selectedGeneroId || !window.confirm("Deseja deletar este gênero?")) return;
    try {
      await sendData("delete", `http://localhost:3000/genero/${selectedGeneroId}`);
      alert("Gênero deletado com sucesso!");
      setSelectedGeneroId("");
      getAllGeneros();
    } catch (error) {
      console.error("Erro ao deletar gênero:", error);
    }
  };

  const handleAddGenero = async () => {
    if (!newGenero.name.trim()) return;
    try {
      await sendData("post", "http://localhost:3000/genero", newGenero);
      alert("Gênero adicionado com sucesso!");
      setNewGenero(initialGenero);
      getAllGeneros();
    } catch (error) {
      console.error("Erro ao adicionar gênero:", error);
    }
  };

  const handleUpdateGenero = async () => {
    if (!updateGenero.id || !updateGenero.name.trim()) return;
    try {
      await sendData("put", `http://localhost:3000/genero/${updateGenero.id}`, updateGenero);
      alert("Gênero atualizado com sucesso!");
      setUpdateGenero({ ...initialGenero, id: "" });
      getAllGeneros();
    } catch (error) {
      console.error("Erro ao atualizar gênero:", error);
    }
  };

  const handleUpdateMovie = async () => {
    try {
      await sendData("put", `http://localhost:3000/filmes/${updateMovie.id}`, {
        ...updateMovie,
        genres: [updateMovie.genre],
      });
      alert("Filme atualizado com sucesso!");
      setUpdateMovie({ ...initialMovie, id: "" });
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

  const renderTextFields = (fields: string[], values: any, setter: any) =>
    fields.map((field) => (
      <TextField
        key={field}
        label={field[0].toUpperCase() + field.slice(1)}
        name={field}
        value={values[field]}
        onChange={(e) => handleChange(e, setter)}
        fullWidth
        variant="filled"
        sx={{ ...textFieldStyle, mb: 2 }}
      />
    ));

  return (
    <Container maxWidth="xl" sx={{ mt: 10 }}>
     <Typography
  variant="h4"
  align="center"
  gutterBottom
  color="white"
  sx={{ fontFamily: '"Bebas Neue", sans-serif' }}
>
  Painel Administrativo
</Typography>
      <Box
        className="admin-form-container"
        sx={{
          mt: 4,
          mb: 4,
          p: 4,
          borderRadius: 3,
          backgroundColor: "rgba(0, 0, 0, 0.7)",
          boxShadow: 4,
        }}
      >
        {/* Formulário 1: Adicionar */}
        <form className="admin-form" style={{ flex: 1, minWidth: 320 }}>
          <Typography variant="h6" gutterBottom color="white">Adicionar Filme</Typography>
          {renderTextFields(["name", "year", "duration", "imageUrl", "videoUrl", "sinopse"], movie, setMovie)}
          <FormControl fullWidth variant="filled" sx={{ mb: 2 }}>
            <InputLabel sx={{ color: "#ccc" }}>Gênero</InputLabel>
            <Select
              name="genre"
              value={movie.genre}
              onChange={(e) => handleChange(e, setMovie)}
              sx={{ color: "#fff", backgroundColor: "rgba(255,255,255,0.1)" }}
            >
              {generos.map((g) => (
                <MenuItem key={g.id} value={g.id}>{g.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <Button fullWidth variant="contained" onClick={handleAddMovie}>Adicionar</Button>

          <Typography variant="h6" gutterBottom color="white" sx={{ mt: 4 }}>Adicionar Gênero</Typography>
          {renderTextFields(["name", "image"], newGenero, setNewGenero)}
          <Button fullWidth variant="contained" onClick={handleAddGenero}>Adicionar Gênero</Button>
        </form>

        {/* Formulário 2: Deletar */}
        <form className="admin-form" style={{ flex: 1, minWidth: 320 }}>
          <Typography variant="h6" gutterBottom color="white">Deletar Filme</Typography>
          <FormControl fullWidth variant="filled" sx={{ mb: 2 }}>
            <InputLabel sx={{ color: "#ccc" }}>Filme</InputLabel>
            <Select
              value={selectedFilmeId}
              onChange={(e) => setSelectedFilmeId(e.target.value)}
              sx={{ color: "#fff", backgroundColor: "rgba(255,255,255,0.1)" }}
            >
              {filmes.map((f) => (
                <MenuItem key={f.id} value={f.id}>{f.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <Button fullWidth variant="contained" color="error" onClick={handleDelete}>Deletar Filme</Button>

          <Typography variant="h6" gutterBottom color="white" sx={{ mt: 4 }}>Deletar Gênero</Typography>
          <FormControl fullWidth variant="filled" sx={{ mb: 2 }}>
            <InputLabel sx={{ color: "#ccc" }}>Gênero</InputLabel>
            <Select
              value={selectedGeneroId}
              onChange={(e) => setSelectedGeneroId(e.target.value)}
              sx={{ color: "#fff", backgroundColor: "rgba(255,255,255,0.1)" }}
            >
              {generos.map((g) => (
                <MenuItem key={g.id} value={g.id}>{g.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <Button fullWidth variant="contained" color="error" onClick={handleDeleteGenero}>Deletar Gênero</Button>
        </form>

        {/* Formulário 3: Atualizar */}
        <form className="admin-form" style={{ flex: 1, minWidth: 320 }}>
          <Typography variant="h6" gutterBottom color="white">Atualizar Filme</Typography>
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
                <MenuItem key={f.id} value={f.id}>{f.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
          {renderTextFields(["name", "year", "duration", "imageUrl", "videoUrl", "sinopse"], updateMovie, setUpdateMovie)}
          <FormControl fullWidth variant="filled" sx={{ mb: 2 }}>
            <InputLabel sx={{ color: "#ccc" }}>Gênero</InputLabel>
            <Select
              name="genre"
              value={updateMovie.genre}
              onChange={(e) => handleChange(e, setUpdateMovie)}
              sx={{ color: "#fff", backgroundColor: "rgba(255,255,255,0.1)" }}
            >
              {generos.map((g) => (
                <MenuItem key={g.id} value={g.id}>{g.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <Button fullWidth variant="contained" color="warning" onClick={handleUpdateMovie} disabled={!updateMovie.id}>Atualizar Filme</Button>

          <Typography variant="h6" gutterBottom color="white" sx={{ mt: 4 }}>Atualizar Gênero</Typography>
          <FormControl fullWidth variant="filled" sx={{ mb: 2 }}>
            <InputLabel sx={{ color: "#ccc" }}>Gênero</InputLabel>
            <Select
              value={updateGenero.id}
              onChange={(e) => {
                const genero = generos.find((g) => g.id === e.target.value);
                if (genero) {
                  setUpdateGenero({ id: genero.id, name: genero.name, image: genero.image || "" });
                }
              }}
              sx={{ color: "#fff", backgroundColor: "rgba(255,255,255,0.1)" }}
            >
              {generos.map((g) => (
                <MenuItem key={g.id} value={g.id}>{g.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
          {renderTextFields(["name", "image"], updateGenero, setUpdateGenero)}
          <Button fullWidth variant="contained" color="warning" onClick={handleUpdateGenero}>Atualizar Gênero</Button>
        </form>
      </Box>
    </Container>
  );
};

export default AdminPanel;
