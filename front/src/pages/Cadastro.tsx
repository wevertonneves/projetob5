import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  TextField,
  Button,
  Typography,
  Box,
  Snackbar,
  Alert,
} from "@mui/material";
import "../styles/styles.css";

const Cadastro = () => {
  const navigate = useNavigate();
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cpf, setCpf] = useState("");

  const [nomeError, setNomeError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [cpfError, setCpfError] = useState(false);

  const [emailLabel, setEmailLabel] = useState("Email");
  const [nomeLabel, setNomeLabel] = useState("Nome");
  const [passwordLabel, setPasswordLabel] = useState("Senha");
  const [cpfLabel, setCpfLabel] = useState("CPF");

  const [successMessage, setSuccessMessage] = useState(false);

  useEffect(() => {
    document.body.classList.add("bg-cadastro");
    return () => {
      document.body.classList.remove("bg-cadastro");
    };
  }, []);

  const errorStyle = {
    color: "#d32f2f",
    fontWeight: "bold",
  };

  const isValidCPF = (cpf: string) => {
    const cleanCPF = cpf.replace(/[^\d]/g, "");
    if (cleanCPF.length !== 11 || /^(\d)\1{10}$/.test(cleanCPF)) return false;

    const calcCheckDigit = (base: string, factor: number) =>
      base
        .split("")
        .reduce((sum, num, index) => sum + parseInt(num) * (factor - index), 0);

    const base = cleanCPF.substring(0, 9);
    const digit1 = (calcCheckDigit(base, 10) * 10) % 11 % 10;
    const digit2 = (calcCheckDigit(base + digit1, 11) * 10) % 11 % 10;

    return cleanCPF.endsWith(`${digit1}${digit2}`);
  };

  const validateFields = () => {
    let isValid = true;

    setNomeError(false);
    setEmailError(false);
    setPasswordError(false);
    setCpfError(false);

    setEmailLabel("Email");
    setNomeLabel("Nome");
    setPasswordLabel("Senha");
    setCpfLabel("CPF");

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

    if (!cpf.trim()) {
      setCpfError(true);
      setCpfLabel("⚠ O campo 'CPF' é obrigatório!");
      isValid = false;
    } else if (!isValidCPF(cpf)) {
      setCpfError(true);
      setCpfLabel("⚠ CPF inválido!");
      isValid = false;
    }

    return isValid;
  };

  const formatCpf = (value: string) => {
    const cpfNumbers = value.replace(/\D/g, "").slice(0, 11);
    return cpfNumbers
      .replace(/^(\d{3})(\d)/, "$1.$2")
      .replace(/^(\d{3})\.(\d{3})(\d)/, "$1.$2.$3")
      .replace(/\.(\d{3})(\d)/, ".$1-$2");
  };

  const handleCpfChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedCpf = formatCpf(e.target.value);
    setCpf(formattedCpf);
  };

  const handleCadastro = async () => {
    if (!validateFields()) return;

    try {
      const response = await fetch("http://localhost:3000/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: nome,
          email,
          password,
          cpf: cpf.replace(/[^\d]/g, ""),
        }),
      });

      const data = await response.json();

      if (response.ok) {
        if (data.id) {
          localStorage.setItem("userId", data.id);
        }

        setSuccessMessage(true);
        setTimeout(() => navigate("/login"), 2000);
      } else {
        setCpfError(false);
        setEmailError(false);

        const msg = data.error?.toLowerCase() || "";

        if (msg.includes("cpf")) {
          setCpfError(true);
          setCpfLabel(`⚠ ${data.error}`);
        }

        if (msg.includes("email")) {
          setEmailError(true);
          setEmailLabel(`⚠ ${data.error}`);
        }

        if (!msg.includes("cpf") && !msg.includes("email")) {
          alert(data.error || "Erro ao cadastrar.");
        }
      }
    } catch (error) {
      console.error("Erro ao conectar com o servidor:", error);
      alert("Erro ao conectar com o servidor.");
    }
  };

  return (
    <div className="login-container">
      <Box className="login-box">
      <Typography
  variant="h3"
  className="logo netflix-font"
  align="center"
  gutterBottom
  sx={{ fontFamily: "'Bebas Neue', sans-serif" }}
>
  CADASTRO
</Typography>

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
          placeholder="exemplo@dominio.com"
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
        <TextField
          fullWidth
          variant="filled"
          label={cpfLabel}
          placeholder="000.000.000-00"
          value={cpf}
          onChange={handleCpfChange}
          className="input-field"
          error={cpfError}
          InputLabelProps={{ style: cpfError ? errorStyle : {} }}
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
