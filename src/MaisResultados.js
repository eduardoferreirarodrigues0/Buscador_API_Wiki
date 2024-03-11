import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import casaIcone from './casa-icon.png';
import { Link } from 'react-router-dom';


const MaisResultados = () => {
  const location = useLocation();
  const resultadosAdicionais = location.state?.eventos || [];
  const navigate = useNavigate();
  const [exibindoResultados, setExibindoResultados] = useState(true);

  useEffect(() => {
    document.title = `Mais Resultados`;}, );

  const cortarDescricao = (descricao, tamanho) => {
    return descricao.length > tamanho ? `${descricao.slice(0, tamanho)}...` : descricao;
  };

  const mostrarDetalhes = (evento) => {
    navigate('/detalhes-evento', { state: { evento } });
  };

  return (
    <div>
      {exibindoResultados && (
        <div className="paginaCentralizada">
            <h2 className="tituloCentralizado">Aqui estão mais resultados para sua pesquisa:</h2>
          <div className="cartaoEventoContainer">
            {resultadosAdicionais.length > 0 ? (
              resultadosAdicionais.map((evento, index) => (
                <div key={index} className="cartaoEvento">
                  <h3>{evento.titulo}</h3>
                  {evento.imagem && <img src={evento.imagem} alt={evento.titulo} />}
                  <p>
                    {cortarDescricao(evento.descricao, 100)}
                  </p>
                  <button className="verDetalhesBotao" onClick={() => mostrarDetalhes(evento)}>
                    Ver Detalhes
                  </button>
                </div>
              ))
            ) : (
              <p>Nenhum resultado significativo encontrado para você.</p>
            )}
          </div>
        </div>
      )}
      <div className="voltarContainer">
            <Link to="/" className="voltarLink">
              <img src={casaIcone} alt="Home" className="iconeCasa" />
            </Link>
          </div>
    </div>
  );
};

export default MaisResultados;

