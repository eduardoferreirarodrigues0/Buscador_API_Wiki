import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

const Resultado = () => {
  const location = useLocation();
  const eventos = location.state?.eventos || [];
  const nome = location.state?.nome || '';

  const [exibindoResultados] = useState(true);
  const [mostrarRestante, setMostrarRestante] = useState(false);

  useEffect(() => {
    document.title = `Resultado para ${nome}`;
  }, [nome]);

  const cortarDescricao = (descricao, tamanho) => {
    return descricao.length > tamanho ? `${descricao.slice(0, tamanho)}...` : descricao;
  };

  return (
    <div>
      {exibindoResultados && (
        <div className="paginaCentralizada">
          <h2 className="tituloCentralizado">Olá {nome}, este é o resultado da sua pesquisa:</h2>
          <div className="cartaoEventoContainer">
            {eventos.length > 0 ? (
              eventos.slice(0, 3).map((evento, index) => (
                <div key={index} className="cartaoEvento">
                  <h3>{evento.titulo}</h3>
                  {evento.imagem && <img src={evento.imagem} alt={evento.titulo} />}
                  <p>
                    {mostrarRestante ? evento.descricao : cortarDescricao(evento.descricao, 100)}
                    {!mostrarRestante && evento.descricao.length > 100 && (
                      <button className="mostrarMaisBotao" onClick={() => setMostrarRestante(true)}>
                        Mostrar mais
                      </button>
                    )}
                    {mostrarRestante && (
                      <button className="mostrarMenosBotao" onClick={() => setMostrarRestante(false)}>
                        Mostrar menos
                      </button>
                    )}
                  </p>
                </div>
              ))
            ) : (
              <p>Nenhum evento significativo encontrado para a cidade.</p>
            )}
          </div>
        </div>
      )}
      <Link to="/">Voltar para a página inicial</Link>
    </div>
  );
};

export default Resultado;
