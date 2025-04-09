import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TextField, Button, Typography, Box } from "@mui/material";
import "../styles/Login.css"; // Mantendo o mesmo estilo do login

const Cadastro = () => {
  const navigate = useNavigate();
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleCadastro = async () => {
    if (!nome || !email || !password) {
      alert("Preencha todos os campos!");
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: nome, email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Cadastro realizado com sucesso!");
        navigate("/login"); // Redirecionando para a página de login
      } else {
        alert(data.error || "Erro ao cadastrar usuário.");
      }
    } catch (error) {
      console.error("Erro ao conectar com o servidor:", error);
      alert("Erro ao conectar com o servidor.");
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
