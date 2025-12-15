// src/components/Sidebar.jsx (modificado para incluir link para Git Operations)
import { Home, Users, Workflow, Settings, LogOut, LayoutTemplate, Activity, GitCommit } from 'lucide-react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className="w-64 h-screen bg-white border-r border-gray-200 p-4 flex flex-col">
      <div className="mb-8">
        <h1 className="text-xl font-bold text-gray-800">Orquestrador</h1>
      </div>
      <nav className="flex-1">
        <ul className="space-y-2">
          <li>
            <Link
              to="/"
              className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100 text-gray-700"
            >
              <Home size={16} /> Dashboard
            </Link>
          </li>
          <li>
            <Link
              to="/agentes"
              className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100 text-gray-700"
            >
              <Users size={16} /> Agentes
            </Link>
          </li>
          <li>
            <Link
              to="/fluxos"
              className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100 text-gray-700"
            >
              <Workflow size={16} /> Fluxos
            </Link>
          </li>
          <li>
            <Link
              to="/designer-fluxos"
              className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100 text-gray-700"
            >
              <LayoutTemplate size={16} /> Designer de Fluxos
            </Link>
          </li>
          <li>
            <Link
              to="/execucoes"
              className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100 text-gray-700"
            >
              <Activity size={16} /> Execuções
            </Link>
          </li>
          <li>
            <Link
              to="/git-operations"
              className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100 text-gray-700"
            >
              <GitCommit size={16} /> Operações Git
            </Link>
          </li>
          <li>
            <Link
              to="/configuracoes"
              className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100 text-gray-700"
            >
              <Settings size={16} /> Configurações
            </Link>
          </li>
        </ul>
      </nav>
      <div className="mt-auto">
        <button className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100 text-gray-700 w-full">
          <LogOut size={16} /> Sair
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
