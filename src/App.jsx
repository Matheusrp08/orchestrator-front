import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Agentes from './pages/Agentes';
import Fluxos from './pages/Fluxos';
import DesignerFluxos from './pages/DesignerFluxos';
import Dashboard from './pages/Dashboard';
import MonitoramentoExecucoes from './pages/MonitoramentoExecucoes';
import DetalhesExecucao from './pages/DetalhesExecucao';
import ConfiguracoesTenant from './pages/ConfiguracoesTenant';

const App = () => {
  return (
    <Router>
      <div className="flex h-screen">
        <Sidebar />
        <div className="flex-1 flex flex-col overflow-hidden">
          <Header />
          <main className="flex-1 overflow-auto bg-gray-50">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/agentes" element={<Agentes />} />
              <Route path="/fluxos" element={<Fluxos />} />
              <Route path="/designer-fluxos" element={<DesignerFluxos />} />
              <Route path="/execucoes" element={<MonitoramentoExecucoes />} />
              <Route path="/execucoes/:id" element={<DetalhesExecucao />} />
              <Route path="/configuracoes" element={<ConfiguracoesTenant />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
};

export default App;
