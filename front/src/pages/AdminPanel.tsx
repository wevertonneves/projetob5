import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  TextField,
  Container,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const AdminPanel = () => {
  const navigate = useNavigate();
  const [movie, setMovie] = useState({
    name: "",
    year: "",
    duration: "",
    imageUrl: "",
    videoUrl: "",
  });

  const handleChange = (e) => {
    setMovie({ ...movie, [e.target.name]: e.target.value });
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const handleGoHome = () => {
    navigate("/home");
  };

  return (
    <div>
      <AppBar position="static" className="navbar">
        <Toolbar>
          <Typography variant="h6" className="logo">
            Painel Administrativo
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={handleGoHome}
            style={{ marginLeft: "auto", marginRight: 10 }}
          >
            Voltar para Home
          </Button>
          <Button variant="contained" color="error" onClick={handleLogout}>
            Sair
          </Button>
        </Toolbar>
      </AppBar>

      <Container maxWidth="sm" style={{ marginTop: "20px" }}>
        <Typography variant="h4" className="title" align="center">
          Adicionar Novo Filme
        </Typography>
        <Box
          component="form"
          sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 3 }}
        >
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
            label="Link da capado filme"
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
          <Button variant="contained" color="primary">
            Adicionar Filme
          </Button>
        </Box>
      </Container>
    </div>
  );
};

export default AdminPanel;

// Adicione esta rota no seu arquivo de roteamento (App.tsx ou App.js)
// <Route path="/admin" element={<AdminPanel />} />
