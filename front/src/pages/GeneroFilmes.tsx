import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
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
import axios from "axios";
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFilmes = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/genero/${id}/filmes`
        );
        setFilmes(response.data);
      } catch (error) {
        console.error("Erro ao buscar filmes:", error);
      }
    };

    fetchFilmes();
  }, [id]);

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">Filmes do Gênero</Typography>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => navigate("/home")}
            style={{ marginLeft: "auto" }}
          >
            Voltar
          </Button>
        </Toolbar>
      </AppBar>

      <Box p={4}>
        <Typography variant="h4" gutterBottom>
          Filmes
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
                <Box p={1}>
                  <Typography variant="h6">{filme.name}</Typography>
                  <Typography variant="body2">
                    {filme.releaseYear} • {filme.duration} min
                  </Typography>
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </div>
  );
};

export default GeneroFilmes;
