import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import casaIcone from './casa-icon.png';

const DetalhesEvento = () => {
  const location = useLocation();
  const evento = location.state?.evento || {};

  const renderDescricao = () => {
    if (!evento.descricao) {
      return null;
    }
    const paragrafos = evento.descricao.split(/(==[^=]+==)/).filter(Boolean);

    return paragrafos.map((trecho, index) => {
      const isTitulo = trecho.startsWith('==') && trecho.endsWith('==');

      return (
        <p key={index}>
          {isTitulo ? (
            <span className="destaque-titulo">{trecho}</span>
          ) : (
            trecho.trim()
          )}
        </p>
      );
    });
  };


  return (
    <div className="detalhesEventoPage">
      <div className="detalhesEventoContainer">
        <h1>Detalhes da sua Busca</h1>
          <div className="voltarContainer">
            <Link to="/" className="voltarLink">
              <img src={casaIcone} alt="Home" className="iconeCasa" />
            </Link>
          </div>
        <div className="detalhesEventoContent">
          <h3>{evento.titulo}</h3>
          {evento.imagem && <img src={evento.imagem} alt={evento.titulo} className="eventoImagem" />}
          {renderDescricao()}
        </div>
      </div>
    </div>
  );
};

export default DetalhesEvento;

