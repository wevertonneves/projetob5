import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TextField, Button, Typography, Box } from "@mui/material";
import "../styles/Login.css"; // Pode compartilhar o mesmo CSS do login

const Cadastro = () => {
  const navigate = useNavigate();
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleCadastro = () => {
    if (nome && email && password) {
      console.log("Cadastro realizado!");
      navigate("/home"); // Após cadastro, redireciona para Home
    } else {
      alert("Preencha todos os campos!");
    }
  };

  return (
    <div className="login-container">
      <Typography variant="h2" className="logo">
        CADASTRO
      </Typography>
      <Box className="login-box">
        <TextField
          fullWidth
          variant="filled"
          label="Nome"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          className="input-field"
        />
        <TextField
          fullWidth
          variant="filled"
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="input-field"
        />
        <TextField
          fullWidth
          variant="filled"
          label="Senha"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="input-field"
        />
        <Button
          fullWidth
          variant="contained"
          color="success"
          onClick={handleCadastro}
        >
          Cadastrar
        </Button>
        <Typography className="forgot-text">
          <a href="/login">Já tem uma conta? Faça login</a>
        </Typography>
      </Box>
    </div>
  );
};

export default Cadastro;
