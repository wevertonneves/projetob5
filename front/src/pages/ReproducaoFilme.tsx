import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Typography, Box, CircularProgress } from "@mui/material";
import axios from "axios";

const ReproducaoFilme = () => {
  const { id } = useParams();
  const [filme, setFilme] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const buscarFilme = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/filmes/${id}`);
        setFilme(response.data);
      } catch (err) {
        console.error("Erro ao buscar filme:", err);
      } finally {
        setLoading(false);
      }
    };

    buscarFilme();
  }, [id]);

  if (loading) {
    return (
      <Box mt={5} display="flex" justifyContent="center">
        <CircularProgress />
      </Box>
    );
  }

  if (!filme) {
    return <Typography variant="h6">Filme não encontrado.</Typography>;
  }

  return (
    <Box p={4} maxWidth="1000px" mx="auto">
      <Typography variant="h4" gutterBottom>
        {filme.name}
      </Typography>
      <video width="100%" controls autoPlay>
        <source src={filme.videoUrl} type="video/mp4" />
        Seu navegador não suporta vídeos HTML5.
      </video>
      <Typography mt={2} color="textSecondary">
        Lançado em {filme.releaseYear} • Duração: {filme.duration} min
      </Typography>
    </Box>
  );
};

export default ReproducaoFilme;
