import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useLocation,useNavigate } from 'react-router-dom';
import casaIcone from './casa-icon.png';

const Resultado = () => {
  const location = useLocation();
  const eventos = location.state?.eventos || [];
  const nome = location.state?.nome || '';
  const navigate = useNavigate();

  const [exibindoResultados] = useState(true);
  const resultadosAdicionais = eventos.slice(6);
  console.log('Dados para MaisResultados:', resultadosAdicionais);


  useEffect(() => {
    document.title = `Resultado para ${nome}`;
  }, [nome]);

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
          <h2 className="tituloCentralizado">Olá {nome}, este é o resultado da sua pesquisa:</h2>
          <div className="cartaoEventoContainer">
            {eventos.length > 0 ? (
              eventos.slice(0, 6).map((evento, index) => (
                <div key={index} className="cartaoEvento">
                  <h3>{evento.titulo}</h3>
                  {evento.imagem && <img src={evento.imagem} alt={evento.titulo} />}
                  <p>
                    {cortarDescricao(evento.descricao, 100)}
                  </p>
                  <button className="verDetalhesBotao" onClick={() => mostrarDetalhes(evento)}>Ver Detalhes</button>
                </div>
              ))
            ) : (
              <p>Nenhum resultado significativo encontrado para você.</p>
            )}
          </div>
        </div>
      )}
          <button
            className="mostrarMaisBotao"
            onClick={() => navigate('/mais-resultados', { state: { eventos: resultadosAdicionais } })}>
            Ver mais resultados
          </button>
          <div className="voltarContainer">
            <Link to="/" className="voltarLink">
              <img src={casaIcone} alt="Home" className="iconeCasa" />
            </Link>
          </div>
    </div>
  );
};

export default Resultado;
