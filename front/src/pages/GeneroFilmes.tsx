import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Grid, Card, CardMedia, Typography, Box } from "@mui/material";

interface Filme {
  id: number;
  name: string;
  image: string;
  releaseYear: number;
  duration: number;
}

const GeneroFilmes = () => {
  const { id } = useParams();
  const [filmes, setFilmes] = useState<Filme[]>([]);

  useEffect(() => {
    axios.get(`http://localhost:3000/generos/${id}/filmes`).then((res) => {
      setFilmes(res.data);
    });
  }, [id]);

  return (
    <Box padding={4}>
      <Typography variant="h4" gutterBottom>
        Filmes do Gênero
      </Typography>
      <Grid container spacing={2}>
        {filmes.map((filme) => (
          <Grid item key={filme.id} xs={12} sm={6} md={3}>
            <Card>
              <CardMedia
                component="img"
                height="300"
                image={filme.image || "https://via.placeholder.com/300"}
                alt={filme.name}
              />
              <Box padding={1}>
                <Typography variant="h6">{filme.name}</Typography>
                <Typography variant="body2">
                  Ano: {filme.releaseYear}
                </Typography>
                <Typography variant="body2">
                  Duração: {filme.duration} min
                </Typography>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default GeneroFilmes;
