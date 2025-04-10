import Reacr, { useState } from "react";
import axios from "axios";

const NovaSenha = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mensagem, setMensagem] = useState("");

  const handleNovaSenha = async () => {
    console.log("📤 Enviando requisição para alterar senha...");
    console.log("🔹 Email:", email);
    console.log("🔹 Nova senha:", password);

    try {
      const response = await axios.post("http://localhost:3000/nova-senha", {
        email,
        password,
      });

      console.log("✅ Resposta da API:", response.data);
      setMensagem("Senha alterada com sucesso!");
    } catch (error: any) {
      console.error("❌ Erro ao alterar senha:", error);
      
      if (error.response) {
        console.log("🔴 Resposta do servidor:", error.response.data);
      } else if (error.request) {
        console.log("⚠️ Nenhuma resposta do servidor. Verifique se a API está rodando.");
      } else {
        console.log("🚨 Erro na configuração da requisição:", error.message);
      }

      setMensagem("Erro ao alterar senha. Tente novamente.");
    }
  };

  return (
    <div>
      <h2>Redefinir Senha</h2>
      
      {/* 🔹 Campo de email (aparece apenas uma vez) */}
      <input 
        type="email" 
        placeholder="Digite seu email" 
        value={email} 
        onChange={(e) => setEmail(e.target.value)} 
        style={{ display: "block", marginBottom: "10px" }} 
      />

      {/* 🔹 Campo da nova senha (corrigido para não sobrepor) */}
      <input 
        type="password" 
        placeholder="Digite sua nova senha" 
        value={password} 
        onChange={(e) => setPassword(e.target.value)}
        style={{ display: "block", marginBottom: "10px" }} 
      />

      <button onClick={handleNovaSenha}>Alterar Senha</button>
      <p>{mensagem}</p>
    </div>
  );
};

export default NovaSenha;
