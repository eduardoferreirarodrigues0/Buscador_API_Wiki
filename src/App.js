import './cartaoEvento.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Retrospectiva from './Retrospectiva';
import Resultados from './Resultado';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Retrospectiva />} />
        <Route path="/resultado" element={<Resultados />} />
      </Routes>
    </Router>
  );
}

export default App;

