import { useState, useEffect } from 'react';
import { Activity, Users, Workflow, Clock } from 'lucide-react';

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalAgentes: 0,
    totalFluxos: 0,
    totalExecucoes: 0,
    execucoesEmAndamento: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [agentesRes, fluxosRes, execucoesRes] = await Promise.all([
          fetch('/api/agentes'),
          fetch('/api/fluxos'),
          fetch('/api/execucoes'),
        ]);

        const agentes = await agentesRes.json();
        const fluxos = await fluxosRes.json();
        const execucoes = await execucoesRes.json();

        setStats({
          totalAgentes: agentes.length,
          totalFluxos: fluxos.length,
          totalExecucoes: execucoes.length,
          execucoesEmAndamento: execucoes.filter((e) => e.status === 'EM_ANDAMENTO').length,
        });
      } catch (error) {
        console.error('Erro ao buscar estatísticas:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Dashboard Administrativo</h1>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Users className="text-blue-600" size={20} />
              </div>
              <div>
                <p className="text-sm text-gray-500">Total de Agentes</p>
                <p className="text-xl font-bold text-gray-800">{stats.totalAgentes}</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <Workflow className="text-green-600" size={20} />
              </div>
              <div>
                <p className="text-sm text-gray-500">Total de Fluxos</p>
                <p className="text-xl font-bold text-gray-800">{stats.totalFluxos}</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Activity className="text-purple-600" size={20} />
              </div>
              <div>
                <p className="text-sm text-gray-500">Total de Execuções</p>
                <p className="text-xl font-bold text-gray-800">{stats.totalExecucoes}</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <Clock className="text-yellow-600" size={20} />
              </div>
              <div>
                <p className="text-sm text-gray-500">Execuções em Andamento</p>
                <p className="text-xl font-bold text-gray-800">{stats.execucoesEmAndamento}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
