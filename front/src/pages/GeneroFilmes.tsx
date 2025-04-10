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
  IconButton,
} from "@mui/material";
import axios from "axios";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import "../styles/GeneroFilmes.css";

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
  const [favoritos, setFavoritos] = useState<number[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDados = async () => {
      const userId = localStorage.getItem("userId");

      try {
        setLoading(true);

        // Buscar filmes do gênero
        const response = await axios.get(`http://localhost:3000/genero/${id}`);
        setFilmes(response.data);

        // Buscar nome do gênero
        const generoResponse = await axios.get(`http://localhost:3000/genero`);
        const generoEncontrado = generoResponse.data.find(
          (g: Genero) => g.id === parseInt(id || "")
        );
        setGenero(generoEncontrado);

        // Buscar favoritos do usuário (DEPOIS de carregar filmes)
        if (userId) {
          const favRes = await axios.get(
            `http://localhost:3000/favoritos/${userId}`
          );

          const idsFavoritos = favRes.data
            .map((f: any) => f.favorito?.filmeId)
            .filter((id: number | undefined): id is number => id !== undefined);

          console.log("📌 Filmes favoritos carregados:", idsFavoritos);
          setFavoritos(idsFavoritos);
        }
      } catch (error) {
        console.error("❌ Erro ao buscar dados:", error);
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

  const alternarFavorito = async (filmeId: number) => {
    const userId = localStorage.getItem("userId");

    if (!userId) {
      alert("Usuário não autenticado");
      return;
    }

    const jaFavorito = favoritos.includes(filmeId);

    try {
      if (jaFavorito) {
        await axios.post("http://localhost:3000/favoritos/remover", {
          userId,
          filmeId,
        });
        setFavoritos((prev) => prev.filter((id) => id !== filmeId));
      } else {
        await axios.post("http://localhost:3000/favoritos/adicionar", {
          userId,
          filmeId,
        });
        setFavoritos((prev) => [...prev, filmeId]);
      }
    } catch (error) {
      console.error("❌ Erro ao favoritar/desfavoritar:", error);
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
                    <Card className="genero-filmes-card">
                      <CardMedia
                        component="img"
                        className="genero-filmes-image"
                        image={filme.image || "https://via.placeholder.com/300"}
                        alt={filme.name}
                        onClick={() => handleFilmeClick(filme)}
                      />
                      <Box
                        className="genero-filmes-details"
                        display="flex"
                        justifyContent="space-between"
                        alignItems="center"
                      >
                        <Box>
                          <Typography className="genero-filmes-name">
                            {filme.name}
                          </Typography>
                          <Typography className="genero-filmes-info">
                            {filme.releaseYear} • {filme.duration} min
                          </Typography>
                        </Box>
                        <IconButton onClick={() => alternarFavorito(filme.id)}>
                          {favoritos.includes(filme.id) ? (
                            <FavoriteIcon color="error" />
                          ) : (
                            <FavoriteBorderIcon />
                          )}
                        </IconButton>
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
