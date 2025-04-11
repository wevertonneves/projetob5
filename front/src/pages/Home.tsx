import { useEffect, useState } from "react";
import { Typography, Grid, Card, CardMedia, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/styles.css";

interface Genre {
  id: number;
  name: string;
  image: string;
}

const Home = () => {
  const [genres, setGenres] = useState<Genre[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    document.body.classList.add("bg-home");

    return () => {
      document.body.classList.remove("bg-home");
    };
  }, []);

  const handleGenreClick = (genreId: number) => {
    navigate(`/genero/${genreId}`);
  };

  useEffect(() => {
    const fetchGenres = async () => {
      const token = localStorage.getItem("token");

      try {
        const response = await axios.get("http://localhost:3000/genero", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setGenres(response.data);
      } catch (error) {
        console.error("Erro ao buscar gêneros:", error);
      }
    };

    fetchGenres();
  }, []);

  return (
    <Box className="content">
      <Typography variant="h4" className="title" sx={{ color: "white" }}>
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
             <Typography variant="h6" align="center" sx={{ color: 'white' }}>
  {genre.name}
</Typography>

            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Home;
