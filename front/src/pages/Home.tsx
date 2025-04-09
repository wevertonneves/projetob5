import { useEffect, useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Grid,
  Card,
  CardMedia,
  Box,
  Button,
} from "@mui/material";
import { useNavigate } from "react-router-dom"; // Alterado para usar navigate
import "../styles/Home.css";

interface Genre {
  id: number;
  name: string;
  image: string;
}

const Home = () => {
  const [genres, setGenres] = useState<Genre[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    setGenres([
      { id: 1, name: "Ação", image: "https://via.placeholder.com/200" },
      { id: 2, name: "Comédia", image: "https://via.placeholder.com/200" },
      { id: 3, name: "Terror", image: "https://via.placeholder.com/200" },
      { id: 4, name: "Drama", image: "https://via.placeholder.com/200" },
      {
        id: 5,
        name: "Ficção Científica",
        image: "https://via.placeholder.com/200",
      },
    ]);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove o token de autenticação
    navigate("/login"); // Redireciona para a tela de login
  };

  return (
    <div className="home-container">
      {/* Navbar */}
      <AppBar position="static" className="navbar">
        <Toolbar>
          <Typography variant="h6" className="logo">
            Meu Netflix Clone
          </Typography>
          <Button
            variant="contained"
            color="error"
            onClick={handleLogout} // Botão de sair
            style={{ marginLeft: "auto" }}
          >
            Sair
          </Button>
        </Toolbar>
      </AppBar>

      {/* Conteúdo principal */}
      <Box className="content">
        <Typography variant="h4" className="title">
          Escolha um Gênero
        </Typography>

        {/* Grid com os gêneros de filmes */}
        <Grid container spacing={2} justifyContent="center">
          {genres.map((genre) => (
            <Grid item key={genre.id} xs={12} sm={6} md={3}>
              <Card className="movie-card">
                <CardMedia
                  component="img"
                  image={genre.image}
                  title={genre.name}
                  className="movie-image"
                />
                <Typography variant="h6" align="center">
                  {genre.name}
                </Typography>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </div>
  );
};

export default Home;
