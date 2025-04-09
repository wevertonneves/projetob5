import { useEffect, useState } from "react";

function App() {
  const [data, setData] = useState<string>("");

  useEffect(() => {
    fetch("http://localhost:3000/") // 🔹 Ajuste para a rota correta do backend
      .then((response) => response.text()) // 🔹 Se o backend retorna texto
      .then((data) => setData(data))
      .catch((error) => console.error("Erro ao buscar dados:", error));
  }, []);

  return (
    <div>
      <h1>Dados do Backend:</h1>
      <p>{data}</p>
    </div>
  );
}

export default App;
