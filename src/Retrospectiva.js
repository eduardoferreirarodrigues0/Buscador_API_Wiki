import React, { useState } from 'react';
import axios from 'axios';
import { format } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';

const Retrospectiva = () => {
  const [nome, setNome] = useState('');
  const [cidade, setCidade] = useState('');
  const [dataNascimento, setDataNascimento] = useState('');
  const [eventos, setEventos] = useState([]);
  const [exibindoResultados, setExibindoResultados] = useState(false);
  const [mostrarRestante, setMostrarRestante] = useState(false);

  const buscarEventos = async () => {
    try {
        const dataFormatada = format(new Date(dataNascimento), 'd MMMM', { locale: ptBR });
      const response = await axios.get(
        `https://pt.wikipedia.org/w/api.php?action=query&origin=*&format=json&generator=search&gsrnamespace=0&gsrlimit=3&gsrsearch=${dataFormatada}`
      );

      const pages = response.data.query.pages;

      if (Object.keys(pages).length > 0) {
        const eventos = Object.values(pages).map(async (page) => {
          const pageResponse = await axios.get(
            `https://pt.wikipedia.org/w/api.php?action=query&origin=*&format=json&prop=revisions&rvprop=content&pageids=${page.pageid}`
          );

          const content = pageResponse.data.query.pages[page.pageid].revisions[0]['*'];

          // Extrair eventos históricos da seção
          const eventosHistoricosMatch = content.match(/==\s*Eventos históricos\s*==([\s\S]*?)==/);
          const eventosHistoricos = eventosHistoricosMatch ? eventosHistoricosMatch[1].trim() : '';

          return {
            titulo: page.title,
            imagem: page.thumbnail ? page.thumbnail.source : null,
            eventosHistoricos,
          };
        });

        // Aguardar todas as requisições assíncronas serem concluídas
        const resultados = await Promise.all(eventos);

        setEventos(resultados);
        setExibindoResultados(true);
      } else {
        setEventos(["Nenhum evento significativo encontrado para o país e data especificadas."]);
        setExibindoResultados(true);
      }
    } catch (error) {
      console.error('Erro ao buscar eventos:', error);
    }
  };
  

  const handleSubmit = (e) => {
    e.preventDefault();
    setEventos([]);
    buscarEventos();
  };

    function cortarDescricao(descricao, limite) {
        if (descricao.length <= limite) {
        return descricao;
        }
    
        const ultimaPalavraIndex = descricao.lastIndexOf(' ', limite);
        const descricaoCortada = descricao.substring(0, ultimaPalavraIndex) + '...';
  
    return descricaoCortada;
  }

    return (
        <div className="formularioContainer">
            <h1>Retrospectiva</h1>
            <form className="formulario" onSubmit={handleSubmit}>
                <label>
                Nome:
                <input type="text" value={nome} onChange={(e) => setNome(e.target.value)} />
                </label>
                <br />
                <label>
                País:
                <input type="text" value={cidade} onChange={(e) => setCidade(e.target.value)} />
                </label>
                <br />
                <label>
                Data de Nascimento:
                <input type="date" value={dataNascimento} onChange={(e) => setDataNascimento(e.target.value)} />
                </label>
                <br />
                <button className="botaoFormulario" type="submit">OK</button>
            </form>
            
            {exibindoResultados && (
                <div className="paginaCentralizada">
                    <h2 className="tituloCentralizado">Eventos no seu aniversário</h2>
                    <div className="cartaoEventoContainer">
                        {eventos.length > 0 ? (
                            eventos.slice(0, 3).map((evento, index) => (
                            <div key={index} className="cartaoEvento">
                                <h3>{evento.titulo}</h3>
                                {evento.imagem && <img src={evento.imagem} alt={evento.titulo} />}
                                <p>
                                    {mostrarRestante ? evento.descricao : cortarDescricao(evento.descricao, 100)}
                                    {!mostrarRestante && evento.descricao.length > 100 && (
                                    <button className="mostrarMaisBotao" onClick={() => setMostrarRestante(true)}>Mostrar mais</button>
                                    )}
                                    {mostrarRestante && ( 
                                    <button className="mostrarMenosBotao" onClick={() => setMostrarRestante(false)}>Mostrar menos</button> 
                                    )}
                                </p>
                            </div>
                            ))
                        ) : ( <p>Nenhum evento significativo encontrado para a cidade e data especificadas.</p> )}
                    </div>
                </div>
            )}

        </div>
    );
};

export default Retrospectiva;
