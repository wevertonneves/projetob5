import { useEffect, useState } from "react";
import axios from "axios";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  CardMedia,
  Box,
} from "@mui/material";
import { Link } from "react-router-dom";

const Favoritos = () => {
  const [favoritos, setFavoritos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (!userId) {
      console.warn("⚠️ ID de usuário não encontrado.");
      return;
    }

    const buscarFavoritos = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/favoritos/${userId}`
        );
        console.log("⭐ Favoritos carregados:", response.data);
        setFavoritos(response.data);
      } catch (err) {
        console.error("Erro ao buscar favoritos:", err);
      } finally {
        setLoading(false);
      }
    };

    buscarFavoritos();
  }, []);

  return (
    <Box className="bg-perfil" minHeight="100vh" p={4}>
      <Typography variant="h4" gutterBottom color="#fff">
        Meus Favoritos
      </Typography>

      {loading ? (
        <Typography color="#fff">Carregando...</Typography>
      ) : favoritos.length === 0 ? (
        <Typography color="#fff">Nenhum favorito encontrado.</Typography>
      ) : (
        <Grid container spacing={3}>
          {favoritos.map((fav) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={fav.id}>
              <Link to={`/filme/${fav.id}`} style={{ textDecoration: "none" }}>
                <Card
                  sx={{
                    backgroundColor: "#1c1c1c",
                    color: "#fff",
                    borderRadius: 2,
                    height: "100%",
                    transition: "transform 0.2s",
                    "&:hover": {
                      transform: "scale(1.02)",
                      cursor: "pointer",
                    },
                  }}
                >
                  {fav.image && (
                    <CardMedia
                      component="img"
                      height="300"
                      image={fav.image}
                      alt={fav.name}
                    />
                  )}
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      {fav.name}
                    </Typography>
                    <Typography variant="body2" color="gray">
                      {fav.releaseYear} • {fav.duration} min
                    </Typography>
                  </CardContent>
                </Card>
              </Link>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default Favoritos;
