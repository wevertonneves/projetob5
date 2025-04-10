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
import "../styles/GeneroFilmes.css"; // CSS externo

interface Filme {
  id: number;
  name: string;
  image: string;
  releaseYear: number;
  duration: number;
  videoUrl?: string;
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
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [videoNome, setVideoNome] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDados = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/genero/${id}`);
        setFilmes(response.data);

        const generoResponse = await axios.get(`http://localhost:3000/generos`);

        console.log("Todos os gêneros:", generoResponse.data);
        console.log("ID da URL:", id);

        const generoEncontrado = generoResponse.data.find(
          (g: Genero) => g.id === parseInt(id || "")
        );

        console.log("Gênero encontrado:", generoEncontrado);

        setGenero(generoEncontrado);
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDados();
  }, [id]);

  const handleFilmeClick = (filme: Filme) => {
    if (filme.videoUrl) {
      setVideoUrl(filme.videoUrl);
      setVideoNome(filme.name);
    } else {
      alert("Nenhum vídeo disponível para este filme.");
    }
  };

  return (
    <div className="genero-filmes-container">
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">
            {genero
              ? `Filmes de ${genero.name}`
              : "Filmes de gênero desconhecido"}
          </Typography>
          <Button
            className="genero-filmes-back-button"
            variant="contained"
            onClick={() => navigate("/home")}
            style={{ marginLeft: "auto" }}
          >
            Voltar
          </Button>
        </Toolbar>
      </AppBar>

      {loading ? (
        <Box mt={5}>
          <CircularProgress />
        </Box>
      ) : (
        <Box mt={4} className="genero-filmes-grid">
          <Box width="100%" maxWidth="1400px">
            <Typography variant="h4" gutterBottom>
              {genero
                ? `Filmes do gênero ${genero.name}`
                : "Filmes do gênero desconhecido"}
            </Typography>

            {videoUrl && (
              <Box my={4}>
                <Typography variant="h6" gutterBottom>
                  Reproduzindo: {videoNome}
                </Typography>
                <video width="100%" controls autoPlay>
                  <source src={videoUrl} type="video/mp4" />
                  Seu navegador não suporta vídeos HTML5.
                </video>
              </Box>
            )}

            <Grid container spacing={2}>
              {filmes.length > 0 ? (
                filmes.map((filme) => (
                  <Grid item key={filme.id} xs={12} sm={6} md={3}>
                    <Card
                      className="genero-filmes-card"
                      onClick={() => handleFilmeClick(filme)}
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
          </Box>
        </Box>
      )}
    </div>
  );
};

export default GeneroFilmes;
