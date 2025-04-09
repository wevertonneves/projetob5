import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Home from "./pages/Home";

function App() {
  const [data, setData] = useState<string>("");

  useEffect(() => {
    fetch("http://localhost:3000/")
      .then((response) => response.text())
      .then((data) => setData(data))
      .catch((error) => console.error("Erro ao buscar dados:", error));
  }, []);

  return (
    <Router>
      <nav>
        <Link to="/">Início</Link> | <Link to="/home">Home</Link>
      </nav>

      <Routes>
        <Route
          path="/"
          element={
            <div>
              <h1>Dados do Backend:</h1>
              <p>{data}</p>
            </div>
          }
        />
        <Route path="/home" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;
