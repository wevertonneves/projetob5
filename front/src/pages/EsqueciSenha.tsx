import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { TextField, Button, Typography, Box } from "@mui/material";
import axios from "axios";
import "../styles/styles.css";

const RecuperarSenha = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [message, setMessage] = useState("");
  const [step, setStep] = useState(1);

  useEffect(() => {
    document.body.classList.add("bg-recuperar");

    return () => {
      document.body.classList.remove("bg-recuperar");
    };
  }, []);

  const handleEnviarCodigo = async () => {
    if (!email) {
      setMessage("Informe seu email para recuperar a senha.");
      return;
    }

    try {
      console.log(`📩 Enviando solicitação de recuperação para: ${email}`);
      await axios.post("http://localhost:3000/recuperar-senha", { email });
      setMessage("Código enviado para seu email.");
      setStep(2);
    } catch (err) {
      console.error("❌ Erro ao enviar código:");
      setMessage("Erro ao enviar código. Verifique o email e tente novamente.");
    }
  };

  const handleVerificarCodigo = async () => {
    if (!code) {
      setMessage("Digite o código recebido.");
      return;
    }

    try {
      console.log(
        `🔍 Enviando para validação: { email: ${email}, codigoRecebido: ${code} }`
      );
      const response = await axios.post(
        "http://localhost:3000/validar-codigo",
        { email, codigoRecebido: code }
      );

      console.log("✅ Resposta do servidor:", response.data);
      setMessage(response.data.message);
      navigate("/nova-senha");
    } catch (err) {
      console.error("❌ Erro na validação:");
      setMessage("Código inválido! Tente novamente.");
    }
  };

  return (
    <div className="login-container">
      <Box className="login-box">
        <Typography variant="h4" className="logo">
          Recuperar Senha
        </Typography>

        {step === 1 ? (
          <>
            <TextField
              fullWidth
              variant="filled"
              label="Digite seu email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input-field"
            />
            {message && <Typography color="error">{message}</Typography>}
            <Button
              fullWidth
              variant="contained"
              color="error"
              onClick={handleEnviarCodigo}
            >
              Enviar Código
            </Button>
          </>
        ) : (
          <>
            <TextField
              fullWidth
              variant="filled"
              label="Digite o código recebido"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="input-field"
            />
            {message && <Typography color="error">{message}</Typography>}
            <Button
              fullWidth
              variant="contained"
              color="error"
              onClick={handleVerificarCodigo}
            >
              Verificar Código
            </Button>
          </>
        )}

        <Typography className="forgot-text">
          <a href="#" onClick={() => navigate("/login")}>
            Voltar para o Login
          </a>
        </Typography>
      </Box>
    </div>
  );
};

export default RecuperarSenha;
