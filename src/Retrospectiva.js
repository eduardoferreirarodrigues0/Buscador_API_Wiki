import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Retrospectiva = () => {
  const [nome, setNome] = useState('');
  const [data, setData] = useState('');
  const [eventos, setEventos] = useState([]);
  const [exibindoResultados, setExibindoResultados] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const buscarEventos = async () => {
    try {
      setLoading(true);

      const response = await axios.get(
        `https://pt.wikipedia.org/w/api.php?action=query&origin=*&format=json&generator=search&gsrnamespace=0&gsrlimit=15&gsrsearch=${data}`
      );

      const pages = response.data.query.pages;

      if (Object.keys(pages).length > 0) {
        const resultados = await Promise.all(
          Object.values(pages).map(async (page) => {
            const { titulo, imagem, descricao } = await buscarInformacoesDetalhadas(page.pageid);

            return {
              titulo,
              imagem,
              descricao,
            };
          })
        );

        setEventos(resultados);
        setExibindoResultados(true);
        navigate('/resultado', { state: { eventos: resultados, nome } });
      } else {
        setEventos([{ titulo: 'Nenhum evento encontrado', imagem: null, descricao: '' }]);
        setExibindoResultados(true);
        navigate('/resultado', { state: { eventos, nome } });
      }
    } catch (error) {
      console.error('Erro ao buscar eventos:', error);
    } finally {
      setLoading(false);
    }
  };

  const buscarInformacoesDetalhadas = async (pageid) => {
    try {
      const pageResponse = await axios.get(
        `https://pt.wikipedia.org/w/api.php?action=query&origin=*&format=json&prop=pageimages|extracts&piprop=original&explaintext=true&pageids=${pageid}`
      );

      const pageData = pageResponse.data.query.pages[pageid];
      const titulo = pageData.title;
      const imagem = pageData.original ? pageData.original.source : null;
      const descricao = pageData.extract || '';

      return { titulo, imagem, descricao };
    } catch (error) {
      console.error('Erro ao buscar informações detalhadas:', error);
      return { titulo: '', imagem: null, descricao: '' };
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await buscarEventos();
  };

  return (
    <div className="retrospectivaContainer">
      <div className="retrospectivaConteudo">
        <h1 className="titulo">Buscador</h1>
        <form className="formulario" onSubmit={handleSubmit}>
          <label>
            <span className="labelText">Nome:</span>
            <input
              type="text"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              placeholder="Digite seu nome"
              className="inputCampo"
            />
          </label>
          <br />
          <label>
            <span className="labelText">O que você gostaria de buscar?</span>
            <input
              type="text"
              value={data}
              onChange={(e) => setData(e.target.value)}
              placeholder="Digite sua busca"
              className="inputCampo"
            />
          </label>
          <br />
          <button className="botaoFormulario" type="submit" disabled={loading}>
            {loading ? 'Carregando...' : 'OK'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Retrospectiva;