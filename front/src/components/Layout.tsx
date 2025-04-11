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
    <Box className="layout-container">
      <AppBar position="fixed" className="app-bar">
        <Toolbar className="toolbar">
          <Box onClick={() => navigate("/home")} className="logo-box">
            <img src="/logo.png" alt="GAMBY FLIX Logo" className="logo-img" />
          </Box>

          <Box className="user-box">
            <IconButton onClick={handleMenuOpen}>
              <Avatar className="user-avatar">
                <PersonIcon />
              </Avatar>
            </IconButton>
            <Typography variant="body1" className="user-name">
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
      <Toolbar className="appbar-spacer" />

      {/* Conteúdo principal */}
      <Box component="main" className="main-content">
        <Outlet />
      </Box>

      {/* Footer */}
      <Box component="footer" className="footer">
        <Typography variant="body2">
          &copy; {new Date().getFullYear()} GAMBY FLIX. Todos os direitos
          reservados.
        </Typography>
      </Box>
    </Box>
  );
};

export default Layout;
