import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TextField, Button, Typography, Box } from "@mui/material";
import axios from "axios"; // Adicione o Axios para fazer requisições HTTP
import "../styles/Login.css";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    if (!email || !password) {
      setError("Preencha todos os campos!");
      return;
    }

    try {
      const response = await axios.post("http://localhost:3000/login", {
        email,
        password,
      });

      // Se o login for bem-sucedido, armazenamos o token
      localStorage.setItem("token", response.data.token);
      navigate("/home");
    } catch (err) {
      setError("Credenciais inválidas!");
    }
  };

  return (
    <div className="login-container">
      <Typography variant="h2" className="logo">
        GAMBYFLIX
      </Typography>
      <Box className="login-box">
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
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="input-field"
        />
        {error && <Typography color="error">{error}</Typography>}
        <Button
          fullWidth
          variant="contained"
          color="error"
          onClick={handleLogin}
        >
          Sign In
        </Button>
        <Typography className="register-text">
          NÃO É MEMBRO?{" "}
          <span className="link" onClick={() => navigate("/cadastro")}>
            FAÇA TESTE GRÁTIS POR UM MÊS
          </span>
        </Typography>
        <Typography className="forgot-text">
          <a href="#">ESQUECI MINHA SENHA</a>
        </Typography>
      </Box>
    </div>
  );
};

export default Login;
