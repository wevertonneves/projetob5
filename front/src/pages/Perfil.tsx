import { Box, Typography, TextField, Button } from "@mui/material";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Perfil = () => {
  const [user, setUser] = useState<{
    id: string;
    name: string;
    email: string;
    cpf?: string; // adicionado o campo cpf como opcional
  } | null>(null);
  const [novaSenha, setNovaSenha] = useState("");
  const [mensagem, setMensagem] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (!userId) {
      console.warn("⚠️ ID de usuário não encontrado no localStorage.");
      navigate("/login");
      return;
    }

    axios
      .get(`http://localhost:3000/users/${userId}`)
      .then((res) => {
        console.log("📥 Usuário carregado:", res.data);
        setUser(res.data);
      })
      .catch((err) => {
        console.error("❌ Erro ao buscar dados do usuário:", err);
      });
  }, [navigate]);

  const handleTrocarSenha = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("🔐 Tentando trocar a senha...");

    if (!user?.email || !novaSenha) {
      console.warn("⚠️ Email ou nova senha não preenchidos.");
      return;
    }

    console.log("📤 Enviando dados:", {
      email: user.email,
      password: novaSenha,
    });

    try {
      await axios.post("http://localhost:3000/nova-senha", {
        email: user.email,
        password: novaSenha,
      });

      console.log("✅ Senha atualizada com sucesso.");
      setMensagem("Senha atualizada com sucesso!");
      setNovaSenha("");
    } catch (error) {
      console.error("❌ Erro ao atualizar senha:", error);
      setMensagem("Erro ao atualizar senha. Tente novamente.");
    }
  };

  const handleDeletarUsuario = async () => {
    if (!user?.id) return;

    const confirmacao = window.confirm(
      "Tem certeza que deseja excluir sua conta?"
    );
    if (!confirmacao) return;

    try {
      await axios.delete(`http://localhost:3000/users/${user.id}`);
      console.log("🗑️ Usuário deletado com sucesso.");
      localStorage.clear();
      navigate("/login");
    } catch (err) {
      console.error("❌ Erro ao deletar usuário:", err);
      setMensagem("Erro ao deletar usuário.");
    }
  };

  const formatarCPF = (cpf: string) => {
    const visivel = cpf.slice(0, 3); // mostra apenas os 3 primeiros
    return `${visivel}.***.***-**`;
  };

  return (
    <Box className="bg-perfil">
      <Box className="background-overlay" />
      <Box className="login-container">
        <Box className="login-box">
          <Typography variant="h4" mb={2}>
            Perfil do Usuário
          </Typography>
          {user ? (
            <>
              <Typography variant="body1">
                Nome: <strong>{user.name}</strong>
              </Typography>
              <Typography variant="body1">
                Email: <strong>{user.email}</strong>
              </Typography>
              {user.cpf && (
                <Typography variant="body1">
                  CPF: <strong>{formatarCPF(user.cpf)}</strong>
                </Typography>
              )}

              <Box component="form" onSubmit={handleTrocarSenha} mt={3}>
                <TextField
                  label="Nova Senha"
                  type="password"
                  fullWidth
                  value={novaSenha}
                  onChange={(e) => setNovaSenha(e.target.value)}
                  className="input-field"
                  sx={{ mb: 2 }}
                />
                <Button variant="contained" color="primary" type="submit">
                  Atualizar Senha
                </Button>
              </Box>

              <Button
                variant="outlined"
                color="error"
                onClick={handleDeletarUsuario}
                sx={{ mt: 3 }}
              >
                Deletar Conta
              </Button>

              {mensagem && (
                <Typography
                  mt={2}
                  color={mensagem.includes("sucesso") ? "green" : "error"}
                >
                  {mensagem}
                </Typography>
              )}
            </>
          ) : (
            <Typography>Carregando informações do usuário...</Typography>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default Perfil;
