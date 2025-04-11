import { Outlet, useNavigate } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Avatar,
  Menu,
  MenuItem,
  IconButton,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import { useState } from "react";

const Layout = () => {
  const navigate = useNavigate();
  const username = localStorage.getItem("username") || "Usuário";
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const handleAdminPanel = () => {
    navigate("/admin");
    handleMenuClose();
  };

  const handlePerfil = () => {
    navigate("/perfil");
    handleMenuClose();
  };

  const handleFavoritos = () => {
    navigate("/favoritos");
    handleMenuClose();
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      minHeight="100vh"
      width="100vw"
      overflow="hidden"
    >
      <AppBar position="fixed" sx={{ backgroundColor: "#000", width: "100%" }}>
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography
            variant="h6"
            onClick={() => navigate("/home")}
            sx={{ cursor: "pointer" }}
          >
            GAMBY FLIX
          </Typography>

          <Box display="flex" alignItems="center">
            <IconButton onClick={handleMenuOpen}>
              <Avatar sx={{ bgcolor: "#fff", color: "#1976d2" }}>
                <PersonIcon />
              </Avatar>
            </IconButton>
            <Typography variant="body1" sx={{ ml: 1 }}>
              Olá, <strong>{username}</strong>
            </Typography>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
            >
              <MenuItem onClick={handlePerfil}>Ver Perfil</MenuItem>
              <MenuItem onClick={handleFavoritos}>Favoritos</MenuItem>
              <MenuItem onClick={handleAdminPanel}>
                Painel Administrativo
              </MenuItem>
              <MenuItem onClick={handleLogout}>Sair</MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Espaçador da AppBar */}
      <Toolbar />

      {/* Conteúdo principal */}
      <Box component="main" flex="1" width="100%" p={3}>
        <Outlet />
      </Box>

      {/* Footer */}
      <Box
        component="footer"
        sx={{
          backgroundColor: "#000",
          color: "#fff",
          textAlign: "center",
          py: 2,
          width: "100%",
        }}
      >
        <Typography variant="body2">
          &copy; {new Date().getFullYear()} GAMBY FLIX. Todos os direitos
          reservados.
        </Typography>
      </Box>
    </Box>
  );
};

export default Layout;
