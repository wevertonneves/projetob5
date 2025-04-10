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
import { useNavigate } from "react-router-dom";
import axios from "axios";
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
    const fetchGenres = async () => {
      try {
        const response = await axios.get("http://localhost:3000/genero");
        setGenres(response.data);
      } catch (error) {
        console.error("Erro ao buscar gêneros:", error);
      }
    };

    fetchGenres();
  }, []);

  const handleGenreClick = (genreId: number) => {
    navigate(`/genero/${genreId}`);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const handleAdminPanel = () => {
    navigate("/admin");
  };

  return (
    <div className="home-container">
      <AppBar position="static" className="navbar">
        <Toolbar>
          <Typography variant="h6" className="logo">
            GAMBY FLIX
          </Typography>

          <Button
            variant="contained"
            color="secondary"
            onClick={handleAdminPanel}
            style={{ marginLeft: "auto", marginRight: 10 }}
          >
            Painel Administrativo
          </Button>

          <Button variant="contained" color="error" onClick={handleLogout}>
            Sair
          </Button>
        </Toolbar>
      </AppBar>

      <Box className="content">
        <Typography variant="h4" className="title">
          Escolha um Gênero
        </Typography>

        <Grid container spacing={2} justifyContent="center">
          {genres.map((genre) => (
            <Grid item key={genre.id} xs={12} sm={6} md={3}>
              <Card
                className="movie-card"
                onClick={() => handleGenreClick(genre.id)}
                style={{ cursor: "pointer" }}
              >
                <CardMedia
                  component="img"
                  image={genre.image || "https://via.placeholder.com/200"}
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
