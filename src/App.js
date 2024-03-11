import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './cartaoEvento.css';
import Retrospectiva from './Retrospectiva';
import Resultado from './Resultado';
import DetalhesEvento from './DetalhesEvento';
import MaisResultados from './MaisResultados';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Retrospectiva />} />
        <Route path="/resultado" element={<Resultado />} />
        <Route path="/detalhes-evento" element={<DetalhesEvento />} />
        <Route path="/mais-resultados" element={<MaisResultados />} />
      </Routes>
    </Router>
  );
}

export default App;


