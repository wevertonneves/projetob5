import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  Grid,
  Card,
  CardMedia,
  Box,
  Button,
  CircularProgress,
} from "@mui/material";
import axios from "axios";
import "../styles/GeneroFilmes.css";

interface Filme {
  id: number;
  name: string;
  image: string;
  releaseYear: number;
  duration: number;
  videoUrl: string; // Adicionando URL do vídeo
}

interface Genero {
  id: number;
  name: string;
}

const GeneroFilmes = () => {
  const { id } = useParams();
  const [filmes, setFilmes] = useState<Filme[]>([]);
  const [genero, setGenero] = useState<Genero | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDados = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/genero/${id}`);
        setFilmes(response.data);

        const generoResponse = await axios.get(`http://localhost:3000/generos`);
        const generoEncontrado = generoResponse.data.find(
          (g: Genero) => g.id.toString() === id
        );
        setGenero(generoEncontrado);
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDados();
  }, [id]);

  const handlePlayMovie = (videoUrl: string) => {
    if (videoUrl) {
      window.open(videoUrl, "_blank");
    } else {
      alert("Vídeo não disponível para este filme.");
    }
  };

  return (
    <div className="genero-filmes-container">
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">
            {genero ? `Filmes de ${genero.name}` : "Filmes do Gênero"}
          </Typography>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => navigate("/home")}
            className="genero-filmes-back-button"
          >
            Voltar
          </Button>
        </Toolbar>
      </AppBar>

      <Box p={4} className="genero-filmes-content">
        {loading ? (
          <CircularProgress />
        ) : (
          <>
            <Typography variant="h4" gutterBottom>
              {genero ? `Filmes do gênero ${genero.name}` : "Filmes"}
            </Typography>
            <Grid container spacing={3} className="genero-filmes-grid">
              {filmes.length > 0 ? (
                filmes.map((filme) => (
                  <Grid item key={filme.id} xs={12} sm={6} md={4} lg={3} xl={2}>
                    <Card
                      className="genero-filmes-card"
                      onClick={() => handlePlayMovie(filme.videoUrl)}
                      style={{ cursor: "pointer" }}
                    >
                      <CardMedia
                        component="img"
                        className="genero-filmes-image"
                        image={filme.image || "https://via.placeholder.com/300"}
                        alt={filme.name}
                      />
                      <Box className="genero-filmes-details">
                        <Typography className="genero-filmes-name">
                          {filme.name}
                        </Typography>
                        <Typography className="genero-filmes-info">
                          {filme.releaseYear} • {filme.duration} min
                        </Typography>
                      </Box>
                    </Card>
                  </Grid>
                ))
              ) : (
                <Typography variant="h6" color="textSecondary">
                  Nenhum filme encontrado para este gênero.
                </Typography>
              )}
            </Grid>
          </>
        )}
      </Box>
    </div>
  );
};

export default GeneroFilmes;
