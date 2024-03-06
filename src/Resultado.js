import React from 'react';
import { Link } from 'react-router-dom';

const Resultado = ({ eventos }) => {
  return (
    <div>
      <h1>Resultado</h1>
      <Link to="/">Voltar</Link>
      <h2>Eventos no seu aniversário</h2>
      <ul>
        {eventos.map((evento, index) => (
          <li key={index}>{evento}</li>
        ))}
      </ul>
    </div>
  );
};

export default Resultado;