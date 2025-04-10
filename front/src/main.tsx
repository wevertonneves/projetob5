import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Cadastro from "./pages/Cadastro";
import GeneroFilmes from "./pages/GeneroFilmes";
import AdminPanel from "./pages/AdminPanel";
import EsqueciSenha from "./pages/EsqueciSenha";
import NovaSenha from "./pages/NovaSenha";

import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/genero/:id" element={<GeneroFilmes />} />
        <Route path="/admin" element={<AdminPanel />} />
        <Route path="/esqueci-senha" element={<EsqueciSenha />} />
        <Route path="/nova-senha" element={<NovaSenha />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
