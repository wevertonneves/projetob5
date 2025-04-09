import { BrowserRouter, Routes, Route } from "react-router";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Pokedex from "./pages/Pokedex";
import PokeInfo from "./pages/PokeInfo";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/pokedex" element={<Pokedex />} />
        <Route path="/home" element={<Home />} />
        <Route path="/Pokedex/:name" element={<PokeInfo />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
