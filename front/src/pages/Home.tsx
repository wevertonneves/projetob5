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
import { Link } from "react-router-dom";
import "../styles/Home.css";

interface Movie {
  id: number;
  title: string;
  image: string;
}

const Home = () => {
  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
    setMovies([
      { id: 1, title: "Filme 1", image: "https://via.placeholder.com/200" },
      { id: 2, title: "Filme 2", image: "https://via.placeholder.com/200" },
      { id: 3, title: "Filme 3", image: "https://via.placeholder.com/200" },
      { id: 4, title: "Filme 4", image: "https://via.placeholder.com/200" },
    ]);
  }, []);

  return (
    <div className="home-container">
      {/* Navbar */}
      <AppBar position="static" className="navbar">
        <Toolbar>
          <Typography variant="h6" className="logo">
            Meu Netflix Clone
          </Typography>
        </Toolbar>
      </AppBar>

      {/* Conteúdo principal */}
      <Box className="content">
        <Typography variant="h4" className="title">
          Filmes Populares
        </Typography>

        {/* Grid com os filmes */}
        <Grid container spacing={2} justifyContent="center">
          {movies.map((movie) => (
            <Grid item key={movie.id} xs={12} sm={6} md={3}>
              <Card className="movie-card">
                <CardMedia
                  component="img"
                  image={movie.image}
                  title={movie.title}
                  className="movie-image"
                />
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Botões de Login e Cadastro */}
      <Box className="auth-buttons">
        <Button
          variant="contained"
          color="primary"
          component={Link}
          to="/login"
        >
          Login
        </Button>
        <Button
          variant="contained"
          color="secondary"
          component={Link}
          to="/register"
        >
          Cadastrar
        </Button>
      </Box>
    </div>
  );
};

export default Home;
