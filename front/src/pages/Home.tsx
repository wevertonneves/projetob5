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
import axios from "axios"; // Importa Axios para fazer requisições HTTP
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
        const response = await axios.get("http://localhost:3000/genero"); // Ajuste a URL para a do seu backend
        setGenres(response.data);
      } catch (error) {
        console.error("Erro ao buscar gêneros:", error);
      }
    };

    fetchGenres();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
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
            onClick={handleLogout}
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
                  image={genre.image || "https://via.placeholder.com/200"} // Caso não tenha imagem
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
