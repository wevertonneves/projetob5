import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const NovaSenha = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mensagem, setMensagem] = useState("");
  const navigate = useNavigate();

  const handleNovaSenha = async (e: React.FormEvent) => {
    e.preventDefault(); // Impede o recarregamento da página

    console.log("📤 Enviando requisição para alterar senha...");
    console.log("🔹 Email:", email);
    console.log("🔹 Nova senha:", password);

    try {
      const response = await axios.post("http://localhost:3000/nova-senha", {
        email,
        password,
      });

      console.log("✅ Resposta da API:", response.data);
      setMensagem("Senha alterada com sucesso! Redirecionando...");

      setTimeout(() => {
        navigate("/login");
      }, 2000); // Redireciona após 2 segundos
    } catch (error: any) {
      console.error("❌ Erro ao alterar senha:", error);

      if (error.response) {
        console.log("🔴 Resposta do servidor:", error.response.data);
      } else if (error.request) {
        console.log(
          "⚠️ Nenhuma resposta do servidor. Verifique se a API está rodando."
        );
      } else {
        console.log("🚨 Erro na configuração da requisição:", error.message);
      }

      setMensagem("Erro ao alterar senha. Tente novamente.");
    }
  };

  return (
    <div
      style={{
        maxWidth: "400px",
        margin: "50px auto",
        padding: "20px",
        border: "1px solid #ccc",
        borderRadius: "8px",
      }}
    >
      <h2>Redefinir Senha</h2>

      <form onSubmit={handleNovaSenha}>
        <div style={{ marginBottom: "15px" }}>
          <label>Email</label>
          <input
            type="email"
            placeholder="Digite seu email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{ width: "100%", padding: "8px", marginTop: "5px" }}
          />
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label>Nova Senha</label>
          <input
            type="password"
            placeholder="Digite sua nova senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{ width: "100%", padding: "8px", marginTop: "5px" }}
          />
        </div>

        <button
          type="submit"
          style={{
            width: "100%",
            padding: "10px",
            backgroundColor: "#1976d2",
            color: "#fff",
            border: "none",
            borderRadius: "4px",
          }}
        >
          Alterar Senha
        </button>
      </form>

      {mensagem && (
        <p
          style={{
            marginTop: "15px",
            color: mensagem.includes("sucesso") ? "green" : "red",
          }}
        >
          {mensagem}
        </p>
      )}
    </div>
  );
};

export default NovaSenha;
