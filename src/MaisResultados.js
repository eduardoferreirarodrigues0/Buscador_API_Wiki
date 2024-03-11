import React from 'react';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import casaIcone from './casa-icon.png';

const MaisResultados = () => {
  const location = useLocation();
  const resultadosAdicionais = location.state?.eventos || [];

  return (
    <div>
        <Link to="/" className="voltarLink">
            <img src={casaIcone} alt="Home" className="iconeCasa" />
        </Link>
        <h2>Mais Resultados</h2>   
      <div className="cartaoEventoContainer">
        {resultadosAdicionais.length > 0 ? (
          resultadosAdicionais.map((evento, index) => (
            <div key={index} className="cartaoEvento">
              <h3>{evento.titulo}</h3>
              {evento.imagem && <img src={evento.imagem} alt={evento.titulo} />}
              <p>{evento.descricao}</p>
            </div>
          ))
        ) : (
          <p>Nenhum resultado adicional encontrado.</p>
        )}
      </div>
    </div>
  );
};

export default MaisResultados;
