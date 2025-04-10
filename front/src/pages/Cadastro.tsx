import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  TextField,
  Button,
  Typography,
  Box,
  Snackbar,
  Alert,
} from "@mui/material";
import "../styles/Login.css";

const Cadastro = () => {
  const navigate = useNavigate();
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [nomeError, setNomeError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [emailLabel, setEmailLabel] = useState("Email");
  const [nomeLabel, setNomeLabel] = useState("Nome");
  const [passwordLabel, setPasswordLabel] = useState("Senha");

  const [successMessage, setSuccessMessage] = useState(false);

  const errorStyle = {
    color: "#d32f2f",
    fontWeight: "bold",
  };

  const validateFields = () => {
    let isValid = true;

    setNomeError(false);
    setEmailError(false);
    setPasswordError(false);
    setEmailLabel("Email");
    setNomeLabel("Nome");
    setPasswordLabel("Senha");

    if (!nome.trim()) {
      setNomeError(true);
      setNomeLabel("⚠ O campo 'Nome' é obrigatório!");
      isValid = false;
    } else if (nome.trim().length < 3) {
      setNomeError(true);
      setNomeLabel("⚠ Mínimo 3 caracteres!");
      isValid = false;
    }

    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!email.trim()) {
      setEmailError(true);
      setEmailLabel("⚠ O campo 'Email' é obrigatório!");
      isValid = false;
    } else if (!emailRegex.test(email)) {
      setEmailError(true);
      setEmailLabel("⚠ Insira um email válido!");
      isValid = false;
    }

    if (!password.trim()) {
      setPasswordError(true);
      setPasswordLabel("⚠ O campo 'Senha' é obrigatório!");
      isValid = false;
    } else if (password.length < 6) {
      setPasswordError(true);
      setPasswordLabel("⚠ Mínimo 6 caracteres!");
      isValid = false;
    }

    return isValid;
  };

  const handleCadastro = async () => {
    if (!validateFields()) return;

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
        // ✅ Salva o userId (se retornado pelo backend)
        if (data.id) {
          localStorage.setItem("userId", data.id);
        }

        setSuccessMessage(true);
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      } else {
        if (data.error === "Este email já está cadastrado.") {
          setEmailError(true);
          setEmailLabel("⚠ Email já cadastrado!");
        } else {
          alert(data.error || "Erro ao cadastrar usuário.");
        }
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
          label={nomeLabel}
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          className="input-field"
          error={nomeError}
          InputLabelProps={{ style: nomeError ? errorStyle : {} }}
        />
        <TextField
          fullWidth
          variant="filled"
          label={emailLabel}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="input-field"
          error={emailError}
          InputLabelProps={{ style: emailError ? errorStyle : {} }}
        />
        <TextField
          fullWidth
          variant="filled"
          label={passwordLabel}
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="input-field"
          error={passwordError}
          InputLabelProps={{ style: passwordError ? errorStyle : {} }}
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

      {/* Snackbar de sucesso */}
      <Snackbar
        open={successMessage}
        autoHideDuration={2000}
        onClose={() => setSuccessMessage(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={() => setSuccessMessage(false)}
          severity="success"
          variant="filled"
        >
          Cadastro realizado com sucesso! Voltando para tela de login
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Cadastro;
