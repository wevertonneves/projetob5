import { Box, Typography, TextField, Button } from "@mui/material";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Perfil = () => {
  const [user, setUser] = useState<{
    id: string;
    name: string;
    email: string;
    cpf?: string;
  } | null>(null);
  const [novaSenha, setNovaSenha] = useState("");
  const [mensagem, setMensagem] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    const token = localStorage.getItem("token");

    if (!userId || !token) {
      console.warn("⚠️ ID de usuário ou token não encontrado no localStorage.");
      navigate("/login");
      return;
    }

    axios
      .get(`http://localhost:3000/users/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log("📥 Usuário carregado:", res.data);
        setUser(res.data);
      })
      .catch((err) => {
        console.error("❌ Erro ao buscar dados do usuário:", err);
        if (err.response?.status === 401) {
          navigate("/login");
        }
      });
  }, [navigate]);

  const handleTrocarSenha = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    if (!user?.email || !novaSenha || !token) {
      console.warn("⚠️ Dados incompletos para trocar a senha.");
      return;
    }

    try {
      await axios.post(
        "http://localhost:3000/nova-senha",
        {
          email: user.email,
          password: novaSenha,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("✅ Senha atualizada com sucesso.");
      setMensagem("Senha atualizada com sucesso!");
      setNovaSenha("");
    } catch (error) {
      console.error("❌ Erro ao atualizar senha:", error);
      setMensagem("Erro ao atualizar senha. Tente novamente.");
    }
  };

  const handleDeletarUsuario = async () => {
    const token = localStorage.getItem("token");

    if (!user?.id || !token) return;

    const senha = window.prompt("Digite sua senha para confirmar:");

    if (!senha) {
      setMensagem("Operação cancelada.");
      return;
    }

    try {
      // Verificar senha com backend
      const res = await axios.post(
        "http://localhost:3000/verificar-senha",
        {
          email: user.email,
          password: senha,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.data.valido) {
        const confirmacao = window.confirm("Tem certeza que deseja excluir sua conta?");
        if (!confirmacao) {
          setMensagem("Exclusão cancelada.");
          return;
        }

        await axios.delete(`http://localhost:3000/users/${user.id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        console.log("🗑️ Usuário deletado com sucesso.");
        localStorage.clear();
        navigate("/login");
      } else {
        setMensagem("Senha incorreta.");
      }
    } catch (err) {
      console.error("❌ Erro ao verificar senha:", err);
      setMensagem("Erro ao verificar senha.");
    }
  };

  const formatarCPF = (cpf: string) => {
    const visivel = cpf.slice(0, 3);
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
