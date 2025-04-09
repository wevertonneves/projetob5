import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TextField, Button, Typography, Box } from "@mui/material";
import "../styles/Login.css";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    if (email && password) {
      console.log("Login bem-sucedido!");
      navigate("/home");
    } else {
      alert("Preencha todos os campos!");
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
