import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/styles.css";

const NovaSenha = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mensagem, setMensagem] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    document.body.classList.add("bg-nova-senha");
    return () => {
      document.body.classList.remove("bg-nova-senha");
    };
  }, []);

  const handleNovaSenha = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:3000/nova-senha", {
        email,
        password,
      });

      setMensagem("Senha alterada com sucesso! Redirecionando...");
      setTimeout(() => navigate("/login"), 2000);
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        console.error("Erro da API:", error.response?.data || error.message);
      } else {
        console.error("Erro inesperado:", error);
      }
      setMensagem("Erro ao alterar senha. Tente novamente.");
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2 className="logo">Redefinir Senha</h2>

        <form onSubmit={handleNovaSenha}>
          <div>
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              placeholder="Digite seu email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="input-field"
            />
          </div>

          <div>
            <label htmlFor="senha">Nova Senha</label>
            <input
              id="senha"
              type="password"
              placeholder="Digite sua nova senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="input-field"
            />
          </div>

          <button type="submit" className="auth-button">
            Alterar Senha
          </button>
        </form>

        {mensagem && (
          <p
            className={`mensagem ${
              mensagem.includes("sucesso") ? "success" : "error"
            }`}
          >
            {mensagem}
          </p>
        )}
      </div>
    </div>
  );
};

export default NovaSenha;
